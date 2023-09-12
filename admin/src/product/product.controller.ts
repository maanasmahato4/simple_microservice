import { Controller, Get, Param, ParseIntPipe, Post, Body, Put, Delete, Inject } from '@nestjs/common';
import { ProductService } from './product.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller('product')
export class ProductController {
    constructor(
        private readonly productService: ProductService,
        @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy
    ) { }

    @Get('/all')
    async GetProducts() {
        return await this.productService.GetProducts();
    }

    @Get('/:id')
    async GetProduct(@Param('id', ParseIntPipe) id: number) {
        return await this.productService.GetProduct(id);
    }

    @Post('/new')
    async AddProduct(@Body() product: any) {
        const newProduct = await this.productService.AddProduct(product);
        this.client.emit('product_created', newProduct);
        return await newProduct;
    }

    @Post('/like/:id')
    async UpdateLike(@Param('id', ParseIntPipe) id: number){
        const updatedLike = await this.productService.UpdateLike(id);
        if(updatedLike){
            const retriveProduct = await this.productService.GetProduct(id);
            this.client.emit('like_updated', retriveProduct);
            return retriveProduct;
        }
    }

    @Put('/update/:id')
    async UpdateProduct(@Param('id', ParseIntPipe) id: number, @Body() product: any) {
        const updatedProduct = await this.productService.UpdateProduct(id, product);
        if(updatedProduct){
            const retriveProduct = await this.productService.GetProduct(id);
            this.client.emit('product_updated', retriveProduct);
            return retriveProduct;
        }
        return {error: "not updated"}
    }

    @Delete(':id')
    async DeleteProduct(@Param('id', ParseIntPipe) id: number) {
        const res = await this.productService.DeleteProduct(id);
        this.client.emit('product_deleted', id);
        return res;
    }
}
