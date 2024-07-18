import { z } from 'zod'

export const createRestPaginationSchema = <Schema>(x: z.ZodType<Schema>) =>
  z.object({
    metadata: z.object({
      total_items: z.number(),
      items_per_page: z.number(),
      count: z.number(),
      current_page: z.number(),
      last_page: z.number(),
    }),
    items: z.array(x),
  })

export type RestPagination<Item> = z.infer<ReturnType<typeof createRestPaginationSchema<Item>>>
export type RestMetadata = RestPagination<unknown>['metadata']
