import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { AccountRepository } from 'src/modules/account/account.repository';
import { getCustomRepository } from 'typeorm';
// import { seedCompanies } from './modules/company/company.seeder';
// import { seedContacts } from './modules/contact/contact.seeder';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  async onApplicationBootstrap() {
    const accountRepository = getCustomRepository(AccountRepository);
    const gmailBot = await accountRepository.findOne({
      where: { username: 'gmail' },
    });
    if (!gmailBot) {
      await accountRepository.insert({
        id: nanoid(10),
        username: 'gmail',
        firstName: 'Gmail',
        email: 'gmail@gmail.com',
        photo: 'https://cdn-icons-png.flaticon.com/512/5968/5968534.png',
        state: 'BT',
        city: 'HCMC',
        country: 'VN',
        password: 'gmail@gmail.com',
      });
    }
    // seedCompanies(10);
    // seedContacts(70);
  }
}
