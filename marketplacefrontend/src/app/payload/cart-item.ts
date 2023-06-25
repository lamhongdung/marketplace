import { Product } from "./product";

// CartItem = each product line of cart
export class CartItem {

    // product id
    id: string | undefined;

    // product description
    name: string | undefined;
    
    imageUrl: string | undefined;
    unitPrice: number | undefined;

    quantity: number;

    constructor(product: Product) {

        this.id = product.id;
        this.name = product.name;
        this.imageUrl = product.imageUrl;
        this.unitPrice = product.unitPrice;

        this.quantity = 1;
        
    }
}