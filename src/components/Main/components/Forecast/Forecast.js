import React, { Component } from 'react';
import WeatherPerDay from './components/WeatherPerDay';


export class Forecast extends Component {
  render(){
    return (
      <div className='info-card'>
        {
          this.props.apiData.map((elm, idx) =>
            <WeatherPerDay
              name={this.props.name.split(', ')[0].toUpperCase()}
              key= {idx}
              date={elm.date}
              description={elm.description}
              high={elm.high}
              low={elm.low}
            />
          )
        }
      </div>
    );
  }
}

export default Forecast;

