import { Link } from 'react-router-dom'
import { clsx } from '../../utils/clsx'

const header_body = "bg-white h-15 border-b border-gray-200 flex flex-row justify-center p-3 space-x-10 text-gray-400"

const Header = () => {
    return (
        <div className={clsx(header_body)}>
            <Link to="/home">ホーム</Link>

            <Link to="/login">ログイン</Link>

            <Link to="/post">投稿</Link>
        </div>
    )
}
export default Header