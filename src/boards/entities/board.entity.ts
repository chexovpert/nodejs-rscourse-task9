import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'Board' })
class Board extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string | undefined;
  @Column('varchar')
  title = 'base title';
  @Column({ type: 'json', nullable: true })
  columns?: string;
}

export { Board };
