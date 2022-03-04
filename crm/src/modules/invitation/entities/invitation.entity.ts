import { BaseEntity } from 'src/base/entity.base';
import { Account } from 'src/modules/account/entities/account.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Invitation extends BaseEntity {
  @Column({ type: 'longtext' })
  message: string;

  @ManyToOne(() => Account, (account) => account.sentInvitations, {
    cascade: true,
  })
  @JoinColumn({ name: 'sender_id' })
  sender: Account;

  @ManyToMany(() => Account, (account) => account.receivedInvitations, {
    cascade: true,
  })
  @JoinTable({
    name: 'receiver_invitation',
    joinColumn: { name: 'receiver_id' },
    inverseJoinColumn: { name: 'invitation_id' },
  })
  receivers: Account[];
}
