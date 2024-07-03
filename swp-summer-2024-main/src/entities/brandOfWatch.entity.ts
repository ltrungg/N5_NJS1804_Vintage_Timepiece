
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Model } from "./modelOfWatch.entity";

@Entity({
    name: "BRAND",
})
export class BrandEntity  {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    logo: string;

    @Column()
    moreInfo: string;

    @Column(type => Model)
    models: Model[];
}