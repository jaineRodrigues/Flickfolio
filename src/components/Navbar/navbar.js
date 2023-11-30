import './navbar.css';
import { Link } from 'react-router-dom'; //para usar link

function navbar() {
    return (
        <header>
            <Link className="logo" to="/">Flick folio</Link>
            <Link className="favoritos" to="/favoritos">Meus filmes</Link>
        </header>
    );
}

export default navbar;
