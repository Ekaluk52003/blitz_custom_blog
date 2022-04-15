import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const Getnext = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number(),
})

export default resolver.pipe(resolver.zod(Getnext), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const blog = await db.blog.findFirst({
    where: {
      id: {
        gt: id,
      },
    },
  })

  return blog
})
