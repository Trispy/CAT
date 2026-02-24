import { useRef, useState } from 'react';

import Phaser from 'phaser';
import { PhaserGame } from '../../PhaserGame';

function Example ()
{
    
    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef();

    const changeScene = () => {

        const scene = phaserRef.current.scene;

        if (scene)
        {
            scene.changeScene();
        }
    }

 

    // Event emitted from the PhaserGame component
    const currentScene = (scene) => {
        
    }

    return (
        <div id="app">
            <PhaserGame ref={phaserRef} currentActiveScene={currentScene} /> 
           <div>{ /*
                <div>
                    <button className="button" onClick={changeScene}>Change Scene</button>
                </div> */}
            </div> 
        </div>
    )
}

export {Example};