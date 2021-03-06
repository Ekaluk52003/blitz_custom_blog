import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createCategory from "app/categories/mutations/createCategory"
import { CategoryForm, FORM_ERROR } from "app/categories/components/CategoryForm"

const NewCategoryPage: BlitzPage = () => {
  const router = useRouter()
  const [createCategoryMutation] = useMutation(createCategory)

  return (
    <div>
      <h1>Create New Category</h1>

      <CategoryForm
        submitText="Create Category"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateCategory}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const category = await createCategoryMutation(values)
            router.push(Routes.ShowCategoryPage({ categoryId: category.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.CategoriesPage()}>
          <a>Categories</a>
        </Link>
      </p>
    </div>
  )
}

NewCategoryPage.authenticate = true
NewCategoryPage.getLayout = (page) => <Layout title={"Create New Category"}>{page}</Layout>

export default NewCategoryPage
