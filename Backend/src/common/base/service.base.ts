import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';
import { HttpException } from '@nestjs/common';
import { BaseEntity } from './entity.base';

export class BaseService<Entity extends BaseEntity> {

    constructor(
        protected repo: Repository<Entity>,
    ) { }

    getAll(): Promise<Entity[]> {
        return this.repo.find();
    }

    getAllWithDeleted(): Promise<Entity[]> {
        return this.repo.find({ withDeleted: true });
    }

    getOne(id: string): Promise<Entity> {
        if (!isUUID(id)) throw new HttpException('Id is incorrect', 400);
        return this.repo.findOne({ where: { id: id as any } });
    }

    create(entity: any): Promise<Entity> {
        return this.repo.save(entity);
    }

    async update(id: string, entity: any): Promise<Entity> {
        if (!isUUID(id)) throw new HttpException('Id is incorrect', 400);
        return this.repo.update(id, entity).then(() => this.getOne(id));

    }

    delete(id: string): Promise<any> {
        if (!isUUID(id)) throw new HttpException('Id is incorrect', 400);
        return this.repo.delete(id);
    }

    softDelete(id: string): Promise<any> {
        if (!isUUID(id)) throw new HttpException('Id is incorrect', 400);
        return this.repo.softDelete(id);
    }

    restore(id: string): Promise<any> {
        if (!isUUID(id)) throw new HttpException('Id is incorrect', 400);
        return this.repo.restore(id);
    }


}