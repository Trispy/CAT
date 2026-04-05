
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Phaser from "phaser";

import moduleUpdate from "../../components/moduleupdate.js";

import Loc from "../../assets/Background1.png";
import Textbox from "../../components/textbox";
import textbox from "../../assets/M1G1/Textbox.png";
import useTypewriter from "../../components/typewriter";
import nextButton from "../../assets/nextbutton.png";
import sinkbg from "../../assets/M1G3/SinkBackground.png";
import gloveBox from "../../assets/M1G3/gloveBox.png";
import noGlove from "../../assets/M2G2/noGlove.png";
import gloved from "../../assets/M2G2/gloved.png";
import beef from "../../assets/M2G2/beef.png";
import bellPeppers from "../../assets/M2G2/bellpeppers.png";
import onion from "../../assets/M2G2/onion.png";
import cuttingBoard from "../../assets/M2G2/cuttingBoard.png";
import dirtyCuttingBoard from "../../assets/M2G2/cuttingboarddirty.png";
import dirtyBellpepper from "../../assets/M2G2/dirtyBellpeppers.png";
import dirtyOnion from "../../assets/M2G2/dirtyOnion.png";
import beefBowl from "../../assets/M2G2/BeefBowl.png";
import onionBowl from "../../assets/M2G2/OnionBowl.png";
import pepperBowl from "../../assets/M2G2/PepperBowl.png";
import sprayBottle from "../../assets/M2G2/Spraybottle.png";
import rag from "../../assets/M2G2/rag.png";
import wetCuttingBoard from "../../assets/M2G2/watercuttingboard.png";
import knife from "../../assets/M2G2/Knife.png";

export default function Cleaning() {
    const phaserGameRef = useRef(null); // this prevents multiple Phaser instances
    const navigate = useNavigate();
    useEffect(() => {
        return () => {
            if (phaserGameRef.current) {
                phaserGameRef.current.destroy(false);
                phaserGameRef.current = null;
            }
        };
    }, []);
    useEffect(() => {
        startPhaser();
    }, []);

    const [gameStage, setGameStage] = useState("intro");
    const backgroundStyle = {
        backgroundImage: gameStage === "cleanStage" ? "none" : `url(${Loc})`,
        minHeight: '100vh',
        backgroundSize: 'contain',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'black'
    };



    const [showSoapText, setShowSoapText] = useState(false);
    const [handsClean, setHandsClean] = useState(false);
    const [gloveInstruction, setGloveInstruction] = useState(false);
    const [glovedHands, setGlovedHands] = useState(false);
    const [cutMaterials, setCutMaterials] = useState('');
    const [showCutText, setShowCutText] = useState(false);
    const [showCutSuccessText, setShowCutSuccessText] = useState(false);
    const [instructionStep, setInstructionStep] = useState(0);
    const numberOfCutMaterials = useRef(0);
    useEffect(() => {
        window.handleNext = handleNextClick;
    }, [gameStage]);
    const introText = useTypewriter("Time to start prepping some food! Follow the instructions in the next slide!",
        gameStage === "intro");
    const instructionText = useTypewriter("In the following game, we will be going through essential personal hygiene steps to follow once you arrive at the volunteer location. Progress in the game by dragging items to the correct area using your finger.",
        gameStage === "instruction");
    const apronSuccessText = useTypewriter("You are now fully dressed! Let's go wash our hands and put some gloves on before interacting with the food.",
        gameStage === "apron")
    const finalText = useTypewriter("You have now completed the basic hygiene module. Let's move on to the basic food safety module!",
        gameStage === "finalStage")
    const soapText = useTypewriter("Soap the hand.",
        gameStage === "soapyHands" && showSoapText)
    const soapSuccessText = useTypewriter("All clean! Now lets put on some gloves.",
        gameStage === "soapyHands" && handsClean)
    const gloveText = useTypewriter("Make sure to put gloves on before touching any food",
        gameStage === "gloveStage" && gloveInstruction)
    const gloveSuccessText = useTypewriter("Gloved up!",
        gameStage === "gloveStage" && glovedHands)
    const cutInstructionText = useTypewriter("Drag the knife over the food to chop it up.",
        gameStage === "cutting" && showCutText)
    const cutSuccessText = useTypewriter("You have successfully chopped the food!",
        gameStage === "cutting" && showCutSuccessText)
    const instructionTexts = [
        "1. Drag the dirty food from the cabinet to the sink to wash it.",
        "2. After washing both onion and peppers, clean the cutting board with spray bottle and rag before chopping.",
        "3. Next, cut one of the vegetables.",
        "4. Make sure to change gloves in between each food by dragging the gloves to the volunteer.",
        "5. Make sure to clean the cutting board in between each item by clicking on the spray bottle.",
        "6. Now drag the beef thats on top of the fridge onto the cutting board. Make sure that you have fresh gloves and clean cutting board before you proceed.",
        "7. The items you will clean and cut are the bell peppers and onions that are located in the cabinet and the beef that is located on the top of the fridge.",
        "Click the '?' button in the bottom right side if you want to refer back to these instructions."
    ];

    const instructionTypewriter = useTypewriter(
        instructionTexts[instructionStep],
        gameStage === "instructions" && instructionStep >= 0,
        30
    );

    const startPhaser = () => {
        if (phaserGameRef.current) return;
        class IntroScene extends Phaser.Scene {
            constructor() {
                super("IntroScene");
            }

            preload() {
                this.load.image("introBg", Loc);
            }

            create() {
                const { width, height } = this.scale;

                this.add.image(width / 2, height / 2, "introBg")
                    .setDisplaySize(width, height);
            }
        }
        class InstructionScene extends Phaser.Scene {
            constructor() {
                super("InstructionScene");
            }

            preload() {
                this.load.image("instructionBg", Loc); // reuse same background
            }

            create() {
                const { width, height } = this.scale;

                this.add.image(width / 2, height / 2, "instructionBg")
                    .setDisplaySize(width, height);

            }
        }

        class CleanScene extends Phaser.Scene {
            constructor() {
                super("CleanScene");

            }
            init(data = {}) {
                this.instructions = data.instructions || [];
            }
            preload() { //actually load the images for the scene. This is where you would add any new assets you want to use in this scene.
                this.load.image("volLocation", Loc);
                this.load.image("sinkbg", sinkbg);
                this.load.image("noGlove", noGlove);
                this.load.image("gloved", gloved);
                this.load.image("nextButton", nextButton);
                this.load.image("beef", beef);
                this.load.image("onion", onion);
                this.load.image("bellpepper", bellPeppers);
                this.load.image("dirtyOnion", dirtyOnion);
                this.load.image("dirtyBellpepper", dirtyBellpepper);
                this.load.image("beefBowl", beefBowl);
                this.load.image("onionBowl", onionBowl);
                this.load.image("pepperBowl", pepperBowl);
                this.load.image("sprayBottle", sprayBottle);
                this.load.image("cuttingBoard", cuttingBoard);
                this.load.image("dirtyCuttingBoard", dirtyCuttingBoard);
                this.load.image("wetCuttingBoard", wetCuttingBoard);
                this.load.image("rag", rag);
                this.load.image("knife", knife);
                this.load.image("gloveBox", gloveBox);
                this.load.image("textbox", textbox);
            }
            showInstructions() {
                const { width, height } = this.scale;

                const overlay = this.add.container(0, 0);

                const bg = this.add.rectangle(
                    width / 2,
                    height / 2,
                    width * 0.8,
                    height * 0.8,
                    0xffffff
                ).setStrokeStyle(4, 0x000000);

                const text = this.add.text(
                    width / 2,
                    height / 2,
                    this.instructions.join("\n\n"),
                    {
                        font: "32px Arial",
                        color: "#000",
                        wordWrap: { width: width * 0.7 }
                    }
                ).setOrigin(0.5);

                const close = this.add.text(
                    width * 0.85,
                    height * 0.15,
                    "X",
                    {
                        font: "40px Arial",
                        backgroundColor: "#e2e2e2",
                        padding: { x: 10, y: 5 }
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
                this.scale.refresh();
                this.add.image(width / 2, height / 2, "volLocation").setDisplaySize(width, height);
                let boardClean = false;
                const helpButton = this.add.text(
                    width * 0.78,
                    height * 0.90,
                    "?",
                    {
                        font: "60px Arial",
                        backgroundColor: "#ffffff",
                        color: "#5100ff",
                        padding: { x: 50, y: 30 }
                    }
                )
                    .setOrigin(0.5)
                    .setInteractive({ useHandCursor: true })
                    .setDepth(1000)
                    .setStroke("#000000", 4);

                helpButton.on("pointerdown", () => {
                    this.showInstructions();
                });
                // Character
                const character = this.add.image(
                    width - width * 0.40,
                    height * 0.65,
                    "gloved"
                );
                const charScale = (height * 0.7) / character.height;
                character.setScale(charScale);

                const sinkZone = new Phaser.Geom.Rectangle( //interactive sink area
                    width * 0.002,
                    height / 2 - height * 0.05,
                    width * 0.19,
                    height * 0.25
                );

                const boardZone = new Phaser.Geom.Rectangle( //interactive cutting board area
                    width / 2 - width * 0.22,
                    height / 2 - height * 0.05,
                    width * 0.15,
                    height * 0.13
                );

                const onionIcon = this.add.image(
                    width * 0.5,
                    height * 0.15,
                    "dirtyOnion"
                );
                const onionScale = (width * 0.05) / onionIcon.width;
                onionIcon.setScale(onionScale);
                onionIcon.setInteractive({ useHandCursor: true });
                this.input.setDraggable(onionIcon);

                const pepperIcon = this.add.image(
                    width * 0.40,
                    height * 0.10,
                    "dirtyBellpepper"
                );
                const pepperScale = (width * 0.10) / pepperIcon.width;
                pepperIcon.setScale(pepperScale);
                pepperIcon.setInteractive({ useHandCursor: true });
                this.input.setDraggable(pepperIcon);

                const beefIcon = this.add.image(
                    width * 0.80,
                    height * 0.10,
                    "beef"
                );
                const beefScale = (width * 0.06) / beefIcon.width;
                beefIcon.setScale(beefScale);
                beefIcon.setInteractive({ useHandCursor: true });
                this.input.setDraggable(beefIcon);

                const bottleIcon = this.add.image(
                    width * 0.20,
                    height * 0.5,
                    "sprayBottle"
                );
                const bottleScale = (width * 0.05) / bottleIcon.width;
                bottleIcon.setScale(bottleScale);
                bottleIcon.setInteractive({ useHandCursor: true });
                this.input.setDraggable(bottleIcon);

                const gloveIcon = this.add.image(
                    width * 0.47,
                    height * 0.45,
                    "gloveBox"
                );
                const gloveScale = (width * 0.05) / gloveIcon.width;
                gloveIcon.setScale(gloveScale);
                gloveIcon.setInteractive({ useHandCursor: true });
                this.input.setDraggable(gloveIcon);

                // show rectangle
                /*
                const objBounds = bottleIcon.getBounds();
                const graphics = this.add.graphics({
                    fillStyle: { color: 0xff0000 },
                    lineStyle: { width: 4, color: 0x00ff00 }
                });
                graphics.alpha = 0.5;
                graphics.fillRectShape(objBounds)
                */



                this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
                    if (gameObject === onionIcon) {
                        gameObject.x = dragX;
                        gameObject.y = dragY;
                    }
                    else if (gameObject === pepperIcon) {
                        gameObject.x = dragX;
                        gameObject.y = dragY;
                    }
                    else if (gameObject === beefIcon) {
                        gameObject.x = dragX;
                        gameObject.y = dragY;
                    }
                    else if (gameObject === bottleIcon) {
                        gameObject.x = dragX;
                        gameObject.y = dragY;
                    }
                    else if (gameObject === gloveIcon) {
                        gameObject.x = dragX;
                        gameObject.y = dragY;
                    }
                });

                onionIcon.on("dragend", () => {

                    const onionBounds = onionIcon.getBounds();

                    if (Phaser.Geom.Intersects.RectangleToRectangle(onionBounds, sinkZone)) {
                        if (onionIcon.texture.key === "dirtyOnion") {
                            this.wash("dirtyOnion", "onion");
                            onionIcon.setTexture("onion");
                        }
                        else this.showMes("Onion already washed");
                    }
                    else if (Phaser.Geom.Intersects.RectangleToRectangle(onionBounds, boardZone)) {
                        if (onionIcon.texture.key === "onion") {
                            if (!boardClean) this.showMes("Make sure to clean the board before every item.");
                            else if (character.texture.key === "noGlove") this.showMes("Put on new gloves before interacting with new food.");
                            else {
                                boardClean = false;
                                this.chopping("onion", "onionBowl", "knife");
                                onionIcon.setTexture("onionBowl");
                                const oScale = (width * 0.05) / onionIcon.width;
                                onionIcon.setScale(oScale);
                                character.setTexture("noGlove");
                            }
                        }
                        else if (onionIcon.texture.key === "dirtyOnion") {
                            this.showMes("Wash the vegetables before chopping.");
                        }
                    }
                    this.checkWin();
                    onionIcon.setPosition(
                        width * 0.5,
                        height * 0.15,
                    );
                });

                pepperIcon.on("dragend", () => {

                    const pepperBounds = pepperIcon.getBounds();

                    if (Phaser.Geom.Intersects.RectangleToRectangle(pepperBounds, sinkZone)) {
                        this.wash("dirtyBellpepper", "bellpepper");
                        pepperIcon.setTexture("bellpepper");
                    }
                    else if (Phaser.Geom.Intersects.RectangleToRectangle(pepperBounds, boardZone)) {
                        if (pepperIcon.texture.key === "bellpepper") {
                            if (!boardClean) this.showMes("Make sure to clean the board before every item.");
                            else if (character.texture.key === "noGlove") this.showMes("Put on new gloves before interacting with new food.");
                            else {
                                this.chopping("bellpepper", "pepperBowl", "knife");
                                pepperIcon.setTexture("pepperBowl");
                                boardClean = false;
                                character.setTexture("noGlove");
                            }
                        }
                        else if (pepperIcon.texture.key === "dirtyBellpepper") {
                            this.showMes("Wash the vegetables before chopping.");
                        }
                    }
                    this.checkWin();
                    pepperIcon.setPosition(
                        width * 0.40,
                        height * 0.15
                    );
                });

                beefIcon.on("dragend", () => {

                    const beefBounds = beefIcon.getBounds();

                    if (Phaser.Geom.Intersects.RectangleToRectangle(beefBounds, boardZone)) {
                        if (beefIcon.texture.key === "beef") {
                            if (!boardClean) this.showMes("Make sure to clean the board before every item.");
                            else if (character.texture.key === "noGlove") this.showMes("Put on new gloves before interacting with new food to prevent cross-contamination.");
                            else {
                                this.chopping("beef", "beefBowl", "knife");
                                beefIcon.setTexture("beefBowl");
                                const bScale = (width * 0.10) / beefIcon.width;
                                beefIcon.setScale(bScale);
                                boardClean = false;
                                character.setTexture("noGlove");
                            }
                        }
                    }
                    this.checkWin();
                    beefIcon.setPosition(
                        width * 0.80,
                        height * 0.10,
                    );
                });

                bottleIcon.on("dragend", () => {
                    const bottleBounds = bottleIcon.getBounds();

                    if (Phaser.Geom.Intersects.RectangleToRectangle(bottleBounds, boardZone)) {
                        if (!boardClean) {
                            this.disinfect();
                            boardClean = true;
                        }
                    }
                    bottleIcon.setPosition(
                        width * 0.20,
                        height * 0.5,
                    );
                });

                gloveIcon.on("dragend", () => {
                    const gloveBounds = gloveIcon.getBounds();
                    const charBounds = character.getBounds();

                    if (Phaser.Geom.Intersects.RectangleToRectangle(gloveBounds, charBounds)) {
                        if (character.texture.key === "noGlove") {
                            character.setTexture("gloved");
                        }
                    }
                    gloveIcon.setPosition(
                        width * 0.47,
                        height * 0.45,
                    );
                });

                this.events.on("startClean", () => {
                    onionIcon.setInteractive({ useHandCursor: true });
                    pepperIcon.setInteractive({ useHandCursor: true })
                    beefIcon.setInteractive({ useHandCursor: true })
                });
                this.events.on("shutdown", () => {
                    this.input.removeAllListeners();
                });
            }

            wash(dirty, clean) {
                const { width, height } = this.scale;
                this.volScreen = this.add.container(0, 0);
                const bg = this.add.image(width / 2, height / 2, "sinkbg")
                    .setDisplaySize(width, height);
                this.volScreen.add(bg);

                const cleanIcon = this.add.image(
                    width / 4,
                    height / 4,
                    clean
                );

                const icon = this.add.image(
                    width / 4,
                    height / 4,
                    dirty
                );

                const scale = (width * 0.10) / icon.width;
                icon.setScale(scale);
                cleanIcon.setScale(scale);

                // Make draggable immediately
                icon.setInteractive({ useHandCursor: true });
                this.input.setDraggable(icon);

                cleanIcon.setInteractive({ useHandCursor: true });
                this.input.setDraggable(cleanIcon);

                const waterZone = new Phaser.Geom.Polygon( //interactive sink area
                    [
                        { x: width * 0.25, y: height / 2 - height * 0.045 },
                        { x: width * 0.25 + width * 0.5, y: height / 2 - height * 0.045 },
                        { x: width * 0.25 + width * 0.5, y: height / 2 - height * 0.045 + height * 0.20 },
                        { x: width * 0.25 + width * 0.45, y: height / 2 - height * 0.045 + height * 0.27 },
                        { x: width * 0.25 + width * 0.05, y: height / 2 - height * 0.045 + height * 0.27 },
                        { x: width * 0.25, y: height / 2 - height * 0.045 + height * 0.20 },
                    ]
                );

                const graphics = this.add.graphics({
                    fillStyle: { color: 0x4f59a8 },
                    lineStyle: { width: 4, color: 0x4f59a8 }
                });
                graphics.alpha = 0.5;
                graphics.fillPoints(waterZone.points);

                this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
                    if (gameObject === icon) {

                        gameObject.x = dragX;
                        gameObject.y = dragY;

                        cleanIcon.x = dragX;
                        cleanIcon.y = dragY;

                        const bounds = icon.getBounds();
                        if (Phaser.Geom.Intersects.RectangleToRectangle(bounds, waterZone)) {
                            icon.alpha = Math.max(0, icon.alpha - 0.025);

                            if (icon.alpha <= 0) {
                                icon.destroy();
                                cleanIcon.destroy();
                                graphics.destroy();
                                this.volScreen.destroy(true);
                                return;
                            }
                        }
                    }
                });
            }

            disinfect() {
                const { width, height } = this.scale;
                this.volScreen = this.add.container(0, 0);
                const bg = this.add.image(width / 2, height / 2, "cuttingBoard")
                    .setDisplaySize(width, height);
                this.volScreen.add(bg);

                const wetBoard = this.add.image(width / 2, height / 2, "wetCuttingBoard")
                    .setDisplaySize(width, height);

                const dirtyBoard = this.add.image(width / 2, height / 2, "dirtyCuttingBoard")
                    .setDisplaySize(width, height);

                dirtyBoard.setVisible(false);

                const boardZone = new Phaser.Geom.Rectangle( //actual nail area for clipping
                    width * 0.12,
                    height / 2 - height * 0.30,
                    width * 0.75,
                    height * 0.60
                );

                const gridSize = 20; // size of each cell
                const cells = [];

                for (let x = boardZone.x; x < boardZone.right; x += gridSize) {
                    for (let y = boardZone.y; y < boardZone.bottom; y += gridSize) {
                        cells.push({
                            x,
                            y,
                            cleared: false
                        });
                    }
                }

                // Create render texture same size as long hand
                const dirtyBoardRT = this.add.renderTexture(
                    dirtyBoard.x,
                    dirtyBoard.y,
                    dirtyBoard.displayWidth,
                    dirtyBoard.displayHeight
                );

                // Draw the hidden long hand into render texture so user can erase it
                dirtyBoardRT.draw(
                    dirtyBoard,
                    dirtyBoard.displayWidth / 2,
                    dirtyBoard.displayHeight / 2
                );

                dirtyBoard.destroy();

                const bottleIcon = this.add.image(
                    width / 6,
                    height / 6,
                    "sprayBottle"
                );
                const bottleScale = (width * 0.15) / bottleIcon.width;
                bottleIcon.setScale(bottleScale);
                bottleIcon.setInteractive({ useHandCursor: true });
                this.input.setDraggable(bottleIcon);

                const eraseBrush = this.make.graphics({ x: 0, y: 0, add: false });
                eraseBrush.fillStyle(0xffffff);
                eraseBrush.fillCircle(0, 0, width * 0.08);

                this.input.setDraggable(bottleIcon);

                bottleIcon.on("dragstart", () => {
                    bottleIcon.setScale(bottleScale);
                });

                bottleIcon.on("dragend", () => {
                    bottleIcon.setScale(bottleScale);
                });

                let sprayed = false;

                this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
                    if (gameObject !== bottleIcon) return;


                    bottleIcon.x = dragX;
                    bottleIcon.y = dragY;

                    dirtyBoardRT.erase(eraseBrush, dragX, dragY);
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
                    if (!sprayed && percentCleared > 0.13) {
                        bottleIcon.destroy();
                        dirtyBoardRT.destroy();
                        sprayed = true;
                        wetBoard.destroy();
                        this.dryBoard();
                        this.volScreen.destroy(true);
                        return;
                    }
                });
            }

            dryBoard() {
                const { width, height } = this.scale;
                const bg = this.add.image(width / 2, height / 2, "cuttingBoard")
                    .setDisplaySize(width, height);

                const eraseBrush = this.make.graphics({ x: 0, y: 0, add: false });
                eraseBrush.fillStyle(0xffffff);
                eraseBrush.fillCircle(0, 0, width * 0.08);

                const gridSize = 20;

                const boardZone = new Phaser.Geom.Rectangle( //actual nail area for clipping
                    width * 0.12,
                    height / 2 - height * 0.30,
                    width * 0.75,
                    height * 0.60
                );

                const cells2 = [];
                for (let x = boardZone.x; x < boardZone.right; x += gridSize) {
                    for (let y = boardZone.y; y < boardZone.bottom; y += gridSize) {
                        cells2.push({
                            x,
                            y,
                            cleared: false
                        });
                    }
                }

                const wetBoard = this.add.image(width / 2, height / 2, "wetCuttingBoard")
                    .setDisplaySize(width, height);

                wetBoard.setVisible(false);

                // Create render texture same size as long hand
                const wetBoardRT = this.add.renderTexture(
                    wetBoard.x,
                    wetBoard.y,
                    wetBoard.displayWidth,
                    wetBoard.displayHeight
                );

                // Draw the hidden long hand into render texture so user can erase it
                wetBoardRT.draw(
                    wetBoard,
                    wetBoard.displayWidth / 2,
                    wetBoard.displayHeight / 2
                );

                wetBoard.destroy();

                const ragIcon = this.add.image(
                    width / 6,
                    height / 6,
                    "rag"
                );
                const ragScale = (width * 0.15) / ragIcon.width;
                ragIcon.setScale(ragScale);
                ragIcon.setInteractive({ useHandCursor: true });
                this.input.setDraggable(ragIcon);

                this.input.setDraggable(ragIcon);

                ragIcon.on("dragstart", () => {
                    ragIcon.setScale(ragScale);
                });

                ragIcon.on("dragend", () => {
                    ragIcon.setScale(ragScale);
                });

                this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
                    if (gameObject !== ragIcon) return;


                    ragIcon.x = dragX;
                    ragIcon.y = dragY;

                    wetBoardRT.erase(eraseBrush, dragX, dragY);
                    cells2.forEach(cell => {
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
                    const clearedCount = cells2.filter(c => c.cleared).length;
                    const percentCleared = clearedCount / cells2.length;
                    if (percentCleared > 0.10) {
                        ragIcon.destroy();
                        wetBoardRT.destroy();
                        bg.destroy();
                        return;
                    }
                });
            }

            chopping(uncutfoodstring, cutfoodstring, knifestring) {
                const { width, height } = this.scale;

                const bg = this.add.image(width / 2, height / 2, "cuttingBoard")
                    .setDisplaySize(width, height);

                const uncutfood = this.add.image(
                    width / 2,
                    height / 2,
                    uncutfoodstring);
                const uncutScale = (width * 0.30) / uncutfood.width;
                uncutfood.setScale(uncutScale);

                const cutfood = this.add.image(
                    width / 2,
                    height / 2,
                    cutfoodstring);
                const cutScale = (width * 0.30) / cutfood.width;
                cutfood.setScale(cutScale);

                const uncutRT = this.add.renderTexture(
                    uncutfood.x,
                    uncutfood.y,
                    uncutfood.displayWidth,
                    uncutfood.displayHeight
                );

                // Draw the hidden long hand into render texture so user can erase it
                uncutRT.draw(
                    uncutfood,
                    uncutfood.displayWidth / 2,
                    uncutfood.displayHeight / 2
                );

                uncutfood.destroy();

                cutfood.setDepth(0);
                uncutRT.setDepth(1);


                const boardZone = new Phaser.Geom.Rectangle( //interactive cutting board area
                    width / 2 - width * 0.22,
                    height / 2 - height * 0.05,
                    width * 0.15,
                    height * 0.13
                );

                const gridSize = 20; // size of each cell
                const cells = [];

                for (let x = boardZone.x; x < boardZone.right; x += gridSize) {
                    for (let y = boardZone.y; y < boardZone.bottom; y += gridSize) {
                        cells.push({
                            x,
                            y,
                            cleared: false
                        });
                    }
                }
                let chopped = false;

                uncutfood.destroy();
                const eraseBrush = this.make.graphics({ x: 0, y: 0, add: false });
                eraseBrush.fillStyle(0xffffff);
                eraseBrush.fillCircle(0, 0, width * 0.04);

                const knifeStartX = cutfood.x + cutfood.displayWidth / 2 + width * 0.05;
                const knifeStartY = cutfood.y;

                const knife = this.add.image(
                    knifeStartX,
                    knifeStartY,
                    knifestring);
                const knifeScale = (width * 0.30) / knife.width;
                knife.setScale(knifeScale);
                knife.setInteractive({ useHandCursor: true });
                const baseScale = (width * 0.10) / knife.width;
                this.input.setDraggable(knife);

                knife.on("dragstart", () => {
                    knife.setScale(knifeScale);
                });

                knife.on("dragend", () => {
                    knife.setScale(baseScale)
                });

                this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
                    if (gameObject !== knife) return;


                    knife.x = dragX;
                    knife.y = dragY;


                    const tipOffsetX = -knife.displayWidth * 0.28;
                    const tipOffsetY = knife.displayHeight * 0.18;

                    const tipX = dragX + tipOffsetX;
                    const tipY = dragY + tipOffsetY;


                    const localX = (tipX - uncutRT.x) / uncutRT.scaleX + uncutRT.width / 2;
                    const localY = (tipY - uncutRT.y) / uncutRT.scaleY + uncutRT.height / 2;


                    uncutRT.erase(eraseBrush, localX, localY);
                    cells.forEach(cell => {
                        if (!cell.cleared) {
                            if (
                                tipX > cell.x &&
                                tipX < cell.x + gridSize &&
                                tipY > cell.y &&
                                tipY < cell.y + gridSize
                            ) {
                                cell.cleared = true;
                            }
                        }
                    });
                    const clearedCount = cells.filter(c => c.cleared).length;
                    const percentCleared = clearedCount / cells.length;
                    if (!chopped && percentCleared > 0.20) {
                        chopped = true;
                        setCutMaterials(cutfoodstring);
                        uncutRT.destroy();
                        knife.destroy();
                        cutfood.destroy();
                        bg.destroy();
                        numberOfCutMaterials.current += 1;
                        this.checkWin();
                        return;
                    }

                });
            }

            checkWin() {
                if (numberOfCutMaterials.current === 3) {
                    this.showMes("Win condition met");
                    moduleUpdate("http://localhost:3001/api/game/module2/chopping/completed");
                    navigate('/module2/cooking', { replace: true });
                }
            }

            showMes(message) {
                const { width, height } = this.scale;

                const box = this.add.container(width / 2, height / 2);

                const bg = this.add.image(0, 0, "textbox")
                    .setDisplaySize(width * 0.7, height * 0.5)
                    .setInteractive();

                let displayText = "";

                if (Array.isArray(message)) {
                    displayText = message.join("\n\n");
                }
                else {
                    displayText = message;
                }

                const text = this.add.text(
                    0,
                    0,
                    "",
                    {
                        fontFamily: "sans-serif",
                        fontSize: "45px",
                        fontStyle: "bold",
                        color: "#000",
                        wordWrap: { width: width * 0.55 },
                        align: "center"
                    }
                ).setOrigin(0.5);

                box.add([bg, text]);

                // Typewriter
                let i = 0;

                const typingEvent = this.time.addEvent({
                    delay: 30,
                    repeat: displayText.length - 1,
                    callback: () => {
                        if (!text || !text.scene) return;
                        text.setText(text.text + displayText[i]);
                        i++;
                    }
                });

                bg.once("pointerdown", () => {
                    typingEvent.remove();
                    box.destroy(true);
                });

                return box;
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
            scene: [IntroScene, InstructionScene, CleanScene],
            parent: "phaser-game"
        };
        phaserGameRef.current = new Phaser.Game(config);
        setTimeout(() => {
            if (phaserGameRef.current) {
                phaserGameRef.current.scene.start("IntroScene");

            }
        }, 100);
    }

    const handleNextClick = (e) => { //handles the logic for transitioning between scenes based on the current game stage and user actions. It checks the current game stage and relevant state variables to determine if the user has completed the necessary actions to move to the next stage, then updates the game stage and starts the appropriate Phaser scene.
        if (gameStage === "intro") {
            setGameStage("instructions");

            if (phaserGameRef.current) {
                phaserGameRef.current.scene.start("InstructionScene");
            }

            return;
        }
        else {
            setGameStage("cleanStage");
            setInstructionStep(0);
            if (phaserGameRef.current) {
                phaserGameRef.current.scene.start("CleanScene", {
                    instructions: instructionTexts
                });
            }
        }
    };
    const handleInstructionClick = () => {

        if (instructionStep < instructionTexts.length - 1) {
            setInstructionStep(prev => prev + 1);
        }
        else {

            setGameStage("cleanStage");

            if (phaserGameRef.current) {
                phaserGameRef.current.scene.start("CleanScene", {
                    instructions: instructionTexts
                });
            }
        }
    };

    return (
        <div
            className="form"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "black",
                backgroundRepeat: "no-repeat",
                backgroundColor: "black",
                height: "100dvh",
                overflowY: "auto",
                overflowX: "hidden",
                position: "relative"
            }}
        >


            <div
                style={{
                    position: "absolute",
                    bottom: "5%",
                    right: "15%",
                    zIndex: 20000,
                    width: "20vw",
                    minWidth: "120px",
                    height: "auto",
                    pointerEvents: "none"
                }}
            >

                <img
                    src={nextButton}
                    alt="Next"
                    style={{
                        width: "100%",
                        display: "block"
                    }}
                />


                <div
                    onClick={handleNextClick}
                    style={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        width: "140px",
                        height: "80px",
                        cursor: "pointer",
                        pointerEvents: "auto",
                    }}
                />
            </div>


            {gameStage === "intro" && (
                <div
                    onClick={handleInstructionClick}
                    style={{
                        position: "fixed",
                        top: -50,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        zIndex: 15000,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        pointerEvents: gameStage === "intro" ? "auto" : "none"
                    }}
                >
                    <Textbox
                        width="70dvw"
                        height="70dvh"
                        placeholder={introText}
                        placeHolderColor="#000000"
                        placeHolderfontSize="1.8vw"
                    />
                </div>
            )}
            {gameStage === "instructions" && (
                <div
                    onClick={handleInstructionClick}
                    style={{
                        position: "fixed",
                        top: -50,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        zIndex: 15000,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        pointerEvents: gameStage === "instructions" ? "auto" : "none"
                    }}
                >
                    <Textbox
                        width="70dvw"
                        height="70dvh"
                        placeholder={instructionTypewriter}
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
                    width: "100vw",
                    height: "100dvh",
                    zIndex: 1,

                }}
            />
        </div>
    );
}
