import { resolver, SecurePassword, AuthorizationError } from "blitz"
import db from "db"
import { Signup } from "app/auth/validations"
import { Role } from "types"

export default resolver.pipe(resolver.zod(Signup), async ({ email, password }, ctx) => {
  const hashedPassword = await SecurePassword.hash(password.trim())
  const firstUser = await db.user.findMany()
  if (firstUser.length < 1) {
    await db.brand.create({
      data: {
        allowregister: false,
        sitedescription: "Please update site description",
        sitename: "Please update site name",
      },
    })
    const user = await db.user.create({
      data: {
        email: email.toLowerCase().trim(),
        hashedPassword,
        //Fist user will assign ADMIN role
        role: "ADMIN",
      },
      select: { id: true, name: true, email: true, role: true },
    })
    await ctx.session.$create({ userId: user.id, role: user.role as Role })
    return user
  }

  const brand = await db.brand.findFirst({
    where: {
      allowregister: true,
    },
  })

  if (!brand?.allowregister) {
    throw new AuthorizationError()
  }

  const user = await db.user.create({
    data: {
      email: email.toLowerCase().trim(),
      hashedPassword,
      //Fist user will assign ADMIN role
      role: "USER",
    },
    select: { id: true, name: true, email: true, role: true },
  })

  await ctx.session.$create({ userId: user.id, role: user.role as Role })
  return user
})
