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
  ) { }



  async findAll(): Promise<ProductEntity[]> {
    return this.productRepository.find({
      where: { status: ProductStatus.AVAILABLE },
      relations: ['owner'], // Lấy thông tin chủ sở hữu
    });
  }
  async findAllAvailable(): Promise<ProductEntity[]> {
    return this.productRepository.find({
      where: {
        status: 'AVAILABLE',
      },
    });
  }

  async findOne(id: string): Promise<any | null> {
    return this.productRepository.findOne({
      where: { id },
      relations: ['owner'],
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
      take: 10,
    });
  }

  async getFeaturedList(): Promise<any | null> {
    return this.productRepository.find({
      where: [
        {
          id: '92aff6ca-17d2-40db-bbcb-44bead71f964',
        },
        {
          id: '58d6bbc1-3fce-4f27-b948-14474b8eb3a8',
        },
        {
          id: '027acdb9-8b99-4c45-8041-31a3c0f8d569',
        },
      ],
      relations: ['owner'],
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
    return this.productRepository.update(id, update);
  }
}
