import { useEffect, useState } from "react"
import { FetchUserData } from "../types/actions"
import AxiosApiClient from "../../../utils/axios"

export const useUserData = (id: string | undefined) => {
    const [userData, setUserData] = useState<FetchUserData>({
        id: "",
        name: "",
        img_src: "",
        posts: [{ img_src: "", id: 0 }],
        favorites: [],
    })

    useEffect(() => {
        const apiClient = new AxiosApiClient()
        apiClient
            .get<FetchUserData>(`/user/${id}/post`)
            .then((response) => {
                setUserData(response)
            })
            .catch((error) => {
                apiClient.handleError(error)
            })
    }, [id])

    return userData
}
