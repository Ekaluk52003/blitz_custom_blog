import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetBlog = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetBlog), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const blog = await db.blog.findFirst({
    where: { id },
    include: {
      categories:true,
      author:true
    },
  })

  if (!blog) throw new NotFoundError()

  return blog
})
