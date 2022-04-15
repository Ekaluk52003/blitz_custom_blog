import { Image, Link, BlitzPage, useMutation, Routes, useQuery, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import getBranding from "app/users/queries/getBranding"
import { Suspense } from "react"
import SiteForm from "../../auth/components/SiteForm"
const UserInfo = () => {
  const router = useRouter()
  //@ts-ignore
  const [brand] = useQuery(getBranding, {})

  return (
    <>
      <SiteForm onSuccess={() => router.push(Routes.Home())} />
    </>
  )
}

const siteInfo: BlitzPage = () => {
  return (
    <>
      <div className="pt-6 pb-8 space-y-2 md:space-y-5">
        <Suspense fallback="Loading...">
          <UserInfo />
        </Suspense>
      </div>
    </>
  )
}

siteInfo.authenticate = true
siteInfo.getLayout = (page) => <Layout title="siteInfo ">{page}</Layout>

export default siteInfo
