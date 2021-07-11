import { User } from '../users/entities/user.entity';
import { Board } from '../boards/entities/board.entity';
import { Task } from '../tasks/entities/task.entity';
import { ConnectionOptions } from 'typeorm';
import {
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
} from './config';
//import dotenv from 'dotenv';
//import { ConfigService } from '@nestjs/config';
//const configService = new ConfigService()
//console.log(process.env.POSTGRES_PORT);

//dotenv.config({ path: path.join(__dirname, "../../.env") })

const typeormconfig: ConnectionOptions = {
  type: 'postgres',
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: [User, Board, Task],
  synchronize: false,
  migrationsRun: true,
  migrations: ['dist/migrations/*.js'],
  migrationsTableName: 'migrations_typeorm',
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export { typeormconfig };
