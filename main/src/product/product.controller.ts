import { Body, Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { EventPattern } from '@nestjs/microservices';

@Controller('product')
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ){}

    @Get('')
    async GetProducts(){
        return await this.productService.GetProducts();
    }

    @EventPattern('product_created')
    async AddProduct(product: any){
        return await this.productService.AddProduct(product);
    }

    @EventPattern('like_updated')
    async UpdateLike(updatedProduct: any){
        return await this.productService.UpdateLike(updatedProduct)
    }

    @EventPattern('product_updated')
    async UpdateProduct(updatedProduct: any){
        return await this.productService.UpdateProduct(updatedProduct)
    }

    @EventPattern('product_deleted')
    async DeleteProduct(id: number){
        return await this.productService.DeleteProduct(id);
    }
}
