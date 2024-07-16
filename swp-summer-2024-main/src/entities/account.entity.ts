import { BaseEntity } from 'src/common/base/entity.base';
import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { ProductEntity } from './product.entity';
import { OrderEntity } from './order.entity';
import { ChatRoomToUserEntity } from './chat-room-to-user.entity';
import { SellerRequestEntity } from './sellerRequest.entity';
import { ReportEntity } from './report.entity';
import { FeedbackEntity } from './feedback.entity';
import { AppraisalReportEntity } from './appraisal-report.entity';
import { ContactUsEntity } from './contact.entity';

export enum Role {
  admin = 'admin',
  staff = 'staff',
  appraiser = 'appraiser',
  user = 'user',
}

@Unique(['email'])
@Entity({
  name: 'ACCOUNT',
})
export class AccountEntity extends BaseEntity {
  @Column({
    name: 'Username',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  username: string;

  @Column({
    name: 'Email',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  email: string;

  @Column({
    name: 'Phone',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  phone: string;

  @Column({
    name: 'Password',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  password: string;

  @Column({
    name: 'Role',
    type: 'enum',
    enum: Role,
    default: Role.user,
    nullable: false,
  })
  role: Role;

  @Column({
    name: 'Avatar',
    type: 'text',
    nullable: false,
    default:
      'https://i.pinimg.com/564x/c2/7e/b7/c27eb77c278f37d9a204bff5a661b83b.jpg',
  })
  avatar: string;

  @Column({
    name: 'Last_active',
    type: 'timestamp',
    nullable: true,
    default: new Date(Date.now()),
  })
  lastActive: Date;

  @Column({
    name: 'status',
    type: 'bool',
    nullable: false,
    default: true,
  })
  status: boolean;
  @OneToMany(() => ContactUsEntity, (contact) => contact.owner)
  contactReports: ContactUsEntity[];

  @OneToMany(() => ProductEntity, (product) => product.owner)
  products: ProductEntity[];

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];

  @OneToMany(
    () => ChatRoomToUserEntity,
    (chatRoomToUser) => chatRoomToUser.participant,
  )
  chatRoomToUser: ChatRoomToUserEntity[];

  @OneToMany(
    () => SellerRequestEntity,
    (sellerRequest) => sellerRequest.account,
  )
  sellerRequests: SellerRequestEntity[];

  @OneToMany(() => ReportEntity, (report) => report.account)
  reports: ReportEntity[];

  @OneToMany(
    () => AppraisalReportEntity,
    (appraisalReport) => appraisalReport.appraiser,
  )
  appraisalReports: AppraisalReportEntity[];

  @OneToMany(() => FeedbackEntity, (feedback) => feedback.evaluator)
  sentFeedbacks: FeedbackEntity[];

  @OneToMany(() => FeedbackEntity, (feedback) => feedback.evaluated)
  receivedFeedbacks: FeedbackEntity[];
}
