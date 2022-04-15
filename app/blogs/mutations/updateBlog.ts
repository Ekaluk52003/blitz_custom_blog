import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
import { Ctx } from "blitz"

const UpdateBlog = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  categories: z.any(),
})

export default resolver.pipe(
  resolver.zod(UpdateBlog),
  resolver.authorize(),
  async ({ id, ...data }, ctx: Ctx) => {
    console.log("ID found", id)
    const user = await db.user.findUnique({
      where: {
        //@ts-ignore
        id: ctx.session.userId,
      },
    })
    const TAG = data.categories.map((item) => {
      const newtag = {}
      newtag["id"] = item.id
      return newtag
    })

    await db.blog.update({
      where: { id },
      data: {
        categories: {
          set: [],
        },
      },
    })

    const blog = await db.blog.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.title
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, ""),
        content: data.content,
        categories: {
          connect: TAG,
        },
      },
    })

    return blog
  }
)
