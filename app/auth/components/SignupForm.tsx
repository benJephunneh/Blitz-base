import { useMutation } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"
import React from "react"
import { useForm } from "react-hook-form"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  // const onSubmit = (data) => console.log(data)

  const onSubmit = async (values) => {
    try {
      await signupMutation(values)
      props.onSuccess?.()
    } catch (error: any) {
      if (error.code === "P2002" && error.meta?.target?.includes("email")) {
        // This error comes from Prisma
        return { email: "This email is already being used" }
      } else if (error.code === "P2002" && error.meta?.target?.includes("name")) {
        return { name: "This username is already being used" }
      } else {
        return { [FORM_ERROR]: error.toString() }
      }
    }
  }
  console.log(errors)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Username" {...register("name", { required: true })} />
      <input
        type="password"
        placeholder="Password"
        {...register("password", { required: true, min: 10 })}
      />
      <input type="email" placeholder="Email" {...register("email", { required: true })} />
      <select {...register("role", { required: true })}>
        <option value="Owner">Owner</option>
        <option value="Admin">Admin</option>
        <option value="Tech">Tech</option>
      </select>

      <input type="submit" />
    </form>
  )
}

/*
export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  return (
    <div>
      <h1>Create an Account</h1>

      <Form
        submitText="Create Account"
        schema={Signup}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            await signupMutation(values)
            props.onSuccess?.()
          } catch (error: any) {
            if (error.code === "P2002" && error.meta?.target?.includes("email")) {
              // This error comes from Prisma
              return { email: "This email is already being used" }
            } else {
              return { [FORM_ERROR]: error.toString() }
            }
          }
        }}
      >
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
      </Form>
    </div>
  )
}
*/

export default SignupForm
