import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async create(user: any) {
    /**
     *  lưu vào db
     * kiểm tra trong db có tồn tại email đấy chưa
     *
     */
    const findUser = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (findUser)
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);

    // cách 1: demo cach thong thuong
    const newUser = this.userRepository.create(user);
    await this.userRepository.save(newUser);
    return 'add successfully';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: any) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
