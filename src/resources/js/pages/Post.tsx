import { clsx } from "../utils/clsx"
import { usePostForm } from '../features/Post/hooks/useFormData'
import ImageUploader from '../features/Post/components/ImageUploader'
import PostDetail from '../features/Post/components/PostDetail'

const post_body = "flex flex-col items-center m-10 space-y-5"
const submit_button = "p-2 bg-purple-300 rounded-xl text-white shadow-sm"

const accepted_extensions = ".png, .jpg, .gif"

const Post = () => {
  const {
    errors,
    register,
    onSubmit,
    handleSubmit,
    handleImageChange,
    isSubmitting,
    imgPath,
  } = usePostForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={clsx(post_body)}>
      <ImageUploader
        handleImageChange={handleImageChange}
        accepted_extensions={accepted_extensions}
        img_path={imgPath}
      />
      <PostDetail
        errors={errors}
        register={register}
      />
      <button type="submit" disabled={isSubmitting}
        className={clsx(submit_button)}>
        {isSubmitting ? <>投稿中...</> : <>投稿する</>}
      </button>
    </form>
  )
}
export default Post
