import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom'
import {FaceDetect} from './components/FaceDetect';
import {VerifyFace} from './components/VerifyFace';
import {ObjectIdentity} from './components/ObjectIdentity';


const App = () => {
  return (
    <>
      <Switch>
        <Route exact path='/' component={FaceDetect} />
        <Route exact path='/verifyfaces' component={VerifyFace} />
        <Route exact path='/objectindentity' component={ObjectIdentity} />
        <Route component={Error} />
      </Switch>
    </>
  );
}

export default App;



