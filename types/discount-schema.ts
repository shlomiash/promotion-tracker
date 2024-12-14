
import {z} from 'zod'

export const DiscountSchema = z.object({
    code: z.string().min(3 , {message:"Code must be at least 3 characters long"}),
    amount: z.coerce.number().min(1).positive(),
    limits: z.coerce.number().min(1).max(1000).positive().optional(),
    expires: z.date().min(new Date()).optional(),
    isFixed : z.boolean().default(true),
    canBeCombined: z.boolean().default(false),
    active: z.boolean().default(false),
    note:z.string().optional()
  });
