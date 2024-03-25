import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api/v1/auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  create(@Body() user: any) {
    return this.userService.create(user);
  }

  @Post('sign-in')
  signIn(@Body() user: any) {
    return this.userService.login(user);
  }
}
