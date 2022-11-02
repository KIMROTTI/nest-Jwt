import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { UserDTO } from './dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/register')
  async get() {
    console.log(1);
  }

  @Post('/register')
  async registerAccount(
    // @Req() req: Request,
    @Body() userDto: UserDTO,
  ): Promise<any> {
    return await this.authService.registerUser(userDto);
  }

  @Post('/login')
  async login(@Body() userDTO: UserDTO): Promise<any> {
    return await this.authService.validateUser(userDTO);
  }
}
