import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteBlog = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteBlog), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const blog = await db.blog.deleteMany({ where: { id } })

  return blog
})
