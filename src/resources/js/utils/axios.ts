import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios"
import { showToast } from "./toast"

export interface ApiClient {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>
  post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
  put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>
}

export default class AxiosApiClient implements ApiClient {
  private readonly axiosInstance: AxiosInstance

  constructor(headers?: object) {
    this.axiosInstance = axios.create({
      baseURL: "http://localhost:8080",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        ...headers,
      },
    })
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get(url, config)
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.post(url, data, config)
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.put(url, data, config)
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.delete(url, config)
      return response.data
    } catch (error) {
      throw error
    }
  }

  public handleError(error: AxiosError<any>): Promise<void> {
    const status = error.response?.status

    if (status === 401) {
      window.location.href = "/login"
      return showToast(status + ": " + error.response?.data, "error")
    }

    // 開発用エラーログ
    if (error.response) {
    console.log(error.response.headers);
    console.log(error.response.config)
    console.log(error.response?.data.message)
    }

    if (error.response?.data) {
      return showToast(status + ": " + error.response.data, "error")
    }

    if (error.request) {
      // console.log(error.request)
      return showToast("応答がありません", "error")
    }

    return Promise.resolve()
  }
}
