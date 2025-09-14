import { Injectable } from '@nestjs/common';
import { PostgresService } from '../shared/postgres.service';

type ICart = {
  id: number;
  user_id: number;
  store_id: number;
  active: boolean;
  created_at: Date;
};

@Injectable()
export class CartService {
  constructor(private readonly postgresService: PostgresService) {}

  async addToCart(userId: number, productId: number, quantity: number) {
    return {
      id: 1,
    };
  }

  async getCart(userId: number) {
    const result = await this.postgresService.client.query<ICart>(
      'SELECT * FROM cart WHERE user_id = $1 AND active - true',
      [userId],
    );

    return result.rows[0] ?? null;
  }
}
