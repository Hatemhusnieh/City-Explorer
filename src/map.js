import React from 'react';

class Map extends React.Component{
  render(){
    if(this.props.display){
      return(
        <div className={'map'}>
          <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.6b8cac5a641e7ec82c6416fef296c376&center=${this.props.lat},${this.props.lon}&zoom=11&size=600x400`} alt=''/>
        </div>
      );
    }else{
      return null;
    }
  }
}

export default Map;
