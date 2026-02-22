import { Boot } from './scenes/Boot';
import { Game } from './scenes/Game';
import Phaser from 'phaser';
import { Preloader } from './scenes/Preloader';
import { Game2 } from './scenes/Game2';


// Find out more information about the Game Config at:
// https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
   type: Phaser.AUTO, // Or Phaser.CANVAS for better performance on older phones [8]
    width: 800, // Logical width
    height: 600, // Logical height
    parent: 'game-container',
    backgroundColor: '#028af8',
    scale: {
        mode: Phaser.Scale.FIT, // Ensures game fits within screen [9]
        autoCenter: Phaser.Scale.CENTER_BOTH, // Centers the game [9]
        min: {
            width: 400,
            height: 300
        },
        max: {
            width: 1600,
            height: 1200
        }
    },
    scene: [
        Boot,
        Preloader,
        Game,
        Game2
    ]
};

const StartGame = (parent) => {

    return new Phaser.Game({ ...config, parent });

}

export default StartGame;
