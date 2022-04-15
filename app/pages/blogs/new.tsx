import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import React, { useState, useCallback, useRef } from "react"
import createBlog from "app/blogs/mutations/createBlog"
import { BlogForm, FORM_ERROR } from "app/blogs/components/BlogForm"

const NewBlogPage: BlitzPage = () => {
  const router = useRouter()
  const [createBlogMutation] = useMutation(createBlog)
  const [editor, setEditor] = useState("")
  const [categories, setCategories] = useState([])

  return (
    <div>
      <h1>Create New Blog</h1>
      {/*
 // @ts-ignore */}
      <BlogForm
        setEditor={setEditor}
        editor={editor}
        submitText="Create Blog"
        setCategories={setCategories}
        categories={categories}
        onSubmit={async (values) => {
          try {
            const blog = await createBlogMutation({
              title: values.title,
              content: editor,
              categories: categories,
            })
            router.push(Routes.ShowBlogPage({ blogId: blog.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />
      <p>
        <Link href={Routes.BlogsPage()}>
          <a>Blogs</a>
        </Link>
      </p>
    </div>
  )
}

NewBlogPage.authenticate = true
NewBlogPage.getLayout = (page) => <Layout title={"Create New Blog"}>{page}</Layout>

export default NewBlogPage
