import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class Game2 extends Scene
{
    logoTween;

    constructor ()
    {
        super('Game2');
    }

    create() {
    const { width, height } = this.cameras.main;

    this.cameras.main.setBackgroundColor(0x00ff00);

    this.add.image(width / 2, height / 2, 'background')
        .setAlpha(0.5)
        .setOrigin(0.5);

    this.add.text(width / 2, height / 2, 'Game 1', {
        fontFamily: 'Arial Black',
        fontSize: 38,
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 8,
        align: 'center'
    })
    .setOrigin(0.5) // center origin
    .setDepth(100);

    EventBus.emit('current-scene-ready', this);
}

    changeScene ()
    {
        this.scene.start('Game');
    }

}