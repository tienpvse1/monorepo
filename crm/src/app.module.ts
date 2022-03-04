import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AdminModule } from './admin/admin.module';
import { LoggingMiddleware } from './middleware/logging.middleware';
import { AccountModule } from './modules/account/account.module';
import { AddressModule } from './modules/address/address.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from './modules/config/config.module';
import { ContactModule } from './modules/contact/contact.module';
import { DatabaseModule } from './modules/database/database.module';
import { EmailTemplateModule } from './modules/email-template/email-template.module';
import { FileModule } from './modules/file/file.module';
import { GlobalModule } from './modules/global/global.module';
import { HistoryModule } from './modules/history/history.module';
import { LeadModule } from './modules/lead/lead.module';
import { MailerModule } from './modules/mailer/mailer.module';
import { MessageModule } from './modules/message/message.module';
import { NoteWorthyModule } from './modules/note-worthy/note-worthy.module';
import { PermissionModule } from './modules/permission/permission.module';
import { PipelineColumnModule } from './modules/pipeline-module/pipeline-column/pipeline-column.module';
// import { ContactFormModule } from './modules/contact-modules/contact-form/contact-form.module';
// import { ContactFormFieldModule } from './modules/contact-modules/contact-form-field/contact-form-field.module';
import { PipelineItemModule } from './modules/pipeline-module/pipeline-item/pipeline-item.module';
import { PipelineModule } from './modules/pipeline-module/pipeline/pipeline.module';
import { ProductAccountModule } from './modules/product-account/product-account.module';
import { ProductModule } from './modules/product/product.module';
import { RoleModule } from './modules/role/role.module';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { SessionModule } from './modules/session/session.module';
import { TagModule } from './modules/tag/tag.module';
import { TeamModule } from './modules/team/team.module';
import { TeamGateway } from './modules/team.gateway';
import { SocketModule } from './modules/socket/socket.module';
import { InvitationModule } from './modules/invitation/invitation.module';

@Module({
  imports: [
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
    LeadModule,
    ScheduleModule,
    PermissionModule,
    RoleModule,
    HistoryModule,
    ProductModule,
    ProductAccountModule,
    TagModule,
    NoteWorthyModule,
    AddressModule,
    EventEmitterModule.forRoot(),
    TeamModule,
    SocketModule,
    InvitationModule,
  ],
  providers: [GlobalModule, TeamGateway],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
