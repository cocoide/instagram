import { useParams } from "react-router-dom"

import UserDetail from '../features/User/components/UserDetail'
import UserPostLists from '../features/User/components/UserPostLists'
import { useUserData } from '../features/User/hooks/useUserData'

const User = () => {
  const { id } = useParams()
  const { img_src, name, favorites, posts } = useUserData(id)

  return (
    <div className="flex flex-col items-center">
      <UserDetail img_src={img_src} name={name} favorites={favorites} />
      <UserPostLists posts={posts} />
    </div>
  )
}
export default User
