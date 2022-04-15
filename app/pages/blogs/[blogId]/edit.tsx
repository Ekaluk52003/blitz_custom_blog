import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getBlog from "app/blogs/queries/getBlog"
import updateBlog from "app/blogs/mutations/updateBlog"
import { BlogForm, FORM_ERROR } from "app/blogs/components/BlogForm"
import React, { useState, useCallback, useRef } from "react"

export const EditBlog = () => {
  const router = useRouter()
  const blogId = useParam("blogId", "number")
  const [blog, { setQueryData }] = useQuery(
    getBlog,
    { id: blogId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )

  const [categories, setCategories] = useState(blog.categories)
  const [editor, setEditorEdit] = useState(blog.content)
  const [updateBlogMutation] = useMutation(updateBlog)

  return (
    <>
      <Head>
        <title>Edit Blog</title>
      </Head>

      <div>
        <BlogForm
          submitText="Update Blog"
          initialValues={blog}
          seteditoredit={setEditorEdit}
          content={editor}
          setcategories={setCategories}
          categories={categories}
          onSubmit={async (values) => {
            try {
              const updated = await updateBlogMutation({
                //@ts-ignore
                id: blogId,
                title: values.title,
                content: editor,
                categories: categories,
              })
              //@ts-ignore
              await setQueryData(updated)
              router.push(Routes.ShowBlogPage({ blogId: updated.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditBlogPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditBlog />
      </Suspense>

      <p>
        <Link href={Routes.BlogsPage()}>
          <a>Blogs</a>
        </Link>
      </p>
    </div>
  )
}

EditBlogPage.authenticate = true
EditBlogPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditBlogPage
