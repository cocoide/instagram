export interface UserDetailProps {
    img_src: string
    name: string
    favorites: []
}

export interface UserPostsProps {
    posts: { img_src: string; id: number }[]
}
