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

  async login(user) {
    /**
     * check user có tồn tại hay không ?
     *  if tồn tại =>
     *        kiểm tra password
     *    - sai: trả về lỗi là thông tin tài khoản mk ko chính xác
     *    - đúng thì trả về message đăng nhập thành công
     */

    const findUser = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (!findUser)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    if (findUser.password !== user.password)
      throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);

    return 'login successfully';
  }
}
