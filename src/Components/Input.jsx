import React , {useState} from 'react';
import './input.css';

const Input = () => {
    
    const [data, setValue] = useState({
        fname:" ",
        lname:" ",
        email:" ",
        phone:""
    })
    const [show, setVal] = useState({
        fname:" ",
        lname:" ",
        email:" ",
        phone:""
    })
const onInputFname = (e) => {
    setValue({...data,fname:e.target.value})
}

const onInputLname = (e) => {
    setValue({...data,lname:e.target.value})
}

const onInputEmail = (e) => {
    setValue({...data,email:e.target.value})
}
const onInputPhone = (e) => {
    setValue({...data,phone:e.target.value})
}

const submit = (e) => {
    e.preventDefault();
    setVal({...show,fname:data.fname,lname:data.lname,email:data.email,phone:data.phone})
}
    
    return(

    <>
<h1>Hello!! {show.fname}{show.lname}{show.email}{show.phone}</h1>
<form action="" onSubmit={submit}>
    <input type="text" onChange={onInputFname} />
    <input type="text"onChange={onInputLname} />
    <input type="email" onChange={onInputEmail}/>
    <input id="ph" type="number" autofocus onChange={onInputPhone}/>
    <button type="submit">Submit</button>
</form>

    </>
)

}
export default Input;