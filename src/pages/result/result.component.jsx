import React from 'react';

function Result({sets, reps}) {
    console.log(sets);
    return (
        <>
        <div>result page</div>
        <div>sets: {sets}</div>
        <div>reps: {reps} </div>
        </>
    )
}

export default Result;