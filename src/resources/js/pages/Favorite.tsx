import { Link, useParams } from "react-router-dom"
import { clsx } from "../utils/clsx"
import useFavoriteUsers from '../features/Favorite/hooks/useFavoriteUsers'

const favorite_body = "w-full flex flex-col items-center space-y-3 p-3"
const favorite_users_section = "flex flex-row p-3 items-center space-x-5 bg-gray-100 w-[50%] rounded-xl"

const Favorite = () => {
    const { id } = useParams()
    const favoriteUsersData = useFavoriteUsers(id)
    return (
        <div className={clsx(favorite_body)}>
            {!favoriteUsersData && <div>ローディング中...</div>}
            {favoriteUsersData && !favoriteUsersData.length &&
                <div>いいねしたユーザーがいません</div>}
            {favoriteUsersData?.map((user) => (
                <Link to={`/user/${user.id}`} key={user.id} className={clsx(favorite_users_section)}>
                    <img src={user.img_src} className="h-20 w-20 rounded-full"></img>
                    <div className="">{user.name}</div>
                </Link>
            ))}
        </div>
    )
}
export default Favorite