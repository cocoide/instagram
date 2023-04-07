import { clsx } from '../../../utils/clsx'
import { UserPostsProps } from '../types/props'

const posts_section = "grid grid-cols-3 lg:grid-cols-4 w-auto md:mx-[20%] gap-1"
const square_image = "overflow-hidden aspect-square outline-1 outline-white hover:scale-[103%] hover:opacity-80 duration-200 rounded-md"

const UserPostLists = ({ posts }: UserPostsProps) => {
    return (
        <div className={clsx(posts_section)}>
            {posts.map(post => (
                <img key={post.id} src={post.img_src} className={clsx(square_image)}></img>
            ))}
        </div>
    )
}
export default UserPostLists