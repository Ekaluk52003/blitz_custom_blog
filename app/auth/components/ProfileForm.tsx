import { useMutation, useQuery } from "blitz"
import { getAntiCSRFToken } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import React from "react"
import { Form, FORM_ERROR } from "app/core/components/Form"
import changeProfile from "app/auth/mutations/changeProfile"
import getCurrentUser from "app/users/queries/getCurrentUser"
import ImageUpload from "./ImageUpload"

type profileFormProps = {
  onSuccess?: () => void
}

export const ProfileForm = (props: profileFormProps) => {
  const [changeProfileMutation] = useMutation(changeProfile)
  //@ts-ignore
  const [profile, { refetch }] = useQuery(getCurrentUser, {})
  const [imageUrl, setImageUrl] = React.useState(profile?.avatar || null)

  const upload = async (formData) => {
    try {
      console.log("hit this", formData)
      // upload to cloudinary
      const data = await fetch(
        //resource https://www.youtube.com/watch?v=7lhUsK-FxYI
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      ).then((r) => r.json())
      console.log(data.secure_url)
      setImageUrl(data.secure_url)
    } catch (e) {
      console.log(e)
      setImageUrl("")
    }
  }

  return (
    <div>
      <ImageUpload
        //@ts-ignore
        initialImage={{ src: imageUrl }}
        uploadFileName="image"
        //@ts-ignore
        onChangePicture={upload}
      />
      <Form
        submitText="Update profile"
        initialValues={{
          name: profile?.name,
          profile: profile?.profile,
          email: profile?.email,
          avatar: profile?.avatar,
          password: "",
        }}
        onSubmit={async (values) => {
          try {
            await changeProfileMutation({
              name: values.name,
              avatar: imageUrl!,
              email: values.email,
              profile: values.profile,
              password: values.password,
            })
            refetch()
            props.onSuccess?.()
          } catch (error: any) {
            return { [FORM_ERROR]: error.toString() }
          }
        }}
      >
        <LabeledTextField name="name" label="Username" placeholder="username" />
        <LabeledTextField name="profile" label="profile" placeholder="profile" type="text" />

        <LabeledTextField name="email" label="Email" placeholder="Email" type="email" />
        <LabeledTextField name="password" label="password" placeholder="password" type="password" />
      </Form>
    </div>
  )
}

export default ProfileForm
