export interface FetchUserData {
    id: string
    name: string
    img_src: string
    posts: { img_src: string; id: number }[]
    favorites: []
}
