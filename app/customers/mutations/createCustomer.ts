import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateCustomer = z.object({
  firstname: z.string(),
  lastname: z.string(),
})

export default resolver.pipe(resolver.zod(CreateCustomer), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const customer = await db.customer.create({ data: input })

  return customer
})
