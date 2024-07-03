import { BaseEntity } from 'src/common/base/entity.base';
import { Column, Entity } from 'typeorm';

@Entity()
export class ContactEntity extends BaseEntity{
   @Column()
   name: string;

   @Column()
   email: string;

   @Column()
   message: string;
}
