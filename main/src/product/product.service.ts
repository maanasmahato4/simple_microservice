import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Product, ProductDocument } from './product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name)
        private readonly productModel: Model<ProductDocument>
    ) { }

    async GetProduct(id: number) {
        return await this.productModel.findById(id);
    }

    async GetProducts() {
        return await this.productModel.find();
    }

    async AddProduct(product: any) {
        const newProduct = new this.productModel(product);
        return await newProduct.save();
    }

    async UpdateLike(product: any) {
        return await this.productModel.findOneAndUpdate({ id: product.id }, product);
    }

    async UpdateProduct(product: any) {
        return await this.productModel.findOneAndUpdate({ id: product.id }, product);
    }

    async DeleteProduct(id: number) {
        return await this.productModel.findOneAndDelete({ id });
    }
}