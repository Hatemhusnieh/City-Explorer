import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Map from './map';
import 'bootstrap/dist/css/bootstrap.min.css';
class Main extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      data : '',
      locationName : '',
      display : false
    };
  }

  getLocation = async (e) => {
    e.preventDefault();
    const api = `https://us1.locationiq.com/v1/search.php?key=pk.6b8cac5a641e7ec82c6416fef296c376&q=${this.state.locationName}&format=json`;
    const req = await axios.get(api);

    this.setState({
      data : req.data[0],
      display : true
    });
  }

  updateLocation = (e) => {
    // console.log(e.target.value);
    this.setState({locationName : e.target.value});
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
            Submit
            </Button>
          </Form>
        </div>

        <div className={'location'}>
          <h3>{this.state.data.display_name}</h3>
        </div>

        <Map
          lon={this.state.data.lon}
          lat={this.state.data.lat}
          display={this.state.display}
        />
      </main>
    );
  }
}

export default Main;
