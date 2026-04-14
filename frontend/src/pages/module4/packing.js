import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Phaser from "phaser";

import moduleUpdate from "../../components/moduleupdate.js";

import Textbox from "../../components/textbox";
import useTypewriter from "../../components/typewriter";
import nextButton from "../../assets/nextbutton.png";
import mapbutton from "../../assets/mapbutton.png";
import Settings from "../../components/settings";

import dirtyProduce from "../../assets/M4G3/dirtyProduceTote.png";
import cleanProduce from "../../assets/M4G3/cleanProduceTote.png";
import cooler from "../../assets/M5G1/closedcooler.png";
import sceneBackground from "../../assets/M4G3/TruckBackground.png"

const API = process.env.REACT_APP_API_URL;

export default function TruckPack({ openMenu }) {
    const phaserGameRef = useRef(null); // this prevents multiple Phaser instances
    const navigate = useNavigate();
    useEffect(() => {
    window.navigateToPage = navigate;
}, [navigate]);
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

    const [fridgeState, setFridgeState] = useState("playing");
    const [fridgefailState, setfridgefailState] = useState('');
    const [fridgeSuccessState, setfridgeSuccessState] = useState('');

    const [instructionStep, setInstructionStep] = useState(0);
    const numberOfCutMaterials = useRef(0);
    useEffect(() => {
        window.handleNext = handleNextClick;
    }, [gameStage]);
    const introText = useTypewriter("In this game, we'll pack a truck with the cooler, and send it to its final destination!",
        gameStage === "intro");
    const instructionTexts = [
        "There is a tote of dirty produce, a tote of clean produce, and a cooler packed with raw meat. Anything that could contaminate something else should be put on the bottom.",
        "Click the '?' button in the bottom right side if you want to refer back to these instructions."
    ];

    const instructionTypewriter = useTypewriter(
        instructionTexts[instructionStep],
        gameStage === "instructions" && instructionStep >= 0,
        30
    );

    const fridgeFailText = useTypewriter(
        fridgefailState,
        fridgeState === "fail"
    );

    const fridgeSuccessText = useTypewriter(
        fridgeSuccessState,
        fridgeState === "success"
    );

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

    const startPhaser = () => {
        if (phaserGameRef.current) return;
        class IntroScene extends Phaser.Scene {
            constructor() {
                super("IntroScene");
            }

            preload() {
                this.load.image("introBg", sceneBackground);
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
                this.load.image("instructionBg", sceneBackground); // reuse same background
            }

            create() {
                const { width, height } = this.scale;

                this.add.image(width / 2, height / 2, "instructionBg")
                    .setDisplaySize(width, height);

            }
        }
        class PackingScene extends Phaser.Scene {
            constructor() {
                super("PackingScene");
            }
            init(data) {
                this.instructions = data.instructions || ["Sort the following items into the correct shelves in the truck based on the following rules:", "1. Raw meat goes on the bottom shelf to prevent cross-contamination.", "2. Dirty produce goes on the bottom shelf so none of the dirt falls on something clean.", "3. Clean produce goes on the shelf to keep it above other contaminants."];
            }
            preload() {
                this.load.image("fridgeScene", sceneBackground);
                this.load.image("cleanProduce", cleanProduce);
                this.load.image("dirtyProduce", dirtyProduce);
                this.load.image("coolerImg", cooler);
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
            create(data) {
                const { width, height } = this.scale;
                    this.instructions =  [
                        "Sort the following items...",
                        "1. Raw meat goes on the bottom...",
                        "2. Dirty produce goes on the bottom...",
                        "3. Clean produce goes on the top..."
                    ];
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
                const coolerIcon = this.add.image(width / 2 + width * 0.25, height / 2 - height * 0.30, "coolerImg")
                const coolerScale = (height * 0.3) / coolerIcon.height;
                coolerIcon.setScale(coolerScale);
                coolerIcon.setInteractive({ useHandCursor: true });
                this.input.setDraggable(coolerIcon);

                const cleanIcon = this.add.image(width / 2 + width * 0.25, height / 2, "cleanProduce")
                const cleanScale = (height * 0.30) / cleanIcon.height;
                cleanIcon.setScale(cleanScale);
                cleanIcon.setInteractive({ useHandCursor: true });
                this.input.setDraggable(cleanIcon);

                const dirtyIcon = this.add.image(width / 2 + width * 0.25, height / 2 + height * 0.30, "dirtyProduce")
                dirtyIcon.setScale(cleanScale);
                dirtyIcon.setInteractive({ useHandCursor: true });
                this.input.setDraggable(dirtyIcon);

                let foodItems = [
                    { key: "coolerImg", sprite: coolerIcon },
                    { key: "cleanProduce", sprite: cleanIcon },
                    { key: "dirtyProduce", sprite: dirtyIcon }
                ];

                let fooditems = [coolerIcon, cleanIcon, dirtyIcon];
                const correctShelf = {
                    coolerImg: "bottom",
                    dirtyProduce: "bottom",
                    cleanProduce: "top",
                };

                const zoneTop = new Phaser.Geom.Rectangle(
                    width * 0.06,
                    height * 0.04,
                    width * 0.42,
                    height * 0.35
                );

                const zoneBottom = new Phaser.Geom.Rectangle(
                    width * 0.06,
                    height * 0.55,
                    width * 0.42,
                    height * 0.28
                );

                let items = 2;

                this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
                    gameObject.x = dragX;
                    gameObject.y = dragY;
                });
                this.input.on("dragstart", (pointer, gameObject) => {
                    gameObject.startX = gameObject.x;
                    gameObject.startY = gameObject.y;
                });
                this.input.on("dragend", (pointer, gameObject) => {
                    const x = gameObject.x;
                    const y = gameObject.y;

                    let droppedShelf = null;

                    if (Phaser.Geom.Rectangle.Contains(zoneTop, x, y)) {
                        droppedShelf = "top";
                    }
                    else if (Phaser.Geom.Rectangle.Contains(zoneBottom, x, y)) {
                        droppedShelf = "bottom";
                    }
                    else {
                        gameObject.x = gameObject.startX;
                        gameObject.y = gameObject.startY;
                        return;
                    }

                    const correct = correctShelf[gameObject.texture.key];

                    if (droppedShelf === correct) {
                        console.log(items);
                        if (items <= 0) {
                            setFridgeState("complete");

                        } else {
                            items -= 1;
                            setFridgeState("success");
                        }
                        if (droppedShelf === "bottom") {
                            setfridgeSuccessState("Thats correct! Meat and dirty produce go on the bottom shelf to prevent cross-contamination. Click anywhere to get out of the textbox.")
                            gameObject.disableInteractive();
                        }
                        else if (droppedShelf === "top") {
                            setfridgeSuccessState("Thats correct! Clean produce goes on the top shelf so no contaminants fall on it. Click anywhere to get out of the textbox.")
                            gameObject.disableInteractive();
                        }

                        console.log("Correct!");
                    }
                    else {
                        setFridgeState("fail"); // React textbox trigger
                        gameObject.x = gameObject.startX;
                        gameObject.y = gameObject.startY;

                        if (correct === "bottom") {
                            setfridgefailState("Not quite! Meat goes on the bottom shelf to prevent cross-contamination.")
                        }
                        if (correct === "top") {
                            setfridgefailState("Not quite! Ready made food goes on the top shelf because it is usually precooked.")
                        }
                    }

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
            scene: [IntroScene, InstructionScene, PackingScene],
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
            setGameStage("CoolerStage");

            phaserGameRef.current?.scene.start("PackingScene", {
                instructions: instructionTexts
            });
        }
        else if (gameStage === "instructions") {
            if (instructionStep < instructionTexts.length - 1) {
                setInstructionStep(prev => prev + 1);
            }
            else {
                setGameStage("CoolerStage");

                phaserGameRef.current?.scene.start("PackingScene", {
                    instructions: instructionTexts
                });
            }
        }
        else if (fridgeState === "complete") {
            window.navigateToPage("/map");
        }
    };
    const handleInstructionClick = () => {

        if (instructionStep < instructionTexts.length - 1) {
            setInstructionStep(prev => prev + 1);
        }
        else {

            setGameStage("CoolerStage");

            if (phaserGameRef.current) {
                phaserGameRef.current.scene.start("PackingScene", {
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
            {fridgeState === "success" && (
                <div
                    onClick={() => setFridgeState("playing")}
                    style={overlayStyle}
                >
                    <div
                        style={{
                            position: "fixed",
                            right: "18vw",
                            bottom: "15vh"
                        }}
                    >
                        <Textbox
                            width="30vw"
                            height="40vh"
                            placeholder={fridgeSuccessText}
                            placeHolderColor="#000000"
                            placeHolderfontSize="1.1vw"
                        />
                    </div>
                </div>
            )}
            {fridgeState === "fail" && (
                <div
                    onClick={() => setFridgeState("playing")}
                    style={overlayStyle}
                >
                    <div
                        style={{
                            position: "fixed",
                            right: "18vw",
                            bottom: "20vh"
                        }}
                    >
                        <Textbox
                            width="30vw"
                            height="40vh"
                            placeholder={fridgeFailText}
                            placeHolderColor="#000000"
                            placeHolderfontSize="1.1vw"
                        />
                    </div>
                </div>
            )}
            {fridgeState === "complete" && (
                <div
                    onClick={() => window.navigateToPage("/map")}
                    style={overlayStyle}
                >
                    <div
                        style={{
                            position: "fixed",
                            right: "18vw",
                            bottom: "20vh"
                        }}
                    >
                        <Textbox
                            width="30vw"
                            height="40vh"
                            placeholder={"Good job! We have successfully packed the truck. Get everything in the cooler to its destination within two hours."}
                            placeHolderColor="#000000"
                            placeHolderfontSize="1.1vw"
                        />
                    </div>
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
                        top: 0,
                        right: 180,
                        padding: "10px",
                        display: "flex",
                        gap: "10px",
                        zIndex: 30000
                    }}
                    >
 
             {gameStage === "CoolerStage" && (
                 <button
                 onClick={() => {
                     if (phaserGameRef.current) {
                     const scene = phaserGameRef.current.scene.getScene("PackingScene");
                     if (scene){scene.showInstructions();}
                     
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