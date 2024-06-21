import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProvinceService {
  async getProvinces() {
    try {
      const provinces = await fetch(
        'https://vapi.vnappmob.com/api/province',
      ).then((res) => res.json());
      return provinces.results;
    } catch (err) {
      console.log(err);
    }
  }

  async getDistricts(provinceId: string) {
    try {
      const districts = await fetch(
        `https://vapi.vnappmob.com/api/province/district/${provinceId}`,
      ).then((res) => res.json());
      return districts.results;
    } catch (err) {
      console.log(err);
    }
  }

  async getWards(districtId: string) {
    try {
      const wards = await fetch(
        `https://vapi.vnappmob.com/api/province/ward/${districtId}`,
      ).then((res) => res.json());
      return wards.results;
    } catch (err) {
      console.log(err);
    }
  }
}
