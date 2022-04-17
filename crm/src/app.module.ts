import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppService } from 'src/app.service';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { LoggingMiddleware } from './middleware/logging.middleware';
import { AccountModule } from './modules/account/account.module';
import { AuthModule } from './modules/auth/auth.module';
import { CityModule } from './modules/city/city.module';
import { CompanyModule } from './modules/company/company.module';
import { ConfigModule } from './modules/config/config.module';
import { ContactModule } from './modules/contact/contact.module';
import { DatabaseModule } from './modules/database/database.module';
import { EmailTemplateModule } from './modules/email-template/email-template.module';
import { FileModule } from './modules/file/file.module';
import { GlobalModule } from './modules/global/global.module';
import { HistoryModule } from './modules/history/history.module';
import { InboxModule } from './modules/inbox/inbox.module';
import { MailerModule } from './modules/mailer/mailer.module';
import { MessageModule } from './modules/message/message.module';
import { NoteWorthyModule } from './modules/note-worthy/note-worthy.module';
import { NotificationModule } from './modules/notification/notification.module';
import { OpportunityHistoryModule } from './modules/opportunity-history/opportunity-history.module';
import { OpportunityRevenueModule } from './modules/opportunity-revenue/opportunity-revenue.module';
import { PermissionModule } from './modules/permission/permission.module';
import { PipelineColumnModule } from './modules/pipeline-module/pipeline-column/pipeline-column.module';
// import { ContactFormModule } from './modules/contact-modules/contact-form/contact-form.module';
// import { ContactFormFieldModule } from './modules/contact-modules/contact-form-field/contact-form-field.module';
import { ScheduleModule as RootSchedule } from '@nestjs/schedule';
import { TasksService } from './cron/cron.service';
import { ActivityTypeModule } from './modules/activity-type/activity-type.module';
import { AutomationEmailTemplateModule } from './modules/automation-email-template/automation-email-template.module';
import { CourseModule } from './modules/course/course.module';
import { PipelineItemModule } from './modules/pipeline-module/pipeline-item/pipeline-item.module';
import { PipelineModule } from './modules/pipeline-module/pipeline/pipeline.module';
import { ProductAccountModule } from './modules/product-account/product-account.module';
import { ProductModule } from './modules/product/product.module';
import { ReasonModule } from './modules/reason/reason.module';
import { RoleModule } from './modules/role/role.module';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { SessionModule } from './modules/session/session.module';
import { TagModule } from './modules/tag/tag.module';
import { TeamModule } from './modules/team/team.module';
import { WebhookModule } from './modules/webhook/webhook.module';
@Module({
  imports: [
    RootSchedule.forRoot(),
    ConfigModule,
    DatabaseModule,
    AuthModule,
    AccountModule,
    GlobalModule,
    PipelineModule,
    PipelineItemModule,
    PipelineColumnModule,
    ContactModule,
    // ContactFormModule,
    // ContactFormFieldModule,
    FileModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MailerModule,
    EmailTemplateModule,
    MessageModule,
    AdminModule,
    SessionModule,
    ScheduleModule,
    PermissionModule,
    RoleModule,
    HistoryModule,
    ProductModule,
    ProductAccountModule,
    TagModule,
    NoteWorthyModule,
    EventEmitterModule.forRoot(),
    TeamModule,
    OpportunityRevenueModule,
    OpportunityHistoryModule,
    CompanyModule,
    NotificationModule,
    ReasonModule,
    WebhookModule,
    InboxModule,
    CityModule,
    ActivityTypeModule,
    CourseModule,
    AutomationEmailTemplateModule,
  ],
  providers: [GlobalModule, AppService, TasksService],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
