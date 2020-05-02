import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../components/dashboard';
import BookingPeview from '../components/bookingPreview';
import CarBookingForm from '../components/carbookingForm';
import CarList from '../components/carlist';
export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} Dashboard/>
      <Route path="/carbooking-Form" component={CarBookingForm} />
      <Route path="/current-booking" component={CarList} />
      {/* redirect user to SignIn page if route does not exist and user is not authenticated */}
      <Route component={Dashboard} />
    </Switch>
  );
}