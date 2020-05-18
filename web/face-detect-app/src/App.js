import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom'
import {FaceDetect} from './components/FaceDetect';
import {VerifyFace} from './components/VerifyFace';
import {ObjectIdentity} from './components/ObjectIdentity';
import {Navbar} from './components/Navbar';


const App = () => {
  return (
    <>
    <h1>Azure face application</h1>
    <div className="hero">
      <Navbar/>
      <div>
        <Switch>
          <Route exact path="/" component={FaceDetect} />
          <Route exact path="/test1" component={VerifyFace} />
          <Route exact path="/test2" component={ObjectIdentity} />
          <Route component={Error} />
        </Switch>
      </div>
    </div>
    </>
  );
}

export default App;



