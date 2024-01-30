import { Injectable } from '@nestjs/common';
import { BrandsService } from '../brands/brands.service';
import { CarsService } from '../cars/cars.service';
import { BRANDS_SEED } from './data/brands.seed';
import { CARS_SEED } from './data/cars.seed';

@Injectable()
export class SeedService {
  constructor(
    private readonly carService: CarsService,
    private readonly brandService: BrandsService,
  ) {}
  populateDB() {
    this.brandService.fillDataWithSeedData(BRANDS_SEED);
    this.carService.fillDataWithSeedData(CARS_SEED);
    return `SEED executed`;
  }
}
