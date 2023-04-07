import { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { authState } from '../stores/recoil'
import { showToast } from '../utils/toast'
import AxiosApiClient from '../utils/axios'
import { useNavigate } from 'react-router-dom'

const apiClient = new AxiosApiClient();

type GetAuthToken = {
  id: number;
  name: string;
  img_src: string;
  isLogin: boolean;
} 

const useAuth = () => {
  const setAuthState = useSetRecoilState(authState({}))
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const login = async (provider: 'github') => {
    showToast("ログイン中", "loading")
    const oAuthRedirectURL = `/auth/${provider}/redirect`
    setIsLoading(true)
    window.location.href = oAuthRedirectURL
  }

  async function logout() {
    showToast("ログアウト中...", "loading")
    await apiClient
      .get<void>(`auth/logout`)
      .then(() => setAuthState({ id: 0, name: "", img_src: "", isLogin: false }))
      .catch((error) => apiClient.handleError(error))
    showToast("ログアウト完了", "success")
    return navigate("login")
  }

  async function handleAuth() {
    setIsLoading(true)
    await apiClient
      .get<GetAuthToken>('/auth/token')
      .then(response => {
        if (response.isLogin) {
          setAuthState(response)
          return setIsLoading(false)
        }
        setAuthState({ id: 0, name: "", img_src: "", isLogin: false })
        return setIsLoading(false)
      })
      .catch((error) => apiClient.handleError(error))
  }

  useEffect(() => {
    const currentpath = window.location.pathname
    switch (currentpath) {
      case "/home":
      case "/post":
      case "/user":
        handleAuth()
        break
      default:
        break
    }
  }, [])

  return { login, logout, isLoading }
}

export default useAuth
