import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'todos' })
export class TodoEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  todo_id: number;

  @Column()
  todo_title: string;

  @Column()
  todo_name: string;

  @Column({
    type: 'tinyint',
    default: 0,
  })
  status: number;

  @ManyToOne(() => UserEntity, (u) => u.todo)
  @JoinColumn({
    name: 'user_id',
  })
  user_id: UserEntity | number;
}
