import { nanoid } from 'nanoid';
import { BaseEntity } from 'src/base/entity.base';
import { Roles } from 'src/constance';
import { BeforeInsert, Column, Entity } from 'typeorm';

@Entity({ name: 'session' })
export class Session extends BaseEntity {
  @Column()
  ip: string;

  @Column({ name: 'expired_at' })
  expiredAt: Date;

  @Column()
  role: Roles;

  @Column()
  accountId: string;

  @BeforeInsert()
  init() {
    this.id = nanoid();
    this.expiredAt = new Date(Date.now() + 1000 * 60 * 30);
  }
}
