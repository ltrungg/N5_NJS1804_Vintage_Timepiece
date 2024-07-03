import { BaseEntity } from 'src/common/base/entity.base';
import { Column, Entity, ManyToOne } from 'typeorm';
import { AccountEntity } from './account.entity';
import { ProductEntity } from './product.entity';

@Entity({
  name: 'APPRAISAL_REPORT',
})
export class AppraisalReportEntity extends BaseEntity {
  @ManyToOne(() => AccountEntity, (account) => account.appraisalReports)
  appraiser: AccountEntity;

  @ManyToOne(() => ProductEntity, (product) => product.appraisalReports)
  product: ProductEntity;

  @Column({
    name: 'appraisalResult',
    type: 'enum',
    enum: ['APPROVED', 'REJECTED', 'PENDING'],
    nullable: false,
  })
  appraisalResult: string;

  @Column({
    name: 'status',
    type: 'bool',
    nullable: false,
    default: false,
  })
  status: boolean;

  @Column({
    name: 'note',
    type: 'text',
    nullable: true,
  })
  note: string;
}
