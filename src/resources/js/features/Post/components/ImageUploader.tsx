import { clsx } from '../../../utils/clsx'

interface ImageUploaderProps {
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>
    accepted_extensions: string
    img_path: string
}
const upload_section = "bg-gray-200 rounded-md p-1 w-[300px] text-center aspect-square flex items-center justify-center"

const ImageUploader = ({ handleImageChange, accepted_extensions, img_path }: ImageUploaderProps) => {
    return (
        <div className="relative">
            <input
                type="file"
                onChange={handleImageChange}
                accept={accepted_extensions}
                className="absolute z-10 opacity-0 w-[300px] h-[300px]"
            />
            {img_path ? (
                <img src={img_path} className="w-[300px] h-[300px] overflow-hidden"></img>
            ) : (
                <div className={clsx(upload_section)}>写真を選択</div>
            )}
        </div>
    )
}
export default ImageUploader