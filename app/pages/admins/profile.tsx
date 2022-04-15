import { Image, Link, BlitzPage, useMutation, Routes, useQuery, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCurrentUser from "app/users/queries/getCurrentUser"
import ProfileForm from "app/auth/components/ProfileForm"
import { Suspense } from "react"

const UserInfo = () => {
  const router = useRouter()
  //@ts-ignore
  const [profile] = useQuery(getCurrentUser, {})

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl text-center">Update Profile</h1>

      <ProfileForm onSuccess={() => router.push(Routes.Home())} />
    </div>
  )
}

const Profile: BlitzPage = () => {
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

Profile.authenticate = true
Profile.getLayout = (page) => <Layout title="Profile">{page}</Layout>

export default Profile
