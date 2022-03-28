import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { BaseService } from 'src/base/nestjsx.service';
import { InternalServerEvent } from 'src/constance/event';
import { getCustomRepository, Repository } from 'typeorm';
import { TeamRepository } from '../team/team.repository';
import { CreateAccountDto, JoinTeamDto } from './dto/create-account.dto';
import { CreateEmailAccount } from './dto/create-email-account.dto';
import { VerifyAccountDto } from './dto/verify-account-dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService extends BaseService<Account> {
  constructor(
    @InjectRepository(Account) repository: Repository<Account>,
    private eventEmitter: EventEmitter2,
    private config: ConfigService,
  ) {
    super(repository);
  }

  async joinTeam({ accountId, teamId }: JoinTeamDto) {
    const teamRepository = getCustomRepository(TeamRepository);
    const [account, team] = await Promise.all([
      this.findOneItem({ where: { id: accountId } }),
      teamRepository.findOneItem({
        where: { id: teamId },
        relations: ['accounts'],
      }),
    ]);

    if (team.accounts == undefined) {
      team.accounts = [account];
      return team.save();
    }
    for (const { id } of team.accounts) {
      if (id === accountId)
        throw new BadRequestException('already join this team');
    }
    team.accounts.push(account);
    this.eventEmitter.emit(InternalServerEvent.NEW_MEMBER_JOIN_TEAM, {
      account,
      teamId,
    });
    return team.save();
  }

  async createAccount(dto: CreateAccountDto) {
    try {
      const verifyDto: VerifyAccountDto = this.generateVerifyDto(
        dto.email,
        dto.password,
      );
      const { data: verifyResult } = await axios.post(
        `${this.config.get<string>(
          'email.serverUrl',
        )}verifyAccount?access_token=${this.config.get<string>(
          'email.serverAccessToken',
        )}`,
        verifyDto,
      );
      if (!verifyResult.imap.success || !verifyResult.smtp.success)
        throw new BadRequestException(
          'verify process failed, email and password must be math with your real one',
        );
      await this.createAccountOnEmailServer(
        dto.username,
        dto.email,
        dto.password,
        `${dto.firstName} ${dto.lastName}`,
      );
      const createResult = await this.createItem(dto);
      return createResult;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  generateVerifyDto(email: string, password: string): VerifyAccountDto {
    return {
      imap: {
        auth: {
          user: email,
          pass: password,
        },
        host: 'imap.gmail.com',
        port: 993,
        secure: true,
        tls: {
          rejectUnauthorized: true,
          minVersion: 'TLSv1.2',
        },
        resyncDelay: 900,
      },
      smtp: {
        auth: {
          user: email,
          pass: password,
        },
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        tls: {
          rejectUnauthorized: true,
          minVersion: 'TLSv1.2',
        },
      },
    };
  }
  generateCreateEmailDto(
    email: string,
    password: string,
    username: string,
    name: string,
  ): CreateEmailAccount {
    return {
      account: username,
      name: name,
      email: email,
      path: 'INBOX',
      copy: true,
      logs: true,
      imap: {
        auth: {
          user: email,
          pass: password,
        },
        host: 'imap.gmail.com',
        port: 993,
        secure: true,
        tls: {
          rejectUnauthorized: true,
          minVersion: 'TLSv1.2',
        },
        resyncDelay: 900,
      },
      smtp: {
        auth: {
          user: email,
          pass: password,
        },
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        tls: {
          rejectUnauthorized: true,
          minVersion: 'TLSv1.2',
        },
      },
    };
  }
  async createAccountOnEmailServer(
    username: string,
    email: string,
    password: string,
    name: string,
  ) {
    try {
      const dto = this.generateCreateEmailDto(email, password, username, name);
      const { data } = await axios.post(
        `${this.config.get<string>(
          'email.serverUrl',
        )}account?access_token=${this.config.get<string>(
          'email.serverAccessToken',
        )}`,
        dto,
      );
      return data;
    } catch (error) {
      throw new BadRequestException('cannot create account');
    }
  }
}
