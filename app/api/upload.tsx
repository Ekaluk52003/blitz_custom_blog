// upload file to media folder and resize with sharp
// credit : https://www.bezkoder.com/node-js-upload-resize-multiple-images/
import { getSession, BlitzApiRequest, BlitzApiResponse } from "blitz"
import nc from "next-connect"
import multer from "multer"
import sharp from "sharp"

const multerStorage = multer.memoryStorage()
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true)
  } else {
    cb("Please upload only images.", false)
  }
}
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
})

const apiRoute = nc({
  onError(error, req, res) {
    //@ts-ignore
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` })
  },
  onNoMatch(req, res) {
    //@ts-ignore
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
  },
})

apiRoute.use(upload.single("image"))

apiRoute.post(async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const session = await getSession(req, res)
  if (!session.userId) {
    return res.status(501).json({ error: "only autheticated user to upload image" })
  }
  //@ts-ignore
  const file = req.file
  const filename = file.originalname.replace(/\..+$/, "")
  const newFilename = `resized-${filename}-${Date.now()}.jpeg`

  await sharp(file.buffer)
    .resize({
      width: 100,
      height: 100,
    })
    .toFormat("jpeg", { mozjpeg: true })
    .toFile(`./public/media/${newFilename}`)

  res.json({ imagePath: `/media/${newFilename}` })
})

export default apiRoute

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
}
