export interface FetchHomeData {
  data: FetchPostData[]
  last_page: number
}

export interface FetchPostData {
    id: number
    author_id: number
    description?: string
    img_src?: string
    author: {
      name: string
      img_src: string
    }
    favorites: {
      user_id: number
    }[]
  }