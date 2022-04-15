import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getBlog from "app/blogs/queries/getBlog"
import deleteBlog from "app/blogs/mutations/deleteBlog"

export const Blog = () => {
  const router = useRouter()
  const blogId = useParam("blogId", "number")
  const [deleteBlogMutation] = useMutation(deleteBlog)
  const [blog] = useQuery(getBlog, { id: blogId })

  return (
    <>
      <Head>
        <title>Blog {blog.id}</title>
      </Head>

      <div>
        <h1>Blog {blog.id}</h1>
        <pre>{JSON.stringify(blog, null, 2)}</pre>

        <Link href={Routes.EditBlogPage({ blogId: blog.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteBlogMutation({ id: blog.id })
              router.push(Routes.BlogsPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowBlogPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.BlogsPage()}>
          <a>Blogs</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Blog />
      </Suspense>
    </div>
  )
}

ShowBlogPage.authenticate = true
ShowBlogPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowBlogPage
