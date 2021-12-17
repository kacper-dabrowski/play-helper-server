import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class Solution {
  @ObjectIdColumn()
  _id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  content: string;

  @Column()
  isPublic: boolean;
}
