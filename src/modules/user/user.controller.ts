import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UsersController {
  @Get()
  getHello() {
    return 'Hello Bố Minh đây!';
  }
}
