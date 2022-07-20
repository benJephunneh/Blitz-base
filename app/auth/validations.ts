import { z } from "zod"

export const name = z.string().transform((str) => str.trim())

export const email = z
  .string()
  .email()
  .transform((str) => str.toLowerCase().trim())

export const role = z.string()

export const password = z
  .string()
  .min(10)
  .max(100)
  .transform((str) => str.trim())

export const Signup = z.object({
  name,
  email,
  password,
  role,
})

export const Login = z.object({
  name,
  password,
})

export const ForgotPassword = z.object({
  name,
})

export const ResetPassword = z
  .object({
    password: password,
    passwordConfirmation: password,
    token: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"], // set the path of the error
  })

export const ChangePassword = z.object({
  currentPassword: z.string(),
  newPassword: password,
})
