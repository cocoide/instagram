import { clsx } from "../utils/clsx"
import { usePostForm } from '../features/Post/hooks/useFormData'

const post_body = "flex flex-col items-center m-10 space-y-5"
const upload_section = "bg-gray-200 rounded-md p-1 w-[300px] text-center aspect-square flex items-center justify-center"
const write_description = "ring-1 ring-gray-300 p-1 w-[300px] rounded-md"
const submit_button = "p-2 bg-purple-300 rounded-xl text-white shadow-sm"

const accept_image_type = ".png, .jpg, .gif"

const Post = () => {
  const {
    imgPath,
    errors,
    register,
    handleSubmit,
    isSubmitting,
    handleImageChange,
    descriptionValidates,
    onSubmit,
  } = usePostForm()

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
