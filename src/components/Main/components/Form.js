import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export class queryForm extends React.Component {

  callLocation = (e)=>{
    this.props.getLocation(e);
  }
  callUpdateLocation = (e)=>{
    // console.log(e.target.value);
    this.props.updateLocation(e);
  }

  render() {
    return (
      <div className={'search-bar'}>
        <Form onSubmit={this.callLocation}>
          <Form.Group controlId="formBasicEmail">
            <Form.Control onChange={this.callUpdateLocation} type="text" placeholder="Enter a Location" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Explore
          </Button>
        </Form>
      </div>
    );
  }
}

export default queryForm;

