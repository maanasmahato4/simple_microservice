import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type ProductDocument = HydratedDocument<Product>

@Schema()
export class Product {
    @Prop()
    id: number;

    @Prop({type: String, required: true})
    title: string;

    @Prop({type: String, required: true})
    image: string;

    @Prop({type: Number, required: true})
    likes: number
}

export const ProductSchema = SchemaFactory.createForClass(Product);