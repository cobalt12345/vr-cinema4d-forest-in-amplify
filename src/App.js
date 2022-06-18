import React from 'react';
import './App.css';
import Amplify, { XR } from 'aws-amplify';
import {Button} from "@aws-amplify/ui-react";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }


    enterVR() {
        const progressCallback = (progress) => {
            console.log(`Sumerian scene load progress: ${progress * 100}%`);
        }
        console.debug('Load scene to element: ', document.getElementById("sumerian-scene-dom-id"));
        const sceneOptions = {
            progressCallback
        }
        XR.loadScene("Forest", "sumerian-scene-dom-id", sceneOptions)
            .then(()=>{
                XR.start("Forest");
                if (XR.isSceneLoaded('Forest')) {
                    if (XR.isMuted('Forest')) {
                        // The scene is muted
                        XR.setMuted('Forest', false) // Unmute
                    }
                }
                if (XR.isSceneLoaded('Forest')) {
                    console.debug('VR compatible: ', XR.isVRCapable('Forest'));
                    if (XR.isVRCapable('Forest')) {
                        XR.enterVR('Forest')
                    }
                }
            }).catch(console.error);

    }

    render() {

    return (
        <React.Fragment>
            <div id="sumerian-scene-dom-id" ref={this.myRef} style={{height: '100%', width: '100%', backgroundColor: 'rgb(163,163,163)'}}></div>
            <Button onClick={this.enterVR} style={{height: 60, width: 100}}>Load scene</Button>
        </React.Fragment>
    );
  }
}
export default App;
