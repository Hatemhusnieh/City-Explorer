import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Form from './components/Form';
import Map from './components/map';
import Forecast from './components/Forecast/Forecast';
import Errors from './components/Errors';
import Movies from './components/Movies/Movies';


class Main extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      data : '',
      locationName : '',
      weatherData : '',
      moviesData : '',
      restaurantsData: '',
      isError : false,
      errorType: 0,
      errorMessage : '',
      errorName : ''
    };
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

  getLocation = async (e) =>{
    e.preventDefault();
    try {
      const url = `https://us1.locationiq.com/v1/search.php`;
      const params = {
        key: process.env.REACT_APP_LOCATION_KEY,
        q: this.state.locationName,
        format: 'json'
      };
      const req = await axios.get(url, {params});
      // console.log(req.data);
      this.setState({
        data : req.data[0]
      });

      this.getForecast();
      this.getMovies();
      // this.getRestaurants();
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
    const forecastUrl = `${process.env.REACT_APP_API}/weather`;
    const params = {
      lat: this.state.data.lat,
      lon: this.state.data.lon
    };
    const apiData = await axios.get(forecastUrl, {params});
    // console.log(apiData);
    this.setState({
      weatherData : apiData
    });
  }

  getMovies = async () =>{
    const moviesUrl = `${process.env.REACT_APP_API}/movies`;
    const params = {
      query: this.state.locationName
    };
    const apiData = await axios.get(moviesUrl, {params});
    // console.log(apiData);
    this.setState({
      moviesData : apiData,
      isError : false,
      errorType : 0
    });
  }

  getRestaurants = async ()=>{
    const restaurantsUrl = `${process.env.REACT_APP_API}/restaurants?term=term&location=${this.state.locationName}`;
    const apiData = await axios.get(restaurantsUrl,{
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    });
    console.log(apiData);
    this.setState({
      restaurantsData : apiData,
      isError : false,
      errorType : 0
    });
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
