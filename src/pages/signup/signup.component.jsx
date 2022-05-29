import React from "react";
import { Link } from "react-router-dom";
import './signup.css';
import signup from '../../firebase/firebase';
import { useState, useRef } from 'react';
import { useAuth, db, storage } from '../../firebase/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import blob from '../../assets/blob.svg';


function SignUp() {
  const currentUser = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imageURL, setimageURL] = useState("");
  const [progress, setProgress] = useState(0);

  const [loader, setLoader] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    //Upload the image to the firebase's storage
    const file = e.target[1].files[0];
    if(!file) return;
    const storageRef = ref(storage, `/images/${name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);


    uploadTask.on('state_changed', (snapshot) => {
      const prog = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(prog);
    },
    (err) => console.log(err),
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then( (url) => setimageURL(url) );
    }
    )

    //store information to the firestore
    const docRef = addDoc(collection(db, "user"), {
      name: name,
      email: email,
      imageURL: imageURL
    });
    console.log("Document written with ID: ", docRef.id);
    console.log(imageURL);

    //store the information on firebases's authentication
    try {
      signup(emailRef.current.value, emailRef.current.value);
    }
    catch {
      alert('Error!');
    }

    setLoader(false);
    setName("");
    setEmail("");
  }

  return (
    <>
      <img className = 'blob' src={ blob } alt="" />
      <div className="signup-container">
        <div className="signup-form">
          <form onSubmit={handleSubmit}>
            <span className="title"><h2>Create Account</h2></span>
            <p className="login-subheading">Create a new account</p>
            <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <p className='upload-image'>Uplaod Image</p>
            <input type="file" className="file" style={{ marginTop: "10px" }} placeholder="Choose Image" required />
            {/* REMOVE LATER, AFTER TESTING */}
            {/* <p>Progress {progress} %</p>  */}
            <input type="text" placeholder=" Email" ref={emailRef} value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" className="password" ref={passwordRef} placeholder="Password" required />
            <input type="password"  className="password" placeholder="Confirm Password" required />
            {/* style={{backgroundColor: {loader} ? '#BA68C8' : 'grey'}} */}
            <button className=" signup-button"  type="submit">Create Account</button>
          </form>
          <div className="signup" style={{ marginTop: '1rem', fontSize: '15px' }}>
            <span>Already have an account?<br /></span>
            <span className="text">
              <Link className="link" to="/login">Login</Link>
            </span>
          </div>
          </div>
      </div>
    </>
  );
}

export default SignUp;