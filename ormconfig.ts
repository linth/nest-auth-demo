import { join } from "path";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";



export const config: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'nestjscrud',
  host: 'localhost',
  port: 5438, //5432,
  username: 'admin',
  password: 'admin',
  // entities: [User, Topic, Comment],
  entities: [join(__dirname, '**', '*.entity.{js,ts}')],
  synchronize: true,
}