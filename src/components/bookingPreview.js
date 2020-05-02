import React, { Component } from "react";
import { connect } from "react-redux";


import { Input, Button } from 'reactstrap';

class BookingPreview extends Component {
  
  render() {
    return (
      <div className="App">
        {/* hello i am nitish
       <Input placeholder= "hii">ddds </Input> */}
        hello
        <Button color="danger" type="submit"> BookingPeview </Button>
        {/* <button onClick={this.simpleAction}>Test redux action</button> */}
        {/* <pre>{JSON.stringify(this.props)}</pre> */}
      </div>
    );
  }
}
export default connect()(BookingPreview);
