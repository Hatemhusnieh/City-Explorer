import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';


export class Forecast extends Component {
  render(){
    return (
      <div className='info-card'>{
        this.props.apiData.map((elm, idx) => {
          return(
            <Card border="primary" bg='info' text='white' style={{ width: '18rem' }} key={idx}>
              <Card.Header>{this.props.name.split(', ')[0].toUpperCase()}</Card.Header>
              <Card.Body>
                <Card.Title>Forecast ON :</Card.Title>
                <Card.Text>
                  {elm.date}
                </Card.Text>
                <Card.Text>
                  {elm.description}
                </Card.Text>
              </Card.Body>
            </Card>);
        }
        )}
      </div>
    );
  }
}

export default Forecast;

