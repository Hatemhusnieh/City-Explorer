import React, { Component } from 'react';
import Movie from './components/Movie';


export class Movies extends Component {
  render(){
    return (
      <div className='movie-section'>
        <h3>Movies Related to {this.props.name.split(', ')[0]}:</h3>
        <div className='movie-container'>
          {this.props.apiData.map((movie, idx) =>
            <Movie
              key={idx}
              src={movie.poster}
              title={movie.title}
              description={movie.overview}
              rating={movie.rating}
              date={movie.releaseDate}
            />
          )
          }
        </div>
      </div>
    );
  }
}

export default Movies;

