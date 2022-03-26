import { Injectable, PipeTransform } from '@nestjs/common';
import { CreateCityDto, ParsedCreateCityDto } from './dto/create-city.dto';

@Injectable()
export class ParsedData implements PipeTransform {
  transform(dtos: CreateCityDto[]): ParsedCreateCityDto[] {
    const result = dtos.map((dto) => ({
      ...dto,
      population: Number.parseInt(
        dto.population.length > 0 ? dto.population : '0',
      ),
      population_proper: Number.parseInt(
        dto.population_proper.length > 0 ? dto.population_proper : '0',
      ),
      lat: Number.parseFloat(dto.lat),
      lng: Number.parseFloat(dto.lng),
    }));
    return result;
  }
}
