import { BaseEntity } from 'src/base/entity.base';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'contact' })
export class Contact extends BaseEntity {
  @Column()
  name: string;
  @Column({ nullable: true })
  birth: Date;
  @Column({ nullable: true })
  address: string;
  @Column({ nullable: true })
  phone: string;
  @Column({ nullable: true, type: 'simple-array' })
  type: string[];
}
