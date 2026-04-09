import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Phaser from "phaser";

import moduleUpdate from "../../components/moduleupdate.js";

import Loc from "../../assets/M4G1/blank.png";
import Textbox from "../../components/textbox";
import textbox from "../../assets/M1G1/Textbox.png";
import useTypewriter from "../../components/typewriter";
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
import mapbutton from "../../assets/mapbutton.png";

import cleanToteImg from "../../assets/M4G1/cleanTote.png";
import dirtyTote from "../../assets/M4G1/dirtyTote.png";
import leaf1 from "../../assets/M4G1/leaf1.png";
import leaf2 from "../../assets/M4G1/leaf2.png";
import leaf3 from "../../assets/M4G1/leaf3.png";
import leaf4 from "../../assets/M4G1/leaf4.png";
import leaf5 from "../../assets/M4G1/leaf5.png";
import leaf6 from "../../assets/M4G1/leaf6.png";
import leaf7 from "../../assets/M4G1/leaf7.png";
import leaf8 from "../../assets/M4G1/leaf8.png";
import trashCan from "../../assets/M4G1/trashCan.png";
import sanitizer from "../../assets/M4G1/sanitizerOutlined.png";
import spray from "../../assets/M4G1/spray.png";
import Settings from "../../components/settings";

export default function CleanTote({openMenu}) {
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

    // const [showSoapText, setShowSoapText] = useState(false);
    // const [handsClean, setHandsClean] = useState(false);
    // const [gloveInstruction, setGloveInstruction] = useState(false);
    // const [glovedHands, setGlovedHands] = useState(false);
    // const [cutMaterials, setCutMaterials] = useState('');
    // const [showCutText, setShowCutText] = useState(false);
    // const [showCutSuccessText, setShowCutSuccessText] = useState(false);
    const [instructionStep, setInstructionStep] = useState(0);
    const numberOfCutMaterials = useRef(0);
    useEffect(() => {
        window.handleNext = handleNextClick;
    }, [gameStage]);
    const introText = useTypewriter("Time to start prepping some food! Follow the instructions in the next slide!",
        gameStage === "intro");
    /*const instructionText = useTypewriter("In the following game, we will be going through essential personal hygiene steps to follow once you arrive at the volunteer location. Progress in the game by dragging items to the correct area using your finger.",
        gameStage === "instructions");
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
        gameStage === "cutting" && showCutSuccessText)*/
    const instructionTexts = [
        "1. Remove the large debris from the tote by dragging the leaves to the trash icon.",
        "2. Wash the tote by dragging the spray bottle to the tote.",
        "3. Rinse the soap out by dragging the tote to the sink.",
        "4. Finally, sanitize the tote by dragging the red sanitizer bucket to it.",
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

        class CleanToteScene extends Phaser.Scene {
            constructor() {
                super("CleanToteScene");
            }
            init(data = {}) {
                this.instructions = data.instructions || [];
            }
            preload() { //actually load the images for the scene. This is where you would add any new assets you want to use in this scene.
                this.load.image("volLocation", Loc);
                this.load.image("sinkbg", sinkbg);

                this.load.image("noGlove", noGlove);
                this.load.image("gloved", gloved);
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
                this.load.image("knife", knife);
                this.load.image("gloveBox", gloveBox);

                this.load.image("textbox", textbox);

                this.load.image("cleanToteImg", cleanToteImg);
                this.load.image("dirtyToteImg", dirtyTote);
                this.load.image("leaf1", leaf1);
                this.load.image("leaf2", leaf2);
                this.load.image("leaf3", leaf3);
                this.load.image("leaf4", leaf4);
                this.load.image("leaf5", leaf5);
                this.load.image("leaf6", leaf6);
                this.load.image("leaf7", leaf7);
                this.load.image("leaf8", leaf8);
                this.load.image("trashCan", trashCan);
                this.load.image("sanitizer", sanitizer);
                this.load.image("spray", spray);
                this.load.image("rag", rag);
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
                let noDebris = false;
                const { width, height } = this.scale;
                this.scale.refresh();
                this.add.image(width / 2, height / 2, "volLocation").setDisplaySize(width, height);
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

                const toteIcon = this.add.image(
                    width * 0.5,
                    height * 0.5,
                    "dirtyToteImg"
                );
                const toteScale = (width * 0.55) / toteIcon.width;
                toteIcon.setScale(toteScale);
                toteIcon.setInteractive({ useHandCursor: true });

                const toteZone = toteIcon.getBounds();

                this.leaves = [];

                const leaf1Icon = this.add.image(
                    width * 0.50,
                    height * 0.50,
                    "leaf1"
                );
                leaf1Icon.setScale(toteScale);
                leaf1Icon.setInteractive({ useHandCursor: true });
                this.input.setDraggable(leaf1Icon);

                this.leaves.push(leaf1Icon);

                const leaf2Icon = this.add.image(
                    width * 0.60,
                    height * 0.40,
                    "leaf2"
                );
                leaf2Icon.setScale(toteScale);
                leaf2Icon.setInteractive({ useHandCursor: true });
                this.input.setDraggable(leaf2Icon);

                this.leaves.push(leaf2Icon);

                const leaf3Icon = this.add.image(
                    width * 0.35,
                    height * 0.40,
                    "leaf3"
                );
                leaf3Icon.setScale(toteScale);
                leaf3Icon.setInteractive({ useHandCursor: true });
                this.input.setDraggable(leaf3Icon);

                this.leaves.push(leaf3Icon);

                const leaf4Icon = this.add.image(
                    width * 0.60,
                    height * 0.55,
                    "leaf4"
                );
                leaf4Icon.setScale(toteScale);
                leaf4Icon.setInteractive({ useHandCursor: true });
                this.input.setDraggable(leaf4Icon);

                this.leaves.push(leaf4Icon);

                const leaf5Icon = this.add.image(
                    width * 0.55,
                    height * 0.65,
                    "leaf5"
                );
                leaf5Icon.setScale(toteScale);
                leaf5Icon.setInteractive({ useHandCursor: true });
                this.input.setDraggable(leaf5Icon);

                this.leaves.push(leaf5Icon);

                const leaf6Icon = this.add.image(
                    width * 0.60,
                    height * 0.60,
                    "leaf6"
                );
                leaf6Icon.setScale(toteScale);
                leaf6Icon.setInteractive({ useHandCursor: true });
                this.input.setDraggable(leaf6Icon);

                this.leaves.push(leaf6Icon);

                const leaf7Icon = this.add.image(
                    width * 0.45,
                    height * 0.45,
                    "leaf7"
                );
                leaf7Icon.setScale(toteScale);
                leaf7Icon.setInteractive({ useHandCursor: true });
                this.input.setDraggable(leaf7Icon);

                this.leaves.push(leaf7Icon);

                const leaf8Icon = this.add.image(
                    width * 0.36,
                    height * 0.60,
                    "leaf8"
                );
                leaf8Icon.setScale(toteScale);
                leaf8Icon.setInteractive({ useHandCursor: true });
                this.input.setDraggable(leaf8Icon);

                this.leaves.push(leaf8Icon);

                const bottleIcon = this.add.image(
                    width * 0.10,
                    height * 0.7,
                    "sprayBottle"
                );
                const bottleScale = (width * 0.15) / bottleIcon.width;
                bottleIcon.setScale(bottleScale);
                bottleIcon.setInteractive({ useHandCursor: true });
                this.input.setDraggable(bottleIcon);

                const ragIcon = this.add.image(
                    width * 0.10,
                    height * 0.7,
                    "rag"
                );
                const ragScale = (width * 0.15) / ragIcon.width;
                ragIcon.setScale(ragScale);
                ragIcon.setInteractive({ useHandCursor: true });
                this.input.setDraggable(ragIcon);
                ragIcon.setVisible(false);



                const sanitizerIcon = this.add.image(
                    width * 0.90,
                    height * 0.2,
                    "sanitizer"
                );
                const sanitizerScale = (width * 0.15) / sanitizerIcon.width;
                sanitizerIcon.setScale(sanitizerScale);
                sanitizerIcon.setInteractive({ useHandCursor: true });
                this.input.setDraggable(sanitizerIcon);

                const sinkIcon = this.add.image(
                    width * 0.10,
                    height * 0.2,
                    "sinkbg"
                );
                const sinkScale = (width * 0.3) / sinkIcon.width;
                sinkIcon.setScale(sinkScale);

                const trashCanIcon = this.add.image(
                    width * 0.90,
                    height * 0.7,
                    "trashCan"
                );
                const trashCanScale = (width * 0.15) / trashCanIcon.width;
                trashCanIcon.setScale(trashCanScale);

                let sprays = 0;

                this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
                    gameObject.x = dragX;
                    gameObject.y = dragY;
                });

                toteIcon.on("dragend", () => {

                    const onionBounds = toteIcon.getBounds();
                    if (Phaser.Geom.Intersects.RectangleToRectangle(onionBounds, toteZone)) {
                        if (toteIcon.texture.key === "onion") {
                            this.chopping("onion", "onionBowl", "knife");
                            toteIcon.setTexture("onionBowl");
                            const oScale = (width * 0.05) / toteIcon.width;
                            toteIcon.setScale(oScale);
                        }
                        else if (toteIcon.texture.key === "dirtyOnion") {
                            this.showMes("Wash the vegetables before chopping.");
                        }
                    }
                    this.checkWin();
                    toteIcon.setPosition(
                        width * 0.5,
                        height * 0.15,
                    );
                });

                this.input.on("dragend", (pointer, gameObject) => {
                    const iconBounds = gameObject.getBounds();
                    if (this.leaves.includes(gameObject)) {
                        const trashBounds = trashCanIcon.getBounds();

                        if (Phaser.Geom.Intersects.RectangleToRectangle(iconBounds, trashBounds)) {
                            gameObject.destroy();
                            this.leaves = this.leaves.filter(icon => icon !== gameObject);

                            if (this.leaves.length === 0) {
                                noDebris = true;
                                console.log("All icons trashed!");
                            }
                        }
                    }
                    else if (gameObject === bottleIcon) {
                        console.log(noDebris);
                        if (!noDebris) {
                            this.showMes("Clear debris first!");
                            bottleIcon.setPosition(
                                width * 0.10,
                                height * 0.7,
                            );
                        }
                        else if (Phaser.Geom.Intersects.RectangleToRectangle(iconBounds, toteZone)) {
                            const sprayIcon = this.add.image(gameObject.x, gameObject.y, "spray")
                            sprayIcon.setScale(width * 0.3 / sprayIcon.width);
                            this.tweens.add({
                            targets: sprayIcon,
                            alpha: 0,
                            duration: 10000,
                            onComplete: () => {
                                sprayIcon.destroy()
                                sprays -= 1;
                            }
                        });
                            sprays += 1;
                            if(sprays === 3) {
                                gameObject.destroy();
                                this.dry(toteIcon);
                                toteIcon.setTexture("cleanToteImg");
                            }
                        }
                    }
                });

                this.events.on("startClean", () => {
                    toteIcon.setInteractive({ useHandCursor: true });
                    leaf1Icon.setInteractive({ useHandCursor: true })
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

            /*dry(icon) {
                const { width, height } = this.scale;

                const gridSize = 20; // size of each cell
                const cells = [];

                const iconZone = icon.getBounds();

                for (let x = iconZone.x; x < iconZone.right; x += gridSize) {
                    for (let y = iconZone.y; y < iconZone.bottom; y += gridSize) {
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

                const eraseBrush = this.make.graphics({ x: 0, y: 0, add: false });
                eraseBrush.fillStyle(0xffffff);
                eraseBrush.fillCircle(0, 0, width * 0.08);

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
            }*/

            dry(icon) {
                const { width, height } = this.scale;

                const eraseBrush = this.make.graphics({ x: 0, y: 0, add: false });
                eraseBrush.fillStyle(0xffffff);
                eraseBrush.fillCircle(0, 0, width * 0.08);

                const gridSize = 20;

                const iconZone = icon.getBounds();

                const cells2 = [];
                for (let x = iconZone.x; x < iconZone.right; x += gridSize) {
                    for (let y = iconZone.y; y < iconZone.bottom; y += gridSize) {
                        cells2.push({
                            x,
                            y,
                            cleared: false
                        });
                    }
                }

                const dirtyTote = this.add.image(width / 2, height / 2, "dirtyToteImg")
                    .setDisplaySize(width, height);

                dirtyTote.setVisible(false);

                // Create render texture same size as long hand
                const dirtyToteRT = this.add.renderTexture(
                    dirtyTote.x,
                    dirtyTote.y,
                    dirtyTote.displayWidth,
                    dirtyTote.displayHeight
                );

                // Draw the hidden long hand into render texture so user can erase it
                dirtyToteRT.draw(
                    dirtyTote,
                    dirtyTote.displayWidth / 2,
                    dirtyTote.displayHeight / 2
                );

                const toteScale = (width * 0.55) / dirtyToteRT.width;
                dirtyToteRT.setScale(toteScale);

                dirtyTote.destroy();

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

                    dirtyToteRT.erase(eraseBrush, dragX, dragY);
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
                        dirtyToteRT.destroy();
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
                        //setCutMaterials(cutfoodstring);
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
            scene: [IntroScene, InstructionScene, CleanToteScene],
            parent: "phaser-game"
        };
        phaserGameRef.current = new Phaser.Game(config);
        setTimeout(() => {
            if (phaserGameRef.current) {
                phaserGameRef.current.scene.start("IntroScene");

            }
        }, 100);
    }

    const handleNextClick = () => {
        if (gameStage === "intro") {
            setGameStage("instructions");

            phaserGameRef.current?.scene.start("InstructionScene");
        }
        else if (gameStage === "instructions") {
            setGameStage("cleanStage");

            phaserGameRef.current?.scene.start("CleanToteScene", {
                instructions: instructionTexts
            });
        }
        else if (gameStage === "instructions") {
            if (instructionStep < instructionTexts.length - 1) {
                setInstructionStep(prev => prev + 1);
            }
            else {
                setGameStage("cleanStage");

                phaserGameRef.current?.scene.start("CleanToteScene", {
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
                phaserGameRef.current.scene.start("CleanToteScene", {
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
                    onClick={handleNextClick}
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
                    onClick={(e) => {
                        e.stopPropagation();
                        handleInstructionClick();
                    }}
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
            <div
                  style={{
                    position: "absolute",
                    top: "4px",
                    right: "110px",
                    width: "100px",
                    zIndex: 30000
                  }}
                >
                  <Settings openMenu={openMenu}/>
                </div>            
            

        </div>
    );
}
