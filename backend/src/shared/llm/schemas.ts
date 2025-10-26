import { z as zod } from 'zod';

export const answerMessageSchema = zod.object({
  message: zod.string(),
  action: zod.discriminatedUnion('type', [
    zod.object({
      type: zod.literal('send_message'),
    }),

    zod.object({
      type: zod.literal('suggest_carts'),

      payload: zod.object({
        input: zod.string(),
      }),
    }),
  ]),
});

export const suggestCartsSchema = zod.object({
  carts: zod.array(
    zod.object({
      store_id: zod.number(),
      score: zod.number(),
      products: zod.array(
        zod.object({
          id: zod.number(),
          name: zod.string(),
          quantity: zod.number(),
        }),
      ),
    }),
  ),
  response: zod.string(),
});
