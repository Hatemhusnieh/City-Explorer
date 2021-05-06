import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Form from './Form';
import Map from './map';
import Forecast from './Forecast';
import Errors from './Errors';
import Movies from './Movies';


class Main extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      data : '',
      locationName : '',
      weatherData : '',
      moviesData : '',
      isError : false,
      errorType: 0,
      errorMessage : '',
      errorName : ''
    };
  }

  getLocation = async (e) =>{
    e.preventDefault();
    try {
      const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_KEY}&q=${this.state.locationName}&format=json`;
      const req = await axios.get(url);

      this.setState({
        data : req.data[0]
      });

      this.getForecast();
      this.getMovies();
    }catch(error){
      console.clear();
      // console.log(error.message);
      if(this.state.locationName){
        this.setState({
          isError : true,
          errorType : 2,
          errorName : error.message,
          errorMessage : 'Please Enter a Valid Country/City Name',
          data : '',
          locationName : '',
          weatherData : ''
        });
      }else{
        this.setState({
          isError : true,
          errorType : 1,
          errorName : error.message,
          errorMessage : 'Please Enter a Country/City before Exploring',
          data : '',
          locationName : '',
          weatherData : ''
        });
      }
    }
  }

  getForecast = async () =>{
    const forecastUrl = `${process.env.REACT_APP_API}/weather?lat=${this.state.data.lat}&lon=${this.state.data.lon}`;
    const apiData = await axios.get(forecastUrl);
    // console.log(apiData);
    this.setState({
      weatherData : apiData
    });
  }

  getMovies = async () =>{
    const moviesUrl = `${process.env.REACT_APP_API}/movies?query=${this.state.locationName}`;
    const apiData = await axios.get(moviesUrl);
    console.log(apiData);
    this.setState({
      moviesData : apiData,
      isError : false,
      errorType : 0
    });
  }

  updateLocation = (e) =>{
    // console.log(e.target.value);
    if(e.target.value){
      this.setState({
        locationName : e.target.value
      });
    }else{
      this.setState({
        isError : true,
        locationName : ''
      });
    }
  }


  render() {
    return (
      <main>
        <Form
          getLocation={this.getLocation}
          updateLocation={this.updateLocation}
        />

        {this.state.isError&&
          <Errors
            errorName={this.state.errorName}
            errorMessage={this.state.errorMessage}
          />
        }
        {this.state.data&&
          <Map
            lon={this.state.data.lon}
            lat={this.state.data.lat}
            name={this.state.data.display_name}
          />}

        {this.state.weatherData&&
        <Forecast
          apiData={this.state.weatherData.data}
          name={this.state.data.display_name}
        />}

        {this.state.moviesData&&
        <Movies
          apiData={this.state.moviesData.data}
          name={this.state.data.display_name}
        />
        }
      </main>
    );
  }
}

export default Main;
