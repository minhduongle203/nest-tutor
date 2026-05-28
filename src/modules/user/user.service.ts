import { Injectable } from '@nestjs/common';
import { Users } from '../../entities/user.entity';

@Injectable()
export class UserService {
  private users: Users[] = [
    { id: 1, name: 'An' },
    { id: 2, name: 'Bình' },
  ];

  findById(id: number) {
    return this.users.find((user) => user.id === id);
  }
}
