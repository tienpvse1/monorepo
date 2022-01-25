import { AdminModule as RootAdminModule } from '@adminjs/nestjs';
import { Database, Resource } from '@adminjs/typeorm';
import { Module } from '@nestjs/common';
import AdminJS from 'adminjs';
import { Contact } from 'src/modules/contact/entities/contact.entity';
import { Email } from 'src/modules/mailer/entities/mailer.entity';
import { Account } from '../modules/account/entities/account.entity';
import { EmailTemplate } from '../modules/email-template/entities/email-template.entity';
import { PipelineColumn } from '../modules/pipeline-module/pipeline-column/entities/pipeline-column.entity';
import { PipelineItem } from '../modules/pipeline-module/pipeline-item/entities/pipeline-item.entity';
import { Pipeline } from '../modules/pipeline-module/pipeline/entities/pipeline.entity';

AdminJS.registerAdapter({ Database, Resource });

@Module({
  imports: [
    RootAdminModule.createAdmin({
      adminJsOptions: {
        rootPath: '/admin',
        resources: [
          PipelineItem,
          PipelineColumn,
          Pipeline,
          Account,
          EmailTemplate,
          Contact,
          Email,
        ],
        branding: {
          logo: 'https://iconape.com/wp-content/files/kr/371166/svg/371166.svg',
        },
        assets: {
          styles: ['/style.css'],
        },
        pages: {
          home: {
            component: AdminJS.bundle('./pages/home'),
          },
        },
      },
      auth: {
        authenticate: async (email, password) => {
          if (
            (email === 'tienpvse@gmail.com' && password === '123456') ||
            (email === 'admin@gmail.com' && password === 'admin@gmail.com')
          )
            return Promise.resolve({ email });
        },
        cookieName: 'test',
        cookiePassword: '123456',
      },
    }),
  ],
})
export class AdminModule {}
