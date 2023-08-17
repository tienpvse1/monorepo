import { BaseEntity } from 'src/base/entity.base';
import { Column, Entity } from 'typeorm';

@Entity()
export class Message extends BaseEntity {
  @Column()
  name: string;
  @Column({ type: 'longtext' })
  message: string;
}
