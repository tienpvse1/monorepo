import { BaseEntity } from 'src/base/entity.base';
import { Company } from 'src/modules/company/entities/company.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class City extends BaseEntity {
  @Column({ name: 'city' })
  city: string;
  @Column({ type: 'float' })
  lat: number;
  @Column({ type: 'float' })
  lng: number;
  @Column({ default: 'Vietnam' })
  country: string;
  @Column({ default: 'VN' })
  iso2: string;
  @Column({ name: 'admin_name' })
  admin_name: string;

  @Column()
  capital: string;
  @Column({ type: 'integer' })
  population: number;
  @Column({ type: 'integer', name: 'population_proper' })
  population_proper: number;

  @OneToMany(() => Company, (company) => company.city)
  companies: Company[];
}
