import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Phaser from "phaser";

import moduleUpdate from "../../components/moduleupdate.js";

import Loc from "../../assets/Background1.png";
import Textbox from "../../components/textbox";
import useTypewriter from "../../components/typewriter";
import nextButton from "../../assets/nextbutton.png";
import onion from "../../assets/M2G2/onion.png";
import mapbutton from "../../assets/mapbutton.png";
import Settings from "../../components/settings";

import module2Background from "../../assets/finalbackground.png"
import readymadefood1 from "../../assets/readymadefood1.png"
import readymadefood2 from "../../assets/readymadefood2.png"
import egg from "../../assets/egg.png"
import bellpepper from "../../assets/bellpeppers.png"
import beefpackage from "../../assets/beefpackage.png"
import foodbox from "../../assets/M5G1/icecooler.png"
import chickenpackage from "../../assets/packagedchicken.png"
import chicken from "../../assets/chicken.png"
import fridgeSceneBackground from "../../assets/fridgescreen.png"
import milk from "../../assets/milk.png"
const API = process.env.REACT_APP_API_URL;

export default function CoolerPack({ openMenu }) {
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
    const backgroundStyle = {
        backgroundImage: gameStage === "CoolerStage" ? "none" : `url(${Loc})`,
        minHeight: '100vh',
        backgroundSize: 'contain',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'black'
    };

    const [fridgeState, setFridgeState] = useState("playing");
    const [fridgefailState, setfridgefailState] = useState('');
    const [fridgeSuccessState, setfridgeSuccessState] = useState('');

    const [instructionStep, setInstructionStep] = useState(0);
    const numberOfCutMaterials = useRef(0);
    useEffect(() => {
        window.handleNext = handleNextClick;
    }, [gameStage]);
    const introText = useTypewriter("In this game, we'll pack a cooler for trasport!",
        gameStage === "intro");
    const instructionTexts = [
        "The items in the fridge should be packed from the bottom up, starting with the raw meats, to the ready-to-eat food! The produce should go last.",
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
        class CoolerScene extends Phaser.Scene {
            constructor() {
                super("CoolerScene");
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
            create(data) {
                this.instructions = ["Sort the following items into the correct shelves in the fridge based on the following rules:", "1. Ready made food goes on the top shelf because it is usually precooked.", "2. Dairy goes on the middle shelf where the temperature is most consistent.", "3. Meat goes on the bottom shelf to prevent cross-contamination.", "4. Veggies go in the crisper drawer to maintain freshness."];

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
                const box = this.add.image(width / 2 - width * 0.25, height / 2 + height * 0.15, "foodbox")
                const boxScale = (height * 0.65) / box.height;
                box.setScale(boxScale);


                const chickenpkg = this.add.image(width / 2 + width * 0.30, height / 2 + height * 0.17, "beefpackage")
                const chickenpkgScale = (height * 0.18) / chickenpkg.height;
                chickenpkg.setScale(chickenpkgScale);
                chickenpkg.setInteractive({ useHandCursor: true });
                this.input.setDraggable(chickenpkg);

                const beefpkg = this.add.image(width / 2 + width * 0.20, height / 2 + height * 0.17, "beefpackage")
                const beefpkgScale = (height * 0.20) / beefpkg.height;
                beefpkg.setScale(beefpkgScale);
                beefpkg.setInteractive({ useHandCursor: true });
                this.input.setDraggable(beefpkg);

                const onion = this.add.image(width / 2 + width * 0.30, height / 2 + height * 0.27, "onion")
                const onionScale = (height * 0.20) / onion.height;
                onion.setScale(onionScale);
                onion.setInteractive({ useHandCursor: true });
                this.input.setDraggable(onion);

                const ready1 = this.add.image(width / 2 + width * 0.28, height / 2 - height * 0.28, "readymadefood1")
                const ready1Scale = (height * 0.20) / ready1.height;
                ready1.setScale(ready1Scale);
                ready1.setInteractive({ useHandCursor: true });
                this.input.setDraggable(ready1);

                const ready2 = this.add.image(width / 2 + width * 0.17, height / 2 - height * 0.28, "readymadefood2")
                const ready2Scale = (height * 0.20) / ready2.height;
                ready2.setScale(ready2Scale);
                ready2.setInteractive({ useHandCursor: true });
                this.input.setDraggable(ready2);

                const egg = this.add.image(width / 2 + width * 0.15, height / 2, "egg")
                const eggScale = (height * 0.20) / egg.height;
                egg.setScale(eggScale);
                egg.setInteractive({ useHandCursor: true });
                this.input.setDraggable(egg);

                const milk = this.add.image(width / 2 + width * 0.30, height / 2, "milk")
                const milkScale = (height * 0.20) / milk.height;
                milk.setScale(milkScale);
                milk.setInteractive({ useHandCursor: true });
                this.input.setDraggable(milk);

                const bellpepper = this.add.image(width / 2 + width * 0.16, height / 2 + height * 0.27, "bellpepper")
                const bellpepperScale = (height * 0.20) / bellpepper.height;
                bellpepper.setScale(bellpepperScale);
                bellpepper.setInteractive({ useHandCursor: true });
                this.input.setDraggable(bellpepper);


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

                let currentFood = null;
                let currentSprite = null;
                let foodAway = 0;

                this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
                    gameObject.x = dragX;
                    gameObject.y = dragY;
                });
                this.input.on("dragstart", (pointer, gameObject) => {
                    gameObject.startX = gameObject.x;
                    gameObject.startY = gameObject.y;
                });
                this.input.on("dragend", (pointer, gameObject) => {
                    const coolerBounds = box.getBounds();
                    const bounds = gameObject.getBounds();

                    if (Phaser.Geom.Intersects.RectangleToRectangle(coolerBounds, bounds)) {
                        let droppedShelf = null;

                        if (foodAway < 2) {
                            droppedShelf = "bottom";
                        }
                        else if (foodAway < 4) {
                            droppedShelf = "middle";
                        }
                        else if (foodAway < 6) {
                            droppedShelf = "top";
                        }
                        else {
                            droppedShelf = "drawer";
                        }

                        const group = correctShelf[gameObject.texture.key];

                        console.log(foodAway);

                        if (droppedShelf === group) {
                            foodItems = foodItems.filter(item => item !== currentFood);
                            if (foodAway >= 7) {
                                setFridgeState("complete");

                            } else {
                                setFridgeState("success");
                            }
                            currentFood = null;

                            if (droppedShelf === "drawer"
                            ) {
                                setfridgeSuccessState("Thats correct! Veggies go in last. Click anywhere to get out of the textbox.")
                            }
                            if (droppedShelf === "bottom") {
                                setfridgeSuccessState("Thats correct! Meat goes in first prevent cross-contamination, in case of leakage. Click anywhere to get out of the textbox.")
                            }
                            if (droppedShelf === "top") {
                                setfridgeSuccessState("Thats correct! Ready made food goes in almost last because it is usually precooked. Click anywhere to get out of the textbox.")
                            }
                            if (droppedShelf === "middle") {
                                setfridgeSuccessState("Thats correct! Dairy goes in second where the temperature is most consistent. Click anywhere to get out of the textbox.")
                            }

                            gameObject.destroy();
                            foodAway += 1;

                            console.log("Correct!");
                            currentFood = null;
                            currentSprite = null;

                        }
                        else {
                            setFridgeState("fail"); // React textbox trigger
                            gameObject.x = gameObject.startX;
                            gameObject.y = gameObject.startY;
                            if (group === "drawer") {
                                setfridgefailState("Not quite! Veggies go in last.")
                            }
                            if (group === "bottom") {
                                setfridgefailState("Not quite! Meat goes in first to prevent cross-contamination.")
                            }
                            if (group === "top") {
                                setfridgefailState("Not quite! Ready made food goes in almost last because it is usually precooked.")
                            }
                            if (group === "middle") {
                                setfridgefailState("Not quite! Dairy goes in the middle where the temperature is most consistent.")
                            }
                        }
                    }
                    else {
                        gameObject.x = gameObject.startX;
                        gameObject.y = gameObject.startY;
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
            scene: [IntroScene, InstructionScene, CoolerScene],
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

            phaserGameRef.current?.scene.start("CoolerScene", {
                instructions: instructionTexts
            });
        }
        else if (gameStage === "instructions") {
            if (instructionStep < instructionTexts.length - 1) {
                setInstructionStep(prev => prev + 1);
            }
            else {
                setGameStage("CoolerStage");

                phaserGameRef.current?.scene.start("CoolerScene", {
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

            setGameStage("CoolerStage");

            if (phaserGameRef.current) {
                phaserGameRef.current.scene.start("CoolerScene", {
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
                    onClick={() => window.navigateToPage("/module4/packTruck")}
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
                            placeholder={"Good job! We have successfully packed the cooler. Let's go get it all into the truck now!"}
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
                    const scene = phaserGameRef.current.scene.getScene("CoolerScene");
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