import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Phaser from "phaser";

import Loc from "../../assets/Background1.png";
import plainClothes from "../../assets/Tieduphair.png";
import apron from "../../assets/M1G3/apron.png";
import apronOn from "../../assets/M1G3/noGlove.png";
import Textbox from "../../components/textbox";
import useTypewriter from "../../components/typewriter";
import nextButton from "../../assets/nextbutton.png"; 
import TextboxErin from "../../components/textboxerin";
import cleanHand from "../../assets/M1G3/handClean.png";
import dirtyHand from "../../assets/M1G3/handDirty.png";
import soapSprite from "../../assets/M1G3/soap.png";
import sinkbg from "../../assets/M1G3/SinkBackground.png";
import gloveLeft from "../../assets/M1G3/gloveLeft.png";
import gloveRight from "../../assets/M1G3/gloveRight.png";
import gloveBox from "../../assets/M1G3/gloveBox.png";
import handLeft from "../../assets/M1G3/handLeft.png";
import handRight from "../../assets/M1G3/handRight.png";
import sudImg from "../../assets/M1G3/sud.png";
import noGlove from "../../assets/M2G2/noGlove.png";
import gloved from "../../assets/M2G2/gloved.png";

import beef from "../../assets/M2G2/beef.png";
import bellPeppers from "../../assets/M2G2/bellpeppers.png";
import onion from "../../assets/M2G2/onion.png";
import cuttingBoard from "../../assets/M2G2/cuttingBoard.png";
import dirtyBellpepper from "../../assets/M2G2/dirtyBellpeppers.png";
import dirtyOnion from "../../assets/M2G2/dirtyOnion.png";
import beefBowl from "../../assets/M2G2/BeefBowl.png";
import onionBowl from "../../assets/M2G2/OnionBowl.png";
import pepperBowl from "../../assets/M2G2/PepperBowl.png";

export default function Cleaning() {
    const phaserGameRef = useRef(null); // this prevents multiple Phaser instances
    const navigate = useNavigate();

    const backgroundStyle = {
        backgroundImage: `url(${Loc})`,
        minHeight: '100vh',
        backgroundSize: 'contain',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'black'
    };

    const [gameStage, setGameStage] = useState("intro");
    const [fullyDressed, setFullyDressed] = useState(false);
    const [showSoapText, setShowSoapText] = useState(false);
    const [handsClean, setHandsClean] = useState(false);
    const [gloveInstruction, setGloveInstruction] = useState(false);
    const [glovedHands, setGlovedHands] = useState(false);

    const introText = useTypewriter("We've arrived at the volunteer location, let's finish getting ready.",
        gameStage === "intro");
    const instructionText = useTypewriter("In the following game, we will be going through essential personal hygiene steps to follow once you arrive at the volunteer location. Progress in the game by dragging items to the correct area using your finger.",
        gameStage === "instruction");
    const apronSuccessText = useTypewriter("You are now fully dressed! Let's go wash our hands and put some gloves on before interacting with the food.",
        gameStage === "apron" && fullyDressed)
    const finalText = useTypewriter("You have now completed the basic hygiene module. Let's move on to the basic food safety module!",
        gameStage === "finalStage")
    const soapText = useTypewriter("You have soaped the hand.",
        gameStage === "soapyHands" && showSoapText)
    const soapSuccessText = useTypewriter("All clean! Now lets put on some gloves.",
        gameStage === "soapyHands" && handsClean)
    const gloveText = useTypewriter("Make sure to put gloves on before touching any food",
        gameStage === "gloveStage" && gloveInstruction)
    const gloveSuccessText = useTypewriter("Gloved up!", 
        gameStage === "gloveStage" && glovedHands)

    const startPhaser = () => {
        if (phaserGameRef.current) return;

        class ApronScene extends Phaser.Scene {
            constructor() {
                super("ApronScene");
            }

            preload() { //actually load the images for the scene. This is where you would add any new assets you want to use in this scene.
                this.load.image("volLocation", Loc);
                this.load.image("plainClothes", plainClothes);
                this.load.image("apron", apron);
                this.load.image("apronOn", apronOn);
            }

            create() {
                const { width, height } = this.scale;

                this.add.image(width / 2, height / 2, "volLocation")
                    .setDisplaySize(width, height);

                // Character (starts without apron)
                const character = this.add.image(
                    width * 0.25 + width * 0.20,
                    height * 0.65,
                    "plainClothes"
                );

                const charScale = (height * 0.7) / character.height;
                character.setScale(charScale);

                const apronIcon = this.add.image(
                    width * 0.75 - width * 0.043,
                    height * 0.35 - height * 0.045,
                    "apron"
                );

                const apronScale = (width * 0.13) / apronIcon.width;
                apronIcon.setScale(apronScale);

                // Make draggable immediately
                apronIcon.setInteractive({ useHandCursor: true });
                this.input.setDraggable(apronIcon);

                this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
                    if (gameObject === apronIcon) {
                        gameObject.x = dragX;
                        gameObject.y = dragY;
                    }
                });

                apronIcon.on("dragend", () => {

                    const apronBounds = apronIcon.getBounds();
                    const charBounds = character.getBounds();

                    if (Phaser.Geom.Intersects.RectangleToRectangle(apronBounds, charBounds)) {
                        character.setTexture("apronOn");
                        apronIcon.destroy();
                        setFullyDressed(true);

                    } else {

                        apronIcon.setPosition(
                            width * 0.75 - width * 0.043,
                            height * 0.35 - height * 0.045
                        );
                    }
                });
                this.events.on("startApron", () => {

                    // Enable shirt only now
                    apronIcon.setInteractive({ useHandCursor: true });

                });
                this.events.on("shutdown", () => {
                    this.input.removeAllListeners();
                });
            }
        }

        class CleanScene extends Phaser.Scene {
            constructor() {
                super("CleanScene");
            }

            preload() { //actually load the images for the scene. This is where you would add any new assets you want to use in this scene.
                this.load.image("volLocation", Loc);
                this.load.image("noGlove", noGlove);
                this.load.image("gloved", gloved);
                this.load.image("apronOn", apronOn);
                this.load.image("beef", beef);
                this.load.image("onion", onion);
                this.load.image("bellpepper", bellPeppers);
                this.load.image("dirtyOnion", dirtyOnion);
                this.load.image("dirtyBellpepper", dirtyBellpepper);
                this.load.image("beefBowl", beefBowl);
                this.load.image("onionBowl", onionBowl);
                this.load.image("pepperBowl", pepperBowl);
            }

            create() {
                const { width, height } = this.scale;

                this.add.image(width / 2, height / 2, "volLocation")
                    .setDisplaySize(width, height);

                // Character
                const character = this.add.image(
                    width - width * 0.20,
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

                // Make draggable immediately
                onionIcon.setInteractive({ useHandCursor: true });
                this.input.setDraggable(onionIcon);

                const pepperIcon = this.add.image(
                    width * 0.40,
                    height * 0.10,
                    "dirtyBellpepper"
                );

                const pepperScale = (width * 0.10) / pepperIcon.width;
                pepperIcon.setScale(pepperScale);

                // Make draggable immediately
                pepperIcon.setInteractive({ useHandCursor: true });
                this.input.setDraggable(pepperIcon);

                const beefIcon = this.add.image(
                    width * 0.80,
                    height * 0.10,
                    "beef"
                );

                const beefScale = (width * 0.06) / beefIcon.width;
                beefIcon.setScale(beefScale);

                // Make draggable immediately
                beefIcon.setInteractive({ useHandCursor: true });
                this.input.setDraggable(beefIcon);

                const objBounds = beefIcon.getBounds();
                const graphics = this.add.graphics({
                    fillStyle: { color: 0xff0000 },
                    lineStyle: { width: 4, color: 0x00ff00 }
                });
                graphics.alpha = 0.5;
                graphics.fillRectShape(objBounds)

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
                });

                onionIcon.on("dragend", () => {

                    const onionBounds = onionIcon.getBounds();

                    if (Phaser.Geom.Intersects.RectangleToRectangle(onionBounds, sinkZone)) {
                        character.setTexture("apronOn");
                        onionIcon.destroy();
                        setFullyDressed(true);
                    } else {
                        onionIcon.setPosition(
                            width * 0.5,
                            height * 0.15,
                        );
                    }
                });
                this.events.on("startClean", () => {

                    // Enable shirt only now
                    onionIcon.setInteractive({ useHandCursor: true });

                });
                this.events.on("shutdown", () => {
                    this.input.removeAllListeners();
                });
            }

            wash(icon) {

            }
        }

        class HandScene extends Phaser.Scene {
            constructor() {
                super("HandScene");
            }

            preload() { //actually load the images for the scene. This is where you would add any new assets you want to use in this scene.
                this.load.image("sinkbg", sinkbg);
                this.load.image("apronOn", apronOn);
                this.load.image("cleanHand", cleanHand);
                this.load.image("dirtyHand", dirtyHand);
                this.load.image("soapSprite", soapSprite);
                this.load.image("sudImg", sudImg);
            }

            create() {
                const { width, height } = this.scale;

                this.add.image(width / 2, height / 2, "sinkbg")
                    .setDisplaySize(width, height);
                // Bottom layer (trimmed hand)
                const cleanHand = this.add.image(
                    width / 2,
                    height / 2 + height * 0.05,
                    "cleanHand"
                )
                const handMaxWidth = width * 0.6;
                const scale = handMaxWidth / cleanHand.width;
                cleanHand.setScale(scale);


                const dirtyHand = this.add.image(
                    width / 2,
                    height / 2 + height * 0.05,
                    "dirtyHand"
                );

                const scale1 = (width * 0.6) / dirtyHand.width;
                dirtyHand.setScale(scale1);


                dirtyHand.setVisible(false);

                const handZone = new Phaser.Geom.Rectangle( //actual nail area for clipping
                    width / 2 - width * 0.20, 
                    height / 2 - height * 0.35, 
                    700,
                    700
                );

                const gridSize = 20; // size of each cell
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

                // Draw the hidden long hand into render texture so user can erase it
                dirtyHandRT.draw(
                    dirtyHand,
                    dirtyHand.displayWidth / 2,
                    dirtyHand.displayHeight / 2
                );

                // Store original position
                const soapStartX = cleanHand.x + cleanHand.displayWidth / 2 + width * 0.05;
                const soapStartY = cleanHand.y;

                // Create soap sprite
                const soap = this.add.image(
                    soapStartX,
                    soapStartY,
                    "soapSprite"
                ).setInteractive({ useHandCursor: true });
                const soapMaxWidth = width * 0.15;
                const baseScale = soapMaxWidth / soap.width;
                soap.setScale(baseScale);


                this.input.setDraggable(soap);

                soap.on("dragstart", () => {
                    soap.setScale(baseScale);
                });

                soap.on("dragend", () => {
                    soap.setScale(baseScale);
                });
                this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
                    if (gameObject !== soap) return;

                    soap.x = dragX;
                    soap.y = dragY;


                    const localX = (dragX - dirtyHandRT.x) / dirtyHandRT.scaleX + dirtyHandRT.width / 2;
                    const localY = (dragY - dirtyHandRT.y) / dirtyHandRT.scaleY + dirtyHandRT.height / 2;

                    const eraseBrush = this.make.graphics({ x: 0, y: 0, add: false });
                    eraseBrush.fillStyle(0xffffff);
                    eraseBrush.fillCircle(0, 0, 60);
                    
                    const sud = this.add.image(
                        dragX,
                        dragY,
                        "sudImg"
                    ).setInteractive({ useHandCursor: true });
                    const sudMaxWidth = width * 0.15 * Math.random();
                    const baseScale = sudMaxWidth / sud.width;
                    sud.setScale(baseScale);
                    if (sud.alpha <= 0) {
                        sud.destroy();
                    }

                    this.tweens.add({
                        targets: sud,
                        alpha: 0,
                        duration: 1000,
                        ease: 'Linear'
                    });

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
                    if (!handsClean && percentCleared > 0.20) {
                        setHandsClean(true);
                        console.log("Hands fully clean.");
                        dirtyHandRT.setVisible(false);
                    }

                });

                // Show textbox when scene loads
                setShowSoapText(true);

                // when clipper is clicked hide the textbox
                soap.on("pointerdown", () => {
                    setShowSoapText(false);
                });
                this.events.on("shutdown", () => {
                    this.input.removeAllListeners();
                });
            }
        }

        class GloveScene extends Phaser.Scene{
            constructor() {
                super("GloveScene");
            }

            preload() { //actually load the images for the scene. This is where you would add any new assets you want to use in this scene.
                this.load.image("sinkbg", sinkbg);
                this.load.image("apronOn", apronOn);
                this.load.image("gloveLeft", gloveLeft);
                this.load.image("gloveRight", gloveRight);
                this.load.image("gloveBox", gloveBox);
                this.load.image("handLeft", handLeft);
                this.load.image("handRight", handRight);
            }

            create() {
                let oneGlove = false;
                const { width, height } = this.scale;

                this.add.image(width / 2, height / 2, "sinkbg")
                    .setDisplaySize(width, height);

                const cleanHand = this.add.image(
                    width / 2,
                    height / 2 + height * 0.05,
                    "handLeft"
                )
                const handMaxWidth = width * 0.6;
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
                        350,
                        700
                    );

                        const rightZone = new Phaser.Geom.Rectangle( //actual nail area for clipping
                        width / 2, 
                        height / 2 - height * 0.35, 
                        350,
                        700
                    );
                    if (Phaser.Geom.Intersects.RectangleToRectangle(gloveBoxBounds, leftZone)) {
                        cleanHand.setTexture("gloveLeft");
                        if(oneGlove) setGlovedHands(true);
                        else oneGlove = true;

                    } 
                    else if (Phaser.Geom.Intersects.RectangleToRectangle(gloveBoxBounds, rightZone)) {
                        cleanHand2.setTexture("gloveRight");
                        if(oneGlove) setGlovedHands(true);
                        else oneGlove = true;

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

        class FinalScene extends Phaser.Scene {
            constructor() {
                super("FinalScene");
            }
            preload() {
                this.load.image("Loc", Loc);
            }
            create () {
                const { width, height } = this.scale;
                this.add.image(width / 2, height / 2, "Loc").setDisplaySize(width, height);
            }; 
        }

        const config = { //actually add the scenes here and this starts the phaser game. The scenes will be switched based on the gameStage state in the main component.
            type: Phaser.AUTO,
            width: window.innerWidth,
            height: window.innerHeight,
            transparent: true,
            scene: [ApronScene, HandScene, GloveScene, FinalScene, CleanScene],
            parent: "phaser-transition-container"
        };

        phaserGameRef.current = new Phaser.Game(config);
    }

    const handleNextClick = (e) => { //handles the logic for transitioning between scenes based on the current game stage and user actions. It checks the current game stage and relevant state variables to determine if the user has completed the necessary actions to move to the next stage, then updates the game stage and starts the appropriate Phaser scene.
        e.stopPropagation();

        if (gameStage === "intro") {
            startPhaser("CleanScene");
            setGameStage("apron");

            if (phaserGameRef.current) {
                phaserGameRef.current.scene.start("CleanScene");
            }
            return;
            setGameStage("cleanStage");
            return;
        }

        if (gameStage === "cleanStage") {
            startPhaser("CleanScene");
            setGameStage("apron");

            if (phaserGameRef.current) {
                phaserGameRef.current.scene.start("CleanScene");
            }
            return;
        }

        if (gameStage === "apron") {
            setGameStage("soapyHands");

            if (phaserGameRef.current) {
                phaserGameRef.current.scene.start("HandScene");
            }
            return;
        }

        if (gameStage === "soapyHands") {
            setGameStage("gloveStage");

            if (phaserGameRef.current) {
                phaserGameRef.current.scene.start("GloveScene");
            }
            return;
        }

        if (gameStage === "gloveStage") {
            setGameStage("finalStage");

            if (phaserGameRef.current) {
                phaserGameRef.current.scene.start("FinalScene");
            }
            return;
        }

        if (gameStage === "finalStage") {
            navigate('/login', { replace: true });
        }
    };

    const isNextDisabled =
        (gameStage === "apron" && !fullyDressed) || 
        (gameStage === "soapyHands" && !handsClean) || 
        (gameStage === "gloveStage" && !glovedHands);

    return (
        <div
            className="form"
            style={{
                ...backgroundStyle,
                position: "relative",
            }}
        >
            {gameStage === "intro" && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%"
                    }}
                >
                    <Textbox
                        width="90vw"
                        height="90vh"
                        placeholder={introText}
                        placeHolderColor="#000000"
                        placeHolderfontSize="2vw"
                    />
                </div>
            )}

            {gameStage === "instruction" && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%"
                    }}
                >
                    <Textbox
                        width="90vw"
                        height="90vh"
                        placeholder={instructionText}
                        placeHolderColor="#000000"
                        placeHolderfontSize="2vw"
                    />

                </div>
            )}

            <button
                className="next-button"
                disabled={isNextDisabled}
                onClick={handleNextClick}
                style={{
                    position: "absolute",
                    bottom: "5%",
                    right: "5%",
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

            <div
                        id="phaser-transition-container"
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100vw",
                            height: "100vh",
                            zIndex: 9999,
                            pointerEvents: "auto"
                        }}
            />


            {gameStage === "apron" && fullyDressed && (
                <div
                    style={{
                        position: "fixed",
                        right: "1vw",
                        bottom: "50vh",
                        zIndex: 10000
                    }}
                >
                <Textbox
                    width="30vw"
                    height="30vh"
                    placeholder={apronSuccessText}
                    placeHolderColor="#000000"
                    placeHolderfontSize="1.1vw"
                />
                </div>
            )}

            {gameStage === "soapyHands" && showSoapText && (
                <div
                    onClick={() => setShowSoapText(false)}
                    style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 15000,
                    }}
                >
                <TextboxErin
                    width="80vw"
                    height="85vh"
                    placeholder={soapText}
                    placeHolderColor="#000000"
                    placeHolderfontSize="1.8vw"
                />
                <button onclick="removeElement(this.parentElement)"></button>
                </div>
            )}

            {gameStage === "soapyHands" && handsClean && (
                <div
                    style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 15000,
                    }}
                >
                <TextboxErin
                    width="80vw"
                    height="85vh"
                    placeholder={soapSuccessText}
                    placeHolderColor="#000000"
                    placeHolderfontSize="1.8vw"
                />
                </div>
            )}

            {gameStage === "gloveStage" && gloveInstruction && (
                <div
                    onClick={() => setGloveInstruction(false)}
                    style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 15000,
                    }}
                >
                <TextboxErin
                    width="80vw"
                    height="85vh"
                    placeholder={gloveText}
                    placeHolderColor="#000000"
                    placeHolderfontSize="1.8vw"
                />
                </div>
            )}

            {gameStage === "gloveStage" && glovedHands && (
                <div
                    style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 15000,
                    }}
                >
                <TextboxErin
                    width="80vw"
                    height="85vh"
                    placeholder={gloveSuccessText}
                    placeHolderColor="#000000"
                    placeHolderfontSize="1.8vw"
                />
                </div>
            )}

            {gameStage === "finalStage" && (
                <div
                    style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 15002,
                    }}
                >
                <TextboxErin
                    width="80vw"
                    height="85vh"
                    placeholder={finalText}
                    placeHolderColor="#000000"
                    placeHolderfontSize="1.8vw"
                />
                </div>
            )}
        </div>
    );
}
