import db from "./index"

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */
const seed = async () => {
  // for (let i = 0; i < 5; i++) {
  //   await db.project.create({ data: { name: "Project " + i } })
  // }

  // const data = await db.blog.create({
  //   data: {
  //     author: "as",
  //     slug: "adsad",
  //     title: "adsdsad",
  //     content: "asdasdasdas",
  //     categories: { create: [{ name: "mongo" }, { name: "prisma" }] },
  //   },
  // })
  // console.log(data)

  // const data = await db.blog.create({
  //   data: {
  //     author: "as",
  //     slug: "adsadssss",
  //     title: "Link 2 relation",
  //     content: "asdasdasdas",
  //     categories: { connect: [{ id: 2 }, { id: 3 }] },
  //   },
  // })
  // console.log(data)

  // const blogT = await db.blog.findMany({
  //   include: {
  //     categories: true,
  //   },
  //   where: {
  //     categories: {
  //       some: {
  //         name: "react",
  //       },
  //     },
  //   },
  // })
  // console.log(blogT)
  const post = await db.blog.findFirst({
    where: {
      id: 23,
    },
  })
  console.log(post?.createdAt)
  const Pre = await db.blog.findFirst({
    where: {

      id: {
        gt: post?.id,
      },
    },
  })
  console.log(Pre)
}

export default seed
