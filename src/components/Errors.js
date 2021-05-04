import React, { Component } from 'react';

export class Errors extends Component {
  render() {
    return (
      <div className='errors'>
        <h3> {this.props.errorName} </h3>
        <p>
          {this.props.errorMessage}
        </p>
      </div>
    );
  }
}

export default Errors;

