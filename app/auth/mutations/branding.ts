import db from "db"
import * as z from "zod"
import { Ctx } from "blitz"

const brandProp = z.object({
  sitename: z.string(),
  sitedescription: z.string(),
  allowregister: z.boolean()
})

export default async function brandSetting(input: z.infer<typeof brandProp>, ctx: Ctx) {
  const data = brandProp.parse(input)
  ctx.session.$authorize()

  const brand = await db.brand.update({
    where: {
      id: 1,
    },
    data: {
      sitename: input.sitename,
      sitedescription: input.sitedescription,
      allowregister:input.allowregister
    },
  })

  // Can do any processing, fetching from other APIs, etc

  return brand
}
