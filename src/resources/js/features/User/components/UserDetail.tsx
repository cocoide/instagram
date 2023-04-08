import { clsx } from '../../../utils/clsx'
import { UserDetailProps } from '../types/props'

const profile_section = "p-3 flex flex-row justify-center items-center space-x-5"
const avatar_loader = "h-20 w-20 animate-pulse bg-gray-200 rounded-full"
const name_loader = "bg-gray-200 animate-pulse h-5 w-20 rounded-md"

const UserDetail = ({ img_src, name, favorites }: UserDetailProps) => {
    return (
        <>
            <div className={clsx(profile_section)}>
                {img_src ? (
                    <img src={img_src} className="h-20 w-20 ring-1 ring-gray-300 rounded-full"></img>
                ) : (
                    <div className={clsx(avatar_loader)}></div>
                )}
                {name ? (
                    <div className="text-gray-500 text-xl font-bold"
                    >{name}</div>
                ) : (
                    <div className={clsx(name_loader)}></div>
                )}
                <div className="text-gray-500 text-xl"
                >❤️ {favorites.length}</div>
            </div>
        </>
    )
}
export default UserDetail