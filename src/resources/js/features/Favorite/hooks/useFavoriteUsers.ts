import { useEffect, useState } from "react";
import AxiosApiClient from '../../../utils/axios';

interface FetchFavoriteUser {
  id: number;
  name: string;
  img_src: string;
}

const useFavoriteUsers = (id: string|undefined) => {
  const [favoriteUsersData, setFavoriteUsersData] = useState<FetchFavoriteUser[]>();

  useEffect(() => {
    const apiClient = new AxiosApiClient();
    apiClient
      .get<FetchFavoriteUser[]>(`/api/favorite/${id}`)
      .then((response) => {
        setFavoriteUsersData(response);
      })
      .catch((error) => {
        apiClient.handleError(error);
      });
  }, [id]);

  return favoriteUsersData
};

export default useFavoriteUsers;