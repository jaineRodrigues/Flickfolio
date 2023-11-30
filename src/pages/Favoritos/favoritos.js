import './favoritos.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


function Favoritos() {
  const [films, setFilmes] = useState([]);

  useEffect(() => {
    const listaFilmes = localStorage.getItem("@flickfolio");
    setFilmes(JSON.parse(listaFilmes) || []);
  }, []);

  function excluirFilme(id) {
    let filtroFilmes = films.filter((item) => {
      return item.id !== id;
    });

    setFilmes(filtroFilmes);
    localStorage.setItem("@flickfolio", JSON.stringify(filtroFilmes));
    toast.success("Filme removido com sucesso");
  }

  return (
    <div className="my-films">
      <h1>Meus filmes</h1>

      {films.length === 0 && <span>Você não possui nenhum filme salvo :( </span>}

      <ul>
        {films.map((item) => (
          <li key={item.id}>
            <span>{item.title}</span>

            <div>
              <Link to={`/film/${item.id}`}>Ver detalhes</Link>
              <button onClick={() => excluirFilme(item.id)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favoritos;
