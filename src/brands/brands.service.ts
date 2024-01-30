import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BrandsService {
  private brands: Brand[] = [];

  create(createBrandDto: CreateBrandDto): Brand {
    const brand: Brand = this.brands.find(
      (b) => b.name.toLowerCase() === createBrandDto.name.toLowerCase(),
    );

    if (brand) return brand;

    const newBrand: Brand = {
      id: uuid(),
      name: createBrandDto.name,
      createdAt: new Date().getTime(),
    };

    this.brands.push(newBrand);

    return newBrand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string): Brand {
    const brand: Brand = this.brands.find((brand) => brand.id === id);
    if (!brand) throw new NotFoundException(`Brand with id "${id}" not found`);

    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto): Brand {
    const brandDB: Brand = this.findOne(id);

    const brandUpdated = brandDB;
    brandUpdated.name = updateBrandDto.name;
    brandUpdated.updatedAt = new Date().getTime();

    this.brands = this.brands.map((brand) =>
      brand.id === id ? brandUpdated : brand,
    );

    return brandUpdated;
  }

  remove(id: string): Brand[] {
    this.brands = this.brands.filter((brand) => brand.id !== id);

    return this.brands;
  }
  fillDataWithSeedData(brands: Brand[]) {
    this.brands = brands;
  }
}
