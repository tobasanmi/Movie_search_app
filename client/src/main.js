// import React from 'react';
import React, { useState } from 'react'
import { Api_key } from './key';
import MovieCard from './movieCard'; 

export default function Main() {

  const [query, setQuery] = useState('');
const [movies, setMovies] = useState([]);
  const searchMovies = async (e) => {
      e.preventDefault();
      // const query  = 'bad boys';
      const key = Api_key.key;
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${query}&page=1&include_adult=false`;
      try{
        const res = await fetch(url);
        const data = await res.json();
        // console.log('data',data.results);
        setMovies(data.results)

      }catch(err){
        console.error(err);
      }
  }


  return (
    <div>
      <form className = 'form' onSubmit = {searchMovies}>
        <label htmlFor = 'query' className = 'label'> Search For Movies</label>
        <input  className = 'input' type = 'text' placeholder = 'search for a movie' name = 'query'
        value = {query} 
        onChange = {(e) => setQuery(e.target.value)}
        />
        <button type = 'submit' className = 'button'>Search</button>
      </form>
      <div className = 'card-list'>
        {movies.filter(movie => movie.poster_path).map(movie => (
          <MovieCard movie = {movie} key={movie.id}/>
        ))}
      </div>
    </div>
  )
}
