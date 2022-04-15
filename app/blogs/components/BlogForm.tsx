import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"
import EditorToolbar, { modules, formats } from "./EditorToolbar"
import dynamic from "next/dynamic"
import React, { useCallback, useRef, useState, Suspense } from "react"
import ReactTags from "react-tag-autocomplete"
import getCategories from "app/categories/queries/getCategories"
import { useQuery } from "blitz"
import "highlight.js/styles/atom-one-light.css"

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})

export const CategoriesList = ({ setCat, categories }) => {
  const [querycategories] = useQuery(getCategories, {})

  const [tags, setTags] = useState([])

  const [suggestions, setSuggestions] = useState(querycategories.categories)

  const reactTags = useRef()

  const onDelete = useCallback(
    (tagIndex) => {
      setTags(tags.filter((_, i) => i !== tagIndex))
      setCat(categories.filter((_, i) => i !== tagIndex))
    },
    [tags]
  )

  const onAddition = useCallback(
    (newTag) => {
      const names = tags.map(({ name }) => name)
      //@ts-ignore
      if (!names.includes(newTag.name)) {
        //@ts-ignore
        setTags([...tags, newTag])
        setCat([...categories, newTag])
      }
    },
    [tags]
  )

  return (
    <>
      <ReactTags
        ref={reactTags}
        tags={categories ? categories : tags}
        suggestions={suggestions}
        onDelete={onDelete}
        onAddition={onAddition}
      />
    </>
  )
}

export function BlogForm<S extends z.ZodType<any, any>>({
  seteditoredit,
  setcategories,
  ...props
}) {
  return (
    <>
      {/*
 // @ts-ignore */}
      <Form<S> {...props}>
        <LabeledTextField name="title" label="Title" placeholder="title" />
        <EditorToolbar />
        <QuillNoSSRWrapper
          id="scrolling-container"
          theme="snow"
          modules={modules}
          value={props.content ? props.content : props.editor}
          formats={formats}
          onChange={props.setEditor ? props.setEditor : seteditoredit}
        />
        <div className="py-12">
          <p> Type and press enter</p>
          <Suspense fallback={<div>Loading...</div>}>
            <CategoriesList setCat={setcategories} categories={props.categories} />
          </Suspense>
        </div>
      </Form>
    </>
  )
}
