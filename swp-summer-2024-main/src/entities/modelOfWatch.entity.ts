
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({
    name: "MODEL",
})
export class Model {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    image: string;

    @Column()
    description: string;

    @Column()
    modelNumber: string;

    @Column()
    serialNumber: string;

    @Column()
    type: string;

    @Column()
    caseMaterial: string;

    @Column()
    braceletMaterial: string;

    @Column()
    caseColor: string;

    @Column()
    dialColor: string;

    @Column()
    caseSize: string;

    @Column()
    yearOfManufacture: string;

    @Column()
    limitedEdition: boolean;

    @Column()
    marketValue: number;
}