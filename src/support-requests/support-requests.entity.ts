import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class SupportRequest {
  @ObjectIdColumn()
  _id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  content: string;

  @Column()
  department: string;
}
