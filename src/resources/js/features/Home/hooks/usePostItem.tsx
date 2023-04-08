import { useState, useEffect } from "react"

import { showToast } from "../../../utils/toast"
import AxiosApiClient from "../../../utils/axios"
import { FetchPostData } from '../types/action'

function usePostItem(post: FetchPostData, userId?: number) {
    const [isFavorite, setIsFavorite] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [howFavorited, setHowFavorited] = useState(0)

    function checkFavoritedByUser(post: FetchPostData, user_id?: number): boolean {
        if (!user_id) {
            return false
        }
        return post.favorites.some((favorite) => favorite.user_id === user_id)
    }

    useEffect(() => {
        setIsFavorite(checkFavoritedByUser(post, userId))
        setHowFavorited(post.favorites.length)
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
        if (!userId) {
            return showToast("ログインしてください", "error")
        }

        const apiClient = new AxiosApiClient()
        if (isFavorite) {
            // いいねを解除
            setHowFavorited(howFavorited - 1)
            setIsFavorite(false)
            apiClient
                .delete<void>(`/favorite/${post.id}`)
                .then(() => {
                    return setIsFavorite(false)
                })
                .catch((error) => {
                    apiClient.handleError(error)
                    // APIの処理がうまくいかない場合、UIを元に戻す
                    setHowFavorited(howFavorited + 1)
                    return setIsFavorite(true)
                })
            return
        }
        // いいねを登録
        setHowFavorited(howFavorited + 1)
        setIsFavorite(true)
        apiClient
            .post<void>(`/favorite/${post.id}`)
            .then(() => {
                return setIsFavorite(true)
            })
            .catch((error) => {
                apiClient.handleError(error)
                setHowFavorited(howFavorited - 1)
                return setIsFavorite(false)
            })
        return
    }

    return {
        isDeleting,
        isFavorite,
        handleDeletePost,
        handleFavorite,
        post,
        howFavorited,
    }
}

export default usePostItem