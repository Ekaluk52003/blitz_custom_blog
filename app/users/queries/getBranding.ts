import db from "db"

export default async function getBranding(_ = null) {
  const brand = await db.brand.findFirst({
    where: { id: 1 },
  })

  return brand
}
