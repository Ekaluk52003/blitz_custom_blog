import { useState, useRef } from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

const ImageUpload = ({
  label = "Image",
  initialImage = null,
  accept = ".png, .jpg, .jpeg, .gif",
  sizeLimit = 10 * 1024 * 1024, // 10MB
  onChangePicture = () => null,
  uploadFileName,
}) => {
  const pictureRef = useRef()

  const [image, setImage] = useState<any>(initialImage)
  const [updatingPicture, setUpdatingPicture] = useState(false)
  const [pictureError, setPictureError] = useState(null)

  const handleOnChangePicture = (e) => {
    const formData = new FormData()

    Array.from(e.target.files).forEach((file) => {
      //@ts-ignore
      formData.append("file", file)
      //my-uploads is cloudinary preset
      formData.append("upload_preset", "my-uploads")
    })

    const file = e.target.files[0]
    const reader = new FileReader()

    const fileName = file?.name?.split(".")?.[0] ?? "New file"

    reader.addEventListener(
      "load",
      async function () {
        try {
          //@ts-ignore
          setImage({ src: reader.result, alt: fileName })
          //@ts-ignore
          await onChangePicture(formData)
        } catch (err) {
        } finally {
          setUpdatingPicture(false)
        }
      },
      false
    )

    if (file) {
      if (file.size <= sizeLimit) {
        setUpdatingPicture(true)
        //@ts-ignore
        setPictureError("")
        reader.readAsDataURL(file)
      } else {
        //@ts-ignore
        setPictureError("File size is exceeding 10MB.")
      }
    }
  }

  const handleOnClickPicture = () => {
    if (pictureRef.current) {
      //@ts-ignore
      pictureRef.current.click()
    }
  }

  return (
    <div className="flex justify-center my-8">
      <button disabled={updatingPicture} onClick={handleOnClickPicture} className="w-28">
        {image?.src ? (
          <div className="">
            <img src={image.src} className="w-20 h-20 rounded-full ring-2 ring-white" />
          </div>
        ) : (
          //Fall back image
          <img src="/media/dfavatar.jpg" className="w-20 h-20 rounded-full ring-2 ring-white" />
        )}

        <input
          //@ts-ignore
          ref={pictureRef}
          type="file"
          name={uploadFileName}
          accept={accept}
          onChange={handleOnChangePicture}
          className="hidden"
        />
      </button>

      {pictureError ? <span className="text-sm text-red-600">{pictureError}</span> : null}
    </div>
  )
}

ImageUpload.propTypes = {
  label: PropTypes.string,
  initialImage: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
  }),
  accept: PropTypes.string,
  sizeLimit: PropTypes.number,
}

export default ImageUpload
