import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroup';

export class Movie extends Component {
  render() {
    return (
      <div className='movie-card'>
        <Card style={{ width: '18rem' }} key={this.props.key}>
          <Card.Img variant="top" src={this.props.src} bsPrefix='card-img' />
          <Card.Body>
            <Card.Title>Title: {this.props.title}</Card.Title>
            <Card.Text>Description: {this.props.description}</Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>Release Date: {this.props.date}</ListGroupItem>
          </ListGroup>
          <ListGroup className="list-group-flush">
            <ListGroupItem>Rating: {this.props.rating}</ListGroupItem>
          </ListGroup>
        </Card>
      </div>
    );
  }
}

export default Movie;
