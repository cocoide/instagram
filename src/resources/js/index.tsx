import "../css/app.css"
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import RootLayout from './components/Layouts/RootLayout';
import { DefaultLayout } from './components/Layouts/DefaultLayout';
import Home from './pages/Home';
import User from './pages/User';
import Post from './pages/Post';
import Login from './pages/Login';

const container = document.getElementById('index');
const root = createRoot(container!);

root.render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<RootLayout><Outlet /></RootLayout>}>
                    <Route path='/' element={<DefaultLayout><Outlet /></DefaultLayout>}>
                        <Route path="home" element={<Home />} />
                        <Route path="user" element={<User />} />
                        <Route path="post" element={<Post />} />
                    </Route>
                    <Route path="login" element={<Login />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode >
);
