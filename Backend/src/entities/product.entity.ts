import { BaseEntity } from 'src/common/base/entity.base';
import { Column, Entity, ManyToOne, OneToMany, Unique } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { AccountEntity } from './account.entity';

export enum ProductStatus {
  IN_APPRAISAL = 'IN APPRAISAL',
  AVAILABLE = 'AVAILABLE',
  ORDERED = 'ORDERED',
  SOLD = 'SOLD',
}
@Unique(['name'])
@Entity({
  name: 'PRODUCT',
})
export class ProductEntity extends BaseEntity {
  @ManyToOne(() => AccountEntity, (account) => account.id)
  owner: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  name: string;

  @Column({
    name: 'brand',
    type: 'varchar',
    nullable: false,
    default: '',
  })
  brand: string;

  @Column({
    name: 'description',
    type: 'text',
    nullable: false,
  })
  description: string;

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'image',
  })
  image: string;

  @Column({
    name: 'price',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  price: number;

  @Column({
    name: 'type',
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  type: string;

  @Column({
    name: 'dialColor',
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  dialColor: string;

  @Column({
    name: 'box',
    type: 'boolean',
    nullable: false,
    default: false,
  })
  box: boolean;

  @Column({
    name: 'papers',
    type: 'boolean',
    nullable: false,
    default: false,
  })
  papers: boolean;

  @Column({
    name: 'waterResistance',
    type: 'decimal',
    precision: 10,
    nullable: true,
    default: 0,
  })
  waterResistance: number;

  @Column({
    name: 'caseMaterial',
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  caseMaterial: string;

  @Column({
    name: 'caseSize',
    type: 'decimal',
    precision: 10,
    nullable: false,
    default: 0,
  })
  caseSize: number;

  @Column({
    name: 'pastUsageTime',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  pastUsageTime: string;

  @Column({
    name: 'yearOfProduction',
    type: 'varchar',
    length: 4,
    nullable: true,
  })
  yearOfProduction: string;

  @Column({
    name: 'remainingInsurance',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  remainingInsurance: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: ProductStatus,
    default: ProductStatus.IN_APPRAISAL,
  })
  status: string;
}
