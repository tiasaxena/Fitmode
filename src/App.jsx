import React from "react";
import { Routes, Route } from 'react-router-dom';
import SignUp from './pages/signup/signup.component';
import LogIn from './pages/login/login.component';
import Explore from './pages/explore/explore.component';
import Home from './pages/home/home.component';
import Profile from './pages/profile/profile.component';
import FaceAuthentication from './pages/faceAuthentication/faceAuthentication.component';
import Bicepcurl from "./exercises/bicepCurl/bicepcurl.component";
import Lunges from "./exercises/lunges/lunges.component";
import Squats from "./exercises/squats/squats.component";
import Result from "./pages/result/result.component";

//all the routes are called
function App() {
  return (
    <>
      <div>
        <Routes>
          <Route
            path="/signup/"
            element={
              <SignUp />
            }
          />
          <Route
            path="/login/"
            element={
              <LogIn />
            }
          />
          <Route
            path="/explore/"
            element={
              <Explore />
            }
          />
          <Route
            path="/home/"
            element={
              <Home />
            }
          />
          <Route
            path="/profile/"
            element={
              <Profile />
            }
          />
          <Route
            path="/faceAuthentication/"
            element={
              <FaceAuthentication />
            }
          />

          <Route
            path="/bicepcurl/"
            element={
              <Bicepcurl />
            }
          />
          <Route
            path="/lunges/"
            element={
              <Lunges />
            }
          />
          <Route
            path="/squats/"
            element={
              <Squats />
            }
          />

          <Route
            path="/result/"
            element={
              <Result />
            }
          />

        </Routes>
      </div>
    </>
  );
}

export default App;
