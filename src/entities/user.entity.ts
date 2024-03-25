import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TodoEntity } from './todo.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  user_id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'tinyint',
    default: 1,
  })
  role: number;

  @OneToMany(() => TodoEntity, (td) => td.user_id)
  todo: TodoEntity[] | number[];
}
