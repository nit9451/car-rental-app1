// import React, { Component } from "react";
// import { connect } from "react-redux";

// import { Input, Button } from "reactstrap";

// class CarList extends Component {
//   render() {
//     return (
//       <div></div>
//     );
//   }
// }
// export default connect()(CarList);

import React, { Component, useState } from "react";
import { MDBIcon, MDBContainer, MDBBtn } from "mdbreact";
import { Row, Col, Badge } from "reactstrap";
import Button from "@material-ui/core/Button";
import { Container, Card } from "@material-ui/core";
import PropTypes from "prop-types";
import { SET_CURRENT_CAR_ACTION } from "../actions/car.action";
import { useSelector, useDispatch } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export default function CarList(props) {
  const [carDetails, setcarDetails] = React.useState(
    useSelector((state) => state.carDetails)
  );

  const [currentCar, setcurrentCarDetails] = React.useState(
    useSelector((state) => state.currentCar)
  );
  const [customerDetails, setcustomerDetails] = React.useState(
    useSelector((state) => state.customerDetails)
  );

  const [bookingClickSuccess, setbookingClickSuccess] = React.useState(false);
  const [backClickSuccess, setbackClickSuccess] = React.useState(false);

  const dispatch = useDispatch();

  const handleGoBacks = () => {
    dispatch(
      SET_CURRENT_CAR_ACTION(
        carDetails,
        () => {
          setbackClickSuccess(true);
        },
        () => {}
      )
    );
  };

  const handleBooking = () => {
    dispatch(
      SET_CURRENT_CAR_ACTION(
        currentCar,
        () => {
          setbookingClickSuccess(true);
        },
        () => {}
      )
    );
  };

  let disable = currentCar.carAvailability ? false : true;
  return (
    <div className="App">
      <div>
        {currentCar && (
          <Container>
            {backClickSuccess && <Redirect to="/" />}
            {bookingClickSuccess && <Redirect to="/carbooking-Form" />}
            <Container>
              <Card>
                <Row>
                  <Col>
                    <img src={currentCar.carImage} class="img-fluid">
                      {}
                    </img>
                  </Col>
                  <div class="my-auto">
                    <Col>
                      <strong>{currentCar.carName}</strong>
                    </Col>
                  </div>
                  <Row>
                    <div class="my-auto">
                      <Col>
                        <span>{currentCar.carColor}</span>
                      </Col>
                    </div>
                    <div class="my-auto">
                      <Col>
                        <span>{currentCar.carSeats}</span>
                      </Col>
                    </div>
                  </Row>{" "}{""}{""}
                  <Row>
                    <div class="my-auto">
                      <Col>
                        <span>Rent Per Day:</span>
                      </Col>
                    </div>
                    <div class="my-auto">
                      <Col>
                        <span>{`₹${currentCar.carRentPrcie}`}</span>
                      </Col>
                    </div>
                  </Row>
                  <Row>
                    <div class="my-auto">
                      <Col>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleBooking()}
                          disabled={disable}
                        >
                          Book Now
                        </Button>
                      </Col>
                    </div>
                    {!currentCar.carAvailability && (
                      <div class="my-auto">
                        <Col>
                          <span style={{ color: "red" }}>
                            Currently Unavailable
                          </span>
                        </Col>
                      </div>
                    )}
                    {currentCar.carAvailability && (
                      <div class="my-auto">
                        <Col>
                          <span style={{ color: "green" }}>Available</span>
                        </Col>
                      </div>
                    )}
                  </Row>
                </Row>
              </Card>
              <br />
              <Card>
                <h2>Car Details</h2>
                <hr></hr>
                <h3>
                  {!currentCar.carAvailability && (
                    <Badge color="secondary">Not Available</Badge>
                  )}
                  {currentCar.carAvailability && (
                    <Badge color="primary">Available</Badge>
                  )}
                </h3>
                <Row>
                  <Col sm={3}>
                    <strong>Vehicle Number:</strong>
                  </Col>
                  <Col sm={3}>
                    <strong>{currentCar.carNumber}</strong>
                  </Col>
                </Row>
                <Row>
                  <Col sm={3}>
                    <strong>{currentCar.carEngineType}</strong>
                  </Col>
                </Row>
                <Row>
                  <Col sm={3}>
                    <strong>{currentCar.carExtraDetails}</strong>
                  </Col>
                  <Col>
                  <p>{currentCar.carDescription}</p>
                  </Col>
                </Row>
              </Card>
              <br />
              <Card>
                {customerDetails && customerDetails.length > 0 && (
                  <h2>Current Bookings</h2>
                )}
                {customerDetails && customerDetails.length === 0 && (
                  <h2>No Bookings details Available</h2>
                )}
                <hr></hr>
                {customerDetails && customerDetails.length > 0 && (
                  <table className="table table-bordered table-sm">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Issued Date</th>
                        <th>Return Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customerDetails &&
                        customerDetails.length > 0 &&
                        customerDetails.map((data: object) => {
                          return (
                            <tr>
                              <td>{data.name}</td>
                              <td>{data.contact}</td>
                              <td>{data.issuedDate}</td>
                              <td>{data.returnDate}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                )}
              </Card>
            </Container>
          </Container>
        )}
      </div>
      <br />
      <div >
        <Button variant="contained" color="primary" onClick={handleGoBacks}>
          Go back to dashboad
        </Button>
      </div>
      <br />
      <footer class="footer" style={{ textAlignLast: "left" }}>
        <div class="container">
          <h1> Rent Vroom</h1>
          <span>Rent Vroom Pvtd Ltd. </span>
          <span>
            No: 296, 3rd Cross Rd. Jakksandra, 1st Bloak, Kormangla <br />
            Bengaluru, Kranataka{" "}
          </span>
          {/* <span class="text-muted">Place sticky footer content here.</span> */}
        </div>
        {/* <i class="fa fa-twitter-square" aria-hidden="true"></i> */}
        <MDBContainer>
          <MDBBtn floating social="tw" size="sm">
            <MDBIcon fab icon="twitter" className="pr-1" />
          </MDBBtn>
          <MDBBtn social="fb">
            <MDBIcon fab icon="facebook-f" className="pr-1" />
            Facebook
          </MDBBtn>
          <MDBBtn social="li">
            <MDBIcon fab icon="linkedin-in" className="pr-1" /> Linkedin
          </MDBBtn>
        </MDBContainer>
        <br />
        <br />
        <br />
      </footer>
      <div
        class="d-flex justify-content-between w-25"
        style={{ marginLeft: "125px" }}
      >
        <strong>Home</strong>
        <strong>Contact</strong>
        <strong>About</strong>
      </div>
    </div>
  );
}
