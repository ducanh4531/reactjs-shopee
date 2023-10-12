import type { signUpSchema } from 'src/utils/schemaRules'
import { z } from 'zod'

// * Sign Up data type
export type FormData = z.infer<typeof signUpSchema>

// * Sign Up body type, Login data type, Login body type or error types
export type Account = Omit<FormData, 'confirm_password'>
