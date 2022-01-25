import { nanoid } from 'nanoid';
import {
  BaseEntity as RootBaseEntity,
  BeforeInsert,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity extends RootBaseEntity {
  @PrimaryColumn()
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @BeforeInsert()
  generateId() {
    this.id = nanoid(10);
  }
}
