import { Order } from "./order";
import { OrderItem } from "./order-item";

export class Purchase {

    // order header
    order!: Order;

    // order details
    orderItems!: OrderItem[];

}
