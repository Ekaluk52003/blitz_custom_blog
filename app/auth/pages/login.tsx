import { useRouter, BlitzPage, Link, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { LoginForm } from "app/auth/components/LoginForm"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div className="flex mb-8">
      <div className="m-auto">
        <LoginForm
          onSuccess={(_user) => {
            const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
            router.push(next)
          }}
        />

        <Link href={Routes.ForgotPasswordPage()}>Forgot password </Link>
      </div>
    </div>
  )
}

LoginPage.redirectAuthenticatedTo = "/"
LoginPage.getLayout = (page) => <Layout title="Log In">{page}</Layout>

export default LoginPage
