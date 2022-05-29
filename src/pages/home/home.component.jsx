import React from "react";
import './home.css';
import { useAuth } from '../../firebase/firebase';
import BottomNav from '../bottomnav/bottomnav.component';
import BgHome from '../../assets/backgroundhome.svg';

function Home() {

  const currentUser = useAuth();
  return (
    <>

      {/* <div>Currently logged in as: {currentUser?.email}</div> */}
      <div className="bg">
        <img src={BgHome} />
        <div className="container-home">
          <h1>Hello</h1>
          <p>Welcome to Fitmode!</p>
          <p className="home-text">Lorem ipsum doloilis animi alias, veritatis deserunt eius facere soluta harum ducimus qui nesciunt delectus perspiciatis nihil dignissimos ad culpa minus voluptas. Corporis rerum libero dolorum ipsa assumenda aspernatur natus, rem fugit!</p>
        </div>
      </div>
      <BottomNav />
    </>
  );
}

export default Home;