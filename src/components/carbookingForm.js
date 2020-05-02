import React, { useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Container, Card } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { Row, Col } from "reactstrap";
import { SET_CURRENT_CAR_ACTION } from "../actions/car.action";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { BOOK_CAR_ACTION, UPDATE_CAR_ACTION } from "../actions/car.action";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function CarbookingForm() {
  const classes = useStyles();
  const [selectedIssuedDate, setIssuedDate] = React.useState();

  const [selectedReturnDate, setReturnDate] = React.useState();

  const [name, setName] = React.useState();
  const [contact, setContact] = React.useState();

  const [currentCarDetails, setCurrentCarDetails] = React.useState(
    useSelector((state) => state.currentCar)
  );
  const [carDetails, setcarDetails] = React.useState(
    useSelector((state) => state.carDetails)
  );
  const [customerDetails, setcustomerDetails] = React.useState(
    useSelector((state) => state.customerDetails)
  );

  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const [bookingSuccess, setbookingSuccess] = React.useState(false);
  const [backClickSuccess, setbackClickSuccess] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  const handleBookCar = () => {
    let car_details = carDetails;
    let customer_details = customerDetails;
    dispatch(
      BOOK_CAR_ACTION(
        {
          name: name,
          contact: contact,
          issuedDate: selectedIssuedDate,
          returnDate: selectedReturnDate,
          carId: currentCarDetails.id,
        },
        () => {
          car_details = car_details.filter((item) => {
            return item.id !== currentCarDetails.id;
          });
          currentCarDetails["carAvailability"] = false;
          car_details = [...car_details, currentCarDetails];
          customer_details = [...customer_details];
          dispatch(
            UPDATE_CAR_ACTION(
              car_details,
              () => {
                setbookingSuccess(true);
                setOpen(true);
              },
              () => {
                alert("faliure");
              }
            )
          );
        },
        () => {
          alert("faliure");
        }
      )
    );
  };
  console.log("CarbookingForm -> open", open);

  console.log("CarbookingForm -> bookingSuccess", bookingSuccess);

  const refContainer = useRef();
  return (
    <React.Fragment>
      {bookingSuccess && <Redirect to="/" />}
      {backClickSuccess && <Redirect to="/" />}
      <Container>
        <div style={{}}>
          <Row>
            <Col>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTlPBHL-j6V4fikCabqdbNeJ4A_cxMSKyTqhVo8M2_RVVqspxwJ&usqp=CAU"
                class="img-fluid"
              >
                {}
              </img>
            </Col>
          </Row>
        </div>
        <div style={{ marginTop: "75px" }}>
          <Typography variant="h6" gutterBottom>
            Booking Details
          </Typography>
        </div>
        <Container style={{ marginLeft: "225px" }}>
          <ValidatorForm ref={refContainer} onSubmit={handleBookCar}>
            <Grid
              container
              spacing={3}
              style={{ margin: 100, maxWidth: "50%" }}
            >
              <Grid item sm={12} lg={6}>
                <TextValidator
                  label="Name"
                  onChange={(event) => setName(event.target.value)}
                  name="name"
                  value={name}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
              </Grid>
              <Grid item sm={12} lg={6}>
                <TextValidator
                  label="Contact"
                  onChange={(event) => setContact(event.target.value)}
                  name="contact"
                  value={contact}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
              </Grid>
              <br />
              <br/>
              <Grid item sm={12} lg={6}>
                <TextValidator
                  id="date"
                  label="Issue Date"
                  type="date"
                  defaultValue="dd/mm/yyyy"
                  value={selectedIssuedDate}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(event) => setIssuedDate(event.target.value)}
                />
                
              </Grid>
              <Grid item sm={12} lg={6}>
                <TextValidator
                  label="Return Date"
                  name="returnDate"
                  type="date"
                  value={selectedReturnDate}
                  defaultValue="dd/mm/yyyy"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                  onChange={(event) => setReturnDate(event.target.value)}
                />
              </Grid>
              <Grid item>
                <div style={{ marginLeft: "422px" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    // onClick={handleBookCar}
                    onClick={handleOpen}
                  >
                    Book Car
                  </Button>
                  {bookingSuccess &&(<Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500,
                    }}
                  >
                    <Fade in={open}>
                      <div className={classes.paper}>
                        {bookingSuccess && (
                          <h2 id="transition-modal-title">Booking Confirmed</h2>
                        )}
                        {/* {open && (
                          <h2 id="transition-modal-title">
                            Please fill all the required fields
                          </h2>
                        )} */}
                        {bookingSuccess && (
                          <span>{`You have booked:         ${currentCarDetails.carName} `}</span>
                        )}
                        <br />
                        {customerDetails &&
                          bookingSuccess &&
                          customerDetails.length > 0 &&
                          customerDetails.map((data: object) => {
                            return (
                              <span>{`for the duration :         ${data.issuedDate}-${data.returnDate}`}</span>
                            );
                          })}

                        <p id="transition-modal-description">
                          <Button
                            href="#text-buttons"
                            color="primary"
                            onClick={handleClose}
                          >
                            Continue
                          </Button>
                        </p>
                      </div>
                    </Fade>
                  </Modal>)}
                </div>
              </Grid>
            </Grid>
          </ValidatorForm>
        </Container>
      </Container>
      <div style={{ marginRight: "351px", marginTop: "-150px" }}>
        <Button variant="contained" color="primary" onClick={handleGoBacks}>
          Back
        </Button>
      </div>
    </React.Fragment>
  );
}
