import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetBlogsInput
  extends Pick<Prisma.BlogFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(async ({ where, orderBy, skip = 0, take = 100 }: GetBlogsInput) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const {
    items: blogs,
    hasMore,
    nextPage,
    count,
  } = await paginate({
    skip,
    take,
    count: () => db.blog.count({ where }),
    query: (paginateArgs) =>
      db.blog.findMany({
        include: {
          categories: true,
          author: true,
        },
        ...paginateArgs,
        where,
        orderBy,
      }),
  })

  return {
    blogs,
    nextPage,
    hasMore,
    count,
  }
})
