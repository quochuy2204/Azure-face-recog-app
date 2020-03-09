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
        <h3 className="titleAtribute">Results: </h3>
        <ul>
        {
          data.map(item => (
            <li key={item.faceId}>
              <span>
                Gender: {item.faceAttributes.gender}, age: {item.faceAttributes.age}
              </span>
            </li>
          )
          )
        }
        </ul>
        <img
          src={image}

          alt={image}
        />
        <div className="border-image"></div>
        <a
          className="App-link"
          href={image}
          target="_blank"
          rel="noopener noreferrer"
        >
          
        </a>
      </header>
    </div>
  );
}

export default App;
