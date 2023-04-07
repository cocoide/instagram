import { clsx } from "../../../utils/clsx"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useRecoilValue } from "recoil"

import { showToast } from "../../../utils/toast"
import AxiosApiClient from "../../../utils/axios"
import { loginSelector } from '../../../stores/recoil'
import { FetchPostData } from '../types/action'

const post_body = "bg-gray-50 rounded-xl shadow-sm p-8 m-5 flex flex-col space-y-5 items-center w-[500px]"
const post_footer = "flex flex-row items-center justify-between w-full"
const favorite_section = "flex flex-col items-center"
const image_loader = "bg-gray-200 mx-auto w-[300px] aspect-square animate-pulse"
const delete_button = "whitespace-nowrap bg-gray-300 p-1 rounded-xl text-white"

function PostItem({ post }: { post: FetchPostData }) {
    const { id, isLogin } = useRecoilValue(loginSelector)
    const [isFavorite, setIsFavorite] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    function checkFavoritedByUser(post: FetchPostData, user_id: number): boolean {
        return post.favorites.some((favorite) => favorite.user_id === user_id)
    }

    const isPostFavorited = checkFavoritedByUser(post, id)

    useEffect(() => {
        if (isPostFavorited) {
            setIsFavorite(true)
        }
    }, [])

    function handleDeletePost(postId: number) {
        setIsDeleting(true)
        showToast("削除中", "loading")
        const apiClient = new AxiosApiClient()
        apiClient
            .delete<void>(`/post/delete/${postId}`)
            .then(() => {
                showToast("削除完了", "success")
                window.location.reload()
                // 後々、reloadでなくcacheを利用したreftchをSWRで実装したい
            })
            .catch((error) => {
                apiClient.handleError(error)
            })
    }

    function handleFavorite() {
        const apiClient = new AxiosApiClient()
        if (isFavorite) {
            // いいねを解除
            setIsFavorite(false)
            apiClient
                .delete<void>(`/favorite/${post.id}`)
                .then(() => {
                    return setIsFavorite(false)
                })
                .catch((error) => {
                    apiClient.handleError(error)
                    // APIの処理がうまくいかない場合、UIを元に戻す
                    return setIsFavorite(true)
                })
            return
        }
        // いいねを登録
        setIsFavorite(true)
        apiClient
            .post<void>(`/favorite/${post.id}`)
            .then(() => {
                return setIsFavorite(true)
            })
            .catch((error) => {
                apiClient.handleError(error)
                return setIsFavorite(false)
            })
        return
    }

    return (
        <>
            <div className={clsx(post_body)}>
                <div className="flex flex-row items-center justify-between w-full">
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
                                {post.favorites.length}
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