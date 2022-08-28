import { Suspense } from "react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import Layout from "app/core/layouts/Layout"
import getCustomers from "app/customers/queries/getCustomers"
import { usePaginatedQuery, Routes } from "blitz"

const ITEMS_PER_PAGE = 100

export const CustomersList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ customers, hasMore }] = usePaginatedQuery(getCustomers, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>
            <Link href={Routes.ShowCustomerPage({ customerId: customer.id })}>
              <a>{customer.firstname}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const CustomersPage = () => {
  return (
    <Layout>
      <Head>
        <title>Customers</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewCustomerPage()}>
            <a>Create Customer</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <CustomersList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default CustomersPage
