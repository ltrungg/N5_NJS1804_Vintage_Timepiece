import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum SellRequestStatus {
  WITH_REPORT = 'WITH_REPORT',
  WITHOUT_REPORT = 'WITHOUT_REPORT',
}


@Entity({
  name: "SELL_REQUEST",
})
export class SellRequest extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  watchName: string;

  @Column()
  name: string;

  @Column()
  phoneNumber: string;

  @Column()
  image: string;

  @Column()
  priceWantToSell: number;

  @Column({ nullable: true })
  originalBox?: string;

  @Column({ nullable: true })
  documents?: string;

  @Column({ nullable: true })
  limitedEdition?: string;

  @Column({ nullable: true })
  paper?: string;

  // Fields from ProductEntity (if needed)
  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  type?: string;

  @Column({ nullable: true })
  dialColor?: string;

  @Column({ nullable: true })
  waterResistance?: number;

  @Column({ nullable: true })
  caseMaterial?: string;

  @Column({ nullable: true })
  caseSize?: string;

  @Column({ nullable: true })
  pastUsageTime?: string;

  @Column({ nullable: true })
  yearOfProduction?: string;

  @Column({ nullable: true })
  remainingInsurance?: string;

  @Column({
    type: 'enum',
    enum: SellRequestStatus,
    
  })
  status: SellRequestStatus;
}
