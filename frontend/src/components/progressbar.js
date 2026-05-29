import React from "react";
import Phaser from "phaser";
import textboxImage from "../assets/TextBox.png";

/*
function progressBar(scene, {
    width,
    height,
}) {
    const x = width * 0.25;
    const y = height * 0.05;
    const width_bar = width * 0.5;
    const height_bar = height * 0.03;
    const fillColor = 0x00ff00; // Green
    const bgColor = 0x333333;   // Dark Grey

    this.progressBar = scene.add.graphics();
    this.progressBar.fillStyle(bgColor);
    this.progressBar.fillRect(x, y, width_bar, height_bar);

    this.drawProgress = (percentage) => {
        this.progressBar.clear();

        // Redraw background
        this.progressBar.fillStyle(bgColor);
        this.progressBar.fillRect(x, y, width_bar, height_bar);

        // Draw filled bar
        this.progressBar.fillStyle(fillColor);
        this.progressBar.fillRect(x, y, width_bar * percentage, height_bar);
    };
}

export default progressBar;*/

export default class ProgressBar {
    constructor(scene, config = {}) {
        this.scene = scene;

        // Configurable values
        this.x = config.width * 0.25;
        this.y = config.height * 0.05;
        this.width = config.width * 0.5;
        this.height = config.height * 0.03;

        this.fillColor = 0x00ff00;
        this.bgColor = 0x333333;

        this.graphics = scene.add.graphics();

        this.draw(0);
    }

    draw(percentage) {
        this.graphics.clear();

        // Background
        this.graphics.fillStyle(this.bgColor);
        this.graphics.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );

        // Fill
        this.graphics.fillStyle(this.fillColor);
        this.graphics.fillRect(
            this.x,
            this.y,
            this.width * Phaser.Math.Clamp(percentage, 0, 1),
            this.height
        );
    }

    setProgress(percentage) {
        this.draw(percentage);
    }

    destroy() {
        this.graphics.destroy();
    }
}