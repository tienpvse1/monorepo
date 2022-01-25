import { Module } from '@nestjs/common';
import { AccountModule } from './modules/account/account.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from './modules/config/config.module';
import { DatabaseModule } from './modules/database/database.module';
import { GlobalModule } from './modules/global/global.module';
import { PipelineModule } from './modules/pipeline-module/pipeline/pipeline.module';
// import { ContactFormModule } from './modules/contact-modules/contact-form/contact-form.module';
// import { ContactFormFieldModule } from './modules/contact-modules/contact-form-field/contact-form-field.module';
import { PipelineItemModule } from './modules/pipeline-module/pipeline-item/pipeline-item.module';
import { PipelineColumnModule } from './modules/pipeline-module/pipeline-column/pipeline-column.module';
import { FileModule } from './modules/file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MailerModule } from './modules/mailer/mailer.module';
import { EmailTemplateModule } from './modules/email-template/email-template.module';
import { MessageModule } from './modules/message/message.module';
import { AdminModule } from './admin/admin.module';
import { ContactModule } from './modules/contact/contact.module';

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
  ],
  providers: [GlobalModule],
})
export class AppModule {}
