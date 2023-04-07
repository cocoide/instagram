import { useEffect, useState } from "react";
import AxiosApiClient from '../../../utils/axios';
import { FetchHomeData, FetchPostData } from '../types/action';

export const useHomeData = (page: number) => {
    const [postData, setPostData] = useState<FetchPostData[]>([]);
    const [lastPage, setLastPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const apiClient = new AxiosApiClient();
        apiClient.get<FetchHomeData>(`/post/home?page=${page}`)
            .then(response => {
                setPostData(response.data);
                setLastPage(response.last_page);
                return setIsLoading(false)
            })
            .catch((error) => {
                apiClient.handleError(error)
            })
    }, [page]);

    return { postData, lastPage, isLoading, setIsLoading };
}
