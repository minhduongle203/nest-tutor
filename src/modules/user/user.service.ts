import { Injectable } from '@nestjs/common';
import { Users } from '../../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async findById(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }
}
