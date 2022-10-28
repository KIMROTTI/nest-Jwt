import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions } from 'typeorm';
import { UserDTO } from './dto/user.dto';
import { User } from './entity/user.entity';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  async findByFields(
    options: FindOneOptions<UserDTO>,
  ): Promise<UserDTO | undefined> {
    console.log(1);
    return await this.userRepository.findOne(options);
  }

  async save(UserDTO: UserDTO): Promise<UserDTO | undefined> {
    return await this.userRepository.save(UserDTO);
  }
}
