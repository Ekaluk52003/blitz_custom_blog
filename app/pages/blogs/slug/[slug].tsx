import { Suspense } from "react"
import { Loading } from "app/core/components/Loading"
import dayjs from "dayjs"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getSlug from "app/blogs/queries/getSlug"
import Getpre from "app/blogs/queries/getPrepost"
import Getnext from "app/blogs/queries/getNextpost"
import deleteBlog from "app/blogs/mutations/deleteBlog"
import getCurrentUser from "app/users/queries/getCurrentUser"
export const Slug = () => {
  //@ts-ignore
  const [user] = useQuery(getCurrentUser, {})
  const slug = useParam("slug", "string")
  const [deleteBlogMutation] = useMutation(deleteBlog)
  const [blog] = useQuery(getSlug, { slug: slug })
  const [prePost] = useQuery(Getpre, { id: blog.id })
  const [nextPost] = useQuery(Getnext, { id: blog.id })

  return (
    <>
      <Head>
        <title>Title: {blog.title}</title>
      </Head>

      <header className="pt-6 xl:pb-6">
        <div className="space-y-1 text-center">
          <dl className="space-y-10">
            <div>
              <dt className="sr-only">Published on</dt>
              <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                <time className="text-primary">
                  {" "}
                  {dayjs(blog.updatedAt).format("dddd, MMMM DD, YYYY")}
                </time>
              </dd>
            </div>
          </dl>
          <div>
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
              {blog.title}
            </h1>
          </div>
        </div>
      </header>
      <div className="pb-8 divide-y divide-gray-200 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0">
        <dl className="pt-6 pb-10 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
          <dt className="sr-only">Authors</dt>
          <dd>
            <ul className="flex justify-center space-x-8 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
              <li className="flex items-center space-x-2">
                <img
                  //@ts-ignore
                  src={blog.author.avatar}
                  alt="Picture of the author"
                  className="inline-block w-12 h-12 rounded-full ring-2"
                />
                <dl className="text-sm font-medium leading-5 whitespace-nowrap">
                  <dt className="sr-only">Name</dt>
                  <dd className="text-gray-900 dark:text-gray-100">{blog.author.name}</dd>
                  <dd>{blog.author.email}</dd>
                </dl>
              </li>
            </ul>
          </dd>
        </dl>
        {/* content area */}
        <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
          <div className="pt-10 pb-8 prose max-w-none dark:prose-dark">
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>
        </div>
        {/*end content area */}
        <footer>
          <div className="text-sm font-medium leading-5 divide-gray-200 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
            <div className="py-4 xl:py-8">
              <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                About author
              </h2>
              <div className="flex flex-wrap"> {blog.author.profile}</div>
            </div>
            <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
              <div>
                <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                  Previous Article
                </h2>
                <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                  {/*
 // @ts-ignore */}
                  <Link href={Routes.ShowBlogPageWithSlug({ slug: prePost?.slug })}>
                    <a href="/blog/introducing-tailwind-nextjs-starter-blog">{prePost?.title}</a>
                  </Link>
                </div>
              </div>
              <div>
                <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                  Next Article
                </h2>
                <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                  {/*
 // @ts-ignore */}
                  <Link href={Routes.ShowBlogPageWithSlug({ slug: nextPost?.slug })}>
                    <a href="/blog/introducing-tailwind-nextjs-starter-blog">{nextPost?.title}</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="py-4 divide-y divide-blue-200 xl:py-8">
            <h2 className="text-xs font-bold tracking-wide text-gray-500 uppercase dark:text-gray-400">
              TAG
            </h2>

            {blog.categories.map((t) => (
              <Link key={t.id} href={Routes.CategoriesNamePage({ categoryName: t.name })}>
                <a
                  key={t.id}
                  className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  {t.name}
                </a>
              </Link>
            ))}
          </div>
          <div className="pt-4 divide-y divide-gray-200 xl:pt-8">
            <Link href={Routes.BlogsPage()}>
              <a
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                href="/blog"
              >
                ← Back to the blog
              </a>
            </Link>
            <div>
              {user?.role === "ADMIN" && (
                <Link href={Routes.EditBlogPage({ blogId: blog.id })}>
                  <a>Edit</a>
                </Link>
              )}
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

const ShowBlogPageWithSlug: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Slug />
      </Suspense>
    </div>
  )
}

ShowBlogPageWithSlug.getLayout = (page) => <Layout>{page}</Layout>

export default ShowBlogPageWithSlug
