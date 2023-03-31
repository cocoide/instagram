import "../css/app.css"
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const container = document.getElementById('index');
const root = createRoot(container!);

root.render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="home" element={<div>home page</div>} />
                <Route path="user" element={<div>user page</div>} />
            </Routes>
        </BrowserRouter>
    </StrictMode >
);
