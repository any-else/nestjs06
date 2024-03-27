import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';
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

  @ManyToMany(() => ProductEntity, (p) => p.bill)
  @JoinTable({
    name: 'product_bill',
    joinColumn: {
      name: 'bill_id',
      referencedColumnName: 'bill_id',
    },
    inverseJoinColumn: {
      name: 'product_id',
      referencedColumnName: 'product_id',
    },
  })
  product: ProductEntity[];
}
