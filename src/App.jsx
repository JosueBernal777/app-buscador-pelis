import { useState } from "react";

export const App = () => {
  const [busqueda, setBusqueda] = useState("");
  const [peliculas, setPeliculas] = useState([]);
  const urlBase = "https://api.themoviedb.org/3/search/movie";
  const apiKey = "efd7c4b9af30618bb8558dd605b3d0e7";

  const handleInputChange = (e) => {
    setBusqueda(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPeliculas();
  };

  const fetchPeliculas = async () => {
    try {
      const response = await fetch(
        `${urlBase}?query=${busqueda}&api_key=${apiKey}`
      );
      const data = await response.json();
      setPeliculas(data.results);
    } catch (error) {
      console.error("Ocurrio un error", error);
    }
  };
  return (
    <div className="container">
      <h1 className="title">
        <img src="/src/assets/favico.svg" alt="favico" /> Busca Pelis
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ingrese el nombre de la Pelicula."
          name="pelicula"
          value={busqueda}
          onChange={handleInputChange}
        />
        <button className="btn btn-danger" type="submit">
          <img src="/src/assets/search.svg" alt="search" width={"24px"} />
        </button>
      </form>
      <div className="movie-list">
        {peliculas.map((pelicula) => (
          <div key={pelicula.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
              alt={pelicula.title}
            />
            <h2>
              {pelicula.title} <small>({pelicula.release_date})</small>
            </h2>
            <hr />
            <p>{pelicula.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
