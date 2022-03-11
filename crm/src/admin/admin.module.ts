import { AdminModule as RootAdminModule } from '@adminjs/nestjs';
import { Database, Resource } from '@adminjs/typeorm';
import { Module } from '@nestjs/common';
import AdminJS from 'adminjs';
import { Contact } from 'src/modules/contact/entities/contact.entity';
import { Lead } from 'src/modules/lead/entities/lead.entity';
import { Email } from 'src/modules/mailer/entities/mailer.entity';
import { NoteWorthy } from 'src/modules/note-worthy/entities/note-worthy.entity';
import { Permission } from 'src/modules/permission/entities/permission.entity';
import { ProductAccount } from 'src/modules/product-account/entities/product-account.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import { Role } from 'src/modules/role/entities/role.entity';
import { Schedule } from 'src/modules/schedule/entities/schedule.entity';
import { Team } from 'src/modules/team/entities/team.entity';
import { Account } from '../modules/account/entities/account.entity';
import { EmailTemplate } from '../modules/email-template/entities/email-template.entity';
import { PipelineColumn } from '../modules/pipeline-module/pipeline-column/entities/pipeline-column.entity';
import { PipelineItem } from '../modules/pipeline-module/pipeline-item/entities/pipeline-item.entity';

AdminJS.registerAdapter({ Database, Resource });

@Module({
  imports: [
    RootAdminModule.createAdmin({
      adminJsOptions: {
        rootPath: '/admin',
        resources: [
          PipelineItem,
          PipelineColumn,
          Account,
          EmailTemplate,
          Contact,
          Email,
          Lead,
          Schedule,
          Permission,
          Role,
          ProductAccount,
          Product,
          Team,
          NoteWorthy,
        ],
        branding: {
          logo: 'https://iconape.com/wp-content/files/kr/371166/svg/371166.svg',
        },
        locale: {
          translations: {
            messages: {
              loginWelcome:
                'This app is built for Vietjet using NestJS - the best Node.JS framework',
            },
          },
          language: '',
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
