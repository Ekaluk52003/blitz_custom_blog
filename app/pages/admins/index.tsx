import { Link, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { getSession } from "blitz"
import db from "db"

const AdminPage: BlitzPage = () => {
  return (
    <div className="max-w-md p-8">
      <h1 className="text-3xl font-bold">Setting</h1>

      <p className="my-3 font-bold text-indigo-600">Admin Action</p>
      <ul className="pl-4 text-indigo-900 border-l-2 border-indigo-100">
        <li className="px-4 py-2 rounded-lg ">
          <Link href={Routes.Profile()}>
            <a>Update User Profile</a>
          </Link>
        </li>
        <li className="px-4 py-2 rounded-lg">
          {" "}
          <Link href={Routes.siteInfo()}>
            <a>Site Setting</a>
          </Link>
        </li>

        <li className="px-4 py-2 rounded-lg ">
          {" "}
          <Link href={Routes.NewCategoryPage()}>
            <a>Add Categoties</a>
          </Link>
        </li>
        <li className="pl-12 ">
          {" "}
          <Link href={Routes.CategoriesPage()}>
            <a>All Categoties</a>
          </Link>
        </li>
        <li className="px-4 py-2 rounded-lg ">
          <Link href={Routes.NewBlogPage()}>
            <a>New Blog</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}

// avoid  "flash of invalid content"
export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession(req, res)

  if (!session.userId) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  if (session.userId) {
    const userRole = await db.user.findFirst({
      where: {
        id: session.userId,
      },
    })
    if (userRole?.role !== "ADMIN") {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      }
    }
  }

  return { props: {} }
}

// AdminPage.redirectAuthenticatedTo = ({ session }) => session.role !== "ADMIN" && Routes.Page404()

AdminPage.getLayout = (page) => <Layout title={"Admin"}>{page}</Layout>

export default AdminPage
