import { ChangeEvent, useState } from "react"
import { useForm } from "react-hook-form"

import { useNavigate } from "react-router-dom"
import AxiosApiClient from '../../../utils/axios';
import { showToast } from '../../../utils/toast';
import { PostFormData } from '../types/actions';

export const usePostForm = () => {
  const [imgPath, setImgPath] = useState("")
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<PostFormData>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const apiClient = new AxiosApiClient()

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
    apiClient
      .post<string>(`/upload/image`, { image: base64Image, extention: extension })
      .then((response) => {
        setImgPath(response)
        setValue("img_src", response)
      })
      .catch((error) => apiClient.handleError(error))
  }

  async function onSubmit(data: PostFormData) {
    setIsSubmitting(true)
    showToast("送信中", "loading")
    apiClient
      .post<PostFormData>(`/post/publish`, data)
      .then(() => {
        reset()
        showToast("投稿の作成に成功", "success")
        navigate("/home")
      })
      .catch((error) => {
        apiClient.handleError(error)
      })
  }

  return {
    imgPath,
    errors,
    register,
    handleSubmit,
    isSubmitting,
    handleImageChange,
    descriptionValidates,
    onSubmit,
  }
}