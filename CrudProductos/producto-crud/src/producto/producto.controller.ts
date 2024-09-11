import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ProductoService } from './producto.service'; 
import { CreateProductDto, UpdateProductDto } from './dto/product.dto'; 

@Controller('products')
export class ProductoController {
constructor(private readonly productoService: ProductoService) {}

@Get()
async findAll() {
    return this.productoService.findAll();
}

@Get(':id')
  async findOne(@Param('id') id: number) {  
    return this.productoService.findOne(id);
}

@Post()
async create(@Body() createProductDto: CreateProductDto) {
    return this.productoService.create(createProductDto);
}

@Put(':id')
  async update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {  
    return this.productoService.update(id, updateProductDto);
}

@Delete(':id')
  async remove(@Param('id') id: number) {  
    return this.productoService.remove(id);
}
}
