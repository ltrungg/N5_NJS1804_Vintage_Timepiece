import { BaseEntity } from "src/common/base/entity.base";
import { Column, Entity, Unique } from "typeorm";

@Unique(["name"])
@Entity({
    name: "CATEGORY",
})
export class CategoryEntity extends BaseEntity{

    @Column({
        name: "name",
        type: "varchar",
        length: 100,
        nullable: false,
    })
    name: string;

    @Column({
        name: "description",
        type: "text",
        nullable: false,
    })
    description: string;
    
}