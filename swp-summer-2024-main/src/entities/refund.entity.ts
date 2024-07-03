import { BaseEntity } from "src/common/base/entity.base";
import { Column, Entity, OneToOne, Unique } from "typeorm";
@Unique(["order"])
@Entity({
    name: "REFUND_TRANSACTION",
})
export class RefundEntity extends BaseEntity {

    @Column({
        name: "order",
        type: "uuid",
        nullable: false,
    })
    order: string;

    @Column({
        name: "reason",
        type: "text",
        nullable: false,
    })
    reason: string;

    @Column({
        name: "transaction",
        type: "jsonb",
        nullable: false,
    })
    transaction: object;
    
}