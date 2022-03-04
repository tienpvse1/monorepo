import { nanoid } from 'nanoid';
import { BaseEntity } from 'src/base/entity.base';
import { Account } from 'src/modules/account/entities/account.entity';
import { Socket } from 'src/modules/socket/entities/socket.entity';
import { generateExpireDate } from 'src/util/check-expire';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity({ name: 'session' })
export class Session extends BaseEntity {
  @Column()
  ip: string;

  @Column({ name: 'expired_at' })
  expiredAt: Date;

  @OneToOne(() => Account, (account) => account.session)
  @JoinColumn({ name: 'account_id' })
  account: Account;
  @OneToMany(() => Socket, (socket) => socket.session, { cascade: true })
  sockets: Socket[];

  @BeforeInsert()
  init() {
    this.id = nanoid(10);
    this.expiredAt = generateExpireDate();
  }
}
