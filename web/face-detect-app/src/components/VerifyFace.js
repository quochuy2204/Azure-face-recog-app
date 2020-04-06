import React, {useState} from 'react'
import URLAPI from '../constants/Constants'

export const VerifyFace = () => {

    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [faceID1, setFaceID1] = useState(null);
    const [faceID2, setFaceID2] = useState(null);
    const [isIdentical, setIsIdentical] = useState(false);
    const [percent, setPercent] = useState(null);


    const handleImage2 = event => {
        setImage2(event.target.value)
    }

    const handleImage3 = event => {
        setImage3(event.target.value)
    }

    const handleFaceIDs = async event => {
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
                    image2: image2,
                })
            }
            const resp = await fetch(`${URLAPI}/create-facelist2`, fetchOptions)
            const infoFaceID1 = await resp.json()
            console.log("data of face id 1: ", infoFaceID1.data[0].faceId);
            // Set faceID1
            setFaceID1(infoFaceID1.data[0].faceId);
        } catch (err) {
            console.error(err.messsage);
        }

        try {
            const fetchOptions = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    image3: image3,
                })
            }
            const resp = await fetch(`${URLAPI}/create-facelist3`, fetchOptions)
            const infoFaceID2 = await resp.json()
            console.log("data of face id 2: ", infoFaceID2.data[0].faceId);
            // Set faceID2
            setFaceID2(infoFaceID2.data[0].faceId);
        }
        catch (err) {
            console.error(err.messsage);
        }
    }

    const handleVerify = async event => {
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
                    faceID1: faceID1,
                    faceID2: faceID2
                })
            }
            const resp = await fetch(`${URLAPI}/create-facelist4`, fetchOptions)
            const infoVerify = await resp.json()
            console.log("data of verifying: ", infoVerify.data);
            setIsIdentical(infoVerify.data.isIdentical);
            setPercent(infoVerify.data.confidence.toFixed(2));
        } catch (err) {
            console.error(err.messsage);
        }
    }

    return (
        <div>
            {/* <p>
                2. Veryifying 2 faces
        </p> */}
            <div className="container">
                <input
                    className="inputFile"
                    placeholder="Upload image2"
                    onChange={handleImage2}
                    value={image2}
                />

                <input
                    className="inputFile"
                    placeholder="Upload image3"
                    onChange={handleImage3}
                    value={image3}
                />
                {image3 !== '' && image2 !== '' &&
                    <button
                        className="buttonFile"
                        onClick={handleFaceIDs}
                    >
                        Upload
            </button>
                }

                {faceID2 && faceID1 &&
                    <button
                        className="buttonFile"
                        onClick={handleVerify}
                    >
                        Verify
          </button>
                }
            </div>

            {percent &&
                <div>
                    <p> The percentage is {percent * 100} %</p>
                    {!isIdentical &&
                        <p> They are not the same</p>
                    }
                    {isIdentical &&
                        <p>They are the same</p>
                    }
                </div>
            }
        </div>
    )
}
