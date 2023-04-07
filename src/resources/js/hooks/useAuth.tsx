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
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const setAuthState = useSetRecoilState(authState({}))
  const navigate = useNavigate()

  const login = async (provider: 'github') => {
    const oAuthRedirectURL = `/auth/${provider}/redirect`
    setIsLoggingIn(true)
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
    await apiClient
      .get<GetAuthToken>('/auth/token')
      .then(response => {
        if (response.isLogin) {
          console.log(response)
          return setAuthState(response)
        }
        return setAuthState({ id: 0, name: "", img_src: "", isLogin: true })
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

  return { isLoggingIn, login, logout }
}

export default useAuth
