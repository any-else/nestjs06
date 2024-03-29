import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';
import { BillProductEntity } from './bill_product.entity';
@Entity({ name: 'bill' })
export class BillEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  bill_id: number;

  @Column()
  bill_name: string;
  @Column()
  status: number;

  @Column({ type: 'timestamp' })
  date_time: Date;

  @OneToMany(() => BillProductEntity, (bp) => bp.bill_id)
  bill_product: BillProductEntity[];
}
