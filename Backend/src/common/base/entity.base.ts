import { BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({nullable: true})
    deletedAt: Date;

    @BeforeUpdate()
    beforeUpdate() {
        // Chặn cập nhật trường primary key
        if (this.id !== this.id) {
            throw new Error('Cannot update primary key (id)');
        }
    }
}