import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BillEntity } from '../entities/bill.entity';
import { Repository } from 'typeorm';
import { BillProductEntity } from '../entities/bill_product.entity';

@Injectable()
export class BillService {
  constructor(
    @InjectRepository(BillEntity)
    private readonly billRepository: Repository<BillEntity>,
    @InjectRepository(BillProductEntity)
    private readonly billProductRepository: Repository<BillProductEntity>,
  ) {}
  async create(bill: any) {
    /**
     * step: 1 create bill
     * step: 2 create bill_product
     */
    const newBill = {
      bill_name: bill.bill_name,
      status: bill.status,
      date_time: new Date(),
    };
    const data = this.billRepository.create(newBill);
    const res = await this.billRepository.save(data);
    console.log('res', res);

    for (const product of bill.data_product) {
      const newBillProduct = {
        bill_id: res.bill_id,
        product_id: product.product_id,
      };
      const data = this.billProductRepository.create(newBillProduct);
      await this.billProductRepository.save(data);
    }

    return 'This action adds a new bill';
  }

  async findAll() {
    /** bill: ten bill, status: trang thai, list product, total */
    const data = await this.billRepository
      .createQueryBuilder('bill')
      .innerJoin('bill.bill_product', 'bp')
      .innerJoin('bp.product_id', 'product')
      .select(['bill', 'bp', 'product'])
      .getMany();

    return {
      data: data,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} bill`;
  }

  update(id: number, updateBillDto: any) {
    return `This action updates a #${id} bill`;
  }

  remove(id: number) {
    return `This action removes a #${id} bill`;
  }
}
