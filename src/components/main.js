import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
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
      display : false,
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
      // console.log(this.state.locationName);
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
          display : false,
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
          display : false,
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
    // console.log(apiData.data);
  }

  getMovies = async () =>{
    const moviesUrl = `${process.env.REACT_APP_API}/movies?query=${this.state.locationName}`;
    const apiData = await axios.get(moviesUrl);
    console.log(apiData);
    this.setState({
      moviesData : apiData,
      display : true,
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
        // errorType : 1,
        isError : true,
        // data : '',
        // apiData : '',
        locationName : '',
        // display : false
      });
    }
  }


  render() {
    return (
      <main>
        <div className={'search-bar'}>
          <Form onSubmit = {this.getLocation}>
            <Form.Group controlId="formBasicEmail">
              <Form.Control onChange={this.updateLocation} type="text" placeholder="Enter a Location" />
            </Form.Group>

            <Button variant="primary" type="submit">
            Explore
            </Button>
          </Form>
        </div>

        {this.state.isError&&
          <Errors
            errorName={this.state.errorName}
            errorMessage={this.state.errorMessage}
          />
        }
        {this.state.display&&
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
