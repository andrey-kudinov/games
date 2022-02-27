import React,{Component} from 'react';
import classes from './Home.module.css';
import {Route,Link, Switch} from 'react-router-dom';
import Landing from './Landing';
import Dashboard from './Dashboard';
import About from '../Components/Aboutus';
import logo from "../Resources/Images/logo.svg";
import firebase from 'firebase';
console.log('process.env.REACT_APP_API_KEY -',  process.env.REACT_APP_API_KEY)
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

firebase.initializeApp(firebaseConfig);
class Home extends Component{
    
state={
    overlaywidth:0,
    loggedin:null,
    loading:true,
}

openOverlay=()=>{
    this.setState({overlaywidth:100})
}
closeOverlay=()=>{
    this.setState({overlaywidth:0})
}
singOutUser=()=>{
  firebase.auth().signOut().then(()=>{
    // Sign-out successful.
    console.log('singOutUser successful');
    this.closeOverlay()
  }).catch(function(error) {
    // An error happened.
  })
}
componentWillMount(){
  firebase.auth().onAuthStateChanged((user)  =>{
    if (user) {
    this.setState({loggedin:true,loading:false})
    } else {
    this.setState({loggedin:false,loading:false})  // No user is signed in.
    }
  }); 
}

render(){
return(
<React.Fragment>
<div style={{width:this.state.overlaywidth + '%'}} className={classes.overlay}>

  <span className={classes.closebtn} onClick={this.closeOverlay}>&times;</span>
  <div className={classes.overlaycontent}>
    <ul>
        <li onClick={this.closeOverlay}><Link to="/dashboard">Dashboard</Link></li>
        <li onClick={this.closeOverlay}><Link to="/about">About Us</Link></li>
        <li onClick={this.closeOverlay}><Link to="/contact">Contact Us</Link></li>
        {this.state.loggedin?<li onClick={this.singOutUser}><Link >Sign Out</Link></li>:null}
     </ul>
  </div>
</div>

<div className={classes.Container}>
    <div className={classes.navbarcontainer}>
        <div  className={classes.logocol} ><Link to=""><img src={logo} alt="companay-logo" width="30" height="30" /><span>tradinghigh.local</span></Link></div>
        <div  className={classes.navlist}>
            <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                {this.state.loggedin?<li onClick={this.singOutUser}><Link >Sign Out</Link></li>:null}
            </ul>
        </div>
        <span className={classes.hamburger} onClick={this.openOverlay}>&#9776;</span>
    </div>
    <div className={classes.contentcontainer}>
    <Switch>
    <Route path='/' exact render={() => <Landing loading={this.state.loading} loggedin={this.state.loggedin} />} />
    <Route path='/dashboard' exact render={() => <Dashboard loading={this.state.loading} loggedin={this.state.loggedin} />} />
    <Route path='/about' exact render={() => <About/>} />
    </Switch>
    </div>
</div>
</React.Fragment>
);
}
}

export default Home;