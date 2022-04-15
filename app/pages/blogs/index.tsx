import { Suspense } from "react"
import dayjs from "dayjs"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getBlogs from "app/blogs/queries/getBlogs"
import getBlogsAndTag from "app/blogs/queries/getBlogsAndTag"

const ITEMS_PER_PAGE = 2

export const BlogsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ blogs, hasMore }] = usePaginatedQuery(getBlogsAndTag, {
    orderBy: { createdAt: "desc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <>
      <div className="pt-6 pb-8 space-y-2 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          All Blog
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">Read our blogs</p>
      </div>
      <div className="container">
        <main>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {blogs.map((blog) => (
              <li key={blog.id} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        {/* August 7, 2021 */}
                        <time dateTime="2021-08-07T15:32:14.000Z">
                          {dayjs(blog.updatedAt).format("MMMM DD, YYYY")}
                        </time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link href={Routes.ShowBlogPageWithSlug({ slug: blog.slug })}>
                              <a
                                className="text-gray-900 dark:text-gray-100"
                                href="/blog/new-features-in-v1"
                              >
                                {blog.title}
                              </a>
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {blog.categories.map((t, index) => (
                              <Link
                                key={index}
                                href={Routes.CategoriesNamePage({ categoryName: t.name })}
                              >
                                {t.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                        <div className="prose text-gray-500 max-w-none dark:text-gray-400">
                          <div
                            dangerouslySetInnerHTML={{ __html: blog.content.substring(0, 200) }}
                          />
                          .....
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link href={Routes.ShowBlogPageWithSlug({ slug: blog.slug })}>
                          <a
                            className="text-primary"
                            aria-label='Read "New features in v1"'
                            href="/blog/new-features-in-v1"
                          >
                            Read more →
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </main>
      </div>

      <div className="flex justify-center">
        <button
          disabled={page === 0}
          className="px-4 py-2 text-white rounded-md"
          onClick={goToPreviousPage}
        >
          ⟵ Previous
        </button>

        <button disabled={!hasMore} onClick={goToNextPage} className="disabled:text-white">
          Next ⟶
        </button>
      </div>
    </>
  )
}

const BlogsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Blogs</title>
      </Head>

      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <BlogsList />
        </Suspense>
      </div>
    </>
  )
}

BlogsPage.getLayout = (page) => <Layout>{page}</Layout>

export default BlogsPage
