import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('api/v1/todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  /** ALl */
  @Get('/all')
  findAll(@Query('limit') limit) {
    /** tôi muốn dữ liệu giới hạn (chỉ muốn lấy 3 phần tử ra) và sắp xếp theo trường todoname  */
    console.log('limit', limit);
    return this.todoService.findAll(limit);
  }
  /** search */
  @Get('search')
  search(@Query('q') q: string) {
    console.log(q);
    return this.todoService.search(q);
  }

  @Post('/create')
  create(@Body() todo: any) {
    return this.todoService.create(todo);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() todo: any) {
    return this.todoService.update(+id, todo);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }

  @Post('pagination')
  async pagination(@Query('limit') limit, @Query('page') page) {
    const data = await this.todoService.pagination(limit, page);
    console.log('data', data);
    return {
      message: 'oke',
      data: data,
    };
  }

  @Get('group/user')
  async groupTodo() {
    console.log('aaaa');
    const data = await this.todoService.groupTodo();
    return {
      message: 'oke',
      data,
    };
  }

  /** lấy tất cả todo nhóm id user và sắp xếp theo ASC của trường todo_title */
}
