import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"
import { RootLayout } from "../components/Layouts/RootLayout"

import User from "./User"
import Home from "./Home"
import Post from "./Post"
import Login from "./Login"
import DefaultLayout from '../components/Layouts/DefaultLayout'
import Favorite from './Favorite'

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="" element={<RootLayout><Outlet /></RootLayout>}>
                    <Route path="/" element={<DefaultLayout><Outlet /></DefaultLayout>}>
                        <Route path="favorite/:id" element={<Favorite />}></Route>
                        <Route path="user/:id" element={<User />} />
                        <Route path="home" element={<Home />} />
                        <Route path="post" element={<Post />} />
                    </Route>
                    <Route path="login" element={<Login />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
export default Router