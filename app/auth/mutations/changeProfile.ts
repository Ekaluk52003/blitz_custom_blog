import db from "db"
import * as z from "zod"
import { Ctx, SecurePassword } from "blitz"

const updateProfileProp = z.object({
  name: z.string(),
  profile: z.string(),
  email: z
    .string()
    .email()
    .transform((str) => str.toLowerCase().trim()),
  password: z.string().nullish(),
  avatar: z.string(),
})

export default async function changeProfile(input: z.infer<typeof updateProfileProp>, ctx: Ctx) {
  const data = updateProfileProp.parse(input)
  ctx.session.$authorize()

  if (input.password) {
    const hashedPassword = await SecurePassword.hash(data.password)

    const updatedProfile = await db.user.update({
      where: {
        id: ctx.session.userId,
      },
      data: {
        profile: data.profile,
        name: data.name,
        email: data.email,
        avatar: data.avatar,
        hashedPassword,
      },
    })
    return updatedProfile
  }
  await db.user.update({
    where: {
      id: ctx.session.userId,
    },
    data: {
      profile: data.profile,
      name: data.name,
      email: data.email,
      avatar: data.avatar,
    },
  })
  return
}
