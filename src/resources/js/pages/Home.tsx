import { useEffect, useState } from "react"
import { clsx } from "../utils/clsx"

import AxiosApiClient from "../utils/axios"
import PostItem from '../features/Home/components/PostItem'
import { FetchHomeData, FetchPostData } from '../features/Home/types/action'
import PaginateButton from '../features/Home/components/PaginateButton'

const apiClient = new AxiosApiClient()

const Home = () => {
  const [page, setPage] = useState<number>(1)
  const [lastPage, setLastPage] = useState(1)
  const [postData, setPostData] = useState<FetchPostData[]>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    apiClient
      .get<FetchHomeData>(`post/home?page=${page}`)
      .then((response) => {
        if (response.data) {
          setPostData(response.data)
          setLastPage(response.last_page)
          return setIsLoading(false)
        }
        return setIsLoading(false)
      })
      .catch((error) => {
        apiClient.handleError(error)
      })
  }, [page])

  return (
    <div className="flex flex-col items-center">
      {isLoading && <div className="h-screen p-5">ローディング中...</div>}
      {!isLoading && !postData?.length && <div className="h-screen p-5">投稿がありません</div>}
      {postData?.map(post => (
        <PostItem key={post.id} post={post} />
      ))}
      <PaginateButton
        page={page}
        lastPage={lastPage}
        setIsLoading={setIsLoading}
        setPage={setPage}
      />
    </div>
  )
}
export default Home