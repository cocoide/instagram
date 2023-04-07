import { Link } from 'react-router-dom'
import { clsx } from '../../utils/clsx'
import useAuth from '../../hooks/useAuth'
import { loginSelector } from '../../stores/recoil'
import { useRecoilValue } from 'recoil'

const header_body = 'p-2 relative bg-white h-20 border-b border-gray-200 flex flex-row justify-center items-center space-x-10 text-gray-400'
const image_loader = "h-10 w-10 bg-gray-200 rounded-full animate-pulse"

const Header = () => {
  const { isLogin, img_src, name } = useRecoilValue(loginSelector)
  const { logout, isLoading } = useAuth()
  return (
    <div className={clsx(header_body)}>
      {isLoading ?
        <div className="h-8 w-[200px] bg-gray-200 rounded-xl"></div>
        :
        <>
      <Link to="/home">ホーム</Link>
          {/* {isLogin ? <button onClick={() => logout()}>ログアウト</button> : <Link to="/login">ログイン</Link>} */}
          {!isLogin && <Link to="/login">ログイン</Link>}
      <Link to="/post">投稿する</Link>
      {img_src && <img src={img_src} alt={name} className="h-10 w-10 rounded-full  ring-1 ring-gray-300 shadow-sm" />}
      {isLoading && <div className={clsx(image_loader)} />}
        </>
      }
    </div>
  )
}
export default Header
