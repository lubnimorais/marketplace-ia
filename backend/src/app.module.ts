import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { CatalogModule } from './catalog/catalog.module';
import { ConfigModule } from '@nestjs/config';
import { CartModule } from './cart/cart.module';
import { ChatModule } from './chat/chat.module';
import { WebhooksController } from './webkook.controller';
import { RawBodyMiddleware } from './middlewares/raw-body.middleware';
import { JsonBodyMiddleware } from './middlewares/json-body.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CatalogModule,
    CartModule,
    ChatModule,
  ],
  controllers: [WebhooksController],
  providers: [],
})
export class AppModule {
  // CONFIGURANGO MIDDLEWARE
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(RawBodyMiddleware)
      .forRoutes({
        path: '/webhooks/openai',
        method: RequestMethod.POST,
      })
      .apply(JsonBodyMiddleware)
      .forRoutes('*');
  }
}
