import React, { useState } from "react";
import './profile.css';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import blobprofile from '../../assets/blobprofile.svg';
import BottomNav from '../bottomnav/bottomnav.component'
import { useAuth } from '../../firebase/firebase'
import { db, logout } from '../../firebase/firebase';
import { collection, query, where, onSnapshot } from "firebase/firestore";


function Profile() {
  const currentUser = useAuth();
  const email = currentUser?.email;
  let data = [];
  let[ name, setName ] = useState("");
  let [ imageURL, setImageURL ] = useState("");
  // const [loading, setLoading] = useState(); //destructing

  const handleLogout = async () => {
    // setLoading(true);
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
    // setLoading(false);
  };

  if(email !== undefined) {
    console.log('Query started with email = ' + email);
    const q = query(collection(db, "user"), where("email", "==", email));
  
    onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        data.push({...doc.data(), id: doc.id});
      })
      setName(data[0].name);
      setImageURL(data[0].imageURL);
    })
  }
 console.log("nkejcn " + name + " " + imageURL);
  return (
    <>
      <img src={blobprofile} alt=""/>
      <div className="main-heading-profile">User Profile</div>
      <div className="container-profile">
        <div className="top-profile">

        {currentUser && <Avatar className='avatar' src={imageURL} alt="profile photo" sx={{ width: 56, height: 56 }}/>}
        </div>
        <div className="profile-content">
          <p>Name: {name}</p>

          <p>Email: {currentUser?.email}</p>
        </div>
        {/* disable={loading || !currentUser} */}
        <Button className='logout-button' onClick={handleLogout} variant="outlined" color="error"> Log Out </Button>

      </div>
      <BottomNav />
    </>
  );
}

export default Profile;