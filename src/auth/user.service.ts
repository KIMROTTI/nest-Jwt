import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions } from 'typeorm';
import { UserDTO } from './dto/user.dto';
import { UserRepository } from './repository/user.repository';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';

//repository와 auth.service로직을 연결 -> db를 객체로
@Injectable()
export class UserService {
  constructor(
    //@InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async findByFields(
    options: FindOneOptions<UserDTO>,
  ): Promise<User | undefined> {
    return await this.userRepository.findOne(options);
  }

  async save(userDto: UserDTO): Promise<UserDTO | undefined> {
    await this.transformPassword(userDto);
    console.log(userDto);
    return await this.userRepository.save(userDto);
  }

  async transformPassword(user: UserDTO): Promise<any> {
    console.log(user);
    user.password = await bcrypt.hash(user.password, 10);
    return Promise.resolve();
  }
}
