import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  // 사용자 등록 요청에 대한 로직
  async registerUser(newUser: UserDTO): Promise<UserDTO> {
    console.log(newUser);
    const userFind: UserDTO = await this.userService.findByFields({
      where: { username: newUser.username },
    });
    //db에 요청한 데이터가 있을 경우 에러 출력
    if (userFind) {
      throw new HttpException(
        'Usersname already used!',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.userService.save(newUser);
  }
}
