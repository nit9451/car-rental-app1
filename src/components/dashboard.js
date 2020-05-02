import React, { Component, useState } from "react";
import { MDBIcon, MDBContainer, MDBBtn } from "mdbreact";
import { Row, Col, Badge } from "reactstrap";
import Button from "@material-ui/core/Button";
import { Container, Card } from "@material-ui/core";
import PropTypes from "prop-types";
import { SET_CURRENT_CAR_ACTION } from "../actions/car.action";
import { useSelector, useDispatch } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export default function Dashboard(props) {
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
  const [showCarClickSuccess, setCarClickSuccess] = React.useState(false);
  const dispatch = useDispatch();

  const handleShowCurrentBookings = (idx) => {
    dispatch(
      SET_CURRENT_CAR_ACTION(
        carDetails[idx],
        () => {
          setCarClickSuccess(true);
        },
        () => {}
      )
    );
  };

  const handleBooking = (idx) => {
    dispatch(
      SET_CURRENT_CAR_ACTION(
        carDetails[idx],
        () => {
          setbookingClickSuccess(true);
        },
        () => {}
      )
    );
  };

  // const ShowBookingDetails=(idx)=>{

  //   dispatch(SET_CURRENT_CAR_ACTION(
  //   carDetails[idx],
  //   ()=>{setbookingClickSuccess(true)},
  //   ()=>{}
  //   ))
  //   }

  console.log(bookingClickSuccess);
  let disable = currentCar.carAvailability ? false : true;
  return (
    <div className="App">
      <h3>Cars for rent</h3>
      <div style={{ marginTop: "200px" }}>
        {currentCar &&
          customerDetails &&
          carDetails.map((car, idx) => {
            let disable = car.carAvailability ? false : true;
            return (
              <Container>
                {bookingClickSuccess && <Redirect to="/carbooking-Form" />}
                {showCarClickSuccess && <Redirect to="/current-booking" />}
                <Container>
                  <Row>
                  </Row>
                  <Card>
                    <Row>
                      <Col sm={3}>
                        <img src={car.carImage} class="img-fluid">
                          {}
                        </img>
                      </Col>
                      <div class="my-auto mx-auto">
                        <Row>
                          <Col>
                            <strong class="text-center">{car.carName} </strong>
                            <br />
                          </Col>
                          <Col>
                            <span> {car.carColor}</span>
                          </Col>
                          <Col>
                            <span>{car.carSeats} </span>
                          </Col>
                          <Col>
                          <span>{`₹${car.carRentPrcie} Per day`} </span>
                        </Col>
                          <Col class="row align-items-center">
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleBooking(idx)}
                              disabled={disable}
                            >
                              Book Car
                            </Button>
                          </Col>
                          <Col class="row align-items-center">
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleShowCurrentBookings(idx)}
                            >
                              Details
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </Row>
                  </Card>
                  <br />
                  <br />
                </Container>
              </Container>
            );
          })}
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
        </div>
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
