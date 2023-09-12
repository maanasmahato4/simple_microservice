import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from './product.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly ProductRepo: Repository<Product>
    ) { }

    GetProduct(id: number) {
        return this.ProductRepo.findOne({ where: { id: id } });
    }

    GetProducts() {
        return this.ProductRepo.find();
    }

    AddProduct(product: any) {
        return this.ProductRepo.save(product);
    }

    async UpdateLike(id: number) {
        console.log(id);
        const product = await this.ProductRepo.findOne({ where: { id } })
        if(product){
            const updatedLikes = product.likes + 1;
            return await this.ProductRepo.update(id, {likes: updatedLikes});
        }
    }

    UpdateProduct(id: number, product: any) {
        return this.ProductRepo.update(id, product);
    }

    DeleteProduct(id: number) {
        return this.ProductRepo.delete(id);
    }
}
