import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
import { Ctx } from "blitz"

const CreateBlog = z.object({
  title: z.string(),
  content: z.string(),
  categories: z.any(),
})

export default resolver.pipe(
  resolver.zod(CreateBlog),
  resolver.authorize(),
  async (input, ctx: Ctx) => {
    const TAG = input.categories.map((item) => {
      const newtag = {}
      newtag["id"] = item.id
      return newtag
    })

    const blog = await db.blog.create({
      data: {
        title: input.title,
        slug: input.title
          .replace(/\s+/g, "-") // Replace spaces with -
          .replace(/[^\u0E00-\u0E7F\w\-]+/g, "") // Remove all non-word chars
          .replace(/\-\-+/g, "-") // Replace multiple - with single -
          .replace(/^-+/, "") // Trim - from start of text
          .replace(/-+$/, ""),
        content: input.content,
        author: {
          connect: {
            //@ts-ignore
            id: ctx.session.userId,
          },
        },
      },
    })

    return blog
  }
)
