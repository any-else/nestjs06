import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BillEntity } from './bill.entity';
import { BillProductEntity } from './bill_product.entity';

@Entity({ name: 'product' })
export class ProductEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  product_id: number;
  @Column()
  product_name: string;
  @Column()
  product_description: string;
  @Column({
    type: 'decimal',
  })
  product_price: number;
  @Column({
    type: 'int',
  })
  quantity: number;

  @OneToMany(() => BillProductEntity, (bp) => bp.product_id)
  bill_product: BillEntity[];
}
