import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity'; 
import { CreateProductDto, UpdateProductDto } from './dto/product.dto'; 

@Injectable()
export class ProductoService {
constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
) {}

async findAll(): Promise<Product[]> {
    return this.productRepository.find();
}

  async findOne(id: number): Promise<Product> {  
    const producto = await this.productRepository.findOne({ where: { id } });
    if (!producto) throw new NotFoundException('Producto no encontrado');
    return producto;
}

async create(createProductDto: CreateProductDto): Promise<Product> {
    const productoExistente = await this.productRepository.findOne({ where: { nombre: createProductDto.nombre } });
    if (productoExistente) throw new BadRequestException('Ya existe un producto con este nombre');
    const producto = this.productRepository.create(createProductDto);
    return this.productRepository.save(producto);
}

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {  
    const producto = await this.productRepository.preload({ id, ...updateProductDto });
    if (!producto) throw new NotFoundException('Producto no encontrado');
    return this.productRepository.save(producto);
}

  async remove(id: number): Promise<void> {  
    const producto = await this.findOne(id);
    await this.productRepository.remove(producto);
}
}
