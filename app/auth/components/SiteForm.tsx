import { AuthenticationError, useMutation, Routes, useQuery, PromiseReturnType } from "blitz"
import React from "react"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import { SiteSetting } from "app/auth/validations"
import getBrading from "app/users/queries/getBranding"
import branding from "app/auth/mutations/branding"

type brandFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof getBrading>) => void
}

export const SiteForm = (props: brandFormProps) => {
  const [brandMutation] = useMutation(branding)
  //@ts-ignore
  const [site] = useQuery(getBrading, {})
  const [checked, setChecked] = React.useState(site?.allowregister)
  const handleChange = () => {
    setChecked(!checked)
  }

  return (
    <div>
      <h1 className="mb-3 text-3xl font-extrabold leading-9 tracking-tight text-center text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
        Site Setting
      </h1>

      <Form
        className="w-full px-8 pt-6 pb-8 mb-4"
        submitText="update site"
        schema={SiteSetting}
        //@ts-ignore
        initialValues={{ sitename: site?.sitename, sitedescription: site?.sitedescription }}
        onSubmit={async (values) => {
          try {
            await brandMutation({
              sitedescription: values.sitedescription,
              sitename: values.sitename,
              //@ts-ignore
              allowregister: checked,
            })
            //@ts-ignore
            props.onSuccess?.()
          } catch (error: any) {
            if (error instanceof AuthenticationError) {
              return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
            } else {
              return {
                [FORM_ERROR]:
                  "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
              }
            }
          }
        }}
      >
        <LabeledTextField name="sitename" label="sitename" placeholder="Email" className="mb-8" />
        <LabeledTextField
          name="sitedescription"
          label="Site Description"
          placeholder="Site Description"
          type="text"
        />
        <label>
          <input type="checkbox" checked={checked} onChange={handleChange} />
          <span className="px-2">Allow user to register themself</span>
        </label>
      </Form>
    </div>
  )
}

export default SiteForm
