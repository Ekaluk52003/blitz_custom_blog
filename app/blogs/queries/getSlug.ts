import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetSlug = z.object({
  // This accepts type of undefined, but is required at runtime
  slug: z.string().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetSlug), async ({ slug }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const blog = await db.blog.findFirst({
    include: {
      categories: true,
      author: true,
    },
    where: { slug: slug },
  })

  if (!blog) throw new NotFoundError()

  return blog
})
