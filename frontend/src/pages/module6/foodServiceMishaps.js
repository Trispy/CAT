import { useEffect } from "react";
import Phaser from "phaser";

import bg1 from "../../assets/M5G1/ClosedFridgeOpenCooler.png";
import healthy from "../../assets/M1G1/Healthy.png";
import textbox from "../../assets/M1G1/Textbox.png";
import erinText from "../../assets/M3G1/erintextbox.png"
import next from "../../assets/M1G1/nextbutton.png";
import ice from "../../assets/M5G1/Ice.png";
import thermometer from "../../assets/M5G1/IceTherm.png";
import iceBox from "../../assets/M5G1/icecooler.png"
import closedBox from "../../assets/M5G1/closedcooler.png";
import emptyBox from "../../assets/M5G1/emptycooler.png";
import hand from "../../assets/M2Cooking/ThermometerHand.png";
import coldThermometer from "../../assets/M5G1/IceTherm.png";


import { defaultFont } from "../../formatting";
import { defaultFontSize } from "../../formatting";
import { defaultFontColor } from "../../formatting";
import { defaultTypingSpeed } from "../../formatting";
import Settings from "../../components/settings";
import { useNavigate } from "react-router-dom";

export default function FoodServiceMishaps({ openMenu }) {
    const navigate = useNavigate();

    useEffect(() => {
        window.navigateToPage = navigate;

        class FoodServiceMishap extends Phaser.Scene {
            textboxScale = 1;
            erinScale = 1.2;
            iceboxX = 519;
            iceboxY = 200;
            iceboxScale = 0.48;
            
          
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
                super("FoodServiceMishapsScene");
            }

            preload() {
                this.load.image("bg1", bg1);
                this.load.image("healthy", healthy);
                this.load.image("textbox", textbox);
                this.load.image("erinText", erinText);
                this.load.image("next", next);
                this.load.image("ice", ice);        
                this.load.image("openBox", iceBox);  
                this.load.image("closedBox", closedBox);                
                this.load.image("emptyBox", emptyBox);  
                this.load.image("therm", thermometer);
                this.load.image("coldTherm", coldThermometer);                
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
                        width * 0.8,
                        height * 0.8,
                        0xffffff
                    ).setStrokeStyle(4, 0x000000);

                    const text = this.add.text(
                        width / 2,
                        height / 2,
                        inputText,
                        {
                            font: "bold 50px sans-serif",
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

                    overlay.add([blocker, bg, text, close]);
                    overlay.setDepth(1000);
                }

            create() {
                // Background
                
                this.bg1 = this.add.image(
                    this.scale.width / 2,
                    this.scale.height / 2,
                    "bg1"
                );
                   // Help Button
                const helpButton = this.add.text(
                    this.scale.width * 0.89,
                    this.scale.height * 0.09,
                    "?",
                    {
                        font: "bold 70px sans-serif",
                        backgroundColor: "#ffffff",
                        color: "#5100ff",
                        padding: { x: 20, y: 20 }
                    }
                )
                .setOrigin(0.5)
                .setInteractive({ useHandCursor: true })
                .setDepth(1000)
                .setStroke("#000000", 4)
                .setVisible(false);

                helpButton.on("pointerdown", () => {
                    this.showPopup("1. Place ice in cooler.\n2. Close the lid to allow the cooler to chill.\n3. Wait for the timer to finish, then check the temperature in the cooler. Once it gets down to 40 degrees, you can put food in.\n4. Place the food in the cooler.\n5. Place more ice on top of the food.\n6. Close the cooler and don't open it again.");
                });
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
                    this.iceboxX, 
                    this.iceboxY, 
                    "emptyBox")
                .setOrigin(0)
                .setScale(this.iceboxScale)
                .setVisible(true);

                this.closedBox = this.add.image(
                    this.iceboxX - 20, 
                    this.iceboxY + 150, 
                    "closedBox")
                .setOrigin(0)
                .setScale(this.iceboxScale)
                .setVisible(false);

                 this.openBox = this.add.image(
                    this.iceboxX, 
                    this.iceboxY, 
                    "openBox")
                .setOrigin(0)
                .setScale(this.iceboxScale)
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


                this.coolertop1 = this.add.rectangle(650,10, 1000, 350).setOrigin(0);
                //this.coolertop1.setStrokeStyle(4, 0o0);
                this.coolertop1.setVisible(false);

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
                    else if(this.instructions.length > 0){
                        //this.textbox.setVisible(false);
                        this.showPopup(this.instructions[0]);
                        this.emptyBox.setInteractive();
                        this.next.setVisible(false);
                        this.instructions.shift();
                        helpButton.setVisible(true);
                        this.iterateGameMessage();
                    }
                    else if (this.transitions.length > 0){
                        this.typewriteText(this.transitions[0]);
                        this.transitions.shift();
                    }
                    else {
                        this.cleanupScene();
                        window.navigateToPage("/module5/hotPreparedTransport");
                    }
                });

                this.emptyBox.on("pointerdown", () => {

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
                });

                this.coolertop1.on("pointerdown", () =>{
                })
                  this.closedBox.on("pointerdown", () => {
                });
                this.therm.on("dragend", () => {
                    if(this.checkBounds(this.therm)){
                        this.growTemp(this.hand);
                    }
                });

                this.openBox.on("pointerdown", () => {
                });
          
        }
        iterateGameMessage(){
            console.log("exd");
            this.textbox.setScale(0.6);
            this.textboxText.setFontSize(90);
            this.textbox.setPosition(500,720);
            this.typewriteText(this.gameMessages[0]);
            this.gameMessages.shift();
        }
       
        growTemp(hand){
            hand.disableInteractive();
            this.tweens.add({
                targets: hand,
                angle: 270,
                duration: 5000,
                ease:'Linear',
                onComplete: () => {
                if(hand === this.hand1){
                    this.therm1Done = true;
                }
                if(hand === this.hand2) {
                    this.therm2Done = true;
                }

                if(this.therm1Done && this.therm2Done){
                    this.therm1Done = false;
                    this.therm2Done = false;
                    this.iterateGameMessage();
                    this.input.setDraggable(this.chickenPan);
                    this.input.setDraggable(this.soupPan);
                    this.tupper.setVisible(true);
                    this.openThermos.setVisible(true);
                }
                }
            })
        }
        
    centerHand() {
            this.hand1.x = this.therm1.getCenter().x - 20;
            this.hand1.y = this.therm1.getCenter().y + 10;
            this.hand2.x = this.therm2.getCenter().x - 20;
            this.hand2.y = this.therm2.getCenter().y + 10;
    }
          growTemp2(hand){
            hand.disableInteractive();
            this.tweens.add({
                targets: hand,
                angle: 280,
                duration: 5000,
                ease:'Linear',
                onComplete: () => {
                if(hand === this.hand1){
                    this.therm1Done = true;
                }
                if(hand === this.hand2) {
                    this.therm2Done = true;
                }

                if(this.therm1Done && this.therm2Done){
                    this.iterateGameMessage();
                    this.next.setVisible(true);
                }
                }
            })
        }
            typewriteText(text, type, speed = 30) {
                //removes old timer before new one starts
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
            scene: [FoodServiceMishap],
            parent: "phaser-game"
        };

        const game = new Phaser.Game(config);

        return () => {
            game.destroy(true);
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