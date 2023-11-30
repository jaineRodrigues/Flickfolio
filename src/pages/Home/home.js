import { useEffect, useState } from "react"; //useEffect : busca os dados na api.  useState: ao encontrar os dados os armazena em algum lugar na minha aplicação
import api from "../../services/api";
import { Link } from "react-router-dom";
import "./home.css";

function Home() {
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async function loadFilms() {
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: "45fe8a13e5a3f180e0a1f826ccbe168b",
                    language: "pt-br",
                    page: 1
                }
            });

            // console.log(response);
            setFilms(response.data.results.slice(0, 15));
            setLoading(false);
        })();
    }, []);

    if (loading) {
        return (
            <div className="loading">
                <h2>Carregando filme...</h2>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="row">
                <div className="content">
                    <h3>Conheça os filmes atualmente em cartaz</h3>
                </div>
            </div>

            <div className="list-films">
                {films.map((film) => {
                    return (
                        <article key={film.id}>
                            <strong>{film.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${film.poster_path}`} alt={film.title}></img>
                            <Link to={`/film/${film.id}`}>Acessar</Link>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}

export default Home;
