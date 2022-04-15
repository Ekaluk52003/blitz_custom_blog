import { Head, ErrorComponent } from "blitz"
import Layout from "app/core/layouts/Layout"
// ------------------------------------------------------
// This page is rendered if a route match is not found
// ------------------------------------------------------
export default function Page404() {
  const statusCode = 404
  const title = "This page could not be found"
  return (
    <>
      <Head>
        <title>
          {statusCode}: {title}
        </title>
      </Head>
      <div className="flex h-screen">
      <div className="m-auto mt-36"><h1 className="text-3xl font-extrabold leading-9 tracking-tight text-center text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">404</h1><p className="text-lg leading-7 text-gray-500 dark:text-gray-400">This page could not be found</p></div>
        {/* <ErrorComponent statusCode={statusCode} title={title} /> */}
      </div>
    </>
  )
}

Page404.getLayout = (page) => <Layout title="Home">{page}</Layout>
