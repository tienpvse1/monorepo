import { Module } from '@nestjs/common';
import { EmailService } from './mailer.service';
import { MailerController } from './mailer.controller';
import { MailerModule as RootMailer } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '../config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailRepository } from './mailer.repository';
@Module({
  controllers: [MailerController],
  providers: [EmailService],
  imports: [
    TypeOrmModule.forFeature([EmailRepository]),
    RootMailer.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: `smtps://${config.get<string>(
          'google.googleUsername',
        )}:${config.get<string>('google.googlePassword')}@smtp.gmail.com`,
        defaults: {
          from: 'good66612@gmail.com',
        },
      }),
    }),
  ],
})
export class MailerModule {}
