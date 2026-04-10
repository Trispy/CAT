import { useEffect, useRef } from "react";
import Phaser, { Game } from "phaser";

import moduleUpdate from "../../components/moduleupdate";
import callUpdate from "../../components/callupdate";

import bg1 from "../../assets/M2Cooking/CookingBackground.png";
import healthy from "../../assets/M1G1/Healthy.png";
import textbox from "../../assets/M1G1/Textbox.png";
import erinText from "../../assets/M3G1/erintextbox.png"
import next from "../../assets/M1G1/nextbutton.png";
import thermometer from  "../../assets/M5G2/thermometer.png";
import bag from "../../assets/M5G2/OpenBag.png"
import hand from "../../assets/M2Cooking/ThermometerHand.png";
import bg2 from "../../assets/M5G2/CookingBackground.png";
import soupPan from "../../assets/M5G2/SoupPan.png";
import chickenPan from "../../assets/M5G2/ChickenPan.png";
import tupper from "../../assets/M5G2/Tupperware.png"
import tupperChicken from "../../assets/M5G2/TupperwareChicken.png"
import closedThermos from "../../assets/M5G2/ClosedThermos.png"
import closedBag from "../../assets/M5G2/ClosedBag.png"
import bg3 from "../../assets/M5G1/ClosedFridgeClosedCooler.png";
import pan1 from "../../assets/M2Cooking/FryingPan.png";
import pan2 from "../../assets/M5G2/FryingPan.png";
import soup from  "../../assets/M5G2/Soup.png";
import chicken from  "../../assets/M5G2/Chicken.png";

import openThermos from "../../assets/M5G2/OpenThermos.png"


import { defaultFont } from "../../formatting";
import { defaultFontSize } from "../../formatting";
import { defaultFontColor } from "../../formatting";
import { defaultTypingSpeed } from "../../formatting";
import Settings from "../../components/settings";
import { useNavigate } from "react-router-dom";
const API = process.env.REACT_APP_API_URL;
export default function HotPrepTransport({ openMenu }) {
    const phaserGameRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        window.navigateToPage = navigate;

        class HotTransport extends Phaser.Scene {
            textboxScale = 1;
            erinScale = 1.2;
            bagX = 519;
            bagY = 0;
            bagScale = 1;
            zoomedX = 400;
            zoomedY = 200;
            zoomedScale = 1.2;
            therm1Done = false;
            therm2Done = false;
            chickenPacked = false;
            soupPacked = false;
            timerStart = false;
            serveReady = false;
            tupperPacked = false;
            thermosPacked = false;
            chickenReheat = false
            soupReheat = false;

            instructions = [
                "1. Drag the thermometers to food on the stove. It must be at least 140 degrees fahrenheit.\n2. Drag the soup into the insulated mug and the chicken into the tupperware.\n3. Put the containers of food into the insulated bag and close it up. Don't open until the timer runs out. \n4. Drag the food to the stove, then drag the thermometers to the food and reheat until it reaches at least 165 degrees."
            ];
            gameMessages = [
                "Drag the thermometers to the food in the pans! The food must be at least 140 degrees °F.",
                "It is at least 140 °F! Drag the chicken to the tupperware and the soup to the insulated mug!",
                "Drag the containers of food into the insulated bag!",
                "Tap the bag to zip it up!",
                "Don't open until it's time to serve!",
                "Remember, the bag can only hold food safely for 2 hours max!",
                "It's time to serve! Tap the bag to open it up.",
                "Drag the food onto the pans to reheat!",
                "Drag the thermometers into the pans! Food must be reheated to 165 °F.",
                "The food has reached a temperature of at least 165 degrees! It's ready to serve!"
            ];
            transitions = [
                "Great job! You have successfully packaged hot prepared food for transport and reheated for serving!",
                "Prepared food being transported should always be served, reheated, or refridgerated within 2 hours.",
                "Also, remember to pack ready-to-eat items and raw items separately if both are being transported.",
                "Click the next button to return to the modules map!"
            ];

            constructor() {
                super("HotPrepTransportScene");
            }

            preload() {
                this.load.image("bg1", bg1);
                this.load.image("bg2", bg2);
                this.load.image("bg3", bg3);
                this.load.image("healthy", healthy);
                this.load.image("textbox", textbox);
                this.load.image("erinText", erinText);
                this.load.image("next", next);
                this.load.image("bag", bag);  
                this.load.image("therm", thermometer);
                this.load.image("hand", hand);              
                this.load.image("chickenPan", chickenPan);
                this.load.image("soupPan", soupPan);   
                this.load.image("soup", soup);        
                this.load.image("chicken", chicken);                              
                this.load.image("openThermos", openThermos);
                this.load.image("closedThermos", closedThermos);              
                this.load.image("tupper", tupper);
                this.load.image("tupperChicken", tupperChicken);   
                this.load.image("closedBag", closedBag);
                this.load.image("pan1", pan1);
                this.load.image("pan2", pan2);

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
                            font: "40px Arial",
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
                    this.showPopup("1. Drag the thermometers to food on the stove. It must be at least 140 degrees fahrenheit.\n2. Drag the soup into the insulated mug and the chicken into the tupperware.\n3. Put the containers of food into the insulated bag and close it up. Don't open until the timer runs out. \n4. Drag the food to the stove, then drag the thermometers to the food and reheat until it reaches at least 165 degrees.")});*/
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


                this.erin = this.add.image(
                    this.erinX, 
                    this.erinY, 
                    "healthy")
                .setOrigin(0)
                .setScale(this.erinScale)
                .setVisible(false);

                
                this.emptyBag = this.add.image(
                    this.bagX, 
                    this.bagY, 
                    "bag")
                .setOrigin(0)
                .setInteractive({dropZone: true})
                .setScale(this.bagScale)
                .setVisible(false);
                
                this.tupper = this.add.image(
                    12, 
                    400, 
                    "tupper")
                .setOrigin(0)
                .setAngle(3)
                .setScale(0.3)
                .setInteractive({dropZone: true})
                .setVisible(false);

                
                 this.pan1 = this.add.image(
                    975, 
                    250, 
                    "pan1")
                .setOrigin(0)
                .setAngle(3)
                .setScale(1)
                .setInteractive({dropZone: true})
                .setVisible(false);
                  this.pan2 = this.add.image(
                    180, 
                    335, 
                    "pan2")
                .setInteractive({dropZone: true})
                .setOrigin(0)
                .setAngle(-5)
                .setScale(0.8)
                .setVisible(false);

                
                this.closedThermos = this.add.image(
                    1600, 
                    400, 
                    "closedThermos")
                .setOrigin(0)
                .setAngle(-5)
                .setInteractive()
                .setScale(0.5)
                .setVisible(false);
                
                   this.tupperChicken = this.add.image(
                    12, 
                    400, 
                    "tupperChicken")
                .setOrigin(0)
                .setAngle(3)
                .setScale(0.3)
                .setInteractive()
                .setVisible(false);

                  this.openThermos = this.add.image(
                    1600, 
                    400, 
                    "openThermos")
                .setOrigin(0)
                .setAngle(-5)
                .setInteractive({dropZone: true})
                .setScale(0.5)
                .setVisible(false);


                 this.closedBag = this.add.image(
                    this.bagX, 
                    this.bagY, 
                    "closedBag")
                .setOrigin(0)
                .setInteractive()
                .setScale(1.3)
                .setVisible(false);

                this.chickenPan = this.add.image(
                    975, 
                    250, 
                    "chickenPan")
                .setOrigin(0)
                .setAngle(3)
                .setScale(1)
                .setInteractive({dropZone: true})
                .setVisible(true);

                this.chicken = this.add.image(
                    975, 
                    250, 
                    "chicken")
                .setOrigin(0)
                .setAngle(3)
                .setScale(1)
                .setVisible(false);
            

                   this.soupPan = this.add.image(
                    180, 
                    335, 
                    "soupPan")
                .setInteractive({dropZone: true})
                .setOrigin(0)
                .setAngle(-5)
                .setScale(0.8)
                .setVisible(true);

                  this.soup = this.add.image(
                    180, 
                    335, 
                    "soup")
                .setOrigin(0)
                .setAngle(-5)
                .setScale(0.8)
                .setVisible(false);

                    this.therm2 = this.add.image(
                    100, 
                    500, 
                    "therm")
                .setOrigin(0)
                .setInteractive()
                .setAngle(-25)
                .setScale(0.4)
                .setVisible(true);

                    
                this.therm1 = this.add.image(
                    100, 
                    750, 
                    "therm")
                .setOrigin(0)
                .setInteractive()               
                .setAngle(-25)
                .setScale(0.4)
                .setVisible(true);

                this.hand2 = this.add.image(
                    this.therm2.getCenter().x - 20,
                    this.therm2.getCenter().y + 10, 
                    "hand")
                .setAngle(75)
                .setOrigin(0)
                .setScale(0.4)
                .setVisible(true);

                this.hand1 = this.add.image(
                this.therm1.getCenter().x - 20,
                this.therm1.getCenter().y + 10, 
                    "hand")
                .setAngle(75)
                .setOrigin(0)
                .setScale(0.4)
                .setVisible(true);

                
             

                
                
                this.zoney = this.add.rectangle(550,320, 200, 10).setOrigin(0);
                this.zoney.setStrokeStyle(4, 0o0);
                this.zoney.setVisible(false);


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

                this.typewriteText("In this game, we will go over how to properly transport prepared hot food.");

                this.textbox.setSize(this.textboxImage.width, this.textboxImage.height);
                this.textbox.add([this.textboxImage, this.textboxText]);
                this.textbox.setScale(this.textboxScale);
              
                // Interactions
                this.next.on('pointerdown', async () => {
                    if(this.instructions.length > 0){
                        this.showPopup(this.instructions[0]);
                        this.emptyBag.setInteractive();
                        this.next.setVisible(false);
                        //this.instructions.shift();
                        //helpButton.setVisible(true);
                        this.iterateGameMessage();
                        this.input.setDraggable(this.therm1);
                        this.input.setDraggable(this.therm2);
                    }
                    else if (this.transitions.length > 0){
                        //helpButton.setVisible(false);
                        this.bg1.setTexture("bg3");
                        this.textboxText.setFontSize("70px");
                        this.textbox.setPosition(150, 100);
                        this.textbox.setScale(this.textboxScale);
                        this.typewriteText(this.transitions[0]);
                        this.transitions.shift();
                    }
                    else {
                        this.cleanupScene();
                        await moduleUpdate(`${API}/api/game/module5/hotPreparedTransport/completed`);
                        callUpdate("m5");
                        navigate("/map");
                    }
                });
                   this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
                            gameObject.x = dragX;
                            gameObject.y = dragY;
                           if(gameObject === this.therm1 || gameObject === this.therm2){
                            this.centerHand();
                           }
                        });

                        this.input.on("dragstart", (pointer, gameObject, dragX, dragY) => {
                           if(gameObject === this.chickenPan || gameObject === this.soupPan){
                            this.therm1.setVisible(false);
                            this.therm2.setVisible(false);
                            this.hand1.setVisible(false);
                            this.hand2.setVisible(false);

                           }
                        });

                     this.input.on('drop', (pointer, gameObject, dropZone) => {
                        if(gameObject === this.therm1 && (dropZone === this.chickenPan || dropZone === this.soupPan)){
                            this.growTemp(this.hand1);
                            gameObject.setPosition(dropZone.x / 2 + 480, dropZone.y / 2 + 250);
                            this.centerHand();
                            this.therm1.disableInteractive();dropZone.input.dropZone = false;            
                           }
                           else if (gameObject === this.therm2 && (dropZone === this.chickenPan || dropZone === this.soupPan)){
                            this.growTemp(this.hand2);
                            gameObject.setPosition(dropZone.x / 2 + 480, dropZone.y / 2 + 250);    
                            this.centerHand();       
                            this.therm2.disableInteractive();
                            dropZone.input.dropZone = false;            
                           }
                           else if(gameObject === this.soupPan && dropZone === this.openThermos){
                            if(this.chickenPacked){
                                this.iterateGameMessage();
                                this.bg1.setTexture("bg2");
                                this.emptyBag.setVisible(true);
                                this.input.setDraggable(this.closedThermos);
                                this.input.setDraggable(this.tupperChicken);
                            }
                            this.soupPacked = true;
                            this.soupPan.setVisible(false);
                            this.openThermos.setVisible(false);
                            this.closedThermos.setVisible(true);
                           }
                           else if(gameObject === this.chickenPan && dropZone === this.tupper){
                             if(this.soupPacked){
                                this.iterateGameMessage();
                                this.bg1.setTexture("bg2");
                                this.emptyBag.setVisible(true);
                                this.input.setDraggable(this.closedThermos);
                                this.input.setDraggable(this.tupperChicken);
                            }
                            this.chickenPacked = true;
                            this.chickenPan.setVisible(false);
                            this.tupper.setVisible(false);
                            this.tupperChicken.setVisible(true);
                           }
                           else if (gameObject === this.tupperChicken && dropZone === this.emptyBag){
                            if(this.thermosPacked){
                                this.iterateGameMessage();
                                this.closedBag.setVisible(true);
                                this.closedBag.setAlpha(0.01);
                            }
                            this.tupperPacked = true;
                            this.tupperChicken.setPosition( this.emptyBag.x /2 + 400, this.emptyBag.y /2 + 200)
                           }
                           else if (gameObject === this.closedThermos && dropZone === this.emptyBag){
                            if(this.tupperPacked){
                                this.iterateGameMessage();
                                this.closedBag.setVisible(true);
                                this.closedBag.setAlpha(0.01);
                            }
                            this.thermosPacked = true;
                            this.closedThermos.setPosition( this.emptyBag.x /2 + 600, this.emptyBag.y /2)
                           }
                           else if (gameObject === this.closedThermos && (dropZone === this.pan1 || dropZone === this.pan2)){
                            this.soupReheat = true;
                            if(dropZone === this.pan2){
                                this.soup.flipX = true;
                            }
                            this.soup.setVisible(true);
                            this.closedThermos.setVisible(false);
                             this.soup.setScale(dropZone.scale);
                             this.soup.setPosition(dropZone.x, dropZone.y);
                             this.soup.setAngle(dropZone.angle);
                           }
                             else if (gameObject === this.tupperChicken && (dropZone === this.pan1 || dropZone === this.pan2)){
                                this.chickenReheat = true;
                                if(dropZone === this.pan2){
                                this.chicken.flipX = true;
                            }
                            this.chicken.setVisible(true);
                            this.tupperChicken.setVisible(false);
                             this.chicken.setScale(dropZone.scale);
                             this.chicken.setPosition(dropZone.x, dropZone.y);
                             this.chicken.setAngle(dropZone.angle);
                           }
                           else if(gameObject === this.therm1 && (dropZone === this.pan1 || dropZone === this.pan2)){
                            this.growTemp2(this.hand1);
                            gameObject.setPosition(dropZone.x / 2 + 480, dropZone.y / 2 + 250);
                            this.centerHand();
                            this.therm1.disableInteractive();
                            dropZone.input.dropZone = false;            
                           }
                           else if (gameObject === this.therm2 && (dropZone === this.pan1 || dropZone === this.pan2)){
                            this.growTemp2(this.hand2);
                            gameObject.setPosition(dropZone.x / 2 + 480, dropZone.y / 2 + 250);    
                            this.centerHand();       
                            this.therm2.disableInteractive();
                            dropZone.input.dropZone = false;            
                           }
                           if(this.chickenReheat && this.soupReheat){
                            this.chickenReheat = false;
                            this.soupReheat = false;
                            this.emptyBag.setVisible(false);
                            this.iterateGameMessage();
                            this.therm1.setVisible(true).setInteractive(true).setPosition(100, 500);
                            this.hand1.setVisible(true).setAngle(75);
                            this.hand2.setVisible(true);           
                            this.hand2.setVisible(true).setAngle(75);                                           
                            this.therm2.setVisible(true).setInteractive(true).setPosition(100, 700);
                            this.centerHand();
                           }
                           
                           

                    } 
                );

                this.closedBag.on('pointerdown', () => {
                    if(this.serveReady){
                        this.closedBag.setVisible(false);
                        this.emptyBag.setVisible(true).setPosition(this.bagX - 600, this.bagY);
                        this.emptyBag.setScale(0.65)
                        this.closedThermos.setVisible(true).setPosition(this.emptyBag.x /2 + 300, this.emptyBag.y /2);
                        this.closedThermos.setScale(0.3);
                        this.tupperChicken.setScale(0.25);
                        this.tupperChicken.setVisible(true).setPosition( this.emptyBag.x /2 + 100, this.emptyBag.y /2 + 100);
                        this.bg1.setTexture("bg1");
                        this.pan1.setVisible(true);
                        this.pan2.setVisible(true);
                        this.iterateGameMessage();       
                         this.timerText.destroy();
                        return;
                    }
                    this.closedBag.setAlpha(1);
                    this.closedBag.setScale(0.5);
                    this.closedBag.setPosition(this.bagX - 10,this.bagY + 350);
                    this.closedThermos.setVisible(false);
                    this.tupperChicken.setVisible(false);
                    this.emptyBag.setVisible(false);
                    this.closedBag.disableInteractive();
                    this.iterateGameMessage();
                    this.iterateGameMessage();
                    this.bg1.setTexture("bg3");
                            if(!this.timerStart){
                            this.timerStart = true;
                            let timeLeft = 10;
                            this.timerText = this.add.text(
                                this.bg1.width * 0.8,
                                this.bg1.height * 0.06,
                                ":10",
                            {
                                font: "bold 60px Arial",
                                color: "#000000"
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
                                    this.serveReady = true;
                                    this.timerText.setText("Ready!");
                                    this.iterateGameMessage();
                                    this.closedBag.setInteractive();
                                }

                            }});
                }
                });


                    }
        
    
    cleanupScene() {
    const objects = [
        this.bg1,
        this.next,
        this.erin,

        this.emptyBag,
        this.closedBag,

        this.tupper,
        this.tupperChicken,

        this.openThermos,
        this.closedThermos,

        this.chickenPan,
        this.soupPan,
        this.pan1,
        this.pan2,

        this.chicken,
        this.soup,

        this.therm1,
        this.therm2,
        this.hand1,
        this.hand2,

        this.zoney,

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
    this.tweens.killAll();           
    this.input.removeAllListeners(); 

    this.scene.stop();
}
    centerHand() {
            this.hand1.x = this.therm1.getCenter().x - 20;
            this.hand1.y = this.therm1.getCenter().y + 10;
            this.hand2.x = this.therm2.getCenter().x - 20;
            this.hand2.y = this.therm2.getCenter().y + 10;
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
            scene: [HotTransport],
            parent: "phaser-game"
        };

        phaserGameRef.current = new Phaser.Game(config);

        return () => {
            if (phaserGameRef.current) {
                    phaserGameRef.current.destroy(true);
                    phaserGameRef.current = null;
                }
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
                               const scene = phaserGameRef.current.scene.getScene("HotPrepTransportScene");
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