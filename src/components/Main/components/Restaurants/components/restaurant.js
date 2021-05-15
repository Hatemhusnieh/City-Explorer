import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroup';

export class restaurant extends Component {
  render() {
    return (
      <div className='restaurant-container'>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={this.props.img} />
          <Card.Body>
            <Card.Title>{this.props.name}</Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>Food Type : {this.props.type}</ListGroupItem>
            <ListGroupItem>Rating : {this.props.rating}</ListGroupItem>
          </ListGroup>
          <Card.Body>
            <Card.Link href={this.props.url}>Restaurant Site</Card.Link>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default restaurant;
