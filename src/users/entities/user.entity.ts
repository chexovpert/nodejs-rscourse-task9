import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { IResUser } from '../interfaces/user-storage.interface';

@Entity({ name: 'User' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string | undefined;

  @Column('varchar', { nullable: true })
  name = 'USER';

  @Column('varchar', { nullable: true })
  login = 'user';

  @Column('varchar', { select: true, nullable: true })
  password!: string;

  static toResponse = (user: User): IResUser => {
    const { id, login, name } = user;
    return { id, login, name };
  };
}
