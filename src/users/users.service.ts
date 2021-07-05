import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { IResUser } from './interfaces/user-storage.interface';
import { Task } from 'src/tasks/entities/task.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<IResUser | undefined> {
    const newUser = this.usersRepository.create(createUserDto);
    const savedUser = this.usersRepository.save(newUser);
    const savedId = (await savedUser).id;
    if (savedId) {
      const res = await this.usersRepository.findOne(savedId);
      return User.toResponse(res);
    }
    return undefined;
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string | undefined): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | undefined> {
    const res = await this.usersRepository.findOne(id);
    //console.log(res)
    if (res === undefined || id === undefined) return undefined;
    const updatedUser = await this.usersRepository.update(id, updateUserDto);

    return updatedUser.raw;
    //return `This action updates a #${id} user`;
  }

  async remove(id: string): Promise<'deleted' | 'not found'> {
    const res = this.usersRepository.findOne(id);
    if (res === undefined || id === undefined) return 'not found';
    //const taskRepo = getRepository(Task);
    await this.tasksRepository.update({ userId: id }, { userId: null });
    const deletedUser = await this.usersRepository.delete(id);
    if (deletedUser.affected) return 'deleted';
    console.log('not found')
    return 'not found';
    //console.log( `This action removes a #${id} user`);
  }
}
