import Link from "next/link"
import { useRouter } from "next/router"
import Layout from "app/core/layouts/Layout"
import createCustomer from "app/customers/mutations/createCustomer"
import { CustomerForm, FORM_ERROR } from "app/customers/components/CustomerForm"
import { Routes, useMutation } from "blitz"

const NewCustomerPage = () => {
  const router = useRouter()
  const [createCustomerMutation] = useMutation(createCustomer)

  return (
    <Layout title={"Create New Customer"}>
      <h1>Create New Customer</h1>

      <CustomerForm
        submitText="Create Customer"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateCustomer}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const customer = await createCustomerMutation(values)
            router.push(Routes.ShowCustomerPage({ customerId: customer.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.CustomersPage()}>
          <a>Customers</a>
        </Link>
      </p>
    </Layout>
  )
}

NewCustomerPage.authenticate = true

export default NewCustomerPage
