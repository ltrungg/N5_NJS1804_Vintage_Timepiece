import { BaseEntity } from 'src/common/base/entity.base';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  Unique,
} from 'typeorm';
import { AccountEntity } from './account.entity';
import { OrderItemEntity } from './order-item.entity';
import { ChatRoomEntity } from './chat-room.entity';
import { SellerRequestEntity } from './sellerRequest.entity';
import { AppraisalReportEntity } from './appraisal-report.entity';

export enum ProductStatus {
  IN_APPRAISAL = 'IN APPRAISAL',
  AVAILABLE = 'AVAILABLE',
  SOLD = 'SOLD',
  UPDATE_REQUESTED = 'UPDATE_REQUESTED',
  CANCELED = 'CANCELED',
}
@Entity({
  name: 'PRODUCT',
})
export class ProductEntity extends BaseEntity {
  @ManyToOne(() => AccountEntity, (account) => account.products, {
    eager: true,
  })
  @JoinColumn()
  owner: AccountEntity;

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
    type: 'simple-array',
    nullable: true,
    name: 'imageSet',
  })
  imageSet: string[];

  @Column({
    name: 'price',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    default: 0,
  })
  price: number;

  @Column({
    name: 'type',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  type: string;

  @Column({
    name: 'dialColor',
    type: 'varchar',
    length: 50,
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
    type: 'int',
    nullable: false,
    default: 0,
  })
  waterResistance: number;

  @Column({
    name: 'caseMaterial',
    type: 'varchar',
    nullable: false,
    default: 'Steel',
  })
  caseMaterial: string;

  @Column({
    name: 'caseSize',
    type: 'int',
    nullable: false,
    default: 40,
  })
  caseSize: number;

  @Column({
    name: 'pastUsageTime',
    type: 'int',
    nullable: true,
  })
  pastUsageTime: number;

  @Column({
    name: 'yearOfProduction',
    type: 'int',
    nullable: true,
  })
  yearOfProduction: number;

  @Column({
    name: 'remainingInsurance',
    type: 'int',
    nullable: true,
  })
  remainingInsurance: number;

  @Column({
    name: 'status',
    type: 'enum',
    enum: ProductStatus,
    default: ProductStatus.IN_APPRAISAL,
  })
  status: string;

  @OneToOne(() => OrderItemEntity, (orderItem) => orderItem.product)
  orderItem: OrderItemEntity;

  @OneToMany(() => ChatRoomEntity, (chatRoom) => chatRoom.product)
  chatRooms: ChatRoomEntity[];

  @OneToMany(
    () => SellerRequestEntity,
    (sellerRequest) => sellerRequest.product,
  )
  sellerRequests: SellerRequestEntity[];

  @OneToMany(
    () => AppraisalReportEntity,
    (appraisalReport) => appraisalReport.product,
  )
  appraisalReports: AppraisalReportEntity[];
}
