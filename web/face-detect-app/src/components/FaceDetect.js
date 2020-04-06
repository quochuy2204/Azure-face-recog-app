import React, {useState} from 'react'
import URLAPI from '../constants/Constants'
import DefaultImage from '../images/defaultImage.png'

export const FaceDetect = () => {

    const [ready, setReady] = useState(false);

    const [data, setData] = useState(null);

    const [image, setImage] = useState('');

    const [expression, setExpression] = useState(null);

    const getKeyByValue = (object, value) => {
        return Object.keys(object).find(key => object[key] === value);
    }

    const handleImage = event => {
        setImage(event.target.value)
    }

    const handleDetectImage = async event => {
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
            console.log("data of people: ", people.data);
            const emotionObject = people.data[0].faceAttributes.emotion;
            const emotionArray = Object.values(emotionObject);
            const indexEmoMax = Math.max(...emotionArray);
            setExpression({info: getKeyByValue(emotionObject, indexEmoMax), percent: indexEmoMax});
            setData(people.data);
        } catch (err) {
            console.error(err.messsage);
        }
    }

    return (
        <div className="container">
            <div className="item-left-container">
                <div className="input-form">
                    <input
                        className="inputFile"
                        placeholder="Upload image..."
                        onChange={handleImage}
                        value={image}
                    />

                    <button
                        className="buttonFile"
                        onClick={handleDetectImage}
                        disabled={image ==''}
                    >
                        Verify
                    </button>
                </div>
                {data &&
                    <div>
                        <h2>Results: </h2>
                        <div>
                            <div>
                                {
                                    data.map(item => (
                                        <div key={item.faceId}>
                                            <div>
                                                Gender: {item.faceAttributes.gender}, age: {item.faceAttributes.age}
                                                <p>Glasses: {item.faceAttributes.glasses}</p>
                                                {expression && <p>Emotion: {expression.info} about {expression.percent.toFixed(2) * 100}%</p>}
                                            </div>
                                        </div>
                                    )
                                    )
                                }
                            </div>

                        </div>

                    </div>}
            </div>
            <div className="item-right-container">
                {/* <div 
                    className="b" 
                    style={{
                        top: `${item.faceRectangle.top + 412 + 203 * data.length}px`, 
                        left: `${item.faceRectangle.left + 40}px`, 
                        width: `${item.faceRectangle.width}px`, 
                        height: `${item.faceRectangle.height}px`}}
                    >
                    </div> */}
                {image === '' &&
                    <img src={DefaultImage} alt="Default Image" />
                }
                {image !== '' &&
                    <img src={image} alt="" />

                }
            </div>
        </div>
    )
}


{/* <h3>
    Face detection and Attribute predictions
</h3> */}