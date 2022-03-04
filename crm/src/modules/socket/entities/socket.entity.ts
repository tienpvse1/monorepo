import { Session } from 'src/modules/session/entities/session.entity';
import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Socket extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Session, (session) => session.sockets, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'session_id',
  })
  session: Session;
}
