import React, { useState } from 'react';
import './App.css';

const URLAPI = `http://localhost:5000`



function App() {

  // eslint-disable-next-line
  const [data, setData] = useState([])
  // eslint-disable-next-line
  const [image, setImage] = useState('')

  const handleOnChange = event => {
    setImage(event.target.value)
  }

  const handleClickImage = async event => {
    event.preventDefault();

    console.log('will click');

    try {
      const fetchOptions = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: image,
        })
      }

      const resp = await fetch(`${URLAPI}/create-facelist`, fetchOptions)
      const people = await resp.json()
      console.log("data of people: ",people.data)
      setData(people.data)
    } catch (err) {
      console.error(err.messsage);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        
        <p>
          FACE DETECTION USING AZURE API 
        </p>
        <p>
          Upload a JPG image
        </p>
        <div className="containerFile">
          <input
            className="inputFile"
            placeholder="Upload image"
            onChange={handleOnChange}
            value={image}
          />
          <button
            className="buttonFile"
            onClick={handleClickImage}
          >
            Upload
          </button>
        </div>
        <h2 className="titleAtribute">Results: </h2>
        <ul>
        {
      
          data.map(item => (
            <li key={item.faceId}>
            
              <span>
                  Gender: {item.faceAttributes.gender}, age: {item.faceAttributes.age}
                  <p>Glasses: {item.faceAttributes.glasses} {item.faceAttributes.emotion.happiness}</p>             
                  <p>emo: {Math.max(parseFloat(item.faceAttributes.emotion.happiness),0,0)} </p> 
                  <div class="b" style={{top: `${item.faceRectangle.top + 412 + 203*data.length}px`, left: `${item.faceRectangle.left+40}px`, width: `${item.faceRectangle.width}px`, height: `${item.faceRectangle.height}px`}}></div>
              </span>
             
             </li> 
             
                   
        
          )
          
          )
          
        }
         <img src={image} alt={image}/>  
        </ul>
       
              
        
      </header>
    </div>
  );
}

export default App;



