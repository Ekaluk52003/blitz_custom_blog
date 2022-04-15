import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCategoriesBlogs from "app/categories/queries/getCategoriesBlog"
import dayjs from "dayjs"
export const ListBlogsWithCat = () => {
  const categoryName = useParam("categoryName", "string")
  const [blogs] = useQuery(getCategoriesBlogs, { categories: categoryName })

  return (
    <>
      <div className="pt-6 pb-8 space-y-2 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          TAG :{categoryName}
        </h1>
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
                            {blog.categories.map((t) => (
                              <Link
                                key={t.id}
                                href={Routes.CategoriesNamePage({ categoryName: t.name })}
                              >
                                <a
                                  key={t.id}
                                  className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                                >
                                  {t.name}
                                </a>
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
    </>
  )
}

const CategoriesNamePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ListBlogsWithCat />
      </Suspense>
    </div>
  )
}

CategoriesNamePage.authenticate = true
CategoriesNamePage.getLayout = (page) => <Layout>{page}</Layout>

export default CategoriesNamePage
