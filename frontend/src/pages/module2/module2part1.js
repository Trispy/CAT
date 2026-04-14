import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';

import moduleUpdate from "../../components/moduleupdate";
import Textbox from "../../components/textbox";

import module2Background from "../../assets/finalbackground.png"
import Phaser from "phaser";
import thermometerhand from "../../assets/thermometerhand.png"
import thermometer from "../../assets/thermometer.png"
import thermometerBackground from "../../assets/thermometerbackground.png"
import nextButton from "../../assets/nextbutton.png"
import readymadefood1 from "../../assets/readymadefood1.png"
import readymadefood2 from "../../assets/readymadefood2.png"
import egg from "../../assets/egg.png"
import onion from "../../assets/onion.png"
import bellpepper from "../../assets/bellpeppers.png"
import beefpackage from "../../assets/beefpackage.png"
import foodbox from "../../assets/foodbox.png"
import chickenpackage from "../../assets/packagedchicken.png"
import chicken from "../../assets/chicken.png"
import fridgeSceneBackground from "../../assets/fridgescreen.png"
import milk from "../../assets/milk.png"
import sinkbg from "../../assets/sinkbackground.png"
import cleanHand from "../../assets/M1G3/handClean.png";
import dirtyHand from "../../assets/M1G3/handDirty.png";
import soapSprite from "../../assets/M1G3/soap.png";
import gloveLeft from "../../assets/M1G3/gloveLeft.png";
import gloveRight from "../../assets/M1G3/gloveRight.png";
import gloveBox from "../../assets/M1G3/gloveBox.png";
import handLeft from "../../assets/M1G3/handLeft.png";
import handRight from "../../assets/M1G3/handRight.png";
import sudImg from "../../assets/M1G3/sud.png";
import mapbutton from "../../assets/mapbutton.png";
import Settings from "../../components/settings";
const API = process.env.REACT_APP_API_URL;



function Module2Part1({ openMenu }) {
    const [gameStage, setgameStage] = useState('intro');
    const phaserGameRef = useRef(null);
    const [thermometerState, setThermometerState] = useState("instructions");
    const finalAngleRef = useRef(null);
    const [fridgeState, setFridgeState] = useState("playing");
    const [fridgefailState, setfridgefailState] = useState('');
    const [fridgeSuccessState, setfridgeSuccessState] = useState('');
    const [fridgeInstructionsState, setFridgeInstructionsState] = useState("instructions");
    const [showfridgeSuccess, setshowfridgeSuccess] = useState(false);
    const [handsClean, setHandsClean] = useState(false);
    const [showSoapText, setShowSoapText] = useState(false);
    const [glovedHands, setGlovedHands] = useState(false);
    const [gloveInstruction, setGloveInstruction] = useState(false);
    const [timerDone, setTimerDone] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        return () => {
            if (phaserGameRef.current) {
                phaserGameRef.current.destroy(true);
                phaserGameRef.current = null;
            }
        };
    }, []);
    useEffect(() => {
        startPhaser();

        setTimeout(() => {
            if (phaserGameRef.current) {
                phaserGameRef.current.scene.start("IntroScene");
            }
        }, 100);
    }, []);

    const backgroundStyle = {
        backgroundImage: `url(${module2Background})`,
        minHeight: '100dvh',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'black'
    };

    function useTypewriter(text, isActive, speed = 50) {
        const [typedText, setTypedText] = useState("");
        const hasStarted = useRef(false);

        useEffect(() => {
            if (!text || !isActive) return;

            hasStarted.current = false;
            setTypedText("");

            let i = 0;

            const interval = setInterval(() => {
                setTypedText(prev => {
                    if (i >= text.length) {
                        clearInterval(interval);
                        return prev;
                    }
                    return prev + text[i++];
                });
            }, speed);

            return () => clearInterval(interval);

        }, [text, isActive, speed]);

        return typedText;
    }
    const startPhaser = () => {
        if (phaserGameRef.current) return;
        const createClickIndicator = (scene, x, y) => {

            const indicatorContainer = scene.add.container(x, y);

            const circle = scene.add.circle(0, 0, 30, 0xffff00, 0.5);

            const text = scene.add.text(0, -60, "DRAG HERE", {
                fontSize: "35px",
                color: "#000000",
                fontStyle: "bold"
            }).setOrigin(0.5);

            indicatorContainer.add([circle, text]);

            scene.tweens.add({
                targets: circle,
                alpha: { from: 0.2, to: 0.8 },
                scale: { from: 0.9, to: 1.2 },
                duration: 600,
                yoyo: true,
                repeat: -1
            });

            return indicatorContainer;
        };
        class IntroScene extends Phaser.Scene {
            constructor() {
                super("IntroScene");
            }

            preload() {
                this.load.image("introBg", module2Background);
            }

            create() {
                const { width, height } = this.scale;

                this.add.image(width / 2, height / 2, "introBg")
                    .setDisplaySize(width, height);
            }
        }
        class ThermometerScene extends Phaser.Scene {

            constructor() {
                super("ThermometerScene");
            }


            preload() {
                this.load.image("thermometerhand", thermometerhand);
                this.load.image("thermometer", thermometer);
                this.load.image("thermometerBackground", thermometerBackground);

            }

            create() {

                const { width, height } = this.scale;


                this.add.image(width / 2, height / 2, "thermometerBackground")
                    .setDisplaySize(width, height);

                this.add.image(width / 2, height / 2, "thermometerBackground")
                    .setDisplaySize(width, height);

                const therm = this.add.image(width / 2, height / 2, "thermometer");

                const thermScale = (height * 0.9) / therm.height;
                therm.setScale(thermScale);

                const centerX = therm.x;
                const centerY = therm.y;

                const pivot = this.add.container(centerX, centerY);

                const hand = this.add.image(0, 0, "thermometerhand");

                hand.setOrigin(0.5, 0.5);
                hand.setScale(thermScale);
                hand.setAngle(-90);

                hand.setScale(thermScale);

                // position indicator relative to the hand tip
                const tipOffsetY = hand.displayHeight * 0.02;
                const tipOffsetX = hand.displayWidth * 0.02;
                const indicator = createClickIndicator(this, tipOffsetX, tipOffsetY);
                pivot.add(indicator);

                // Use true center to avoid PNG padding issues.
                hand.setOrigin(0.5, 0.5);

                hand.setScale(thermScale);

                hand.setAngle(-90);

                pivot.add(hand);


                pivot.angle = 0;



                hand.setInteractive({ useHandCursor: true });
                this.input.setDraggable(hand);

                let finalAngle = null;
                // When dragging, rotate based on pointer
                hand.on("drag", (pointer) => {
                    if (indicator) indicator.destroy();
                    if (thermometerState === "fail") {
                        setThermometerState("playing");
                    }
                    const angleRad = Phaser.Math.Angle.Between(
                        pivot.x,
                        pivot.y,
                        pointer.x,
                        pointer.y
                    );

                    let angleDeg = Phaser.Math.RadToDeg(angleRad);

                    angleDeg = (angleDeg + 360) % 360;

                    if (angleDeg > 180) return;

                    pivot.angle = angleDeg;
                    finalAngle = angleDeg;
                    finalAngleRef.current = finalAngle;

                });

                hand.on("dragend", (pointer) => {
                    if (finalAngle === null) return;
                    if (finalAngle <= 90) {

                        setThermometerState("success");

                    } else {
                        setThermometerState("fail");
                    }

                });
            }
        }
        class FridgeScene extends Phaser.Scene {
            constructor() {
                super("FridgeScene");
            }
            init() {
                this.instructions = ["Sort the following items into the correct shelves in the fridge based on the following rules:", "1. Ready made food goes on the top shelf because it is usually precooked.", "2. Dairy goes on the middle shelf where the temperature is most consistent.", "3. Meat goes on the bottom shelf to prevent cross-contamination.", "4. Veggies go in the crisper drawer to maintain freshness."];
            }
            preload() {
                this.load.image("readymadefood1", readymadefood1);
                this.load.image("readymadefood2", readymadefood2);
                this.load.image("egg", egg);
                this.load.image("onion", onion);
                this.load.image("beefpackage", beefpackage);
                this.load.image("chicken", chicken);
                this.load.image("fridgeScene", fridgeSceneBackground);
                this.load.image("thermometer", thermometer);
                this.load.image("thermometerhand", thermometerhand);
                this.load.image("foodbox", foodbox);
                this.load.image("chickenpackage", chickenpackage);
                this.load.image("milk", milk);
                this.load.image("bellpepper", bellpepper);
            }
            showInstructions() {
                const { width, height } = this.scale;

                const overlay = this.add.container(0, 0);

                const bg = this.add.rectangle(
                    width / 2,
                    height / 2,
                    width * 0.7,
                    height * 0.7,
                    0xffffff
                ).setStrokeStyle(4, 0x000000);

                const text = this.add.text(
                    width / 2,
                    height / 2,
                    this.instructions.join("\n\n"),
                    {
                        font: "40px Arial",
                        color: "#000",
                        wordWrap: { width: width * 0.58 }
                    }
                ).setOrigin(0.5);

                const close = this.add.text(
                    width * 0.82,
                    height * 0.20,
                    "X",
                    {
                        font: "40px Arial",
                        backgroundColor: "#ff0000",
                        padding: { x: 20, y: 10 }
                    }
                )
                    .setInteractive()
                    .setOrigin(0.5);

                close.on("pointerdown", () => {
                    overlay.destroy(true);
                });

                overlay.add([bg, text, close]);
            }
            create() {
                const { width, height } = this.scale;
                /*const helpButton = this.add.text(
                    width * 0.89,
                    height * 0.07,
                    "?",
                    {
                        font: "bold 70px sans-serif",
                        backgroundColor: "#ffffff",
                        color: "#5100ff",
                        padding: { x: 40, y: 20 }
                    }
                )
                    .setOrigin(0.5)
                    .setInteractive({ useHandCursor: true })
                    .setDepth(1000)
                    .setStroke("#000000", 4);

                helpButton.on("pointerdown", () => {
                    this.showInstructions();
                });*/
                // Background
                this.add.image(width / 2, height / 2, "fridgeScene").setDisplaySize(width, height);
                const box = this.add.image(width / 2 - width * 0.25, height / 2 + height * 0.30, "foodbox")
                const boxScale = (height * 0.65) / box.height;
                box.setScale(boxScale);


                const chickenpkg = this.add.image(width / 2 - width * 0.25, height / 2 + height * 0.30, "beefpackage")
                const chickenpkgScale = (height * 0.18) / chickenpkg.height;
                chickenpkg.setScale(chickenpkgScale);
                chickenpkg.setVisible(false);

                const beefpkg = this.add.image(width / 2, height / 2 + height * 0.30, "beefpackage")
                const beefpkgScale = (height * 0.20) / beefpkg.height;
                beefpkg.setScale(beefpkgScale);
                beefpkg.setVisible(false);

                const onion = this.add.image(width / 2 + width * 0.25, height / 2 + height * 0.30, "onion")
                const onionScale = (height * 0.20) / onion.height;
                onion.setScale(onionScale);
                onion.setVisible(false);

                const ready1 = this.add.image(width / 2 - width * 0.25, height / 2 + height * 0.05, "readymadefood1")
                const ready1Scale = (height * 0.20) / ready1.height;
                ready1.setScale(ready1Scale);
                ready1.setVisible(false);

                const ready2 = this.add.image(width / 2 + width * 0.25, height / 2 + height * 0.05, "readymadefood2")
                const ready2Scale = (height * 0.20) / ready2.height;
                ready2.setScale(ready2Scale);
                ready2.setVisible(false);

                const egg = this.add.image(width / 2, height / 2 - height * 0.20, "egg")
                const eggScale = (height * 0.20) / egg.height;
                egg.setScale(eggScale);
                egg.setVisible(false);

                const milk = this.add.image(width / 2 + width * 0.25, height / 2 - height * 0.20, "milk")
                const milkScale = (height * 0.20) / milk.height;
                milk.setScale(milkScale);
                milk.setVisible(false);

                const bellpepper = this.add.image(width / 2 - width * 0.25, height / 2 - height * 0.20, "bellpepper")
                const bellpepperScale = (height * 0.20) / bellpepper.height;
                bellpepper.setScale(bellpepperScale);
                bellpepper.setVisible(false);
                let foodItems = [
                    { key: "chickenpackage", sprite: chickenpkg },
                    { key: "beefpackage", sprite: beefpkg },
                    { key: "onion", sprite: onion },
                    { key: "readymadefood1", sprite: ready1 },
                    { key: "readymadefood2", sprite: ready2 },
                    { key: "egg", sprite: egg },
                    { key: "milk", sprite: milk },
                    { key: "bellpepper", sprite: bellpepper }
                ];

                let fooditems = [chickenpkg, beefpkg, onion, ready1, ready2, egg, milk, bellpepper];
                const correctShelf = {
                    chickenpackage: "bottom",
                    beefpackage: "bottom",
                    bellpepper: "drawer",
                    onion: "drawer",
                    readymadefood1: "top",
                    readymadefood2: "top",
                    egg: "middle",
                    milk: "middle"
                };

                const zoneTop = new Phaser.Geom.Rectangle(
                    width * 0.59,
                    height * 0.04,
                    width * 0.28,
                    height * 0.24
                );

                const zoneShelf1 = new Phaser.Geom.Rectangle(
                    width * 0.59,
                    height * 0.30,
                    width * 0.28,
                    height * 0.28
                );


                const zoneShelf2 = new Phaser.Geom.Rectangle(
                    width * 0.59,
                    height * 0.60,
                    width * 0.28,
                    height * 0.12
                );


                const zoneShelf3 = new Phaser.Geom.Rectangle(
                    width * 0.59,
                    height * 0.73,
                    width * 0.28,
                    height * 0.10
                );

                const therm = this.add.image(width / 2 + width * 0.24, height / 2 - height * 0.415, "thermometer")
                const thermScale = (height * 0.10) / therm.height;
                therm.setScale(thermScale);

                const thermhHand = this.add.image(width / 2 + width * 0.24, height / 2 - height * 0.415, "thermometerhand")
                const thermHandScale = (height * 0.10) / thermhHand.height;
                thermhHand.setScale(thermHandScale);
                thermhHand.setAngle(-finalAngleRef.current);

                box.setInteractive({ useHandCursor: true });
                let currentFood = null;
                let currentSprite = null;
                box.on("pointerdown", () => {

                    if (currentFood !== null) return;
                    if (fridgeState !== "playing") return;
                    if (foodItems.length === 0) return;

                    const randomFood = Phaser.Utils.Array.GetRandom(foodItems);

                    const sprite = randomFood.sprite;

                    sprite.setVisible(true);

                    sprite.startX = width / 2 - width * 0.25;
                    sprite.startY = height / 2 + height * 0.30;

                    sprite.x = sprite.startX;
                    sprite.y = sprite.startY;

                    sprite.setInteractive();
                    this.input.setDraggable(sprite);

                    sprite.foodKey = randomFood.key;

                    currentFood = randomFood;
                    currentSprite = sprite;

                });
                this.input.on("drag", (pointer, gameObject, dragX, dragY) => {

                    gameObject.x = dragX;
                    gameObject.y = dragY;

                });
                this.input.on("dragend", (pointer, gameObject) => {

                    const x = gameObject.x;
                    const y = gameObject.y;

                    let droppedShelf = null;

                    if (Phaser.Geom.Rectangle.Contains(zoneTop, x, y)) {
                        droppedShelf = "top";
                    }

                    else if (Phaser.Geom.Rectangle.Contains(zoneShelf1, x, y)) {
                        droppedShelf = "middle";
                    }

                    else if (Phaser.Geom.Rectangle.Contains(zoneShelf2, x, y)) {
                        droppedShelf = "bottom";
                    }

                    else if (Phaser.Geom.Rectangle.Contains(zoneShelf3, x, y)) {
                        droppedShelf = "drawer";
                    }

                    const correct = correctShelf[gameObject.foodKey];

                    if (droppedShelf === correct) {

                        foodItems = foodItems.filter(item => item !== currentFood);
                        if (foodItems.length === 0) {
                            setFridgeState("complete");

                        } else {
                            setFridgeState("success");
                        }
                        currentFood = null;

                        if (droppedShelf === "drawer"
                        ) {
                            setfridgeSuccessState("Thats correct! Veggies go in the crisper drawer to mantain freshness. Click anywhere to get out of the textbox.")
                            gameObject.destroy();
                        }
                        if (droppedShelf === "bottom") {
                            setfridgeSuccessState("Thats correct! Meat goes on the bottom shelf to prevent cross-contamination. Click anywhere to get out of the textbox.")
                            gameObject.disableInteractive();
                        }
                        if (droppedShelf === "top") {
                            setfridgeSuccessState("Thats correct! Ready made food goes on the top shelf because it is usually precooked. Click anywhere to get out of the textbox.")
                            gameObject.disableInteractive();
                        }
                        if (droppedShelf === "middle") {
                            setfridgeSuccessState("Thats correct! Dairy goes on the middle shelf where the temperature is most consistent. Click anywhere to get out of the textbox.")
                            gameObject.disableInteractive();
                        }

                        console.log("Correct!");
                        currentFood = null;
                        currentSprite = null;

                    }
                    else {


                        setFridgeState("fail"); // React textbox trigger
                        gameObject.x = gameObject.startX;
                        gameObject.y = gameObject.startY;
                        if (correct === "drawer") {
                            setfridgefailState("Not quite! Veggies go in the crisper draw to maintain freshness.")
                        }
                        if (correct === "bottom") {
                            setfridgefailState("Not quite! Meat goes on the bottom shelf to prevent cross-contamination.")
                        }
                        if (correct === "top") {
                            setfridgefailState("Not quite! Ready made food goes on the top shelf because it is usually precooked.")
                        }
                        if (correct === "middle") {
                            setfridgefailState("Not quite! Dairy goes on the middle shelf where the temperature is most consistent.")
                        }
                    }

                });
            }
        }
        class HandScene extends Phaser.Scene {
            constructor() {
                super("HandScene");
            }

            preload() { //actually load the images for the scene. This is where you would add any new assets you want to use in this scene.
                this.load.image("sinkbg", sinkbg);

                this.load.image("cleanHand", cleanHand);
                this.load.image("dirtyHand", dirtyHand);
                this.load.image("soapSprite", soapSprite);
                this.load.image("sudImg", sudImg);
            }

            create() {
                const { width, height } = this.scale;
                let timeLeft = 20;
                let timerStarted = false;
                
                const timerText = this.add.text(
                    width * 0.77,
                    height * 0.07,
                    ":20",
                    {
                        backgroundColor: "#000000",
                        borderColor: "#ffffff",
                        borderWidth: 4,
                        fontSize: "52px",
                        color: "#ff0000",
                        fontStyle: "bold"
                    }
                ).setOrigin(0.5);
                timerText.setDepth(1000);
                const timerEvent =this.time.addEvent({
                    delay: 1000, //one second
                    loop: true,
                    paused: true, 
                    callback: () => {
                        if (timeLeft <= 0) return;
                        timeLeft--;
                        timerText.setText(":" + timeLeft.toString());

                        if (timeLeft <= 0) {

                            timerText.setText("Done!");
                            setTimerDone(true);

                        }

                    }
                });
                this.input.addPointer(3);
                this.input.dragDistanceThreshold = 0;
                this.input.dragTimeThreshold = 0;
                this.add.image(width / 2, height / 2, "sinkbg")
                    .setDisplaySize(width, height);
                // Bottom layer (trimmed hand)
                const cleanHand = this.add.image(
                    width / 2,
                    height / 2 + height * 0.05,
                    "cleanHand"
                )
                const handMaxWidth = width * 0.8;
                const scale = handMaxWidth / cleanHand.width;
                cleanHand.setScale(scale);


                const dirtyHand = this.add.image(
                    width / 2,
                    height / 2 + height * 0.05,
                    "dirtyHand"
                );

                const scale1 = (width * 0.8) / dirtyHand.width;
                dirtyHand.setScale(scale1);




                const handZone = new Phaser.Geom.Rectangle( //actual nail area for clipping
                    width / 2 - width * 0.30,
                    height / 2 - height * 0.37,
                    width * 0.60,
                    height * 0.85
                );



                const gridSize = 40; // size of each cell
                const cells = [];

                for (let x = handZone.x; x < handZone.right; x += gridSize) {
                    for (let y = handZone.y; y < handZone.bottom; y += gridSize) {
                        cells.push({
                            x,
                            y,
                            cleared: false
                        });
                    }
                }

                // Create render texture same size as long hand
                const dirtyHandRT = this.add.renderTexture(
                    dirtyHand.x,
                    dirtyHand.y,
                    dirtyHand.displayWidth,
                    dirtyHand.displayHeight
                );
                const eraseBrush = this.make.graphics({ x: 0, y: 0, add: false });
                eraseBrush.fillStyle(0xffffff);
                eraseBrush.fillCircle(0, 0, width * 0.02);
                // Draw the hidden long hand into render texture so user can erase it
                dirtyHandRT.draw(
                    dirtyHand,
                    dirtyHand.displayWidth / 2,
                    dirtyHand.displayHeight / 2
                );
                dirtyHand.setVisible(false);
                // Store original position
                const soapStartX = cleanHand.x + cleanHand.displayWidth / 2 + width * 0.05;
                const soapStartY = cleanHand.y;

                // Create soap sprite
                const soap = this.add.image(
                    soapStartX,
                    soapStartY,
                    "soapSprite"
                ).setInteractive({ draggable: true });
                const soapMaxWidth = width * 0.18;
                const baseScale = soapMaxWidth / soap.width;
                soap.setScale(baseScale);


                this.input.setDraggable(soap);

                soap.on("dragstart", () => {
                    soap.setScale(baseScale);
                });

                soap.on("dragend", () => {
                    soap.setScale(baseScale);
                });
                soap.on("drag", (pointer, dragX, dragY) => {
                    soap.x = dragX;
                    soap.y = dragY;


                    const localX = (dragX - dirtyHandRT.x) / dirtyHandRT.scaleX + dirtyHandRT.width / 2;
                    const localY = (dragY - dirtyHandRT.y) / dirtyHandRT.scaleY + dirtyHandRT.height / 2;

                    if (!timerStarted) {
                            timerStarted = true;
                            timerEvent.paused = false; 
                        }
                    if (Math.random() < 0.2) {
                        const sud = this.add.image(dragX, dragY, "sudImg");

                        const sudMaxWidth = width * 0.1 * Math.random();
                        sud.setScale(sudMaxWidth / sud.width);

                        this.tweens.add({
                            targets: sud,
                            alpha: 0,
                            duration: 800,
                            onComplete: () => sud.destroy()
                        });
                    }


                    dirtyHandRT.erase(eraseBrush, localX, localY);
                    cells.forEach(cell => {
                        if (!cell.cleared) {
                            if (
                                dragX > cell.x &&
                                dragX < cell.x + gridSize &&
                                dragY > cell.y &&
                                dragY < cell.y + gridSize
                            ) {
                                cell.cleared = true;
                            }
                        }
                    });
                    const clearedCount = cells.filter(c => c.cleared).length;
                    const percentCleared = clearedCount / cells.length;
                    if (!handsClean && percentCleared > 0.45) {
                        setHandsClean(true);
                        console.log("Hands fully clean.");
                        dirtyHandRT.setVisible(false);
                    }

                });

                // Show textbox when scene loads
                setShowSoapText(true);

                // when clipper is clicked hide the textbox

                this.events.on("shutdown", () => {
                    this.input.removeAllListeners();

                    if (dirtyHandRT) {
                        dirtyHandRT.destroy();
                    }
                });

            }
        }

        class GloveScene extends Phaser.Scene {
            constructor() {
                super("GloveScene");
            }

            preload() { //actually load the images for the scene. This is where you would add any new assets you want to use in this scene.
                this.load.image("sinkbg", sinkbg);
                this.load.image("gloveLeft", gloveLeft);
                this.load.image("gloveRight", gloveRight);
                this.load.image("gloveBox", gloveBox);
                this.load.image("handLeft", handLeft);
                this.load.image("handRight", handRight);
            }

            create() {
                let leftGlove = false;
                let rightGlove = false;
                const { width, height } = this.scale;

                this.add.image(width / 2, height / 2, "sinkbg")
                    .setDisplaySize(width, height);

                const cleanHand = this.add.image(
                    width / 2,
                    height / 2 + height * 0.05,
                    "handLeft"
                )
                const handMaxWidth = width * 0.8;
                const scale = handMaxWidth / cleanHand.width;
                cleanHand.setScale(scale);
                const cleanHand2 = this.add.image(
                    width / 2,
                    height / 2 + height * 0.05,
                    "handRight"
                )
                cleanHand2.setScale(scale);

                const gloveBox = this.add.image(
                    width * 0.75 - width * 0.043,
                    height * 0.35 - height * 0.045,
                    "gloveBox"
                );

                const gloveScale = (width * 0.13) / gloveBox.width;
                gloveBox.setScale(gloveScale);

                // Make draggable immediately
                gloveBox.setInteractive({ useHandCursor: true });
                this.input.setDraggable(gloveBox);

                this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
                    if (gameObject === gloveBox) {
                        gameObject.x = dragX;
                        gameObject.y = dragY;
                    }
                });

                gloveBox.on("dragend", () => {

                    const gloveBoxBounds = gloveBox.getBounds();
                    const leftZone = new Phaser.Geom.Rectangle( //actual nail area for clipping
                        width / 2 - width * 0.23,
                        height / 2 - height * 0.35,
                        width * 0.2,
                        height * 0.7
                    );

                    const rightZone = new Phaser.Geom.Rectangle( //actual nail area for clipping
                        width / 2,
                        height / 2 - height * 0.35,
                        width * 0.2,
                        height * 0.7
                    );

                    if (Phaser.Geom.Intersects.RectangleToRectangle(gloveBoxBounds, leftZone)) {
                        cleanHand.setTexture("gloveLeft");
                        if (rightGlove) setGlovedHands(true);
                        else leftGlove = true;

                    }
                    else if (Phaser.Geom.Intersects.RectangleToRectangle(gloveBoxBounds, rightZone)) {
                        cleanHand2.setTexture("gloveRight");
                        if (leftGlove) setGlovedHands(true);
                        else rightGlove = true;

                    }
                    else {
                        gloveBox.setPosition(
                            width * 0.75 - width * 0.043,
                            height * 0.35 - height * 0.045
                        );
                    }
                });

                setGloveInstruction(true);

                // when clipper is clicked hide the textbox
                gloveBox.on("pointerdown", () => {
                    setGloveInstruction(false);
                });
                this.events.on("shutdown", () => {
                    this.input.removeAllListeners();
                });
            }
        }

        const config = {
            type: Phaser.AUTO,
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
                width: 1920,
                height: 1080
            },
            render: {
                pixelArt: false,
                antialias: true
            },
            audio: { noAudio: true },
            transparent: false,
            backgroundColor: "#000000",
            scene: [IntroScene, ThermometerScene, FridgeScene, HandScene, GloveScene],
            parent: "phaser-game"
        };





        phaserGameRef.current = new Phaser.Game(config);
    };

    useEffect(() => {
        if (gameStage === "ThermometerScene") {
            startPhaser();

            if (phaserGameRef.current) {
                phaserGameRef.current.scene.start("ThermometerScene");
            }
        }
        if (gameStage === "FridgeScene") {
            if (phaserGameRef.current) {
                phaserGameRef.current.scene.start("FridgeScene");
            }
        }
        if (gameStage === "HandScene") {

            if (phaserGameRef.current) {
                phaserGameRef.current.scene.start("HandScene");
            }
        }
        if (gameStage === "gloveStage") {
            if (phaserGameRef.current) {
                phaserGameRef.current.scene.start("GloveScene");
            }
        }
    }, [gameStage]);

    const handleNextClick = () => {
        if (gameStage === "intro") {
            setgameStage("ThermometerScene");
        }
        if (gameStage === "ThermometerScene") {
            setgameStage("FridgeScene");
        }
        if (gameStage === "FridgeScene") {
            setgameStage("HandScene");
        }
        if (gameStage === "HandScene") {
            setgameStage("gloveStage");
        }
        if (gameStage === "gloveStage") {
            moduleUpdate(`${API}/api/game/module2/module2part1/completed`);
            navigate('/module2/cleaning', { replace: true });
        }
    };

    const introText = useTypewriter(
        "Let's move on to understanding food safety. Follow the instructions to complete each minigame.",
        true
    );
    const thermometerInstructions = useTypewriter(
        "Drag the bottom of the thermometer hand to the light blue to light red area of the thermometer to set the fridge to the correct temperature. Click anywhere to click out of the textbox.",
        thermometerState === "instructions"
    );
    const thermometerSuccessText = useTypewriter(
        "Great job! You correctly identified the food's safety which is between 0 and 40 degrees. Click next to continue.",
        thermometerState === "success"
    );
    const thermometerFailText = useTypewriter(
        "Not quite! The food is unsafe because the temperature is above 40 degrees. Click to try again.",
        thermometerState === "fail"
    );
    const fridgeFailText = useTypewriter(
        fridgefailState,
        fridgeState === "fail"
    );
    const fridgeInstructions = useTypewriter(
        "Click on the box for the food item to appear and drag to the correct shelf. Press on the \"?\" for the specific rules. Click anywhere to click out of the textbox.",
        fridgeInstructionsState === "instructions"
    );

    const fridgeSuccessText = useTypewriter(
        fridgeSuccessState,
        fridgeState === "success"
    );
    const soapText = useTypewriter("Drag the soap to the hand to clean them. Click anywhere to click out of the textbox.",
        gameStage === "HandScene" && showSoapText)
    const soapSuccessText = useTypewriter("All clean! Now lets put on some gloves.",
        gameStage === "HandScene" && handsClean && timerDone)
    const gloveText = useTypewriter("Make sure to put gloves on before touching any food. Click anywhere to click out of the textbox.",
        gameStage === "gloveStage" && gloveInstruction)
    const gloveSuccessText = useTypewriter("Gloved up!",
        gameStage === "gloveStage" && glovedHands)
    const fridgeComplete = useTypewriter("Great job! You correctly sorted the food. Click next to continue.",
        fridgeState === "complete")


    useEffect(() => {
        if (gameStage === "ThermometerScene") {
            setThermometerState("instructions");
        }
        if (gameStage === "FridgeScene") {
            setFridgeState("playing");
            setfridgefailState('');
            setfridgeSuccessState('');
        }
        if (gameStage === "HandScene") {
            setTimerDone(false);
            setShowSoapText(true);
        }
        if (gameStage === "gloveStage") {
            setGloveInstruction(true);
        }
    }, [gameStage]);

    const isNextDisabled =
        (gameStage === "ThermometerScene" && thermometerState !== "success") ||
        (gameStage === "FridgeScene" && fridgeState !== "complete") ||
        (gameStage === "HandScene" && (!handsClean || !timerDone)) ||
        (gameStage === "gloveStage" && !glovedHands);
    const overlayStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 15000,
        backgroundColor: "rgba(0,0,0,0)",
        cursor: "pointer"
    };
    const handOverlayStyle = {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 15000
    };
    return (
        <div
            className="form"
            style={{
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundColor: "black",
                height: "100dvh",
                overflow: "hidden",
                position: "relative"
            }}
        >

            <button
                className="next-button"
                disabled={isNextDisabled}
                onClick={handleNextClick}
                style={{
                    position: "absolute",
                    bottom: "5%",
                    right: "15%",
                    opacity: isNextDisabled ? 0.5 : 1,
                    pointerEvents: isNextDisabled ? "none" : "auto",
                    background: "none",
                    border: "none",
                    padding: 0,
                    zIndex: 20000
                }}
            >
                <img
                    src={nextButton}
                    alt="Next"
                    style={{
                        width: "20vw",
                        minWidth: "120px"
                    }}
                />
            </button>


            {gameStage === "intro" && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100dvw",
                        height: "100dvh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 15000
                    }}
                >
                    <Textbox
                        width="70vw"
                        height="70vh"
                        placeholder={introText}
                        placeHolderColor="#000000"
                        placeHolderfontSize="1.8vw"
                    />
                </div>
            )}

            <div
                id="phaser-game"
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100dvw",
                    height: "100dvh",
                    zIndex: 10000
                }}
            />
            {gameStage === "ThermometerScene" && thermometerState === "instructions" && (
                <div
                    onClick={() => setThermometerState("playing")}
                    style={overlayStyle}
                >
                    <div
                        style={{
                            position: "fixed",
                            right: "15vw",
                            bottom: "10vh"
                        }}
                    >
                        <Textbox
                            width="70vw"
                            height="60vh"
                            placeholder={thermometerInstructions}
                            placeHolderColor="#000000"
                            placeHolderfontSize="1.8vw"
                        />
                    </div>
                </div>
            )}
            {gameStage === "ThermometerScene" && thermometerState === "fail" && (
                <div
                    onClick={() => setThermometerState("playing")}
                    style={overlayStyle}
                >
                    <div
                        style={{
                            position: "fixed",
                            right: "15vw",
                            bottom: "10vh"
                        }}
                    >
                        <Textbox
                            width="70vw"
                            height="60vh"
                            placeholder={thermometerFailText}
                            placeHolderColor="#000000"
                            placeHolderfontSize="1.8vw"
                        />
                    </div>
                </div>
            )}
            {gameStage === "ThermometerScene" && thermometerState === "success" && (
                <div
                    style={{
                        position: "fixed",
                            right: "15vw",
                            bottom: "10vh",
                        zIndex: 15000
                    }}
                >
                    <Textbox
                        width="70vw"
                        height="60vh"
                        placeholder={thermometerSuccessText}
                        placeHolderColor="#000000"
                        placeHolderfontSize="1.8vw"
                    />
                </div>
            )}
            {gameStage === "FridgeScene" && fridgeInstructionsState === "instructions" && (
                <div
                    onClick={() => setFridgeInstructionsState("playing")}
                    style={overlayStyle}
                >
                    <div
                        style={{
                            position: "fixed",
                            right: "15vw",
                            bottom: "10vh"
                        }}
                    >
                        <Textbox
                            width="70vw"
                            height="60vh"
                            placeholder={fridgeInstructions}
                            placeHolderColor="#000000"
                            placeHolderfontSize="1.8vw"
                        />
                    </div>
                </div>
            )}


            {gameStage === "FridgeScene" && fridgeState === "fail" && (
                <div
                    onClick={() => setFridgeState("playing")}
                    style={overlayStyle}
                >
                    <div
                        style={{
                            position: "fixed",
                            right: "15vw",
                            bottom: "10vh"
                        }}
                    >
                        <Textbox
                            width="70vw"
                            height="60vh"
                            placeholder={fridgeFailText}
                            placeHolderColor="#000000"
                            placeHolderfontSize="1.8vw"
                        />
                    </div>
                </div>
            )}
            {gameStage === "FridgeScene" && fridgeState === "complete" && (
                <div
                    onClick={() => setFridgeInstructionsState("playing")}
                    style={overlayStyle}
                >
                    <div
                        style={{
                            position: "fixed",
                            right: "15vw",
                            bottom: "10vh"
                        }}
                    >
                        <Textbox
                            width="70vw"
                            height="60vh"
                            placeholder={fridgeComplete}
                            placeHolderColor="#000000"
                            placeHolderfontSize="1.8vw"
                        />
                    </div>
                </div>
            )}
            {gameStage === "HandScene" && showSoapText && (
                <div
                    onClick={() => setShowSoapText(false)}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100dvw",
                        height: "100dvh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 10000
                    }}
                >

                    <Textbox
                        width="70dvw"
                        height="70dvh"
                        placeholder={soapText}
                        placeHolderColor="#000000"
                        placeHolderfontSize="1.8vw"
                    />
                </div>
            )}

            {gameStage === "HandScene" && handsClean && timerDone && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100dvw",
                        height: "100dvh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 10000
                    }}
                >

                    <Textbox
                        width="70dvw"
                        height="70dvh"
                        placeholder={soapSuccessText}
                        placeHolderColor="#000000"
                        placeHolderfontSize="2.3vw"
                    />
                </div>

            )}

            {gameStage === "gloveStage" && gloveInstruction && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100dvw",
                        height: "100dvh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 10000
                    }}
                >
                    <div
                        onClick={() => setGloveInstruction(false)}
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100dvw",
                            height: "100dvh",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 10000
                        }}
                    >
                        <Textbox
                            width="70%"
                            height="70%"
                            placeholder={gloveText}
                            placeHolderColor="#000000"
                            placeHolderfontSize="2vw"
                        />
                    </div>
                </div>
            )}

            {gameStage === "gloveStage" && glovedHands && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100dvw",
                        height: "100dvh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 10000
                    }}
                >

                    <Textbox
                        width="70dvw"
                        height="70dvh"
                        placeholder={gloveSuccessText}
                        placeHolderColor="#000000"
                        placeHolderfontSize="1.8vw"
                    />
                </div>
            )}

            {gameStage === "FridgeScene" && fridgeState === "success" && (
                <div
                    onClick={() => setFridgeState("playing")}
                    style={overlayStyle}
                >
                    <div
                        style={{
                            position: "fixed",
                            right: "15vw",
                            bottom: "10vh"
                        }}
                    >
                        <Textbox
                            width="70vw"
                            height="60vh"
                            placeholder={fridgeSuccessText}
                            placeHolderColor="#000000"
                            placeHolderfontSize="1.8vw"
                        />
                    </div>
                </div>
            )}
           <div
  style={{
    position: "absolute",
    top: 0,
    right: 180,
    padding: "10px",
    display: "flex",
    gap: "10px",
    zIndex: 30000
  }}
>

            {gameStage === "FridgeScene" && (
                <button
                onClick={() => {
                    if (phaserGameRef.current) {
                    const scene = phaserGameRef.current.scene.getScene("FridgeScene");
                    if (scene) {
                        scene.showInstructions();
                    }
                    }
                }}
                style={{
                    font: "bold 20px sans-serif",
                    backgroundColor: "#ffffff",
                    color: "#5100ff",
                    padding: "5px 9px",
                    cursor: "pointer"
                }}
                >
                ?
                </button>
            )}

            <Settings openMenu={openMenu} />
            </div>

        </div>
    );
}

export default Module2Part1;