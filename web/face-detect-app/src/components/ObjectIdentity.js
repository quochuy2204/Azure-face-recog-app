import React, {useState} from 'react'
import URLAPI from '../constants/Constants'

export const ObjectIdentity = () => {

    const [image4, setImage4] = useState('');
    const [abc, setAbc] = useState(null);

    const handleImage4 = event => {
        setImage4(event.target.value)
    }


    const handleIdentity = async event => {
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
                    image4: image4,
                })
            }
            const resp = await fetch(`${URLAPI}/create-facelist5`, fetchOptions)
            const infoIdentity = await resp.json()
            console.log("data of object identity: ", infoIdentity.data);

            setAbc(infoIdentity.data.description.captions[0].text);

        } catch (err) {
            console.error(err.messsage);
        }
    }


    return (
        <div>
            <p>
                3. Object identity, tagging and description
        </p>
            <div className="containerFile">
                <input
                    className="inputFile"
                    placeholder="Upload image4"
                    onChange={handleImage4}
                    value={image4}
                />
                {image4 &&
                    <button
                        className="buttonFile"
                        onClick={handleIdentity}
                    >
                        Upload
          </button>
                }
            </div>

            {abc &&
                <div>

                    <p>Description: {abc}</p>
                    <p>Tags: {}</p>
                    <img src={image4} alt={image4} />
                </div>
            }
        </div>
    )
}
