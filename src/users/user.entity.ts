/**
 * 
 * Reference:
 *  - https://bald3r.wang/2023/07/14/NestJS-%E5%85%A5%E9%97%A8%EF%BC%88%E4%B8%89%EF%BC%89%E7%94%A8%E6%88%B7%E7%99%BB%E5%BD%95%E4%B8%8EJWT/
 */
import { 
  BeforeInsert, 
  Column, 
  Entity, 
  OneToMany, 
  PrimaryGeneratedColumn 
} from "typeorm";
import * as bcrypt from 'bcrypt';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ 
    nullable: false,
    select: false,
  })
  password: string;

  // @OneToMany((type) => Comment, (comment) => comment.user)
  // comments: Comment[];

  @BeforeInsert()
  async hashPasword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}