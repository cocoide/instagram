import { clsx } from '../utils/clsx'
import useAuth from '../hooks/useAuth'

const login_body = 'w-full h-screen flex items-center justify-center'
const login_button =
  'bg-gray-900 text-white p-2 rounded-md hover:translate-y-0.5 hover:translate-x-0.5 decoration-neutral-500'

const Login = () => {
  const { login, isLoggingIn } = useAuth()
  return (
    <div className={clsx(login_body)}>
      <button onClick={() => login('github')} className={clsx(login_button)}>
        {isLoggingIn ? (
          <div className="flex flex-row items-center">ログイン中...</div>
        ) : (
            <div>ログイン with Github</div>
        )}
      </button>
    </div>
  )
}
export default Login
