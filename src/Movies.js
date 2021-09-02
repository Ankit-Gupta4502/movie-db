import React from "react";
import { useGlobalContext } from "./context";
import { Link } from "react-router-dom";
import SingleMovie from "./SingleMovie";
const url =
  "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";

const Movies = () => {
  const { movies, loading } = useGlobalContext();

  return <section className="movies">
    {movies.map((movie)=>{
      const{imdbID:id,Year:year,Poster:poster,Title:title} = movie
      return <Link to={`/movies/${id}`}key={id} className='movie'>
        <article>
          <img src={poster==='N/A'?url:poster} alt={title} />
          <div className="movie-info">
            <h2 className="title">{title}</h2>
            <p>{year}</p>
          </div>
        </article>
      </Link>
    })}
  </section>;
};

export default Movies;
