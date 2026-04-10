import { useEffect, useRef } from "react";
import Phaser from "phaser";

import bg1 from "../../assets/M6G2/ClearCounterBackground.png";
import bg2 from "../../assets/M6G1/FoodScene.PNG";
import healthy from "../../assets/M1G1/Healthy.png";
import textbox from "../../assets/M1G1/Textbox.png";
import erinText from "../../assets/M3G1/erintextbox.png"
import next from "../../assets/M1G1/nextbutton.png";
import ice from "../../assets/M5G1/Ice.png";
import thermometer from "../../assets/M5G2/thermometer.png";
import iceBox from "../../assets/M5G1/icecooler.png"
import closedBox from "../../assets/M5G1/closedcooler.png";
import emptyBox from "../../assets/M5G1/emptycooler.png";
import hand from "../../assets/M2Cooking/ThermometerHand.png";
import coldThermometer from "../../assets/M5G1/IceTherm.png";
import chaferDish from "../../assets/M6G1/ChaferDish.PNG";
import chickenBowl from "../../assets/M6G2/ChickenBowl.png";
import chickenDish from "../../assets/M6G1/ChickenBowl.png";
import coldFood from "../../assets/M6G1/ColdFood.png";
import ladle from "../../assets/M6G1/Ladel.PNG";
import soupBowl from "../../assets/M6G1/SoupBowl.png";
import soupDish from "../../assets/M6G1/SoupDish.PNG";
import spatula from "../../assets/M6G1/Spatula.PNG";
import tongs from "../../assets/M6G1/Tongs.PNG";
import utensilsDish from "../../assets/M6G1/UtensilDish.png";
import erinNotGloved from "../../assets/M2G2/noGlove.png";
import erinGloved from "../../assets/M2G2/gloved.png";
import erinDirtyGloved from "../../assets/M6G2/dirtyGloved.png";
import trashCan from "../../assets/M6G2/trashCan.png";
import gloveBox from "../../assets/M1G3/gloveBox.png";
import mascot from "../../assets/M6G2/GameMascot.png";
import emptyBowl from "../../assets/M6G2/emptyBowl.png";
import newSpatula from "../../assets/M6G2/newSpatula.png";
import tempLog from "../../assets/M6G2/TempLog.png";
import chickenPan from "../../assets/M5G2/ChickenPan.png";
import { defaultFont } from "../../formatting";
import { defaultFontSize } from "../../formatting";
import { defaultFontColor } from "../../formatting";
import { defaultTypingSpeed } from "../../formatting";
import Settings from "../../components/settings";
import { useNavigate } from "react-router-dom";

export default function FoodServiceMishaps({ openMenu }) {
    const phaserGameRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        window.navigateToPage = navigate;

        class ServiceSetUp extends Phaser.Scene {
            textboxScale = 1;
            erinX = 630;
            erinY = 340;
            erinScale = 1.35;
        

            itemScale = 0.5;
            itemX = 720;
            itemY = 270;
            instructions = [
                "1. Follow the procedure for changing gloves when yours become dirty.\n2. Follow the procedure for handling cross contamination.\n3. Follow the procedure for handling food found at the incorrect temperature."
            ];
            gameMessages = [
                "You will start by practicing a glove change. Drag the volunteer to the trash can to remove the dirty gloves!",
                "Drag the volunteer to the sink to wash hands!",
                "Make sure you wash your hands for at least 20 seconds!",
                "Drag the glove box to the volunteer to put on clean gloves.",
                "Great job! You've safely changed out of dirty gloves. Click next to continue.",
                "Here, a spatula used for raw meat falls into a ready to eat soup. Drag the volunteer to the manager to learn what to do next!",
                "The soup must be discarded because it is contaminated. Drag the soup to the trash.",
                "Drag the contaminated utensils in the sink to be washed!",
                "Drag the contaminated bowl in the sink to be washed!",
                "Time for a new utensil! Drag the clean spatula from the cupboard to the bowl of meat.",
                "Great job! You've succesfully handled a food contamination situation. Click next to continue.",
                "Now, you check the temperature of food that has been sitting out. Drag the thermometer to the watermelon!",
                "The watermelon is in the danger zone. Check the chicken too by dragging the thermometer to the bowl.",
                "They are both in the danger zone. Check the temperature log to see if they should be discarded.",
                "They have been in the danger zone for less than two hours. Drag the watermelon to the fridge to put it away.",
                "Drag the chicken to the stove to reheat it to at least 165 °F since it is about to be served.",
                "Now, check the temperatures again.",
                "The watermelon is out of the danger zone!",
                "The chicken is out of the danger zone! Click next to continue."

            ];
            transitions1 = [
                "Moving on"
            ];
            transitions2 = [
                "Moving on"
             ];
            transitions3 = [
                "Great job! You made sure the food items you found were not in the danger zone for more than two hours.",
                "If they had been in the temperature danger zone for more than two hours, they would have needed to be discarded.",
                "You've now completed the food service module. Click the next button to return to the modules map."
                
             ];
            constructor() {
                super("ServiceSetUpsScene");
            }

            preload() {
                this.load.image("bg1", bg1);
                this.load.image("bg2", bg2);
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
                this.load.image("chaferDish", chaferDish);
                
                this.load.image("soupDish", soupDish);         
                this.load.image("chickenBowl", chickenBowl);  
                this.load.image("soupBowl", soupBowl);    
                this.load.image("coldFood", coldFood);  
                this.load.image("spatula", spatula);        
                this.load.image("ladle", ladle); 
                this.load.image("tongs", tongs);     
                this.load.image("utensilDish", utensilsDish);
                this.load.image("cookedChicken", chickenDish);
                this.load.image("erinGloved", erinGloved);      
                this.load.image("erinNotGloved", erinNotGloved);      
                this.load.image("erinDirtyGloved", erinDirtyGloved);
                this.load.image("trashcan", trashCan);
                this.load.image("gloveBox", gloveBox);
                this.load.image("mascot", mascot);
                
                this.load.image("newSpatula", newSpatula);
                this.load.image("emptyBowl", emptyBowl);
                this.load.image("tempLog", tempLog);
                this.load.image("chickenPan", chickenPan);


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
                            font: "55px Arial",
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
            create() {    // Background
                
                this.bg1 = this.add.image(
                    this.scale.width / 2,
                    this.scale.height / 2,
                    "bg1"
                );
                //this.bg1.setScale(1.5);
                   // Help Button
                /*const helpButton = this.add.text(
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
                    this.showPopup("1. Follow the procedure for changing gloves when yours become dirty.\n2. Follow the procedure for handling cross contamination.\n3. Follow the procedure for handling food found at the incorrect temperature."
);
                });*/
                this.timerText = "";
                const scaleX = this.scale.width / this.bg1.width;
                const scaleY = this.scale.height / this.bg1.height;

                // ORIGINAL behavior (fit entire image)
                const scale = Math.min(scaleX, scaleY);

                this.bg1.setScale(scale);

                //this.erinX = this.bg1.width / 2 - 175;
                //this.erinY = this.bg1.height / 2 + 45;

                // Characters
                this.space1 = this.add.rectangle(0,0,500, 1700).setOrigin(0);
                //this.space1.setStrokeStyle(10, 0x000000, 1);
                this.space1.setVisible(true);

                

                this.trashcan = this.add.image(
                    950,
                    600, 
                    "trashcan")
                .setOrigin(0)
                .setScale(0.23)
                .setVisible(true);

                 this.space2 = this.add.rectangle(this.trashcan.x,0, 400, 1700).setOrigin(0);
                //this.space2.setStrokeStyle(10, 0x000000, 1);
                this.space2.setVisible(true);

                this.next = this.add.image(
                    1300 * 1.25,
                    175 * 4.35,
                    "next"
                )
                .setOrigin(0)
                .setScale(0.35)
                .setInteractive({useHandCursor: true})
                .setVisible(true);

                this.erinNotGloved = this.add.image(
                    this.erinX,
                    this.erinY,
                    "erinNotGloved"
                )
                .setOrigin(0)
                .setScale(this.erinScale)
                .setVisible(false);
                
                
                this.erinGloved = this.add.image(
                    this.erinX,
                    this.erinY,
                    "erinGloved"
                )
                .setOrigin(0)
                .setScale(this.erinScale)
                .setVisible(false);

                
                
                this.manager = this.add.image(
                    this.erinX + 750,
                    this.erinY + 250,
                    "mascot"
                )
                .setOrigin(0)
                .setScale(0.3)
                .setVisible(false);

                this.space3 = this.add.rectangle(this.manager.x,0, 500, 1600).setOrigin(0);
                //this.space3.setStrokeStyle(10, 0x000000, 1);
                this.space3.setVisible(true);
            
                 this.chickenBowl= this.add.image(
                    320,
                    370,
                    "chickenBowl"
                )
                .setOrigin(0)
                .setScale(this.itemScale)
                .setVisible(false);

                
                 this.erin = this.add.image(
                    this.erinX,
                    this.erinY + 200,
                    "erinDirtyGloved"
                )
                .setOrigin(0)
                .setScale(this.erinScale)
                .setVisible(true);

                this.soupBowl= this.add.image(
                    680,
                    400,
                    "soupBowl"
                )
                .setOrigin(0)
                .setScale(this.itemScale)
                .setVisible(false);

                this.coldFood= this.add.image(
                    680,
                    450,
                    "coldFood"
                )
                .setOrigin(0)
                .setScale(this.itemScale / 2.5)
                .setVisible(false);

                
                this.hotTherm1 = this.add.image(
                    780, 
                    700, 
                    "therm")
                .setOrigin(0)
                .setInteractive()
                .setAngle(0)
                .setScale(0.35)
                .setVisible(false);
              

                 this.coldTherm = this.add.image(
                    580, 
                    50, 
                    "coldTherm")
                .setOrigin(0)
                .setInteractive()
                .setScale(0.35)
                .setVisible(false);

                this.hotHand1 = this.add.image(
                    this.hotTherm1.getCenter().x - 20,
                    this.hotTherm1.getCenter().y + 10, 
                    "hand")
                .setAngle(120)
                .setOrigin(0)
                .setScale(0.4)
                .setVisible(false);

                
                this.coldHand = this.add.image(
                this.coldTherm.getCenter().x + 5,
                this.coldTherm.getCenter().y - 25, 
                    "hand")
                .setAngle(-180)
                .setOrigin(0)
                .setScale(0.4)
                .setVisible(false);

            
                 this.tongs = this.add.image(
                    550,
                    370, 
                    "tongs")
                .setOrigin(0)
                .setScale(this.itemScale * 2)
                .setVisible(false);

                 this.spatula = this.add.image(
                    this.itemX,
                    this.itemY, 
                    "spatula")
                .setOrigin(0)
                .setScale(this.itemScale * 2.5)
                .setVisible(false);

                 this.ladle = this.add.image(
                    this.itemX,
                    this.itemY, 
                    "ladle")
                .setOrigin(0)
                .setScale(this.itemScale * 2.5)
                .setVisible(false);

                
                 this.gloveBox = this.add.image(
                    this.erinX - 200,
                    this.erinY + 50, 
                    "gloveBox")
                .setOrigin(0)
                .setScale(0.1)
                .setVisible(false);

                 this.tempLog = this.add.image(
                    this.erinX + 870,
                    this.erinY - 10,
                    "tempLog")
                .setOrigin(0)
                .setScale(0.5)
                .setVisible(false);
                
                this.chickenPan= this.add.image(
                    1000,
                    410,
                    "chickenPan"
                )
                .setOrigin(0)
                .setScale(this.itemScale)
                .setVisible(false);

                // Textbox

                this.textbox = this.add.container(150, 10);


                this.textboxImage = this.add.image(0, 0, "textbox").setOrigin(0);

                this.textboxText = this.add.text(100, 100, "", {
                    font: "bold 70px sans-serif",
                    color: "#000",
                    wordWrap: {
                        width: this.textboxImage.width * 0.9
                    }
                }).setOrigin(0);

                this.typewriteText("In this game, you will learn how to handle various situations that may be unexpected, but are common.");
                this.textbox.setSize(this.textboxImage.width, this.textboxImage.height);
                this.textbox.add([this.textboxImage, this.textboxText]);
                this.textbox.setScale(this.textboxScale);

                // Interactions
                this.next.on("pointerdown", () => {
                    if(this.instructions.length > 0){
                        this.iterateGameMessage();
                        this.showPopup(this.instructions[0]);
                        this.next.setVisible(false);
                        //this.instructions.shift();
                        //helpButton.setVisible(true);
                        this.erin.setInteractive();
                        this.erin.setPosition(this.erinX, this.erinY)
                        this.erin.setScale(1);
                        this.erin.setInteractive();
                        this.input.setDraggable(this.erin);
                        this.trashcan.setInteractive({dropZone: true});
                        this.space2.setInteractive({dropZone: true});                        
                    }
                    else if (this.transitions1.length > 0){
                        this.iterateGameMessage();
                        this.transitions1.shift();
                        this.next.setVisible(false);
                        this.manager.setVisible(true);
                        //this.manager.setInteractive({dropZone: true});
                        this.erin.setInteractive();
                        this.input.setDraggable(this.erin);
                        this.chickenBowl.setVisible(true);
                        this.soupBowl.setVisible(true);
                        this.ladle.setVisible(true);
                        this.spatula.setVisible(true);
                        this.space3.setInteractive({dropZone: true});
                    }    
                    else if(this.transitions2.length > 0) {
                        this.trashcan.setVisible(false);
                        this.iterateGameMessage("cupboard");
                        this.spatula.setVisible(false);
                        this.transitions2.shift();
                        this.next.setVisible(false);
                        this.chickenBowl.setTexture("cookedChicken");
                        this.coldTherm.setVisible(true);
                        this.coldHand.setVisible(true);
                        this.coldFood.setVisible(true);
                        this.coldFood.setInteractive();
                        this.coldFood.input.dropZone = true;
                        this.input.setDraggable(this.coldTherm);
                        this.coldTherm.setInteractive();
                    }  
                    else if (this.transitions3.length > 0){    
                        //helpButton.setVisible(false);
                        this.textboxText.setFontSize("70px");
                        this.textbox.setPosition(150, 100);
                        this.textbox.setScale(this.textboxScale);
                        this.typewriteText(this.transitions3[0]);
                        this.transitions3.shift();
                    }          
                    else {
                        this.cleanUpScene();
                        navigate("/map");
                    }
                });

                 this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
                    gameObject.x = dragX;
                    gameObject.y = dragY;
                    if(gameObject === this.hotTherm1 || gameObject === this.hotTherm2 || gameObject === this.coldTherm){
                        this.centerHands();
                    }
                });
                this.timerStart = false;
                this.utensilWashed = false;
                this.logOpened = false;
                this.tempStart = false;
                this.coldTempCheck = false;
                this.hotTempCheck = false;

                this.input.on("drop", (pointer, gameObject, dropZone) => {
                    if(gameObject === this.erin && dropZone === this.space1){
                        dropZone.disableInteractive();
                        this.iterateGameMessage();
                        this.erin.setPosition(dropZone.x, this.erinY);
                        this.input.setDraggable(this.erin, false);
                         if(!this.timerStart){
                            this.timerStart = true;
                            let timeLeft = 20;
                            this.timerText = this.add.text(
                                this.bg1.width * 1,
                                this.bg1.height * 0.3,
                                ":20",
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
                                    this.timerText.setText("Done!");
                                    this.iterateGameMessage();
                                    this.gloveBox.setVisible(true);
                                    this.gloveBox.setInteractive();
                                    this.input.setDraggable(this.gloveBox);
                                    this.erin.input.dropZone = true;
                                }

                            }});
                }
                        
                    }
                    else if(gameObject === this.erin && dropZone === this.space2){
                        this.iterateGameMessage();
                        //this.trashcan.setVisible(false);
                        this.erin.setPosition(dropZone.x, this.erinY);
                        this.erin.setTexture("erinNotGloved");
                        this.space1.setInteractive({dropZone: true});
                        dropZone.disableInteractive();
                    }
                    else if (gameObject === this.gloveBox && dropZone.texture.key === "erinNotGloved"){
                        this.timerText?.destroy();
                        this.iterateGameMessage();
                        this.erin.setTexture("erinGloved");
                        dropZone.disableInteractive();
                        this.gloveBox.setVisible(false);
                        this.next.setVisible(true);
                        this.erin.input.dropZone = false;
                    }
                     else if (gameObject === this.erin && dropZone === this.space3){
            
                        this.iterateGameMessage();
                        this.erin.setPosition(this.manager.x, this.manager.y / 1.5);
                        this.space2.setInteractive();
                        this.soupBowl.setInteractive();
                        this.input.setDraggable(this.soupBowl);
                        dropZone.disableInteractive();
                        this.erin.disableInteractive();
                        
                     }
                    else if (gameObject === this.soupBowl && dropZone === this.space2){
                        this.soupBowl.setTexture("emptyBowl");
                        this.soupBowl.setPosition(680, 400);
                        this.soupBowl.disableInteractive();

                        this.iterateGameMessage();
                        this.ladle.setInteractive();
                        this.input.setDraggable(this.ladle);
                        
                        this.spatula.setInteractive();
                        this.input.setDraggable(this.spatula);

                        this.space1.setInteractive();
                        dropZone.disableInteractive();

                     }
                     else if (gameObject === this.spatula && dropZone === this.space1){
                            
                            this.spatula.setVisible(false);
                        if(!this.utensilWashed){    
                            this.utensilWashed = true;
                            return;
                        }
                            this.soupBowl.setInteractive();
                            this.input.setDraggable(this.soupBowl);
                            this.iterateGameMessage();
                     }
                      else if (gameObject === this.ladle && dropZone === this.space1){
                            this.ladle.setVisible(false);
                        if(!this.utensilWashed){
                            this.utensilWashed = true;
                            return;
                        }
                            this.soupBowl.setInteractive();
                            this.input.setDraggable(this.soupBowl);
                            this.iterateGameMessage();
                     }
                     else if(gameObject === this.soupBowl && dropZone === this.space1){
                          this.iterateGameMessage("cupboard");
                                 this.spatula.setTexture("newSpatula");
                            this.spatula.setPosition(this.itemX, this.itemY - 400);
                            this.spatula.setVisible(true);
                            this.utensilWashed = false;
                              this.chickenBowl.setInteractive({dropZone: true});
                            //dropZone.disableInteractive();
                            this.erin.setPosition(0, this.erinY);
                            this.manager.setVisible(false);
                            this.soupBowl.setVisible(false);
                     }
                     else if(gameObject === this.spatula && dropZone === this.chickenBowl){
                        this.iterateGameMessage();
                        this.spatula.setPosition(this.chickenBowl.x, this.chickenBowl.y - 50);
                        this.spatula.setAngle(-30);
                        this.spatula.disableInteractive();
                        dropZone.disableInteractive();
                        this.next.setVisible(true);
                     }
                      else if(gameObject === this.coldTherm && dropZone === this.coldFood){
                        this.coldTherm.setPosition(dropZone.x, dropZone.y - 150);
                        this.centerHands();
                        dropZone.disableInteractive();
                        this.coldTherm.disableInteractive();
                        if(!this.coldTempCheck){
                            this.coldTempCheck = true;
                            this.lowerTemp(this.coldHand);
                            return;

                        }
                        //this.coldHand.setAngle(-180);
                        this.lowerTemp(this.coldHand, "good");

                        
                     }
                     else if(gameObject === this.hotTherm1 && dropZone === this.chickenBowl){
                          this.hotTherm1.setPosition(dropZone.x, dropZone.y - 30);
                        this.centerHands();
                        dropZone.disableInteractive();
                        this.hotTherm1.disableInteractive();
                        if(!this.hotTempCheck){
                            this.hotTempCheck = true;
                            this.growTemp(this.hotHand1);
                            console.log("Hi");
                            return;

                        }
                    
                     //this.hotHand1.setAngle(75);
                       this.growTemp(this.hotHand1, "good");
                     }
                     else if(gameObject === this.coldFood && dropZone === this.space3){
                        this.iterateGameMessage("cupboard");
                        this.coldFood.setVisible(false);
                        this.chickenBowl.setInteractive();
                        this.input.setDraggable(this.chickenBowl);
                        this.chickenBowl.input.dropZone = false;
                        this.coldFood.input.dropZone = false;
                        dropZone.disableInteractive();
                        this.space2.setInteractive();
                        this.space2.input.dropZone = true;
                     }
                     else if(gameObject === this.chickenBowl && dropZone === this.space2){
                        this.chickenBowl.setVisible(false);
                        this.chickenPan.setVisible(true);
                                         if(!this.tempStart){
                                            
                            this.tempStart = true;
                            let timeLeft = 7;
                            this.timerText = this.add.text(
                                this.bg1.width * 1,
                                this.bg1.height * 0.3,
                                ":7",
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
                                    this.chickenPan.setVisible(false);
                                    this.chickenBowl.setVisible(true);
                                    this.coldFood.setVisible(true);
                                    //this.showThermometer(this.hotTherm1);]
                                    // this.hotTherm1.setPosition(780, 70);
                                    this.iterateGameMessage("cupboard");
                                    this.showThermometer(this.coldTherm);
                                    this.coldTherm.setPosition(580, 50);
                                    this.centerHands();
                                    this.chickenBowl.setPosition(320, 370);
                                    this.coldFood.setPosition(680,450);
                                    this.input.setDraggable(this.coldFood, false);
                                    this.coldFood.input.dropZone = true;

                                }

                            }});
                }
                        
                     }


                });

                this.tempLog.on("pointerdown", () => {
                    this.iterateGameMessage();
                    this.showPopup("Item: Grilled Chicken, Date: Today, Time: 1 Hour Ago, Temp: 170 °F.\n\n\nItem: Watermelon, Date: Today, Time: One Hour Ago, Temp: 38°F.");
                   if(!this.logOpened){
                    this.logOpened = true;
                    this.coldFood.setInteractive();
                    this.input.setDraggable(this.coldFood);
                    this.coldFood.input.dropZone = false;
                    this.space3.setInteractive();
                    this.space3.input.dropZone = true;
                    this.hotTherm1.setVisible(false);
                    
                    this.hotHand1.setVisible(false);
                    this.coldHand.setVisible(false);
                    this.coldTherm.setVisible(false);

                   }

                }
            );

               

            
            }

            cleanUpScene() {
    // Stop all input listeners
    this.input.off("drag");
    this.input.off("drop");

    // Kill all tweens
    this.tweens.killAll();

    // Remove all timed events
    this.time.removeAllEvents();

    // Destroy typing event if it exists
    if (this.typingEvent) {
        this.typingEvent.remove(false);
        this.typingEvent = null;
    }

    // Destroy timer text
    if (this.timerText) {
        this.timerText.destroy();
        this.timerText = null;
    }

    // Destroy ALL game objects manually (only if they exist)
    const objects = [
        this.bg1,
        this.trashcan,
        this.next,
        this.erin,
        this.erinGloved,
        this.erinNotGloved,
        this.manager,
        this.chickenBowl,
        this.soupBowl,
        this.coldFood,
        this.hotTherm1,
        this.coldTherm,
        this.hotHand1,
        this.coldHand,
        this.tongs,
        this.spatula,
        this.ladle,
        this.gloveBox,
        this.tempLog,
        this.chickenPan,
        this.textboxImage,
        this.textboxText
    ];

    objects.forEach(obj => {
        if (obj && obj.destroy) {
            obj.destroy();
        }
    });

    // Destroy containers separately
    if (this.textbox) {
        this.textbox.destroy(true);
        this.textbox = null;
    }

    // Destroy rectangles / zones
    const zones = [
        this.space1,
        this.space2,
        this.space3
    ];

    zones.forEach(zone => {
        if (zone && zone.destroy) {
            zone.destroy();
        }
    });

    // Clear references (helps GC)
    this.bg1 = null;
    this.erin = null;
    this.manager = null;
    this.chickenBowl = null;
    this.soupBowl = null;
    this.coldFood = null;
}
                 showThermometer(therm){
                this.timerText.setVisible(false);
                if(therm === this.hotTherm1){

                this.hotTherm1.setVisible(true);
                this.hotHand1.setVisible(true);
                this.hotTherm1.setInteractive({useHandCursor: true});
                this.input.setDraggable(this.hotTherm1);
                }
                else if (therm === this.coldTherm){
                    
                this.coldTherm.setVisible(true);
                this.coldHand.setVisible(true);

                this.coldTherm.setInteractive({useHandCursor: true});
                this.input.setDraggable(this.coldTherm);
                }
                
            }
         
            centerHands() {
                this.hotHand1.setPosition(this.hotTherm1.getCenter().x - 20, this.hotTherm1.getCenter().y + 10);
                //this.hotHand2.setPosition(this.hotTherm2.getCenter().x - 20, this.hotTherm2.getCenter().y + 10);
                this.coldHand.setPosition(this.coldTherm.getCenter().x + 5, this.coldTherm.getCenter().y - 25);
    }
             iterateGameMessage(section){
                console.log("exd");
                this.textbox.setScale(0.6);
                this.textboxText.setFontSize(90);
                this.textbox.setPosition(0,0);
                this.typewriteText(this.gameMessages[0]);
                this.gameMessages.shift();
                if(section === "cupboard"){
                    this.textbox.setPosition(990,755);
                }
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

            
        lowerTemp(hand, val){
             this.ang = -160;
            if(val === "good"){
                this.ang = -235;
            }
            this.tweens.add({
                targets: hand,
                angle: this.ang,
                duration: 5000,
                ease:'Linear',
                onComplete: () => {
                    this.iterateGameMessage("cupboard");
                    this.hotTherm1.setVisible(true);
                    this.hotHand1.setVisible(true);
                          this.hotTherm1.setPosition(580, 50);
                                    this.centerHands();

                        this.hotTherm1.setInteractive();
                        this.chickenBowl.setInteractive();
                        this.chickenBowl.input.dropZone = true;
                        this.input.setDraggable(this.hotTherm1);
                }
            })
        }
        

   growTemp(hand, val){
    this.ang= 230;
    if (val === "good"){
        this.ang = 290;
    }
           hand.setAngle(75);
            this.tweens.add({
                targets: hand,
                angle: this.ang,
                duration: 5000,
                ease:'Linear',
                onComplete: () => {
                    
                        this.iterateGameMessage();
                    if(val === "good"){
                        this.tempLog.disableInteractive();
                        this.next.setVisible(true);
                    }
            
            this.tempLog.setVisible(true);
            this.tempLog.setInteractive();
                }
            })
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
            scene: [ServiceSetUp],
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
                            top: "10px",
                            right: "190px",
                            display: "flex",
                            gap: "10px",
                            alignItems: "center",
                            zIndex: 30000
                        }}
                        >
            
                            <button
                            onClick={() => {
                                if (phaserGameRef.current) {
                                const scene = phaserGameRef.current.scene.getScene("ServiceSetUpsScene");
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
                        <Settings openMenu={openMenu} />
                        </div>     
        </div>
    );
}