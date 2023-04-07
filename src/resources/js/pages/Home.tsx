import { useState } from "react"

import PostItem from '../features/Home/components/PostItem'
import PaginateButton from '../features/Home/components/PaginateButton'
import { useHomeData } from '../features/Home/hooks/useHomeData'

const Home = () => {
  const [page, setPage] = useState<number>(1)
  const { postData, lastPage, isLoading, setIsLoading } = useHomeData(page);

  return (
    <div className="flex flex-col items-center">
      {isLoading && <div className="h-screen p-5">ローディング中...</div>}
      {!isLoading && !postData?.length &&
        <div className="h-screen p-5">投稿がありません</div>}
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