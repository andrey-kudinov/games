import React,{Component} from 'react';
// import Landing from './Container/Landing'
import Home from './Containers/Home'
import classes from './App.module.css';
import {BrowserRouter} from 'react-router-dom';

class App extends Component {

render(){
  return (
    <BrowserRouter>
      <React.Fragment>
        <div className={classes.App}>
          <Home/>
        </div>
      </React.Fragment>
    </BrowserRouter>
  );

}
}

export default App;
