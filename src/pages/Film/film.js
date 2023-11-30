import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../../services/api";
import "./film.css";

function Film() {
    const { id } = useParams();
    const [film, setFilm] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        (async function loadFilm() {
            await api
                .get(`/movie/${id}`, {
                    params: {
                        api_key: "45fe8a13e5a3f180e0a1f826ccbe168b",
                        language: "pt-br"
                    }
                })
                .then((response) => {
                    setFilm(response.data);
                    setLoading(false);
                })
                .catch(() => {
                    console.log("FILME NAO ENCONTRADO");
                    navigate("/", { replace: true });
                    return;
                });
        })();

        return () => {
            console.log("COMPONENTE FOI DESMONTADO");
        };
    }, [navigate, id]);

    function salvarFilme() {
        const listaFilms = localStorage.getItem("@flickfolio");

        let filmesSalvos = JSON.parse(listaFilms) || [];

        const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === film.id);

        if (hasFilme) {
            toast.warn("Esse filme já está na sua lista!");
            return;
        }

        filmesSalvos.push(film);
        localStorage.setItem("@flickfolio", JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso!");
    }

    if (loading) {
        return (
            <div className="film-info">
                <h1>Carregando detalhes...</h1>
            </div>
        );
    }
    return (
        <div className="film">
            <h1>{film.title}</h1>
            <div className="film-info">
                
                <div className="image">
                    <img src={`https://image.tmdb.org/t/p/original/${film.backdrop_path}`} alt={film.title} />
                </div>

                <div className="content">
                    <h3>Sinopse</h3>
                    <span>{film.overview}</span>

                    <strong>Avalição: {film.vote_average} / 10</strong>

                    <div className="area-buttons">
                        <button onClick={salvarFilme}>Salvar</button>
                        <button>
                            <a target="blank" rel="externo" href={`https://youtube.com/results?search_query=${film.title} Trailer`}>
                                {" "}
                            </a>
                            Trailer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Film;
