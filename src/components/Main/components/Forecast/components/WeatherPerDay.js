import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';

export class WeatherPerDay extends Component {
  render() {
    return (
      <div>
        <Card border="primary" bg='info' text='white' style={{ width: '18rem' }} key={this.props.key}>
          <Card.Header>{this.props.name}</Card.Header>
          <Card.Body>
            <Card.Title>Forecast ON :</Card.Title>
            <Card.Text>
              {this.props.date}
            </Card.Text>
            <Card.Text>
              Max Temperature: {this.props.high} C
            </Card.Text>
            <Card.Text>
              Min Temperature: {this.props.low} C
            </Card.Text>
            <Card.Text>
              {this.props.description}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
export default WeatherPerDay;

