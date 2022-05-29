/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import './explore.css';
import lunges from '../../assets/lunges.svg';
import sideKick from '../../assets/sideKick.svg';
import bicepCurl from '../../assets/bicepCurl.svg';
import squats from '../../assets/squats.svg';
import BottomNav from '../bottomnav/bottomnav.component';

function Explore() {
    return (
        <>
            <div className="main-heading">Explore</div>
            {/* <!-- card 1 --> */}
            <div className="inner-card" style={{ backgroundColor: '#ffd2ef', color: '#230229' }}>
                <div className="card">
                    <div className="left">
                        <h3>Dumbell Bicep Curl</h3>
                        <p>A lifestyle therapy for prevention and treatment of diabetes.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium et ex non perspiciatis fuga!</p>
                    </div>
                    <img src={bicepCurl} className='image-explore' alt="" />
                </div>
                <button style={{ backgroundColor: '#ffd2ef' }}>START EXERCISE</button>

            </div>

            {/* <!-- card 2 --> */}
            <div className="inner-card" style={{ backgroundColor: '#fff7b6', color: '#230229' }}>
                <div className="card">
                    <div className="card">
                        <div className="left">
                            <h3>Lunges</h3>
                            <p>A lifestyle therapy for prevention and treatment of diabetes.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium et ex non perspiciatis fuga!</p>
                        </div>
                        <img src={lunges} className='image-explore' alt="" />
                    </div>
                </div>
                <button style={{ backgroundColor: '#fff7b6' }}>START EXERCISE</button>
            </div>

            {/* <!-- card 3 --> */}
            <div className="inner-card" style={{ backgroundColor: '#a7bdfb', color: '#230229' }}>
                <div className="card">
                    <div className="left">
                        <h3>Squats</h3>
                        <p>A lifestyle therapy for prevention and treatment of diabetes.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium et ex non perspiciatis fuga!</p>
                    </div>
                    <img src={squats} className='image-explore' alt="" />
                </div>
                <button style={{ backgroundColor: '#a7bdfb' }}>START EXERCISE</button>
            </div>
            <BottomNav />
        </>
    );
}

export default Explore;
