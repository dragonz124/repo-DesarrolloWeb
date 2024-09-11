import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { IsNotEmpty, IsOptional, IsString, MinLength, IsNumber, Min } from 'class-validator';

@Entity()
export class Product {
@PrimaryGeneratedColumn()  
id: number;

@Column()
@IsNotEmpty()
@IsString()
@MinLength(3)
nombre: string;

@Column({ nullable: true })
@IsOptional()
@IsString()
descripcion?: string;

@Column('decimal')
@IsNotEmpty()
@IsNumber()
@Min(0)
precio: number;

@Column('int')
@IsNotEmpty()
@IsNumber()
@Min(0)
stock: number;

@CreateDateColumn()
fechaCreacion: Date;
}
