import { clsx } from "../utils/clsx"
import { ChangeEvent, useState } from "react"
import { useForm } from "react-hook-form"
import AxiosApiClient from "../utils/axios"
import { showToast } from "../utils/toast"
import { useNavigate } from "react-router-dom"

const post_body = "flex flex-col items-center m-10 space-y-5"
const upload_section = "bg-gray-200 rounded-md p-1 w-[300px] text-center aspect-square flex items-center justify-center"
const write_description = "ring-1 ring-gray-300 p-1 w-[300px] rounded-md"
const submit_button = "p-2 bg-purple-300 rounded-xl text-white shadow-sm"

const accept_image_type = ".png, .jpg, .gif"
const Post = () => {
  const [imgPath, setImgPath] = useState("")
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const descriptionValidates = {
    maxLength: {
      value: 200,
      message: `200文字以内で入力`,
    },
  }

  async function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const reader = new FileReader()
    const file = e.target?.files![0]
    const fileNameParts = file.name.split(".")
    const fileExtension = fileNameParts[fileNameParts.length - 1]
    reader.onloadend = async () => {
      const base64Image = reader.result as string
      await handleImageSubmit(base64Image, fileExtension)
    }
    reader.readAsDataURL(file)
  }

  function handleImageSubmit(base64Image: string, extension: string) {
    const apiClient = new AxiosApiClient()
    apiClient
      .post<string>(`/upload/image`, { image: base64Image, extention: extension })
      .then((response) => {
        setImgPath(response)
        setValue("img_src", response)
      })
      .catch((error) => apiClient.handleError(error))
  }

  async function onSubmit(data: any) {
    setIsSubmitting(true)
    showToast("送信中", "loading")
    const apiClient = new AxiosApiClient()
    apiClient
      .post<any>(`/post/publish`, data)
      .then(() => {
        reset()
        showToast("投稿の作成に成功", "success")
        navigate("/home")
      })
      .catch((error) => {
        apiClient.handleError(error)
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={clsx(post_body)}>
      <div className="relative">
        <input
          type="file"
          onChange={handleImageChange}
          accept={accept_image_type}
          className="absolute z-10 opacity-0 w-[300px] h-[300px]"
        />
        {imgPath ? (
          <img src={imgPath} className="w-[300px] h-[300px] overflow-hidden"></img>
        ) : (
          <div className={clsx(upload_section)}>写真を選択</div>
        )}
      </div>
      <div className="text-purple-300">
        <>{errors.description && errors.description.message}</>
      </div>
      <textarea
        {...register("description", descriptionValidates)}
        className={clsx(write_description)}
        placeholder="キャプションを入力"
        rows={2}
      ></textarea>
      <button type="submit" disabled={isSubmitting} className={clsx(submit_button)}>
        {isSubmitting ? <>投稿中...</> : <>投稿する</>}
      </button>
    </form>
  )
}
export default Post
