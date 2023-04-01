import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { authState } from '../stores/recoil';
import axios from 'axios';

const useAuth = () => {
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const setAuthState = useSetRecoilState(authState({}));

    const login = async (provider: "github") => {
        setIsLoggingIn(true);
        window.location.href = `/oauth/${provider}/redirect`;
    };

    const logout = async () => {

        await axios.get(`auth/logout`)
            .then(response => {
                console.log(response);
                setAuthState({ isLogin: false, user: { id: 0 } });
            })
        window.location.href = "login"
    };

    function handleAuth() {
        axios.get(`/token`)
            .then(response => {
                if (response.data.id) {
                    console.log(response.data);
                    return setAuthState({ isLogin: true, user: { id: response.data.id } });
                }
                setAuthState({ isLogin: false, user: { id: 0 } });
            })
            .then(() => setIsLoggingIn(false));
    }

    useEffect(() => {
        let path = window.location.pathname
        if (path === '/home' || path == 'post' || path == '/user') {
            handleAuth();
        }
    }, []);

    return { isLoggingIn, login, logout };
};

export default useAuth;