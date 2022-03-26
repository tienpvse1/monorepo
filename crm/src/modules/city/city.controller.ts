import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { ParsedData } from './city.pipe';
import { CityService } from './city.service';
import { CreateCityDto, ParsedCreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { City } from './entities/city.entity';

@Controller('city')
@Crud({
  model: {
    type: City,
  },
  dto: {
    create: CreateCityDto,
    update: UpdateCityDto,
  },
  params: {
    id: {
      primary: true,
      type: 'string',
      field: 'id',
    },
  },
  routes: {
    exclude: ['createManyBase'],
  },
})
export class CityController {
  constructor(readonly service: CityService) {}

  @Post('bulk')
  @UsePipes(new ParsedData())
  createMany(@Body() body: ParsedCreateCityDto[]) {
    return this.service.createManyItem(body);
  }
}
