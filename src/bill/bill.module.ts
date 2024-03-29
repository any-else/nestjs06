import { Module } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillEntity } from '../entities/bill.entity';
import { BillProductEntity } from '../entities/bill_product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BillEntity, BillProductEntity])],
  controllers: [BillController],
  providers: [BillService],
})
export class BillModule {}
