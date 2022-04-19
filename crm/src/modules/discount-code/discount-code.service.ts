import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { nanoid } from 'nanoid';
import { InjectKnex, Knex } from 'nestjs-knex';
import { BaseService } from 'src/base/nestjsx.service';
import { Repository } from 'typeorm';
import { AccountService } from '../account/account.service';
import { EmailService } from '../mailer/mailer.service';
import { PipelineItemService } from '../pipeline-module/pipeline-item/pipeline-item.service';
import { CreateDiscountCodeDto } from './dto/create-discount-code.dto';
import {
  DiscountCode,
  KnexDiscountCode,
} from './entities/discount-code.entity';

@Injectable()
export class DiscountCodeService extends BaseService<DiscountCode> {
  constructor(
    @InjectRepository(DiscountCode) repository: Repository<DiscountCode>,
    @InjectKnex() private knex: Knex,
    private mailer: EmailService,
    private pipelineItemService: PipelineItemService,
    private accountService: AccountService,
    private configService: ConfigService,
  ) {
    super(repository);
  }

  async createDiscountCode(
    dto: CreateDiscountCodeDto,
    ip: string,
    creatorId: string,
  ) {
    const id = nanoid(10);
    const [pipelineItem, account] = await Promise.all([
      this.pipelineItemService.findOneItem({
        where: {
          id: dto.pipeline_item_id,
        },
        relations: [
          'contact',
          'opportunityRevenue',
          'opportunityRevenue.course',
        ],
      }),
      this.accountService.findOneItem({
        where: {
          id: creatorId,
        },
      }),
    ]);

    await this.knex<KnexDiscountCode>('discount_code').insert({
      ...dto,
      account_id: creatorId,
      expired_at: new Date(dto.expired_at),
      id,
      applied: false,
    });
    this.mailer.sendEmail(
      {
        subject: 'Claim your discount code now',
        to: [
          {
            email: pipelineItem.contact.email,
            isTag: false,
          },
        ],
        value: `
          <h1>${dto.discount_name}</h1>
          <h3>Claim your ${dto.discount_amount * 100}% discount</h3>
          <table>
            <tr>
              <th>NO.</th>
              <th>Course</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
            <tr>
              <td>1</td>
              <td>${pipelineItem.opportunityRevenue.course.name}</td>
              <td>${pipelineItem.opportunityRevenue.quantity}</td>
              <td>${pipelineItem.opportunityRevenue.course.price}</td>
            </tr>
          </table>
          <h3 style="text-align:center;text-decoration: line-through;">Total: ${
            pipelineItem.opportunityRevenue.course.price *
            pipelineItem.opportunityRevenue.quantity
          }vnd</h3>
          <h2 style="color: red">Now only ${
            pipelineItem.opportunityRevenue.course.price *
              pipelineItem.opportunityRevenue.quantity -
            pipelineItem.opportunityRevenue.course.price *
              pipelineItem.opportunityRevenue.quantity *
              dto.discount_amount
          }</h2>
          <a href="${this.configService.get<string>(
            'app.appDomain',
          )}api/v1/apply/${id}">Apply now</a>
        `,
      },
      ip,
      account.id,
    );
    return id;
  }
  applyDiscountCode(id: string) {
    this.repository.update(id, { applied: true });
  }
}
