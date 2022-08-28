import { Suspense } from "react"
import { Routes, useMutation, useParam, useQuery } from "blitz"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"

import Layout from "app/core/layouts/Layout"
import getCustomer from "app/customers/queries/getCustomer"
import deleteCustomer from "app/customers/mutations/deleteCustomer"

export const Customer = () => {
  const router = useRouter()
  const customerId = useParam("customerId", "number")
  const [deleteCustomerMutation] = useMutation(deleteCustomer)
  const [customer] = useQuery(getCustomer, { id: customerId })

  return (
    <>
      <Head>
        <title>Customer {customer.id}</title>
      </Head>

      <div>
        <h1>Customer {customer.id}</h1>
        <pre>{JSON.stringify(customer, null, 2)}</pre>

        <Link href={Routes.EditCustomerPage({ customerId: customer.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteCustomerMutation({ id: customer.id })
              router.push(Routes.CustomersPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowCustomerPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.CustomersPage()}>
          <a>Customers</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Customer />
      </Suspense>
    </div>
  )
}

ShowCustomerPage.authenticate = true
ShowCustomerPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowCustomerPage
