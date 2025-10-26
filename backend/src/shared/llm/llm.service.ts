import { Injectable } from '@nestjs/common';

import { z as zod } from 'zod';

import { answerMessageSchema, suggestCartsSchema } from './schemas';

export type IAnswerMessage = zod.infer<typeof answerMessageSchema>;
export type ISuggestCarts = zod.infer<typeof suggestCartsSchema>;

@Injectable()
export abstract class LlmService {
  abstract suggestCarts(
    relevantProductsByStore: {
      store_id: number;
      products: {
        id: number;
        name: string;
        price: number;
        similarity: number;
      }[];
    }[],
    input: string,
  ): Promise<(ISuggestCarts & { responseId: string }) | null>;

  abstract batchEmbedProducts(
    products: { id: number; name: string }[],
  ): Promise<void>;

  abstract embedInput(input: string): Promise<{ embedding: number[] } | null>;

  // WEBHOOK
  abstract handleWebhookEvent(
    rawBody: string,
    headers: Record<string, string>,
  ): Promise<{ productId: string; embedding: number[] }[] | null>;

  abstract answerMessage(
    message: string,
    previousMessageId: string | null,
    previousMessages: { content: string; role: string }[],
  ): Promise<(IAnswerMessage & { responseId: string }) | null>;
}
