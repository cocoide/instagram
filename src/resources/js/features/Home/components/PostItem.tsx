import { clsx } from "../../../utils/clsx"

import { Link } from "react-router-dom"
import { useRecoilValue } from "recoil"

import { loginSelector } from '../../../stores/recoil'
import { FetchPostData } from '../types/action'
import usePostItem from '../hooks/usePostItem'

const post_body = "bg-gray-50 rounded-xl shadow-sm p-8 m-5 flex flex-col space-y-5 items-center w-[500px]"
const post_footer = "flex flex-row items-center justify-between w-full"
const favorite_section = "flex flex-col items-center"
const image_loader = "bg-gray-200 mx-auto w-[300px] aspect-square animate-pulse"
const delete_button = "whitespace-nowrap bg-gray-300 p-1 rounded-xl text-white"
const post_header = "flex flex-row items-center justify-between w-full"

function PostItem({ post }: { post: FetchPostData }) {
    const { id, isLogin } = useRecoilValue(loginSelector)
    const { isFavorite, isDeleting, handleDeletePost, handleFavorite, howFavorited } = usePostItem(post, id)

    return (
        <>
            <div className={clsx(post_body)}>
                <div className={clsx(post_header)}>
                    <Link to={`/user/${post.author_id}`} className="flex flex-row items-center space-x-3">
                        <img src={post.author.img_src} className="h-8 w-8 rounded-full ring-1 ring-gray-300" />
                        <div> {post.author.name}</div>
                    </Link>
                    <div>
                        {id == post.author_id && (
                            <button
                                onClick={() => handleDeletePost(post.id)}
                                className={clsx(delete_button)}
                                disabled={isDeleting || !isLogin}
                            >
                                投稿を削除
                            </button>
                        )}
                    </div>
                </div>
                {post.img_src ? (
                    <img src={post.img_src} className="mx-auto w-[300px] aspect-square" />
                ) : (
                    <div className={clsx(image_loader)} />
                )}
                <div className={clsx(post_footer)}>
                    <div className="">{post.description}</div>
                    <div className={clsx(favorite_section)}>
                        <button onClick={() => handleFavorite()}>
                            <div>
                                {" "}
                                {isFavorite ? <>★</> : <>☆</>}
                                {howFavorited}
                            </div>
                        </button>
                        <Link to={`/favorite/${post.id}`} className="text-sm">
                            いいねしたユーザー
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostItem