import { Module } from '@nestjs/common';
import { DiscountCodeService } from './discount-code.service';
import { DiscountCodeController } from './discount-code.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountCode } from './entities/discount-code.entity';
import { MailerModule } from '../mailer/mailer.module';
import { PipelineItemModule } from '../pipeline-module/pipeline-item/pipeline-item.module';
import { AccountModule } from '../account/account.module';

@Module({
  controllers: [DiscountCodeController],
  providers: [DiscountCodeService],
  imports: [
    TypeOrmModule.forFeature([DiscountCode]),
    MailerModule,
    PipelineItemModule,
    AccountModule,
  ],
})
export class DiscountCodeModule {}
