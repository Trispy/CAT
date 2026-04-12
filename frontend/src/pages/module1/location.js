import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Phaser from "phaser";
import callUpdate from "../../components/callupdate";
import moduleUpdate from "../../components/moduleupdate";
import Loc from "../../assets/Background1.png";
import plainClothes from "../../assets/Tieduphair.png";
import apron from "../../assets/M1G3/apron.png";
import apronOn from "../../assets/M2G2/noGlove.png";
import Textbox from "../../components/textbox";
import useTypewriter from "../../components/typewriter";
import nextButton from "../../assets/nextbutton.png";
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
import mapbutton from "../../assets/mapbutton.png";
import Settings from "../../components/settings";
const API = process.env.REACT_APP_API_URL;


export default function Location({ openMenu }) {
    const phaserGameRef = useRef(null); // this prevents multiple Phaser instances
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
    }, []);
    //backgroundImage: `url(${Loc})`,
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
    const [timerDone, setTimerDone] = useState(false);
    

    const introText = useTypewriter("We've arrived at the volunteer location, let's finish getting ready.",
        gameStage === "intro");
    const instructionText = useTypewriter("In the following game, we will be going through essential personal hygiene steps to follow once you arrive at the volunteer location. Progress in the game by dragging items to the correct area using your finger.",
        gameStage === "instruction");
    const apronSuccessText = useTypewriter("You are now fully dressed! Let's go wash our hands and put some gloves on before interacting with the food.",
        gameStage === "apron" && fullyDressed)
    const finalText = useTypewriter("You have now completed the basic hygiene module. Let's move on to the basic food safety module!",
        gameStage === "finalStage")
    const soapText = useTypewriter("Drag the soap to the hands and rub it around to clean them. Click anywhere to click out of the textbox.",
        gameStage === "soapyHands" && showSoapText)
    const soapSuccessText = useTypewriter("All clean! Now lets put on some gloves.",
        gameStage === "soapyHands" && handsClean)
    const gloveText = useTypewriter("Make sure to put gloves on before touching any food. Click anywhere to click out of the textbox.",
        gameStage === "gloveStage" && gloveInstruction)
    const gloveSuccessText = useTypewriter("Gloved up!",
        gameStage === "gloveStage" && glovedHands)

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
                const createClickIndicator = (target) => {

                    const indicatorContainer = this.add.container(target.x, target.y);

                    const radius = Math.max(target.displayWidth, target.displayHeight) / 2 + 10;
                    const circle = this.add.circle(0, 0, radius, 0xFFFF00, 0.45);
                    const text = this.add.text(0, -80, "CLICK HERE", {
                        fontSize: "40px",
                        color: "#ffffff",
                        fontStyle: "bold"
                    }).setOrigin(0.5);

                    indicatorContainer.add([circle, text]);


                    this.tweens.add({
                        targets: circle,
                        alpha: { from: 0.2, to: 0.8 },
                        duration: 600,
                        yoyo: true,
                        repeat: -1
                    });

                    return indicatorContainer;
                };
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
                let currentIndicator = null;
                if (currentIndicator) currentIndicator.destroy();
                currentIndicator = createClickIndicator(apronIcon);

                this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
                    if (gameObject === apronIcon) {
                        gameObject.x = dragX;
                        gameObject.y = dragY;
                    }
                });

                apronIcon.on("dragend", () => {

                    const apronBounds = apronIcon.getBounds();
                    const charBounds = character.getBounds();
                    if (currentIndicator) {
                        currentIndicator.destroy();
                    }
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
                let timeLeft = 20;

                const timerText = this.add.text(
                    width * 0.85,
                    height * 0.05,
                    ":20",
                    {
                        fontSize: "48px",
                        color: "#ff0000",
                        fontStyle: "bold"
                    }
                ).setOrigin(0.5);
                timerText.setDepth(1000);
                this.time.addEvent({
                    delay: 1000, //one second
                    loop: true,
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
                this.load.image("apronOn", apronOn);
                this.load.image("gloveLeft", gloveLeft);
                this.load.image("gloveRight", gloveRight);
                this.load.image("gloveBox", gloveBox);
                this.load.image("handLeft", handLeft);
                this.load.image("handRight", handRight);
            }

            create() {
                let rightGlove = false;
                let leftGlove = false;
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
                        height / 2 - height * 0.38,
                        width * 0.2,
                        height * 0.7
                    );
                    const rightZone = new Phaser.Geom.Rectangle( //actual nail area for clipping
                        width / 2,
                        height / 2 - height * 0.35,
                        width * 0.22,
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

        class FinalScene extends Phaser.Scene {
            constructor() {
                super("FinalScene");
            }
            preload() {
                this.load.image("Loc", Loc);
            }
            create() {
                const { width, height } = this.scale;
                this.add.image(width / 2, height / 2, "Loc").setDisplaySize(width, height);
            };
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
            scene: [IntroScene, InstructionScene, ApronScene, HandScene, GloveScene, FinalScene],
            parent: "phaser-game"
        };

        phaserGameRef.current = new Phaser.Game(config);

        setTimeout(() => {
            if (phaserGameRef.current) {
                phaserGameRef.current.scene.start("IntroScene");
            }
        }, 100);
    }

    const handleNextClick = async (e) => { //handles the logic for transitioning between scenes based on the current game stage and user actions. It checks the current game stage and relevant state variables to determine if the user has completed the necessary actions to move to the next stage, then updates the game stage and starts the appropriate Phaser scene.
        e.stopPropagation();

        if (gameStage === "intro") {
            setGameStage("instruction");

            if (phaserGameRef.current) {
                phaserGameRef.current.scene.start("InstructionScene");
            }

            return;
        }

        if (gameStage === "instruction") {
            setGameStage("apron");

            if (phaserGameRef.current) {
                phaserGameRef.current.scene.start("ApronScene");
            }

            return;
        }
        if (gameStage === "apron") {
            setGameStage("soapyHands");

            if (phaserGameRef.current) {
                phaserGameRef.current.scene.stop("ApronScene");
                phaserGameRef.current.scene.start("HandScene");
            }
            return;
        }

        if (gameStage === "soapyHands") {
            setTimerDone(false);
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
            callUpdate("m1");
            await moduleUpdate(`${API}/api/game/module1/location/completed`);
            navigate("/map");
        }
    };

    const isNextDisabled =
        (gameStage === "apron" && !fullyDressed) ||
        (gameStage === "soapyHands" && (!handsClean || !timerDone)) ||
        (gameStage === "gloveStage" && !glovedHands);

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
                        zIndex: 10000
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
            {gameStage === "instruction" && (
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
                        placeholder={instructionText}
                        placeHolderColor="#000000"
                        placeHolderfontSize="1.8vw"
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

            {gameStage === "apron" && fullyDressed && (
                            <div
                style={{
                    position: "fixed",
                    right: "15vw",
                    bottom: "10vh",
                    zIndex: 10000
                }}
            >


                    <Textbox
                        width="70dvw"
                        height="60dvh"
                        placeholder={apronSuccessText}
                        placeHolderColor="#000000"
                        placeHolderfontSize="1.8vw"
                    />
                </div>

            )}
            {gameStage === "soapyHands" && showSoapText && (
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
            {gameStage === "soapyHands" && handsClean && timerDone && (
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
                        placeHolderfontSize="1.8vw"
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
                            placeHolderfontSize="1.8vw"
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
            {gameStage === "finalStage" && (
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
                        placeholder={finalText}
                        placeHolderColor="#000000"
                        placeHolderfontSize="1.8vw"
                    />
                </div>

            )}
           <div
  style={{
    position: "absolute",
    top: 0,
    right: 180,
    padding: "10px",
    display: "flex",
    zIndex: 30000
  }}
>
                  <Settings openMenu={openMenu}/>
                </div>
           
              
        </div>

    );
}
