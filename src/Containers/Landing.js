import React,{Component} from 'react';
import stockillustration from '../Resources/Images/stockillustration.svg';
import classes from './Landing.module.css';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {Redirect} from 'react-router-dom';

let redirect = <Redirect to="dashboard" />;  


const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      var user = authResult.user;
      var credential = authResult.credential;
      var isNewUser = authResult.additionalUserInfo.isNewUser;
      var providerId = authResult.additionalUserInfo.providerId;
      var operationType = authResult.operationType;
      // Do something with the returned AuthResult.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
    signInFailure: function(error) {
      // Some unrecoverable error occurred during sign-in.
      // Return a promise when error handling is completed and FirebaseUI
      // will reset, clearing any UI. This commonly occurs for error code
      // 'firebaseui/anonymous-upgrade-merge-conflict' when merge conflict
      // occurs. Check below for more details on this.
      // return handleUIError(error);
    },

  },
  queryParameterForSignInSuccessUrl: 'signInSuccessUrl',
  signInFlow:'popup',
  signInSuccessUrl: '',//Specifying sign in success url can cause double redirect since we are also managing redirect in react-router with local state.
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
  // Other config options...
} 



class Landing extends Component{

render(){
return(
<div className={classes.contentwrapper}>
  {this.props.loading?<p>LOading..</p>:
(this.props.loggedin?redirect:
<React.Fragment>
  <div className={classes.firstcol}>
    <div>
      <h1 className={classes.heading}>Learn to trade stocks and cryptocurrency</h1> 
     </div>
            
    <div>
      <p className={classes.para}>all while playing a game.</p>        
    </div>
    
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} className={classes.emailbox}/>
                 
  </div>

  <div className={classes.secondcol}>
    <img className={classes.stock_illustration} src={stockillustration} alt="trading illustration"></img>
  </div>
  </React.Fragment>
)}
</div>

);
}
}
export default Landing;