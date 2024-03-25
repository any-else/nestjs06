import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from '../entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}
  async create(todo: any) {
    const newTodo = this.todoRepository.create(todo);
    await this.todoRepository.save(newTodo);
    return 'add todo successfully';
  }

  async findAll() {
    const data = await this.todoRepository.find({
      relations: ['user_id'],
    });

    const data2 = await this.todoRepository
      .createQueryBuilder('todo')
      .innerJoinAndSelect('todo.user_id', 'users')
      .getMany();

    return {
      message: 'get oke',
      data: data2,
    };
  }

  async findOne(id: number) {
    const todo = await this.todoRepository.findOne({
      where: { todo_id: id },
      relations: ['user_id'],
    });

    if (!todo)
      throw new HttpException('Todo not found', HttpStatus.BAD_REQUEST);

    /** SELECT * FROM todo WHERE todo_id = id */

    return {
      message: 'get oke',
      data: todo,
    };
  }

  async update(id: number, todoUPdate: any) {
    /** check trong db */
    const findTodo = await this.todoRepository.findOne({
      where: { todo_id: id },
    });

    if (!findTodo)
      throw new HttpException('Todo not found', HttpStatus.BAD_REQUEST);

    const dataUPdate = await this.todoRepository.update(
      { todo_id: id },
      {
        todo_title: todoUPdate.todo_title ?? findTodo.todo_title,
        todo_name: todoUPdate.todo_name ?? findTodo.todo_name,
        status: todoUPdate.status ?? findTodo.status,
      },
    );
    return {
      message: 'update ok',
      dataL: dataUPdate,
    };
  }

  async remove(id: number) {
    await this.todoRepository.delete({ todo_id: id });
    return `This action removes a #${id} todo`;
  }
}
