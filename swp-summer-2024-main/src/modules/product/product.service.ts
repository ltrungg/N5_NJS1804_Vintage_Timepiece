import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/entities/product.entity';
import { FindManyOptions, Not, Repository } from 'typeorm';
import { ProductStatus } from './product.controller';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async findAll(): Promise<ProductEntity[]> {
    return await this.productRepository.find({
      relations: ['owner'],
      order: {
        updatedAt: -1,
      },
    });
  }
  async findAllAvailable(userId: string): Promise<ProductEntity[]> {
    if (userId === 'null') {
      return await this.productRepository.find({
        where: {
          status: 'AVAILABLE',
        },
        relations: ['owner'],
      });
    } else
      return await this.productRepository.find({
        where: {
          status: 'AVAILABLE',
          owner: Not(userId),
        },
        relations: ['owner'],
      });
  }

  async getBrandList(): Promise<ProductEntity[]> {
    return await this.productRepository
      .createQueryBuilder('product')
      .select('brand')
      .distinctOn(['product.brand'])
      .orderBy('product.brand')
      .execute();
  }

  async getSearchList(key: string): Promise<ProductEntity[]> {
    const searched = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.owner', 'account')
      .where('product.name ILIKE :key OR product.brand ILIKE :key', {
        key: `%${key}%`,
      })
      .getMany();
    return searched.filter((item) => item.status === 'AVAILABLE');
  }

  async findOne(id: string): Promise<any | null> {
    return await this.productRepository.findOne({
      where: { id },
      relations: ['owner'],
      select: ['id', 'status', 'createdAt'],
    });
  }

  async findByUser(userId: string): Promise<any | null> {
    return this.productRepository.find({
      where: {
        owner: {
          id: userId,
        },
      },
      relations: ['owner'],
      order: {
        createdAt: -1,
      },
    });
  }

  async findOneWithRelated(id: string): Promise<any> {
    const product = await this.productRepository.findOne({
      where: { id, status: ProductStatus.AVAILABLE },
      relations: ['owner'],
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const relatedProducts = await this.findRelatedProducts(id);

    return { product, relatedProducts };
  }

  async findRelatedProducts(productId: string) {
    const product = await this.productRepository.findOne({
      where: {
        id: productId,
      },
    });
    if (!product) {
      throw new Error('Product not found');
    }

    return await this.productRepository.find({
      where: [
        {
          id: Not(product.id),
          dialColor: product.dialColor,
          status: 'AVAILABLE',
        },
        {
          id: Not(product.id),
          caseMaterial: product.caseMaterial,
          status: 'AVAILABLE',
        },
        {
          id: Not(product.id),
          type: product.type,
          status: 'AVAILABLE',
        },
      ],
      relations: ['owner'],
      take: 10,
    });
  }

  async getFeaturedList(): Promise<any | null> {
    return this.productRepository.find({
      where: { status: ProductStatus.AVAILABLE },
      order: {
        price: -1,
      },
      take: 3,
    });
  }

  async createProduct(product: any): Promise<any> {
    return this.productRepository.save(product);
  }

  async findLatest(): Promise<any | null> {
    return this.productRepository.find({
      where: {
        status: 'AVAILABLE',
      },
      order: {
        createdAt: 'DESC',
      },
      relations: ['owner'],
      take: 8,
    });
  }

  async updateProduct(id: string, update: any): Promise<any> {
    console.log(update);
    return this.productRepository.update(id, update);
  }

  // async updateProductStatus(id: string, update: { status: ProductStatus; price?: number }) {
  //   const product = await this.productRepository.findOne({ where: { id } });
  //   if (!product) {
  //     throw new Error('Product not found');
  //   }

  //   product.status = update.status;
  //   if (update.price !== undefined) {
  //     product.price = update.price;
  //   }

  //   await this.productRepository.save(product);
  //   return product;
  // }
  async findProductsByStatus(status: ProductStatus): Promise<any> {
    return await this.productRepository.find({
      where: {
        status: status,   
      },
    });
  }

}
