import { FieldErrors, UseFormRegister } from "react-hook-form"
import { clsx } from "../../../utils/clsx"
import { PostFormData } from "../types/actions"

interface PostDetailProps {
    errors: FieldErrors<PostFormData>
    register: UseFormRegister<PostFormData>
}
const write_description = "ring-1 ring-gray-300 p-1 w-[300px] rounded-md"

const PostDetail = ({ errors, register }: PostDetailProps) => {
    return (
        <>
            <div className="text-purple-300">
                <>{errors.description && errors.description.message}</>
            </div>
            <textarea
                {...register("description", descriptionValidates)}
                className={clsx(write_description)}
                placeholder="キャプションを入力"
                rows={2}
            ></textarea>
        </>
    )
}
export default PostDetail

const descriptionValidates = {
    maxLength: {
        value: 200,
        message: `200文字以内で入力`,
    },
}
