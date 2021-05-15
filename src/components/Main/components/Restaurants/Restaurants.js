import React, { Component } from 'react';
import Restaurant from './components/restaurant';

export class Restaurants extends Component {
  render() {
    return (
      <div className='restaurants-section'>
        <h3>Top 20 Restaurants in {this.props.name.split(', ')[0]}</h3>
        <div className='restaurants-container'>
          {this.props.apiData.data.map((restaurant, idx) =>
            <Restaurant
              key={idx}
              name={restaurant.name}
              img={restaurant.img}
              url={restaurant.url}
              rating={restaurant.rating}
              type={restaurant.food}
            />
          )
          }
        </div>
      </div>
    );
  }
}

export default Restaurants;
