import db from "db"

export default async function getCategoriesBlogs(input, {}) {
  const blog = await db.blog.findMany({
    include: {
      categories: true,
    },
    where: {
      categories: {
        some: {
          name: input.categories,
        },
      },
    },
  })

  return blog
}
