
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import "../user/login.css";
import hand from "../../assets/M1G2/hand-long.png";
import handTrimmed from "../../assets/M1G2/hand-trimmed.png";
import Textbox from "../../components/textbox";
import useTypewriter from "../../components/typewriter";
import nextButton from "../../assets/nextbutton.png";
import Phaser from "phaser";
import nailclipper from "../../assets/M1G2/NailClippers.png";
import bowl from "../../assets/M1G2/actualbowl.png";
import ringonfinger from "../../assets/M1G2/rnf.png";
import ring from "../../assets/M1G2/Ring.png";
import firstBackground from "../../assets/Firstbackground.png";
import shirt from "../../assets/M1G2/Shirt.png";
import dresserBackground from "../../assets/flamboyantbackground.png";
import bathroomSink from "../../assets/Bathroom_Sink_.png";
import cleanClothesOn from "../../assets/M1G2/AllOn.png";
import shirtOn from "../../assets/M1G2/ShirtOn.png";
import shirtPantsOn from "../../assets/M1G2/ShirtPantsOn.png";
import dirtyClothesOn from "../../assets/M1G2/DirtyClothes.png";
import pants from "../../assets/M1G2/Pants.png";
import shoes from "../../assets/M1G2/Shoes.png";
import tieduphair from "../../assets/Tieduphair.png";
import hairtie from "../../assets/M1G2/Hairtie.png";
import erintextbox from "../../assets/erintextbox.png";
import TextboxErin from "../../components/textboxerin";
//has multiple scenes for each step of the personal hygiene process. Each scene has its own interactive elements and logic. The main component manages the overall game state and transitions between scenes based on user actions and progress.

function PersonalHygiene() {

    const backgroundStyle = {
        backgroundImage: `url(${firstBackground})`,
        minHeight: '100vh',
        backgroundSize: 'contain',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'black'
    };

    const [showClipperText, setShowClipperText] = useState(false);
    const [nailsTrimmed, setNailsTrimmed] = useState(false);
    const [gameStage, setGameStage] = useState("intro");
    const [removeClipSuccess, setRemoveClipSuccess] = useState(false);
    const [showRingText, setShowRingText] = useState(false);
    const [ringRemoved, setRingRemoved] = useState(false);
    const [clothesRemoved, setClothesRemoved] = useState(false);
    const [showClothesText, setShowClothesText] = useState(false);
    const [clothesInstructionsDone, setClothesInstructionsDone] = useState(false);
    const [hairTied, setHairTied] = useState(false);
    const [showTyedHairText, setShowTyedHairText] = useState(false);
    const [hairInstructionDismissed, setHairInstructionDismissed] = useState(false);
    const [showFinalText, setShowFinalText] = useState(false);
    const phaserGameRef = useRef(null); // this prevents multiple Phaser instances
    const navigate = useNavigate(); // link to next game when finished

    function useTypewriter(text, isActive, speed = 30) { //this is the type writer that actually types the text out one character at a time. It takes in the text to display, whether it should be active, and the speed of typing.
        const [typedText, setTypedText] = useState("");
        const hasStarted = useRef(false);

        useEffect(() => {
            if (!text || !isActive || hasStarted.current) return;

            hasStarted.current = true;  // this prevent restarting
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

    const introText = useTypewriter(
        "In the following game, we will be going through personal hygiene steps that are essential to do before volunteering. Progress in the game by dragging items to the correct area using your finger.",
        true
    );

    const clipperText = useTypewriter(
        "Drag the nail clipper to the nails to cut the nails.",
        showClipperText && !nailsTrimmed
    );
    const ringText = useTypewriter(
    "Drag the ring into the bowl to remove the ring.",
    gameStage === "rings" && !showRingText
    );
   const ringSuccessText = useTypewriter(
    "Great job for removing the ring! Click the next button to continue.",
    showRingText
    );
    const clipperSuccessText = useTypewriter(
    "Great job for clipping the nails! Click the next button to continue.",
    nailsTrimmed && !removeClipSuccess
    );
    const clothesText = useTypewriter(
    "Now let's put on some clean clothes! Drag the shirt and pants onto the character to get them dressed.",
    gameStage === "clothes" && ringRemoved
    );
    const clothesSuccessText = useTypewriter(
    "Great job for putting on clean clothes! Click the next button to continue.",
    gameStage === "clothes" && clothesRemoved
    );
    const tiedHairText = useTypewriter(
    "Last step! Drag the hair tie onto the character to tie up the hair.",
    gameStage === "tyehair" && !hairTied
    );
    const tiedHairSuccessText = useTypewriter(
    "Great job for tying up the hair! Click the next button to continue.",
    gameStage === "tyehair" && hairTied
    );
    const finalText = useTypewriter(
        "I am ready for volunteering! Lets go to the volunteer location and finish up my personal hygiene.",
        gameStage === "final"
    );
    const startPhaser = () => {

        if (phaserGameRef.current) return; 
        

        const setTrimmed = setNailsTrimmed;

        class ClipperScene extends Phaser.Scene {
            constructor() {
                super("ClipperScene");
            }

            preload() { //actually load the images for the scene. This is where you would add any new assets you want to use in this scene.
                this.load.image("bg", firstBackground);
                this.load.image("bathroombg", bathroomSink);
                this.load.image("hand", hand);
                this.load.image("nailclipper", nailclipper);
                this.load.image("handTrimmed", handTrimmed);
                this.load.image("bowl", bowl);
                this.load.image("ringonfinger", ringonfinger);
                this.load.image("ring", ring);
                this.load.image("dresserbg", dresserBackground);
                this.load.image("shirt", shirt);
                this.load.image("shirtOn", shirtOn);
                this.load.image("dirtyClothes", dirtyClothesOn);
                this.load.image("pants", pants);
                this.load.image("shirtPantsOn", shirtPantsOn);
                this.load.image("shoes", shoes);
                this.load.image("cleanClothesOn", cleanClothesOn);
                this.load.image("tieduphair", tieduphair);
                this.load.image("hairtie", hairtie);
                this.load.image("erininstructions", erintextbox); 

                
                
          
            }

            create() {
                const { width, height } = this.scale;

                this.add.image(width / 2, height / 2, "bathroombg")
                    .setDisplaySize(width, height);
              // Bottom layer (trimmed hand)
                const trimmedHand = this.add.image(
                    width / 2,
                    height / 2 + height * 0.05, 
                    "handTrimmed"
                )
                const handMaxWidth = width * 0.6;   
                const scale = handMaxWidth / trimmedHand.width;
                trimmedHand.setScale(scale);
                

                const longHandImage = this.add.image(
                    width / 2,
                    height / 2 + height * 0.05,  
                    "hand"
                );

                const scale1 = (width * 0.6) / longHandImage.width;
                longHandImage.setScale(scale1);
            

                longHandImage.setVisible(false);
                
                const nailZone = new Phaser.Geom.Rectangle( //actual nail area for clipping
                    width / 2 - width * 0.15, 
                    height / 2 - height * 0.40,  
                    500,              
                    220        
                );
            const gridSize = 20; // size of each cell
            const cells = [];

            for (let x = nailZone.x; x < nailZone.right; x += gridSize) {
                for (let y = nailZone.y; y < nailZone.bottom; y += gridSize) {
                    cells.push({
                        x,
                        y,
                        cleared: false
                    });
                }
            }
                let trimmed = false;

                // Create render texture same size as long hand
                const longHandRT = this.add.renderTexture(
                    longHandImage.x,
                    longHandImage.y,
                    longHandImage.displayWidth,
                    longHandImage.displayHeight
                );

                // Draw the hidden long hand into render texture so user can erase it
                longHandRT.draw(
                    longHandImage,
                    longHandImage.displayWidth / 2,
                    longHandImage.displayHeight / 2
                );
             
                // Remove temporary image
                longHandImage.destroy();
                const eraseBrush = this.make.graphics({ x: 0, y: 0, add: false });
                eraseBrush.fillStyle(0xffffff);
                eraseBrush.fillCircle(0, 0, 25);
                                        
                // Store original position
                const clipperStartX = trimmedHand.x + trimmedHand.displayWidth / 2 + width * 0.05;
                const clipperStartY = trimmedHand.y;

                // Create nail clipper
                const clipper = this.add.image(
                    clipperStartX,
                    clipperStartY,
                    "nailclipper"
                ).setInteractive({ useHandCursor: true });
                const clipperMaxWidth = width * 0.10;
                const clipperScale = clipperMaxWidth / clipper.width;
                const baseScale = clipperMaxWidth / clipper.width;
                clipper.setScale(baseScale);
                    



                this.input.setDraggable(clipper);

                clipper.on("dragstart", () => {
                    clipper.setScale(baseScale);
                });

                clipper.on("dragend", () => {
                    clipper.setScale(baseScale);
                });
               
                this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
                    if (gameObject !== clipper) return;

                    
                    clipper.x = dragX;
                    clipper.y = dragY;

                    
                    const tipOffsetX = -clipper.displayWidth * 0.28;
                    const tipOffsetY = clipper.displayHeight * 0.18;

                    const tipX = dragX + tipOffsetX;
                    const tipY = dragY + tipOffsetY;
                 

                    const localX = (tipX - longHandRT.x) / longHandRT.scaleX + longHandRT.width / 2;
                    const localY = (tipY - longHandRT.y) / longHandRT.scaleY + longHandRT.height / 2;

                
                longHandRT.erase(eraseBrush, localX, localY);
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
                if (!trimmed && percentCleared > 0.40) {
                trimmed = true;
                setTrimmed(true);
                 console.log("Nails fully trimmed!");
                }

            });



            // Show textbox when scene loads
            setShowClipperText(true);

            // when clipper is clicked hide the textbox
            clipper.on("pointerdown", () => {
                setShowClipperText(false);
            });
        this.events.on("shutdown", () => {
            this.input.removeAllListeners();
        });
        }
    }

    class RingScene extends Phaser.Scene {
            constructor() {
                super("RingScene");
            }

            create() {
        const { width, height } = this.scale;

        this.add.image(width/2, height/2, "bathroombg")
            .setDisplaySize(width, height);

        const trimmedHand = this.add.image(
            width/2,
            height/2 + height * 0.05,
            "handTrimmed"
        );

        const scale = (width * 0.6) / trimmedHand.width;
        trimmedHand.setScale(scale);

        // Ring on finger
        const ringOnFinger1 = this.add.image(
            width / 2 + width * 0.005,
            height / 2 - height * 0.15,
            "ringonfinger"
        ).setInteractive({ useHandCursor: true });

        ringOnFinger1.setScale((width * 0.27) / ringOnFinger1.width);

        // Actual draggable ring
        const ring1 = this.add.image(
            ringOnFinger1.x,
            ringOnFinger1.y,
            "ring"
        );

        ring1.setScale((width * 0.30) / ring1.width);
        ring1.setVisible(false);
        ring1.setDepth(200); 
        const ringStart = { x: ring1.x, y: ring1.y };

        // Bowl
        const bowlImage = this.add.image(
            width/2,
            height * 0.65,
            "bowl"
        );

        const bowlScale = (width * 1) / bowlImage.width;
        bowlImage.setScale(bowlScale);

        let wasDragged = false;
        const bowlZone = new Phaser.Geom.Rectangle(
            bowlImage.x - bowlImage.displayWidth * 0.49,
            bowlImage.y - bowlImage.displayHeight * 0.20,
            bowlImage.displayWidth * 0.20,
            bowlImage.displayHeight * 0.30
        );

        // Click ring on finger
        ringOnFinger1.on("pointerdown", () => {

            ringOnFinger1.setVisible(false);
            ring1.setVisible(true);

            ring1.setInteractive({ useHandCursor: true });
            this.input.setDraggable(ring1);

        });

        // Drag ring
        this.input.on("drag", (pointer, gameObject, dragX, dragY) => {

            if (gameObject !== ring1) return;

            wasDragged = true;

            gameObject.x = dragX;
            gameObject.y = dragY;

        });

        // Release ring
        this.input.on("dragend", (pointer, gameObject) => {
            const x = gameObject.x;
            const y = gameObject.y;
            if (gameObject !== ring1) return;
            if (!wasDragged) return;

            

            if (
                Phaser.Geom.Rectangle.Contains(bowlZone, x, y)
            ) {

                // SUCCESS
                ring1.disableInteractive();

                setShowRingText(true);
                setRingRemoved(true);

            } else {

                // SNAP BACK
                ring1.setPosition(
                    ringStart.x,
                    ringStart.y
                );

            }

            wasDragged = false;

    });

    this.events.on("shutdown", () => {
        this.input.removeAllListeners();
    });
}
    }
    
    class ClothesScene extends Phaser.Scene {
    constructor() {
        super("ClothesScene");
    }

    create() {
        const { width, height } = this.scale;
        let clothingStep = 0; 
        const createClickIndicator = (target) => {

            const indicatorContainer = this.add.container(target.x, target.y);

            const radius = Math.max(target.displayWidth, target.displayHeight) / 2 + 10;
            const circle = this.add.circle(0, 0, radius, 0xffffff, 0.3);
            const text = this.add.text(0, -80, "CLICK HERE", {
                fontSize: "28px",
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
      
        this.add.image(width / 2, height / 2, "dresserbg")
            .setDisplaySize(width, height);

        // Character (starts dirty)
        const character = this.add.image(
            width * 0.25 + width * 0.20,
            height * 0.65,
            "dirtyClothes"
        );

        const charScale = (height * 0.7) / character.height;
        character.setScale(charScale);
        let currentIndicator = null;

       // shirt icon on dresser
        const shirtIcon = this.add.image(
            width * 0.75 - width * 0.043,
            height * 0.35 - height * 0.045,
            "shirt"
        );

        const shirtScale = (width * 0.095) / shirtIcon.width;
        shirtIcon.setScale(shirtScale);

        // Make draggable immediately
        shirtIcon.setInteractive({ useHandCursor: true });
        this.input.setDraggable(shirtIcon);

        this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
            if (gameObject === shirtIcon && clothingStep === 0) {
                gameObject.x = dragX;
                gameObject.y = dragY;
            }
        });

        shirtIcon.on("dragend", () => {

            const shirtBounds = shirtIcon.getBounds();
            const charBounds = character.getBounds();

            if (Phaser.Geom.Intersects.RectangleToRectangle(shirtBounds, charBounds)) {

                character.setTexture("shirtOn");
                shirtIcon.destroy();
                clothingStep = 1;

                if (currentIndicator) currentIndicator.destroy();
                currentIndicator = createClickIndicator(pantsIcon);

            } else {

                shirtIcon.setPosition(
                    width * 0.75 - width * 0.043,
                    height * 0.35 - height * 0.045
                );
            }
        });

        // pants on dresser

        const pantsIcon = this.add.image(
            width * 0.75 - width * 0.03,
            height * 0.55,
            "pants"
        );
        const pantsScale = (width * 0.065) / pantsIcon.width;
        pantsIcon.setScale(pantsScale);
        
        pantsIcon.setInteractive({ useHandCursor: true });
        this.input.setDraggable(pantsIcon);

        this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
            if (gameObject === pantsIcon && clothingStep === 1) {
                gameObject.x = dragX;
                gameObject.y = dragY;
            }
        });

        pantsIcon.on("dragend", () => {

            const pantsBounds = pantsIcon.getBounds();
            const charBounds = character.getBounds();

            if (Phaser.Geom.Intersects.RectangleToRectangle(pantsBounds, charBounds)) {

                character.setTexture("shirtPantsOn");
                pantsIcon.destroy();
                clothingStep = 2;

                if (currentIndicator) currentIndicator.destroy();
                currentIndicator = createClickIndicator(shoesIcon);

            } else {

                pantsIcon.setPosition(
                    width * 0.75 - width * 0.03,
                    height * 0.55
                );
            }
        });
        // shoes on dresser
         const shoesIcon = this.add.image(
            width * 0.75 + width * 0.078,
            height * 0.75 - height * 0.045,
            "shoes"
        )
        const shoesScale = (width * 0.078) / shoesIcon.width;
        shoesIcon.setScale(shoesScale);
        shoesIcon.setInteractive({ useHandCursor: true });
        this.input.setDraggable(shoesIcon);

        this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
            if (gameObject === shoesIcon && clothingStep === 2) {
                gameObject.x = dragX;
                gameObject.y = dragY;
            }
        });

        shoesIcon.on("dragend", () => {

            const shoeBounds = shoesIcon.getBounds();
            const charBounds = character.getBounds();

            if (Phaser.Geom.Intersects.RectangleToRectangle(shoeBounds, charBounds)) {

                character.setTexture("cleanClothesOn");
                shoesIcon.destroy();
                clothingStep = 3;

                if (currentIndicator) currentIndicator.destroy();
                setClothesRemoved(true);

            } else {

                shoesIcon.setPosition(
                    width * 0.75 + width * 0.078,
                    height * 0.75 - height * 0.045
                );
            }
        });
            this.events.on("startClothes", () => {

            clothingStep = 0;

            // Enable shirt only now
            shirtIcon.setInteractive({ useHandCursor: true });

            // This creates flashing indicator
            currentIndicator = createClickIndicator(shirtIcon);

            });
            this.events.on("shutdown", () => {
            this.input.removeAllListeners();
        });
    }
}
class TiedHairScene extends Phaser.Scene {
    constructor() {
        super("TiedHairScene");
    }

    create() {
        const { width, height } = this.scale;
        let currentIndicator = null;

        const createClickIndicator = (target) => { //actually highlights which icon to click by creating a flashing circle

            const indicatorContainer = this.add.container(target.x, target.y);

            const radius = Math.max(target.displayWidth, target.displayHeight) / 2 + 10;
            const circle = this.add.circle(0, 0, radius, 0xffffff, 0.3);
            const text = this.add.text(0, -80, "CLICK HERE", {
                fontSize: "28px",
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
        this.input.enabled = false;

        this.time.delayedCall(100, () => {
            this.input.enabled = true;
        });
        
        this.add.image(width / 2, height / 2, "dresserbg")
            .setDisplaySize(width, height);

        
        const character = this.add.image(
            width / 2,
            height * 0.65,
            "cleanClothesOn"
        );

        const charScale = (height * 0.7) / character.height;
        character.setScale(charScale);

        
        const hairTie = this.add.image(
            width * 0.85 - width * 0.10,
            height * 0.75 - height * 0.10,
            "hairtie"
        );
        
        
        const hairTieScale = (width * 0.12) / hairTie.width;
        hairTie.setScale(hairTieScale);
        hairTie.disableInteractive();
       
        let wasDragged = false; 
        hairTie.on("drag", (pointer, dragX, dragY) => {
            hairTie.x = dragX;
            hairTie.y = dragY;
            wasDragged = true;
        });

        hairTie.on("dragend", () => {
            if (!wasDragged) return;
            const hairBounds = hairTie.getBounds();
            const charBounds = character.getBounds();

            if (Phaser.Geom.Intersects.RectangleToRectangle(
                hairBounds,
                charBounds
            )) {
                character.setTexture("tieduphair");
                hairTie.destroy();

                setHairTied(true);
                setShowTyedHairText(false);
            }
        });
        hairTie.on("pointerdown", () => {
            if (currentIndicator) {
                currentIndicator.destroy();
                currentIndicator = null;
            }
        });
        this.events.on("startHairTie", () => {

            hairTie.setInteractive({ useHandCursor: true });
            this.input.setDraggable(hairTie);

            currentIndicator = createClickIndicator(hairTie);
            this.events.on("update", () => {
            if (currentIndicator && hairTie) {
                currentIndicator.x = hairTie.x;
                currentIndicator.y = hairTie.y;
            }
        });
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
    create () {
        const { width, height } = this.scale;
        this.add.image(width / 2, height / 2, "bg").setDisplaySize(width, height);
    }; 
}
        const config = { //actually add the scenes here and this starts the phaser game. The scenes will be switched based on the gameStage state in the main component.
                    type: Phaser.AUTO,
                    width: window.innerWidth,
                    height: window.innerHeight,
                    transparent: true,
                    scene: [ClipperScene, RingScene, ClothesScene, TiedHairScene, FinalScene],
                    parent: "phaser-transition-container"
        };

                phaserGameRef.current = new Phaser.Game(config);

                // Show textbox AFTER Phaser starts
                setShowClipperText(true);
        };
        

    const handleNextClick = () => { //handles the logic for transitioning between scenes based on the current game stage and user actions. It checks the current game stage and relevant state variables to determine if the user has completed the necessary actions to move to the next stage, then updates the game stage and starts the appropriate Phaser scene.
    
    if (gameStage === "intro") {
        startPhaser("clipper");
        setGameStage("clipper");
        return;
    }

    if (gameStage === "clipper" && nailsTrimmed) {
        setGameStage("rings");
        setRemoveClipSuccess(true);

        if (phaserGameRef.current) {
            phaserGameRef.current.scene.start("RingScene");
        }
    }
    if (gameStage === "rings" && ringRemoved) {
        setGameStage("clothes");
        setShowRingText(false);
        setHairInstructionDismissed(false);
        setShowClothesText(true);
        setClothesInstructionsDone(false);

        if (phaserGameRef.current) {
            phaserGameRef.current.scene.start("ClothesScene");
        }
    }
    if (gameStage === "clothes" && clothesRemoved) {
        setHairTied(false);
        setGameStage("tyehair");
        setShowTyedHairText(true);
        setClothesRemoved(false);
        
        if (phaserGameRef.current) {
                phaserGameRef.current.scene.start("TiedHairScene");
        }
        return;
    }
    if (gameStage === "tyehair" && hairTied) {
        setGameStage("final");
        setShowTyedHairText(false);
        setHairTied(false);
        setShowFinalText(true);
        if (phaserGameRef.current) {
                phaserGameRef.current.scene.start("FinalScene");
        }
        
        return;
    }
    if (gameStage === "final") {
        navigate('/module1/symptoms', { replace: true });
    }
    
};
    const isNextDisabled =
            (gameStage === "clipper" && !nailsTrimmed) ||
            (gameStage === "rings" && !ringRemoved) ||
            (gameStage === "clothes" && !clothesRemoved) ||
            (gameStage === "tyehair" && !hairTied);

    return (
        <div 
            className="form" 
            style={{
                ...backgroundStyle,
                position: "relative", 
            }}
        >

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

            {showClipperText && !nailsTrimmed && (
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
                        placeholder={clipperText}
                        placeHolderColor="#000000"
                        placeHolderfontSize="1.1vw"
                    />
                    
                </div>
            )}
        {nailsTrimmed && (
        <div
        style={{
            position: "fixed",
            right: "10vw",
            bottom: "25vh",
            zIndex: 10000
        }}
    >
        {!removeClipSuccess && (<Textbox
            width="30vw"
            height="30vh"
            placeholder={clipperSuccessText}
            placeHolderColor="#000000"
            placeHolderfontSize="1.1vw"
        />)}
        {nailsTrimmed && removeClipSuccess && !showRingText && (gameStage === "rings") && (<Textbox
            width="30vw"
            height="30vh"
            placeholder={ringText}
            placeHolderColor="#000000"
            placeHolderfontSize="1.1vw"
        />)}
        {showRingText && (<Textbox
            width="30vw"
            height="30vh"
            placeholder={ringSuccessText}
            placeHolderColor="#000000"
            placeHolderfontSize="1.1vw"
        />)}
         {clothesRemoved && (<Textbox
            width="30vw"
            height="30vh"
            placeholder={clothesSuccessText}
            placeHolderColor="#000000"
            placeHolderfontSize="1.1vw"
        />)}
      
        {gameStage === "tyehair" && hairTied && !showTyedHairText && (<Textbox
            width="30vw"
            height="30vh"
            placeholder={tiedHairSuccessText}
            placeHolderColor="#000000"
            placeHolderfontSize="1.1vw"
        />)}
        {showClothesText && gameStage === "clothes" && !clothesInstructionsDone && (
        <div
            onClick={() => {
                setClothesInstructionsDone(true);
                setShowClothesText(false);
                if (phaserGameRef.current) {
                    const scene = phaserGameRef.current.scene.getScene("ClothesScene");
                    if (scene) {
                        scene.events.emit("startClothes");
                    }
                }
            }}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: 15000,
                backgroundColor: "rgba(0,0,0,0)", 
                cursor: "pointer"
            }}
        >
            <div
                style={{
                    position: "fixed",
                    right: "10vw",
                    bottom: "25vh"
                }}
            >
                <Textbox
                    width="30vw"
                    height="30vh"
                    placeholder={clothesText}
                    placeHolderColor="#000000"
                    placeHolderfontSize="1.1vw"
                />
            </div>
        </div>
    )}
    {gameStage === "tyehair" && !hairInstructionDismissed && !hairTied && (
        <div
            onClick={() => {
                setHairInstructionDismissed(true);
                if (phaserGameRef.current) {
                    const scene = phaserGameRef.current.scene.getScene("TiedHairScene");
                    if (scene) {
                        scene.events.emit("startHairTie");
                    }
                }
            }}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: 15000,
                backgroundColor: "rgba(0,0,0,0)",
                cursor: "pointer"
            }}
        >
            <div
                style={{
                    position: "fixed",
                    right: "10vw",
                    bottom: "25vh"
                }}
            >
                <Textbox
                    width="30vw"
                    height="30vh"
                    placeholder={tiedHairText}
                    placeHolderColor="#000000"
                    placeHolderfontSize="1.1vw"
                />
            </div>
        </div>
    )}
        
            
       </div>
            )}
           {showFinalText && gameStage === "final" && (
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
            placeholder={finalText}
            placeHolderColor="#000000"
            placeHolderfontSize="1.8vw"
        />
    </div>
)}
            
        
        </div>
    );
}

export default PersonalHygiene;
