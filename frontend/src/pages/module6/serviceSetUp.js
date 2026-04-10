import { useEffect, useRef } from "react";
import Phaser from "phaser";

import bg1 from "../../assets/M6G1/SetUpScene.PNG";
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
import chickenBowl from "../../assets/M6G1/ChickenBowl.png";
import chickenDish from "../../assets/M6G1/ChickenDish.png";
import chickenLabel from "../../assets/M6G1/ChickenLabel.PNG";
import coldFood from "../../assets/M6G1/ColdFood.png";
import ladle from "../../assets/M6G1/Ladel.PNG";
import soupBowl from "../../assets/M6G1/SoupBowl.png";
import soupDish from "../../assets/M6G1/SoupDish.PNG";
import soupLabel from "../../assets/M6G1/SoupLabel.PNG";
import spatula from "../../assets/M6G1/Spatula.PNG";
import tongs from "../../assets/M6G1/Tongs.PNG";
import utensilsDish from "../../assets/M6G1/UtensilDish.png";
import melonLabel from "../../assets/M6G1/WatermelonLabel.PNG";


import { defaultFont } from "../../formatting";
import { defaultFontSize } from "../../formatting";
import { defaultFontColor } from "../../formatting";
import { defaultTypingSpeed } from "../../formatting";
import Settings from "../../components/settings";
import { useNavigate } from "react-router-dom";

export default function ServiceSetUps({ openMenu }) {
    const phaserGameRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        window.navigateToPage = navigate;

        class ServiceSetUp extends Phaser.Scene {
            textboxScale = 1;

            iceboxX = 1350;
            iceboxY = 160;
            iceboxScale = 0.5;

            chaferDishScale = 0.7;
            chaferDishX= 1200;
            chaferDishY = 0;

            spaceWidth = 500;
            spaceHeight = 700;
            spaceComplete = false;

            
            therm1Done = false;
            therm2Done = false;

          
            regLabelScale = 0.7;
            smallLabelScale = 0.25;

            instructions = [
                "1. Space the hot holding dishes as far apart as possible.\n2. Turn the hot holding dishes on and put ice in the cooler.\n3. Wait for the hot holding dish to heat up and the cooler to cool down.\n4. Check the temperature of the food items before placing in the dishes or cooler.\n5. Label each the cooler and dishes.\n6. Dedicate one utensil to each food item."
            ];
            gameMessages = [
                "Space out the hot holding dishes! You can try placing them on the edges first.",
                "Leaving sufficient room between dishes helps prevent cross contact!",
                "Food will stay safely separate even in the case of splashing, so allergens don't mix!",
                "Tap on all three dishes to turn them on!",
                "Drag the ice to the cooler!",
                "Tap on the cooler to close it!",
                "Wait for the hot holding dishes to warm up and cooler to cool down!",
                "Check the temperature of the chicken before putting it in a dish!",
                "It's above 165 °F. Drag the chicken to a hot holding dish!"                ,
                "Check the temperature of the soup before putting it in a dish!",
                "It's above 165 °F. Drag the soup to a hot holding dish!",
                "Check the temperature of the watermelon before putting it in a dish!",
                "It's below 40 °F. Drag the watermelon to a cooler!",
                "All food must be labeled! Drag the watermelon label to the cooler.",
                "Drag the chicken label to the chicken dish!",
                "Labels are needed to provide allergen information. Drag the soup label to the soup dish.",
                "Drag the ladle to the red bowl in front of the soup.",
                "Each item needs it's own utensil to prevent allergen mixing. Drag the tongs to the cooler.",
                "The utensils should be on a clean surface. Drag the spatula to the bowl by the chicken dish.",

            ];
            transitions = [
                "Great job! This area is now ready for serving.",
                "If you are serving food, remember not to touch areas food touches.",
                "Make sure that ice is always served using a scoop rather than hands.",
                "Finally, continue to check the food temperature during food service, to ensure the serving containers are maintaining food at a safe temperature.",
                "Click the next button to return to the modules map."
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
                this.load.image("chickenDish", chickenDish);
                this.load.image("melonLabel", melonLabel);     
                this.load.image("chickenLabel", chickenLabel);    
                this.load.image("soupLabel", soupLabel);    
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
                            font: "bold 55px sans-serif",
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
                .setInteractive({useHandCursor: true})
                .setVisible(true);
                
                
                this.space1 = this.add.rectangle(0,500, this.spaceWidth, this.spaceHeight).setOrigin(0);
                //this.space1.setStrokeStyle(10, 0x000000, 0);
                this.space1.setVisible(true);

                
                this.space2 = this.add.rectangle(735,500, this.spaceWidth, this.spaceHeight).setOrigin(0);
                //this.space2.setStrokeStyle(10, 0x000000, 0);
                this.space2.setVisible(true);

                this.space3 = this.add.rectangle(1470,500, this.spaceWidth, this.spaceHeight).setOrigin(0);
                //this.space3.setStrokeStyle(10, 0x000000, 0);
                this.space3.setVisible(true);

                this.chaferDish1 = this.add.image(
                    this.chaferDishX,
                    this.chaferDishY,
                    "chaferDish"
                )
                .setOrigin(0)
                .setScale(this.chaferDishScale)
                .setInteractive({useHandCursor: true})
                .setVisible(false);


                 this.chaferDish2 = this.add.image(
                    this.chaferDishX,
                    this.chaferDishY,
                    "chaferDish"
                )
                .setOrigin(0)
                .setScale(this.chaferDishScale)
                .setInteractive({useHandCursor: true})
                .setVisible(false);

                
                 this.chaferDish3 = this.add.image(
                    this.chaferDishX,
                    this.chaferDishY,
                    "chaferDish"
                )
                .setOrigin(0)
                .setScale(this.chaferDishScale)
                .setInteractive({useHandCursor: true})
                .setVisible(false);

                this.emptyBox = this.add.image(
                    this.iceboxX,
                    this.iceboxY,
                    "emptyBox"
                )
                .setOrigin(0)
                .setScale(this.iceboxScale)
                .setVisible(false);


                this.fullBox = this.add.image(
                    this.iceboxX ,
                    this.iceboxY,
                    "openBox"
                )
                .setOrigin(0)
                .setScale(this.iceboxScale)
                .setVisible(false);

                
                this.closedBox = this.add.image(
                    this.iceboxX - 10 ,
                    this.iceboxY + 135,
                    "closedBox"
                )
                .setOrigin(0)
                .setScale(this.iceboxScale)
                .setVisible(false);


                this.ice = this.add.image(
                    this.iceboxX  + 200,
                    this.iceboxY + 500,
                    "ice"
                )
                .setOrigin(0)
                .setScale(0.5)
                .setInteractive({useHandCursor: true})
                .setVisible(false);

                 this.chickenBowl= this.add.image(
                    450,
                    650,
                    "chickenBowl"
                )
                .setOrigin(0)
                .setScale(0.5)
                .setVisible(false);

                this.soupBowl= this.add.image(
                    450,
                    650,
                    "soupBowl"
                )
                .setOrigin(0)
                .setScale(0.5)
                .setVisible(false);

                this.coldFood= this.add.image(
                    450,
                    650,
                    "coldFood"
                )
                .setOrigin(0)
                .setScale(0.25)
                .setVisible(false);

                
                this.hotTherm1 = this.add.image(
                    550, 
                    430, 
                    "therm")
                .setOrigin(0)
                .setInteractive()
                .setAngle(-25)
                .setScale(0.35)
                .setVisible(false);

                    
                this.hotTherm2 = this.add.image(
                    550, 
                    430, 
                    "therm")
                .setOrigin(0)
                .setInteractive()               
                .setAngle(-25)
                .setScale(0.35)
                .setVisible(false);

                 this.coldTherm = this.add.image(
                    580, 
                    800, 
                    "coldTherm")
                .setOrigin(0)
                .setInteractive()               
                .setAngle(-25)
                .setScale(0.35)
                .setVisible(false);

                this.hotHand1 = this.add.image(
                    this.hotTherm1.getCenter().x - 20,
                    this.hotTherm1.getCenter().y + 10, 
                    "hand")
                .setAngle(75)
                .setOrigin(0)
                .setScale(0.4)
                .setVisible(false);

                this.hotHand2 = this.add.image(
                this.hotTherm2.getCenter().x - 20,
                this.hotTherm2.getCenter().y + 10, 
                    "hand")
                .setAngle(75)
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

                this.chickenLabel = this.add.image(
                    550,
                    370, 
                    "chickenLabel")
                .setOrigin(0)
                .setScale(this.regLabelScale)
                .setVisible(false);
                this.soupLabel = this.add.image(
                    550,
                    370, 
                    "soupLabel")
                .setOrigin(0)
                .setScale(this.regLabelScale)
                .setVisible(false);

                this.melonLabel = this.add.image(
                    550,
                    370, 
                    "melonLabel")
                .setOrigin(0)
                .setScale(this.regLabelScale)
                .setVisible(false);
                // Textbox

                this.ladleDish = this.add.image(
                    550,
                    370, 
                    "utensilDish")
                .setOrigin(0)
                .setScale(this.regLabelScale)
                .setVisible(false);

                this.spatulaDish = this.add.image(
                    550,
                    370, 
                    "utensilDish")
                .setOrigin(0)
                .setScale(this.regLabelScale)
                .setVisible(false);

                this.tongsDish = this.add.image(
                    550,
                    370, 
                    "utensilDish")
                .setOrigin(0)
                .setScale(this.regLabelScale)
                .setVisible(false);
                this.textbox = this.add.container(150, 100);

                 this.tongs = this.add.image(
                    550,
                    370, 
                    "tongs")
                .setOrigin(0)
                .setScale(this.regLabelScale)
                .setVisible(false);

                 this.spatula = this.add.image(
                    550,
                    370, 
                    "spatula")
                .setOrigin(0)
                .setScale(this.regLabelScale)
                .setVisible(false);

                 this.ladle = this.add.image(
                    550,
                    370, 
                    "ladle")
                .setOrigin(0)
                .setScale(this.regLabelScale)
                .setVisible(false);

                this.textboxImage = this.add.image(0, 0, "erinText").setOrigin(0);

                this.textboxText = this.add.text(600, 100, "", {
                    font: "bold 70px sans-serif",
                    color: "#000",
                    wordWrap: {
                        width: this.textboxImage.width * 0.6
                    }
                }).setOrigin(0);

                this.typewriteText("Welcome to the food service module! Here, you'll learn how to create a food service set up. You'll also learn how to prevent cross contact.");
                //this.lowerTemp(this.coldHand);
                this.textbox.setSize(this.textboxImage.width, this.textboxImage.height);
                this.textbox.add([this.textboxImage, this.textboxText]);
                this.textbox.setScale(this.textboxScale);

                // Interactions
                this.next.on("pointerdown", () => {
                    if(this.instructions.length > 0){
                        this.showPopup(this.instructions[0]);
                        this.next.setVisible(false);
                        this.instructions.shift();
                        //helpButton.setVisible(true);
                        this.chaferDish3.setVisible(true);
                        this.space1.setInteractive({dropZone: true});
                        this.space2.setInteractive({dropZone: true});                        
                        this.space3.setInteractive({dropZone: true});
                        this.input.setDraggable(this.chaferDish1);
                        this.input.setDraggable(this.chaferDish2);
                        this.input.setDraggable(this.chaferDish3);
                        this.iterateGameMessage();

                    }
                    else if (this.transitions.length > 0){
                        this.tongs.setVisible(false);
                        //helpButton.setVisible(false);
                        this.textboxText.setFontSize("70px");
                        this.textbox.setPosition(150, 100);
                        this.textbox.setScale(this.textboxScale);
                        this.typewriteText(this.transitions[0]);
                        this.transitions.shift();
                    }
                    else {
                        navigate("/module6/foodServiceMishaps")
                        this.cleanupScene();
                    }
                });
               

                this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
                    gameObject.x = dragX;
                    gameObject.y = dragY;
                    if(gameObject == this.hotTherm1 || gameObject == this.hotTherm2 || gameObject == this.coldTherm){
                        this.centerHands();
                    }
                });

                this.input.on("drop", (pointer, gameObject, dropZone) => {
                    if(gameObject === this.chaferDish3){
                        this.iterateGameMessage();
                        this.chaferDish3.disableInteractive();
                        this.chaferDish2.setVisible(true);
                        this.chaferDish3.setPosition(dropZone.x, dropZone.y)
                        dropZone.disableInteractive();
                    }
                    else if(gameObject === this.chaferDish2){
                        this.iterateGameMessage();
                        this.chaferDish2.disableInteractive();
                        this.chaferDish1.setVisible(true);
                        this.chaferDish2.setPosition(dropZone.x, dropZone.y)
                        dropZone.disableInteractive();                       
                    }
                    else if(gameObject === this.chaferDish1){
                        this.iterateGameMessage();
                        this.input.setDraggable(this.chaferDish1, false);                
                        this.input.setDraggable(this.chaferDish2, false);               
                        this.input.setDraggable(this.chaferDish3, false);
                        this.chaferDish2.setInteractive();
                        this.chaferDish3.setInteractive();
                        this.chaferDish1.setPosition(dropZone.x, dropZone.y)
                        dropZone.disableInteractive();  
                        this.spaceComplete = true;                     
                    }
                    else if(gameObject === this.ice && dropZone === this.emptyBox){
                        this.iterateGameMessage();
                        this.chaferDish1.disableInteractive();
                        this.chaferDish2.disableInteractive();
                        this.emptyBox.setVisible(false);
                        this.fullBox.setVisible(true);
                        this.fullBox.setInteractive({useHandCursor: true});
                        this.ice.setVisible(false);
                    }
                     else if(gameObject === this.coldFood && dropZone === this.closedBox){
                        this.iterateGameMessage();
                        this.coldFood.setPosition(this.closedBox.x + 100, this.closedBox.y + 175);
                        this.coldFood.setScale(0.15);
                        this.coldFood.setVisible(false);
                        //dropZone.disableInteractive();
                        this.input.setDraggable(this.soupBowl);
                        this.tongsDish.setPosition(dropZone.x, dropZone.y);
                        this.melonLabel.setVisible(true);
                        this.melonLabel.setInteractive();
                        this.input.setDraggable(this.melonLabel);

                    }
                    else if(gameObject === this.soupBowl && (dropZone === this.chaferDish1 || dropZone === this.chaferDish2)){
                        this.iterateGameMessage();
                        dropZone.setTexture("soupDish");
                        this.soupBowl.setVisible(false);
                        this.coldTherm.setVisible(true);
                        this.coldHand.setVisible(true);
                        this.coldTherm.setInteractive();
                        this.input.setDraggable(this.coldTherm);
                        dropZone.disableInteractive();
                        this.coldFood.setInteractive();
                        this.coldFood.setVisible(true);
                        this.coldFood.input.dropZone = true;
                    }
                    else if(gameObject === this.chickenBowl && (dropZone === this.chaferDish1 || dropZone === this.chaferDish2)){
                        this.iterateGameMessage();
                        dropZone.setTexture("chickenDish");
                        dropZone.disableInteractive();
                        this.chickenBowl.setVisible(false);
                        this.showThermometer(this.hotTherm2);
                        this.soupBowl.setVisible(true);
                        this.soupBowl.setInteractive();
                        this.soupBowl.input.dropZone = true;
                    }
                    else if(gameObject === this.hotTherm1 && (dropZone === this.chickenBowl)){
                        //this.iterateGameMessage();
                        this.hotTherm1.setPosition(dropZone.getCenter().x - 100, dropZone.getCenter().y - 50);
                        this.centerHands();
                        this.hotTherm1.disableInteractive();
                        this.growTemp(this.hotHand1);
                        this.chickenBowl.input.dropZone = false;
                    }
                     else if(gameObject === this.hotTherm2 && (this.soupBowl)){
                        //this.iterateGameMessage();
                        this.hotTherm2.setPosition(dropZone.getCenter().x - 100, dropZone.getCenter().y - 50);
                        this.centerHands();
                        this.hotTherm2.disableInteractive();
                        this.growTemp(this.hotHand2);
                        this.soupBowl.input.dropZone = false;
                    }
                    else if(gameObject === this.coldTherm && dropZone == this.coldFood){
                        //this.iterateGameMessage();
                        this.coldTherm.setPosition(dropZone.getCenter().x - 150, dropZone.getCenter().y - 200);
                        this.coldTherm.disableInteractive();
                        this.centerHands();
                       this.lowerTemp(this.coldHand);
                       this.coldFood.input.dropZone = false;
                    }
                    else if (gameObject === this.melonLabel && (dropZone === this.closedBox)){
                        this.iterateGameMessage();
                        this.melonLabel.setScale(this.smallLabelScale);
                        this.melonLabel.setPosition(dropZone.getCenter().x - 140, dropZone.getCenter().y + 80);
                        this.melonLabel.disableInteractive();
                        this.chickenLabel.setVisible(true);
                        this.chaferDish1.setInteractive();
                        this.chaferDish2.setInteractive();
                        this.chaferDish1.input.dropZone = true;
                        this.chaferDish2.input.dropZone = true;
                        this.chickenLabel.setInteractive();
                        this.input.setDraggable(this.chickenLabel);
                        dropZone.disableInteractive();
                        this.tongsDish.setPosition(dropZone.x + 40, dropZone.y - 55);                        
                    }
                    else if (gameObject === this.chickenLabel && (dropZone.texture.key ==="chickenDish")){
                        this.iterateGameMessage();
                        this.chickenLabel.setScale(this.smallLabelScale)
                        this.chickenLabel.setPosition(dropZone.getCenter().x, dropZone.getCenter().y + 150); 
                        this.chickenLabel.disableInteractive();    
                        dropZone.disableInteractive();
                        this.soupLabel.setVisible(true);
                        this.soupLabel.setInteractive();
                        this.input.setDraggable(this.soupLabel);
                        this.spatulaDish.setPosition(dropZone.x, dropZone.y + 460);
                    }
                    else if (gameObject === this.soupLabel && dropZone.texture.key === "soupDish"){
                        this.iterateGameMessage();
                        dropZone.disableInteractive();
                        this.soupLabel.setScale(this.smallLabelScale);
                        this.soupLabel.setPosition(dropZone.getCenter().x, dropZone.getCenter().y + 150); 
                        this.ladleDish.setPosition(dropZone.x, dropZone.y + 460);
                        this.ladleDish.setVisible(true);
                        this.ladleDish.setInteractive({dropZone: true});
                        this.tongsDish.setVisible(true);
                        this.tongsDish.setInteractive({dropZone : true});
                        this.spatulaDish.setVisible(true);
                        this.spatulaDish.setInteractive({dropZone: true});
                        this.tongs.setInteractive();
                        this.input.setDraggable(this.tongs);
                        this.spatula.setInteractive();
                        this.input.setDraggable(this.spatula);
                        this.ladle.setInteractive();
                        this.input.setDraggable(this.ladle);
                        this.ladle.setVisible(true);
                    }
                    else if (gameObject == this.ladle && dropZone == this.ladleDish){
                        this.iterateGameMessage();
                        this.ladle.setPosition(this.ladleDish.x, this.ladleDish.y);
                        this.ladle.disableInteractive();
                        this.tongs.setVisible(true);
                    }
                    else if (gameObject == this.tongs && dropZone == this.tongsDish){
                        this.iterateGameMessage();
                        this.tongs.setPosition(this.tongsDish.x, this.tongsDish.y);
                        this.tongs.disableInteractive();
                        this.spatula.setVisible(true);
                    }
                     else if (gameObject == this.spatula && dropZone == this.spatulaDish){
                        //this.iterateGameMessage();
                        this.spatula.setPosition(this.spatulaDish.x, this.spatulaDish.y);
                        this.spatula.disableInteractive();
                        this.next.setVisible(true);
                    }
                });

                
                this.tapOne = false;
                this.tapTwo = false;
                this.tapThree = false;

                

                this.chaferDish1.on("pointerdown", () => {
                    if(this.spaceComplete){
                         if(this.tapTwo && this.tapThree){
                            this.spaceComplete = false;
                            this.firstAction();
                            return;
                        }
                        this.tapOne = true;
                    }
                });
                this.chaferDish2.on("pointerdown", () => {
                    if(this.spaceComplete){
                        if(this.tapOne && this.tapThree){
                            this.firstAction();
                            return;
                        }
                        this.tapTwo = true;
                    }
                    });   
                this.chaferDish3.on("pointerdown", () => {
                    if(this.spaceComplete){
                        if(this.tapTwo && this.tapOne){
                            this.firstAction();
                            return;
                        }
                        this.tapThree = true;
                    }
                }); 

                this.timerStart = false;
                this.fullBox.on("pointerdown", () => {
                    this.iterateGameMessage();
                       if(!this.timerStart){
                        this.closedBox.setVisible(true);
                        this.fullBox.setVisible(false);
                        //this.fullBox.disableInteractive();
                            this.timerStart = true;
                            let timeLeft = 5;
                            this.timerText = this.add.text(
                                this.bg1.width * 0.8,
                                this.bg1.height * 0.06,
                                ":5",
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
                                    this.timerText.setText("Ready!");
                                    this.chickenBowl.setInteractive();
                                    this.chickenBowl.input.dropZone = true;
                                    this.chickenBowl.setVisible(true);
                                    this.showThermometer(this.hotTherm1);
                                    this.iterateGameMessage();
                                    /*
                                    this.input.setDraggable(this.coldFood);
                                    this.fullBox.input.dropZone = true;*/
                                }

                            }});
                }
            });

        

            
            }

            cleanupScene() {
    // Stop timers & tweens first
    if (this.typingEvent) {
        this.typingEvent.remove(false);
        this.typingEvent = null;
    }

    this.time.removeAllEvents();
    this.tweens.killAll();

    // Disable input
    this.input.removeAllListeners();
    this.input.enabled = false;

    // ---- BACKGROUND & UI ----
    this.bg1?.destroy();
    this.next?.destroy();
    this.textboxImage?.destroy();
    this.textboxText?.destroy();
    this.textbox?.destroy();

    // ---- SPACES ----
    this.space1?.destroy();
    this.space2?.destroy();
    this.space3?.destroy();

    // ---- CHAFER DISHES ----
    this.chaferDish1?.destroy();
    this.chaferDish2?.destroy();
    this.chaferDish3?.destroy();

    // ---- COOLER / ICE ----
    this.emptyBox?.destroy();
    this.fullBox?.destroy();
    this.closedBox?.destroy();
    this.ice?.destroy();

    // ---- FOOD ----
    this.chickenBowl?.destroy();
    this.soupBowl?.destroy();
    this.coldFood?.destroy();

    // ---- THERMOMETERS ----
    this.hotTherm1?.destroy();
    this.hotTherm2?.destroy();
    this.coldTherm?.destroy();

    // ---- HANDS ----
    this.hotHand1?.destroy();
    this.hotHand2?.destroy();
    this.coldHand?.destroy();

    // ---- LABELS ----
    this.chickenLabel?.destroy();
    this.soupLabel?.destroy();
    this.melonLabel?.destroy();

    // ---- UTENSILS ----
    this.ladle?.destroy();
    this.tongs?.destroy();
    this.spatula?.destroy();

    // ---- UTENSIL DISHES ----
    this.ladleDish?.destroy();
    this.tongsDish?.destroy();
    this.spatulaDish?.destroy();

    // ---- TIMER TEXT ----
    this.timerText?.destroy();

    // ---- FINAL SAFETY CLEAN ----
    this.children.removeAll();

    // Remove global reference
    delete window.navigateToPage;
}
            showThermometer(therm){
                this.timerText.setVisible(false);
                if(therm === this.hotTherm1){

                this.hotTherm1.setVisible(true);
                this.hotHand1.setVisible(true);
                this.hotTherm1.setInteractive({useHandCursor: true});
                this.input.setDraggable(this.hotTherm1);
                }
                else if(therm === this.hotTherm2){
                    
                this.hotTherm2.setVisible(true);
                this.hotHand2.setVisible(true);
                
                this.hotTherm2.setInteractive({useHandCursor: true});
                this.input.setDraggable(this.hotTherm2);

                }
                else if (therm == this.coldTherm){
                    
                this.coldTherm.setVisible(true);
                this.coldHand.setVisible(true);

                this.coldTherm.setInteractive({useHandCursor: true});
                this.input.setDraggable(this.coldTherm);
                }
                
            }
                 growTemp(hand){

            hand.disableInteractive();
            this.tweens.add({
                targets: hand,
                angle: 270,
                duration: 5000,
                ease:'Linear',
                onComplete: () => {
                    this.iterateGameMessage();
                if(hand === this.hotHand1){
                    this.therm1Done = true;
                    this.chaferDish1.setInteractive();
                    this.chaferDish2.setInteractive();
                    this.chaferDish1.input.dropZone = true;
                    this.chaferDish2.input.dropZone = true;
                    this.hotTherm1.setVisible(false);
                    this.hotHand1.setVisible(false);
                    this.input.setDraggable(this.chickenBowl);
                }
                if(hand === this.hotHand2) {
                    this.therm2Done = true;
                    this.hotTherm2.setVisible(false);
                    this.hotHand2.setVisible(false);
                    this.input.setDraggable(this.soupBowl);
                }

                }
            })
        }
        lowerTemp(hand){
            this.tweens.add({
                targets: hand,
                angle: -235,
                duration: 5000,
                ease:'Linear',
                onComplete: () => {
                    this.iterateGameMessage();
                    this.coldTherm.setVisible(false);
                    this.coldHand.setVisible(false);
                     this.input.setDraggable(this.coldFood);
                     this.closedBox.setInteractive({dropZone : true});
                }
            })
        }
            centerHands() {
                this.hotHand1.setPosition(this.hotTherm1.getCenter().x - 20, this.hotTherm1.getCenter().y + 10);
                this.hotHand2.setPosition(this.hotTherm2.getCenter().x - 20, this.hotTherm2.getCenter().y + 10);
                this.coldHand.setPosition(this.coldTherm.getCenter().x + 5, this.coldTherm.getCenter().y - 25);
    }
            firstAction(){
                this.iterateGameMessage();
                this.spaceComplete = false;
                this.bg1.setTexture("bg2");
                this.chaferDish3.setVisible(false);
                this.chaferDish1.setPosition(this.space1.x, this.space1.y - 150);
                this.chaferDish2.setPosition(this.space2.x + 150, this.space2.y - 150);
                this.emptyBox.setVisible(true);
                this.ice.setVisible(true);
                this.input.setDraggable(this.ice);
                this.emptyBox.setInteractive({dropZone: true});
            }
             iterateGameMessage(){
                console.log("exd");
                this.textbox.setScale(0.6);
                this.textboxText.setFontSize(90);
                this.textbox.setPosition(0,0);
                this.typewriteText(this.gameMessages[0]);
                this.gameMessages.shift();
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