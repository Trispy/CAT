import { useEffect, useRef } from "react";
import Phaser from "phaser";

import moduleUpdate from "../../components/moduleupdate";

import bg1 from "../../assets/M5G1/ClosedFridgeOpenCooler.png";
import healthy from "../../assets/M1G1/Healthy.png";
import textbox from "../../assets/M1G1/Textbox.png";
import erinText from "../../assets/M3G1/erintextbox.png"
import next from "../../assets/M1G1/nextbutton.png";
import bg3 from "../../assets/M5G1/ClosedFridgeClosedCooler.png";
import bg2 from "../../assets/M5G1/EmptyZoomedCooler.png";
import bg4 from "../../assets/M5G1/FullZoomedCooler.png";
import bg5 from "../../assets/M5G1/OpenFridgeFullCooler.png";
import ice from "../../assets/M5G1/Ice.png";
import thermometer from "../../assets/M5G1/IceTherm.png";
import iceBox from "../../assets/M5G1/icecooler.png"
import closedBox from "../../assets/M5G1/closedcooler.png";
import emptyBox from "../../assets/M5G1/emptycooler.png";
import prepFood1 from "../../assets/M5G1/PreparedFood1.png"
import prepFood2 from "../../assets/M5G1/PreparedFood2.png"
import hand from "../../assets/M2Cooking/ThermometerHand.png";

import { defaultFont } from "../../formatting";
import { defaultFontSize } from "../../formatting";
import { defaultFontColor } from "../../formatting";
import { defaultTypingSpeed } from "../../formatting";
import Settings from "../../components/settings";
import { useNavigate } from "react-router-dom";
const API = process.env.REACT_APP_API_URL;

export default function ColdPrepTransport({ openMenu, refreshSummary }) {
    const phaserGameRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        window.navigateToPage = navigate;

        class ColdTransport extends Phaser.Scene {
            food1Placed = false;
            food2Placed = false;
            textboxScale = 1;
            erinScale = 1.2;
            iceboxX = 519;
            iceboxY = 200;
            iceboxScale = 0.48;
            zoomedX = 0;
            zoomedY = 0;
            zoomedScale = 1;
            zoomedX1 = 400; 
            zoomedY1 = -20; 
            instructionsShown = false;
            
            
            welcomeTexts = [
                "We will be learning about how to transport cold prepared food and hot prepared food.",
                "In this game, we'll practice setting up a cooler for cold prepared food."
            ];
            instructions = [
                "1. Place ice in cooler.\n2. Close the lid to allow the cooler to chill.\n3. Wait for the timer to run out, then check the temperature in the cooler. Once it gets down to 40 degrees, you can put food in.\n4. Place the food in the cooler.\n5. Place more ice on top of the food.\n6. Close the cooler and don't open it again!"
            ];
            gameMessages = [
                "Click on the cooler!",
                "Drag the ice to the cooler!",
                "Click the cooler lid to close the cooler!",
                "Wait for the cooler to reach 40 degrees or lower!",
                "Click the cooler to check temperature!",
                "Drag thermometer to the cooler!",
                "It's reached the correct temperature! Click the cooler lid to continue.",
                "Drag the prepared food to the cooler!",
                "Click the cooler to add more ice on top!",
                "Drag the ice to the cooler!",
                "Click the cooler lid to close the cooler!"
            ];
            transitions = [
                "Great job! You have successfully packaged the cold prepared food for transport.",
                "Be sure not to leave the cooler out for more than an hour if it's more than 90 degrees out.",
                "Click the next arrow to learn how to transport hot prepared food."
            ];

            constructor() {
                super("ColdPrepTransportScene");
            }

            preload() {
                this.load.image("bg1", bg1);
                this.load.image("healthy", healthy);
                this.load.image("textbox", textbox);
                this.load.image("erinText", erinText);
                this.load.image("next", next);
                this.load.image("prepFood1", prepFood1);                
                this.load.image("prepFood2", prepFood2);                
                this.load.image("bg2", bg2);
                this.load.image("bg3", bg3);
                this.load.image("bg4", bg4);
                this.load.image("bg5", bg5);
                this.load.image("ice", ice);        
                this.load.image("openBox", iceBox);  
                this.load.image("closedBox", closedBox);                
                this.load.image("emptyBox", emptyBox);  
                this.load.image("therm", thermometer);
                this.load.image("hand", hand);              

            }
            
            showPopup(inputText) {           
                    const { width, height } = this.scale;

                    const overlay = this.add.container(0, 0);

                    //user can't interact with items while popup is open
                    const blocker = this.add.rectangle(0, 0, width, height, 0x000000, 0.3)
                    .setOrigin(0)
                    .setInteractive();

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
                        inputText,
                        {
                            font: "40px Arial",
                            color: "#000",
                            wordWrap: { width: width * 0.58  }
                        }
                    ).setOrigin(0.5);

                    const close = this.add.text(
                    width * 0.82,
                    height * 0.20,
                        "X",
                        {
                            font: "bold 40px sans-serif",
                            backgroundColor: "#ff0000",
                            padding: { x: 20, y: 10 }
                        }
                    )
                    .setInteractive()
                    .setOrigin(0.5);

                    close.on("pointerdown", () => {
                        overlay.destroy(true);
                    });

                    overlay.add([blocker, bg, text, close]);
                    overlay.setDepth(1000);
                }
                showInstructions() {
                const { width, height } = this.scale;

                const overlay = this.add.container(0, 0);
                overlay.setDepth(1000);
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
                // Background
                
                this.bg1 = this.add.image(
                    this.scale.width / 2,
                    this.scale.height / 2,
                    "bg1"
                );
                   // Help Button
                /*const helpButton = this.add.text(
                    this.scale.width * 0.89,
                    this.scale.height * 0.07,
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
                .setStroke("#000000", 4)
                .setVisible(false);

                helpButton.on("pointerdown", () => {
                    this.showPopup("1. Place ice in cooler.\n2. Close the lid to allow the cooler to chill.\n3. Wait for the timer to finish, then check the temperature in the cooler. Once it gets down to 40 degrees, you can put food in.\n4. Place the food in the cooler.\n5. Place more ice on top of the food.\n6. Close the cooler and don't open it again.");
                });*/
                this.timerText = "";
                const scaleX = this.scale.width / this.bg1.width;
                const scaleY = this.scale.height / this.bg1.height;

                // ORIGINAL behavior (fit entire image)
                const scale = Math.min(scaleX, scaleY);

                this.bg1.setScale(scale);

                this.erinX = this.bg1.width / 2 - 175;
                this.erinY = this.bg1.height / 2 + 45;

                // Characters
                this.next = this.add.image(
                    1300 * 1.25,
                    175 * 4.35,
                    "next"
                )
                    .setOrigin(0)
                    .setScale(0.35)
                    .setInteractive()
                    .setVisible(true);

                this.emptyBox = this.add.image(
                    this.iceboxX - 205, 
                    this.iceboxY + 20, 
                    "emptyBox")
                .setOrigin(0)
                .setScale(this.iceboxScale * 0.98)
                .setVisible(true);

                this.closedBox = this.add.image(
                    this.iceboxX - 205, 
                    this.iceboxY + 20, 
                    "closedBox")
                .setOrigin(0)
                .setScale(this.iceboxScale* 0.98)
                .setVisible(false);

                 this.openBox = this.add.image(
                    this.iceboxX - 205, 
                    this.iceboxY + 20, 
                    "openBox")
                .setOrigin(0)
                .setScale(this.iceboxScale* 0.98)
                .setVisible(false);

                this.erin = this.add.image(
                    this.erinX, 
                    this.erinY, 
                    "healthy")
                .setOrigin(0)
                .setScale(this.erinScale)
                .setVisible(false);
                
                this.therm = this.add.image(
                    50, 
                    100, 
                    "therm")
                .setOrigin(0)
                .setAngle(-25)
                .setScale(0.7)
                .setVisible(false);
                this.therm.startX = this.therm.x;
                this.therm.startY = this.therm.y;

                this.hand = this.add.image(
                    this.therm.getCenter().x, 
                    this.therm.getCenter().y -50, 
                    "hand")
                .setAngle(270)
                .setOrigin(0)
                .setScale(0.7)
                .setVisible(false);

                this.ice = this.add.image(
                    50, 
                    100, 
                    "ice")
                .setOrigin(0)
                .setScale(0.7)
                .setVisible(false);
                this.ice.startX = this.ice.x;
                this.ice.startY = this.ice.y;

                this.prepFood1 = this.add.image(
                    1450, 
                    250, 
                    "prepFood1")
                .setOrigin(0)
                .setScale(0.2)
                .setVisible(false);

                this.prepFood2 = this.add.image(
                    1450, 
                    450, 
                    "prepFood2")
                .setOrigin(0)
                .setScale(0.2)
                .setVisible(false);
                this.prepFood1.startX = this.prepFood1.x;
                this.prepFood1.startY = this.prepFood1.y;
                this.prepFood2.startX = this.prepFood2.x;
                this.prepFood2.startY = this.prepFood2.y;

                this.coolertop1 = this.add.rectangle(650,10, 1000, 350).setOrigin(0);
                //this.coolertop1.setStrokeStyle(4, 0o0);
                this.coolertop1.setVisible(false);

                this.coolertop2 = this.add.rectangle(650,10, 1000, 350).setOrigin(0);
                //this.coolertop2.setStrokeStyle(4, 0o0);
                this.coolertop2.setVisible(false);

                this.coolertop3 = this.add.rectangle(650,10, 1000, 350).setOrigin(0);
                //this.coolertop3.setStrokeStyle(4, 0o0);
                this.coolertop3.setVisible(false);

                this.textboxErin = this.add.container(this.bg1.width / 2 - 640, 50);

                this.textboxErinImage = this.add.image(0, 0, "erinText").setOrigin(0);

                this.textboxErin.setSize(this.textboxErinImage.width, this.textboxErinImage.height);
                this.textboxErin.add(this.textboxErinImage);
                this.textboxErin.setScale(this.textboxScale);
                this.textboxErinImage.setVisible(false);


                // Textbox
                this.textbox = this.add.container(150, 100);

                this.textboxImage = this.add.image(0, 0, "erinText").setOrigin(0);

                this.textboxText = this.add.text(600, 100, "", {
                    font: "bold 70px sans-serif",
                    color: "#000",
                    wordWrap: {
                        width: this.textboxImage.width * 0.6
                    }
                }).setOrigin(0);

                this.typewriteText("Welcome to the Module 5: Prepared Food Transport!");

                this.textbox.setSize(this.textboxImage.width, this.textboxImage.height);
                this.textbox.add([this.textboxImage, this.textboxText]);
                this.textbox.setScale(this.textboxScale);
              
                // Interactions
                this.next.on("pointerdown", () => {
                    if (this.welcomeTexts.length > 0) {
                        this.typewriteText(this.welcomeTexts[0]);
                        this.welcomeTexts.shift();
                    }
                    else if(!this.instructionsShown){
                        this.showPopup(this.instructions[0]);
                        this.instructionsShown = true; 
                        if (this.emptyBox) this.emptyBox.setInteractive();
                        this.next.setVisible(false);
                        this.iterateGameMessage();
                    }
                    else if (this.transitions.length > 0){
                        this.typewriteText(this.transitions[0]);
                        this.transitions.shift();
                    }
                    else {
                        this.cleanupScene();
                        moduleUpdate(`${API}/api/game/module5/coldPreparedTransport/completed`, refreshSummary);
                        window.navigateToPage("/module5/hotPreparedTransport");
                    }
                });

                this.emptyBox.on("pointerdown", () => {
                    //this.erin.setVisible(false);
                    this.iterateGameMessage();
                    this.emptyBox.setScale(this.zoomedScale);
                    this.emptyBox.setPosition(this.zoomedX,this.zoomedY);
                    this.bg1.setTexture("bg2");
                    this.ice.setInteractive();
                    this.ice.setVisible(true);
                    this.input.setDraggable(this.ice);
                    this.emptyBox.disableInteractive();
                    console.log("empty");
                });

               this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
                            gameObject.x = dragX;
                            gameObject.y = dragY;
                            if(gameObject === this.therm){
                                this.hand.x = this.therm.getCenter().x;
                                this.hand.y = this.therm.getCenter().y - 50;
                            }
                        });
                this.timerStart = false;
                //tap the lid to close the box
                this.ice.on("dragend", () => {
                     if(this.checkBounds(this.ice)){
                        if(this.emptyBox){
                            console.log("hi");
                            this.ice.setVisible(false);
                            this.openBox.setVisible(true);
                            this.openBox.setScale(this.zoomedScale);
                            this.openBox.setPosition(this.zoomedX, this.zoomedY);
                            this.coolertop1.setInteractive();
                            this.coolertop1.setVisible(true);
                            this.iterateGameMessage();
                        }
                        else if(this.openBox){
                        this.iterateGameMessage();
                        this.ice.setVisible(false);
                        this.prepFood1.setVisible(false);
                        this.prepFood2.setVisible(false);
                        this.coolertop3.setInteractive();
                        this.coolertop3.setVisible(true);
                    }
                    }
                    else {
                    this.tweens.add({
                        targets: this.ice,
                        x: this.ice.startX,
                        y: this.ice.startY,
                        duration: 300,
                        ease: "Power2"
                    });
                }
                });

                this.coolertop1.on("pointerdown", () =>{
                    this.iterateGameMessage();
                    this.coolertop1.disableInteractive();
                    this.coolertop1.destroy();
                       this.bg1.setTexture("bg3");
                        this.emptyBox.setVisible(false);
                        this.emptyBox.disableInteractive();
                        this.emptyBox = null;
                        this.openBox.setVisible(false);
                        this.closedBox.setVisible(true);
                        //this.erin.setVisible(true);
                        if(!this.timerStart){
                            this.timerStart = true;
                            let timeLeft = 10;
                            this.timerText = this.add.text(
                                this.bg1.width * 0.81,
                                this.bg1.height * 0.25,
                                ":10",
                            {
                                backgroundColor: "#000000",
                                borderColor: "#ffffff",
                                borderWidth: 4,
                                fontSize: "52px",
                                color: "#ff0000",
                                fontStyle: "bold"
                                
                            }
                        ).setOrigin(0.5);
                        this.timerText.setDepth(1000);
                        this.time.addEvent({
                            delay: 1000, //one second
                            loop: true,
                            callback: () => {
                                if (timeLeft <= 0) return;
                                timeLeft--;
                                this.timerText.setText(":" + timeLeft.toString());

                                if (timeLeft <= 0) {

                                    this.timerText.setText("Done!");
                                    if (this.closedBox) this.closedBox.setInteractive();
                                    this.iterateGameMessage();
                                }

                            }});
                }
                })

                this.coolertop2.on("pointerdown", ()=>{
                    this.iterateGameMessage();
                    this.therm.setVisible(false);
                    this.hand.setVisible(false);
                    this.coolertop2.disableInteractive();
                    this.coolertop2.destroy();
                    this.closedBox.setVisible(false);
                    //this.erin.setVisible(true);
                    this.bg1.setTexture("bg5");
                    this.prepFood1.setVisible(true).setInteractive();
                    this.prepFood2.setVisible(true).setInteractive();
                    this.input.setDraggable(this.prepFood1);
                    this.input.setDraggable(this.prepFood2);
                    this.openBox.setVisible(true);
                    this.openBox.setScale(this.iceboxScale);
                    this.openBox.setPosition(this.iceboxX - 205, this.iceboxY + 20);
                    
                })
                  this.closedBox.on("pointerdown", () => {
                    this.iterateGameMessage();
                    this.timerText.destroy();
                    //this.erin.setVisible(false);
                    this.closedBox.setVisible(false);
                    this.openBox.setVisible(true);
                    this.bg1.setTexture("bg4");
                    this.therm.setInteractive();
                    this.therm.setVisible(true);
                    this.hand.setVisible(true);
                    this.input.setDraggable(this.therm);
                    this.closedBox.disableInteractive();
                    console.log("closed");
                });
                this.therm.on("dragend", () => {
                    if(this.checkBounds(this.therm)){
                        this.growTemp(this.hand);
                    }
                    else {
  
                    this.tweens.add({
                        targets: this.therm,
                        x: this.therm.startX,
                        y: this.therm.startY,
                        duration: 300,
                        ease: "Power2"
                    });
                }
                });

                this.prepFood1.on("dragend", () =>{
                       if (this.checkBounds(this.prepFood1)) {
                        this.prepFood1.setScale(0.13);
                        this.food1Placed = true;
                    } else {
                        this.food1Placed = false;

                        this.tweens.add({
                            targets: this.prepFood1,
                            x: this.prepFood1.startX,
                            y: this.prepFood1.startY,
                            duration: 300,
                            ease: "Power2"
                        });
                    }
                    if (this.food1Placed && this.food2Placed) {
                        if (this.openBox) {
                            this.openBox.setInteractive();
                        }
                        this.prepFood1.disableInteractive();
                        this.prepFood2.disableInteractive();
                        this.iterateGameMessage();
                    }

                    });
                this.prepFood2.on("dragend", () =>{
                  if (this.checkBounds(this.prepFood2)) {
                        this.prepFood2.setScale(0.13);
                        this.food2Placed = true;
                    } else {
                        this.food2Placed = false;

                        this.tweens.add({
                            targets: this.prepFood2,
                            x: this.prepFood2.startX,
                            y: this.prepFood2.startY,
                            duration: 300,
                            ease: "Power2"
                        });
                    }
                    if (this.food1Placed && this.food2Placed) {
                        if (this.openBox) {
                            this.openBox.setInteractive();
                        }
                        this.prepFood1.disableInteractive();
                        this.prepFood2.disableInteractive();
                        this.iterateGameMessage();
                    }
                });

                this.openBox.on("pointerdown", () => {
                    //this.erin.setVisible(false);
                    this.iterateGameMessage();
                    this.openBox.setScale(this.zoomedScale);
                    this.openBox.setPosition(this.zoomedX,this.zoomedY);
                    this.prepFood1.setScale(0.4);
                    this.prepFood2.setScale(0.4);
                    this.bg1.setTexture("bg4");
                    this.ice.setVisible(true);
                    this.ice.setPosition(50,100);
                    console.log("open");
                });
          
                this.coolertop3.on("pointerdown", () =>{
                    this.bg1.setTexture("bg3");
                    this.openBox.setVisible(false);
                    this.ice.setVisible(false);
                    //helpButton.setVisible(false);
                    this.textbox.setVisible(true);
                    //this.textbox.setScale(this.textboxScale);
                    //this.textbox.setPosition(150, 100);
                    this.typewriteText(this.transitions[0]);
                    this.transitions.shift();
                    this.next.setVisible(true);
                    this.coolertop3.disableInteractive();
                    this.coolertop3.destroy();
                })
        }
        cleanupScene() {
            const objects = [
                this.bg1,
                this.next,
                this.emptyBox,
                this.closedBox,
                this.openBox,
                this.erin,
                this.therm,
                this.hand,
                this.ice,
                this.prepFood1,
                this.prepFood2,
                this.coolertop1,
                this.coolertop2,
                this.coolertop3,
                this.textbox,
                this.textboxImage,
                this.textboxText,
                this.textboxErin,
                this.textboxErinImage,
                this.timerText
            ];

            objects.forEach(obj => {
                if (obj && obj.destroy) {
                    obj.destroy(true);
                }
            });

            if (this.typingEvent) this.typingEvent.remove(false);
            this.time.removeAllEvents();

            this.input.removeAllListeners();

            this.tweens.killAll();

            this.scene.stop();
        }
        iterateGameMessage(){
            if (this.gameMessages.length === 0) return;
            this.textbox.setScale(0.6);
            this.textboxText.setFontSize(90);
            this.textbox.setPosition(500,720);
            this.typewriteText(this.gameMessages[0]);
            this.gameMessages.shift();
        }
        growTemp(hand){
            this.tweens.add({
                targets: hand,
                angle: -235,
                duration: 5000,
                ease:'Linear',
                onComplete: () => {
                    this.coolertop2.setInteractive();
                    this.coolertop2.setVisible(true);
                    this.iterateGameMessage();
                }
            })
        }
        checkBounds(draggedItem){
                this.rect1 = this.add.rectangle(940,550, 800, 250);
                this.rect2 = this.add.rectangle(730,500, 450, 390);
                const itemBounds = draggedItem.getBounds();
                //this.rect1.setStrokeStyle(4, 0o0);
                //this.rect2.setStrokeStyle(4, 0o0);
                let targetBounds = this.openBox.getBounds();
                if(draggedItem === this.prepFood1|| draggedItem === this.prepFood2){
                     targetBounds =  this.rect2.getBounds();                
                }    
                console.log(itemBounds);
                console.log(targetBounds);
                if (Phaser.Geom.Intersects.RectangleToRectangle(itemBounds, targetBounds)) {
                    return true;
                }
                return false;
            }
            typewriteText(text, type, speed = 25) {
                //removes old timer before new one starts
                if (!text) return;
                if (this.typingEvent) {
                    this.typingEvent.remove(false);
                }

                this.textboxText.setText("");
                this.next.disableInteractive();

                let i = 0;

                this.typingEvent = this.time.addEvent({
                    delay: speed,
                    repeat: text.length - 1,
                    callback: () => {
                        this.textboxText.text += text[i];
                        i++;

                        if (i === text.length) {
                            this.next.setInteractive();
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
            backgroundColor: "#000000",
            scene: [ColdTransport],
            parent: "phaser-game"
        };

        phaserGameRef.current = new Phaser.Game(config);

        return () => {
            phaserGameRef.current.destroy(true);
        };
    }, []);

    return (
        <div
            style={{
                height: "100vh",
                overflow: "hidden",
                position: "relative",
                backgroundColor: "black"
            }}
        >
            <div
                id="phaser-game"
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100dvw",
                    height: "100dvh",
                    zIndex: 1
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
           
                           <button
                           onClick={() => {
                               if (phaserGameRef.current) {
                               const scene = phaserGameRef.current.scene.getScene("ColdPrepTransportScene");
                               scene.showInstructions();
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
                       <Settings openMenu={openMenu} />
                       </div>
        </div>
    );
}