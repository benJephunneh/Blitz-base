import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateCustomer = z.object({
  id: z.number(),
  firstname: z.string(),
  lastname: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateCustomer),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const customer = await db.customer.update({ where: { id }, data })

    return customer
  }
)
