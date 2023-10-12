import z from 'zod'

export const logInSchema = z.object({
  email: z
    .string()
    .min(5, 'Email must contain at least 5 character(s)')
    .max(160, 'Email must not contain more than 160 character(s)')
    .email(),
  password: z
    .string()
    .min(6, 'Password must contain at least 6 character(s)')
    .max(160, 'Password must not contain more than 160 character(s)')
})

export const signUpSchema = logInSchema
  .pick({ email: true, password: true })
  .extend({
    confirm_password: z
      .string()
      .min(6, 'Confirm password must contain at least 6 character(s)')
      .max(160, 'Confirm password must not contain more than 160 character(s)')
  })
  .superRefine(({ password, confirm_password }, ctx) => {
    if (password !== confirm_password) {
      ctx.addIssue({
        code: 'custom',
        message: "Passwords don't match",
        path: ['confirm_password']
      })
    }
  })
