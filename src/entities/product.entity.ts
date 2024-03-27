import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BillEntity } from './bill.entity';

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

  @ManyToMany(() => BillEntity, (b) => b.product)
  bill: BillEntity[];
}
