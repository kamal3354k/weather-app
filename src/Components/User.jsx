import React from 'react';
import { useParams } from 'react-router-dom';

const User=()=>{

    const {name,lname} = useParams()
return (
    <h1>Hi My Name is {name} {lname}</h1>
)

}

export default User;