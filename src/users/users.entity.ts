import { Column, Entity, Index, ObjectIdColumn } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  _id: string;
  @Column()
  fullName: string;
  @Index({ unique: true })
  @Column()
  username: string;
  @Column()
  password: string;
}
