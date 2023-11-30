import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar/navbar'
import Home from "./pages/Home/home";
import Film from "./pages/Film/film";
import Error from "./pages/Error/error";
import Favoritos from "./pages/Favoritos/favoritos";

function RoutesApp() {
    return (
        <BrowserRouter>
        <Navbar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/film/:id" element={<Film />} />
                <Route path="/favoritos" element={<Favoritos />} />
                <Route path="*" element={Error} />
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesApp;
