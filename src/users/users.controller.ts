import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}


// import { getRepository } from 'typeorm';
// import { Task } from '../../entities/task';
// import { User } from '../../entities/user';
// import { IReqUser } from '../../types/types';
// import { hashPassword } from '../../helpers/hash.helper';

// const getAll = async (): Promise<User[]> => {
//   const userRepo = getRepository(User);
//   return userRepo.find({ where: {} });
// };

// const getUserById = async (
//   id: string | undefined
// ): Promise<User | undefined> => {
//   const userRepo = getRepository(User);
//   return userRepo.findOne(id);
// };

// const postUser = async (reqBody: IReqUser): Promise<User | undefined> => {
//   const userRepo = getRepository(User);
//   const { password } = reqBody;
//   const hashedPassword = await hashPassword(password);
//   const newUserWithHashPassword = {
//     ...reqBody,
//     password: hashedPassword,
//   };
//   const newUser = userRepo.create(newUserWithHashPassword);
//   const savedUser = userRepo.save(newUser);
//   const savedId = (await savedUser).id;
//   if (savedId) return userRepo.findOne(savedId);
//   return undefined;
// };

// const deleteUser = async (
//   id: string | undefined
// ): Promise<'deleted' | 'not found'> => {
//   const userRepo = getRepository(User);
//   const res = await userRepo.findOne(id);
//   if (res === undefined || id === undefined) return 'not found';
//   const taskRepo = getRepository(Task);
//   await taskRepo.update({ userId: id }, { userId: null });
//   const deletedUser = await userRepo.delete(id);
//   if (deletedUser.affected) return 'deleted';
//   return 'not found';
// };

// const updateUser = async (
//   id: string | undefined,
//   reqBody: IReqUser
// ): Promise<User | undefined> => {
//   const userRepo = getRepository(User);
//   const res = await userRepo.findOne(id);
//   if (res === undefined || id === undefined) return undefined;
//   const { password } = reqBody;
//   const hashedPassword = await hashPassword(password);
//   const updatedUserWithHashPassword = {
//     ...reqBody,
//     password: hashedPassword,
//   };
//   const updatedUser = await userRepo.update(id, updatedUserWithHashPassword);
//   return updatedUser.raw;
// };

// export { getAll, postUser, getUserById, updateUser, deleteUser };
