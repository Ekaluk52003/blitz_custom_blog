import { Head, BlitzLayout } from "blitz"
import Footer from "./Footer"
import Header from "./Header"

const Layout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || "blitz-blog"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-3xl px-4 mx-auto sm:px-6 xl:max-w-5xl xl:px-0">
        <Header />
        {children}
        <Footer />
      </div>
    </>
  )
}

export default Layout
