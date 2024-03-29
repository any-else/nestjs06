import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BillService } from './bill.service';

@Controller('api/v1/bill')
export class BillController {
  constructor(private readonly billService: BillService) {}

  @Post('create')
  create(@Body() bill: any) {
    return this.billService.create(bill);
  }

  @Get()
  findAll() {
    return this.billService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.billService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBillDto: any) {
    return this.billService.update(+id, updateBillDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billService.remove(+id);
  }
}
