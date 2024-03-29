import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product.entity';
import { BillEntity } from './bill.entity';

@Entity({ name: 'bill_product' })
export class BillProductEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  bp_id: number;

  @ManyToOne(() => ProductEntity, (p) => p.bill_product)
  @JoinColumn({
    name: 'product_id',
  })
  product_id: number;

  @ManyToOne(() => BillEntity, (b) => b.bill_product)
  @JoinColumn({
    name: 'bill_id',
  })
  bill_id: number;
}

/**
 *  Xây dưng API CRUD product, bill
 *  + Search Product, Search billproduct_id
 *
 *  R: lấy bill và join tới bảng product để tính tổng số tiền của bill đấy
 */
