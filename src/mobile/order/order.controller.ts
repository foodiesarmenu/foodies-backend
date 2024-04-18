import { Controller } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('Client/Order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {
    
   }
}
