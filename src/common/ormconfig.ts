import { User } from '../users/entities/user.entity';
import { Board } from '../boards/entities/board.entity';
import { Task } from '../tasks/entities/task.entity';
import { ConnectionOptions } from 'typeorm';
import dotenv from 'dotenv';
import path from 'path';
//console.log(__dirname);
//dotenv.config({ path: path.join(__dirname, "../../.env") })

const typeormconfig: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: +'5433',
  username: 'postgres',
  password: '123456789',
  database: 'test',
  entities: [User, Board, Task],
  synchronize: false,
  migrationsRun: true,
  migrations: ['dist/migrations/*.js'],
  migrationsTableName: 'migrations_typeorm',
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export default typeormconfig;
