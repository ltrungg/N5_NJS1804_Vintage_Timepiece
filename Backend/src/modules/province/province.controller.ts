import { Controller, Get, Param } from '@nestjs/common';
import { ProvinceService } from './province.service';

@Controller('addressApi')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  @Get('/provinces')
  getProvinces() {
    return this.provinceService.getProvinces();
  }

  @Get('/districts/:province_id')
  getDistricts(@Param('province_id') provinceId: string) {
    return this.provinceService.getDistricts(provinceId);
  }

  @Get('/wards/:district_id')
  getWards(@Param('district_id') districtId: string) {
    return this.provinceService.getWards(districtId);
  }
}
