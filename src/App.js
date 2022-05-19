// import logo from './logo.svg';
// import Input from './Components/Input'
import './App.css';
// import Home from './Components/Home';
// import User from './Components/User';
// import {Route,Switch} from 'react-router-dom';
import Weather from './Weather'

function App() {
  return (
    // <Input/>
    <>
    {/* <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/user/:name/:lname" component={User}/>
    </Switch> */}
    <Weather/>
    </>
  );
}

export default App;
