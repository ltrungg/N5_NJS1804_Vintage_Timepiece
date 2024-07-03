import { BaseEntity } from 'src/common/base/entity.base';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SellEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  watchName: string;

  @Column()
  name: string;

  @Column()
  phoneNumber: string;

  @Column()
  email: string;

  @Column()
  imagePath: string;
}