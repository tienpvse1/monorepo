import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { nanoid } from 'nanoid';
import { InjectKnex, Knex } from 'nestjs-knex';
import { BaseService } from 'src/base/nestjsx.service';
import { KnexAssignCode } from 'src/modules/pipeline-module/pipeline-item/dto/update-pipeline-item.dto';
import { Repository } from 'typeorm';
import { AccountService } from '../account/account.service';
import { EmailService } from '../mailer/mailer.service';
import { PipelineItemService } from '../pipeline-module/pipeline-item/pipeline-item.service';
import { CreateDiscountCodeDto } from './dto/create-discount-code.dto';
import { generateDiscountTemplate } from './dto/discount-template';
import { GenerateTemplateDto } from './dto/generate-template.dto';
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
    if (!dto.pipeline_item_id) {
      const createdId = await this.createDiscountCodeWithoutAssignToCustomer(
        dto,
        creatorId,
      );
      return this.findOneItem({ where: { id: createdId } });
    }
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
        value: generateDiscountTemplate(
          dto,
          pipelineItem,
          id,
          this.configService.get<string>('app.appDomain'),
        ),
      },
      ip,
      account.id,
    );
    return id;
  }
  applyDiscountCode(id: string) {
    this.repository.update(id, { applied: true });
  }

  async createDiscountCodeWithoutAssignToCustomer(
    dto: CreateDiscountCodeDto,
    creatorId: string,
  ) {
    const id = nanoid(10);
    await this.knex<KnexDiscountCode>('discount_code').insert({
      ...dto,
      account_id: creatorId,
      expired_at: new Date(dto.expired_at),
      id,
      applied: false,
    });
    return id;
  }

  async assignDiscountCode(discountId: string, pipelineItemId: string) {
    this.knex<KnexAssignCode>('discount_code')
      .update({
        discount_code_id: pipelineItemId,
      })
      .where({ id: discountId });
  }

  async getDiscountCodeTemplate(dto: GenerateTemplateDto) {
    const [discount, pipelineItem] = await Promise.all([
      this.findOneItem({
        where: {
          id: dto.discountId,
        },
      }),
      this.pipelineItemService.findOneItem({
        where: {
          id: dto.pipelineItemId,
        },
        relations: [
          'contact',
          'opportunityRevenue',
          'opportunityRevenue.course',
        ],
      }),
    ]);
    return generateDiscountTemplate(
      {
        discount_amount: discount.discountAmount,
        discount_name: discount.name,
        expired_at: discount.expireAt,
        pipeline_item_id: dto.pipelineItemId,
      },
      pipelineItem,
      dto.discountId,
      this.configService.get<string>('app.appDomain'),
    );
  }
}
