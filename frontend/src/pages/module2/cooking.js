import { useEffect } from "react";
import Phaser from "phaser";
import callUpdate from "../../components/callupdate";

import beefBowl from "../../assets/M2Cooking/Bowl_Beef.png";
import onionBowl from "../../assets/M2Cooking/Bowl_Onion.png";
import pepperBowl from "../../assets/M2Cooking/Bowl_Pepper.png";
import cookedBeef from "../../assets/M2Cooking/Cooked_Beef.png";
import cookedOnion from "../../assets/M2Cooking/Cooked_Onions.png";
import cookedPepper from "../../assets/M2Cooking/Cooked_Peppers.png";
import stoveBg from "../../assets/M2Cooking/CookingBackground.png";
import thermometer from "../../assets/M2Cooking/CookingThermometer.png";
import vegThermometer from "../../assets/M2Cooking/VegThermometer.png";
import meatThermometer from "../../assets/M2Cooking/MeatThermometer.png";

import erinTextbox from "../../assets/M2Cooking/ErinTextbox.png";
import textbox from "../../assets/M1G1/Textbox.png";
import fryingPan from "../../assets/M2Cooking/FryingPan.png";
import fullMeal from "../../assets/M2Cooking/FullMeal.png";
import mealbg from "../../assets/M2Cooking/MealScene.png";
import panBeef from "../../assets/M2Cooking/Pan_Beef.png";
import panOnion from "../../assets/M2Cooking/Pan_Onions.png";
import panPepper from "../../assets/M2Cooking/Pan_Peppers.png";
import thermometerHand from "../../assets/M2Cooking/ThermometerHand.png";
import next from "../../assets/M1G1/nextbutton.png";

import {defaultFont} from "../../formatting";
import {defaultFontSize} from "../../formatting";
import {defaultFontColor} from "../../formatting";
import {defaultTypingSpeed} from "../../formatting";

import { useNavigate } from "react-router-dom";

export default function Cooking() {
  const navigate = useNavigate();
  useEffect(() => {
      window.navigateToPage = navigate;
    class Cooking extends Phaser.Scene {
      welcomeTexts = ["We'll practice by cooking a meal with the ingredients we just finished preparing."];
      instructions = ["In this game, drag the bowls of prepared ingredients over to the pans on the stove.\nThen, wait until the thermometer reaches the safe green zone before moving to the next step."];
      gameMessages = ["Drag the bowl of raw beef into the empty pan!", 
        "Drag the bowl of raw peppers into the empty pan! Make sure to keep the vegetables separate from the beef.", 
        "Draw the bowl of raw onions into the pan with peppers! It’s important to keep the vegetables separate from the meat.",
        "Drag the meat thermometer to the center of the beef pan!",
        "Drag the vegetable thermometer to the center of the vegetable pan!",
        "Wait for the ingredients to reach the green zone temperature before moving on!",
        "Great job! The vegetables and beef have reached a safe internal temperature. Now, we can plate the food."];
      mealMessages = ["Great job! The food is all plated.",
        "You’ve now reached the end of the food safety basics module. Click the next button to go back to the home page!"
      ];
      bowlX = 85;
      bowlY = 600;
      textboxScale = 0.9;
      textboxX = 160;
      textboxY = 200;
        constructor() {
        super("CookingScene");
      }

      preload() {
        this.load.image("beefBowl", beefBowl);
        this.load.image("onionBowl", onionBowl);
        this.load.image("pepperBowl", pepperBowl);
        this.load.image("cookedBeef", cookedBeef);
        this.load.image("cookedOnion", cookedOnion);
        this.load.image("cookedPepper", cookedPepper);
        this.load.image("stoveBg", stoveBg);
        this.load.image("thermometer", thermometer);
       this.load.image("vegThermometer", vegThermometer);
        this.load.image("meatThermometer", meatThermometer);

        this.load.image("erinTextbox", erinTextbox);
        this.load.image("textbox", textbox);
        this.load.image("fryingPan", fryingPan);
        this.load.image("fullMeal", fullMeal);
        this.load.image("mealbg", mealbg);
        this.load.image("panBeef", panBeef);
        this.load.image("panOnion", panOnion);
        this.load.image("panPepper", panPepper);
        this.load.image("thermometerHand", thermometerHand);        
        this.load.image("next", next);

      }

      create (){  
        this.stoveBg = this.add.image(0,0,'stoveBg').setOrigin(0).setScale(1);
       
        this.beefPan = this.add.image(950,245,'fryingPan').setOrigin(0).setScale(1).setInteractive({dropZone: true}).setVisible(false);
        this.veggiePan = this.add.image(475,515,'fryingPan').setOrigin(0).setScale(1.1).setInteractive({dropZone: true}).setVisible(false);

        this.beefBowl = this.add.image(this.bowlX,this.bowlY, 'beefBowl').setOrigin(0).setScale(1).setInteractive({draggable: true}).setVisible(false);
        this.onionBowl = this.add.image(this.bowlX,this.bowlY,'onionBowl').setOrigin(0).setScale(1).setInteractive({draggable: true}).setVisible(false);
        this.pepperBowl = this.add.image(this.bowlX,this.bowlY,'pepperBowl').setOrigin(0).setScale(1).setInteractive({draggable: true}).setVisible(false);
      
        this.panBeef = this.add.image(this.beefPan.x * 1.1, this.beefPan.y * 1.27,'panBeef').setOrigin(0).setScale(1).setInteractive({dropZone: true}).setVisible(false);
        this.cookedBeef = this.add.image(this.beefPan.x * 1.1,this.beefPan.y * 1.27,'cookedBeef').setOrigin(0).setScale(1).setInteractive({dropZone: true}).setAlpha(0);
        
        this.panOnion = this.add.image(this.veggiePan.x * 1.2,this.veggiePan.y * 1.16,'panOnion').setOrigin(0).setScale(1).setInteractive({dropZone: true}).setVisible(false);
        this.panPepper = this.add.image(this.veggiePan.x * 1.2,this.veggiePan.y * 1.26,'panPepper').setOrigin(0).setScale(1).setInteractive({dropZone: true}).setVisible(false);
        this.cookedOnion = this.add.image(this.veggiePan.x * 1.2,this.veggiePan.y * 1.16,'cookedOnion').setOrigin(0).setScale(1).setInteractive({dropZone: true}).setAlpha(0);
        this.cookedPepper = this.add.image(this.veggiePan.x * 1.2,this.veggiePan.y * 1.26,'cookedPepper').setOrigin(0).setScale(1).setInteractive({dropZone: true}).setAlpha(0);
        
        this.fullMeal = this.add.image(0,0,'fullMeal').setOrigin(0).setScale(1).setInteractive().setVisible(false);
        this.mealbg = this.add.image(0,0,'mealbg').setOrigin(0).setScale(1).setInteractive().setVisible(false);


        this.textbox = this.add.container(this.textboxX, this.textboxY);
        this.textboxImage = this.add.image(0,0, 'erinTextbox').setOrigin(0);
        this.textboxText = this.add.text(585, 100, "", {
        fontFamily: "sans-serif",
        fontSize: defaultFontSize,
        color: defaultFontColor,
        fontStyle: "bold", 
        align: 'left',
        wordWrap: {
            width: this.textboxImage.width * 0.60
      }
    }).setOrigin(0);
    
        this.meatThermometer = this.add.image(this.bowlX,this.bowlY,'meatThermometer').setOrigin(0).setScale(0.3).setInteractive({draggable: true}).setVisible(false);
        this.veggieThermometer = this.add.image(this.bowlX,this.bowlY,'vegThermometer').setOrigin(0).setScale(0.3).setInteractive({draggable: true}).setVisible(false);

        this.veggieThermometerHand = this.add.image( this.veggieThermometer.getCenter().x,this.veggieThermometer.getCenter().y,'thermometerHand').setOrigin(0).setScale(0.3).setVisible(false).setAngle(90);
        this.meatThermometerHand = this.add.image(0,0,'thermometerHand').setOrigin(0).setScale(0.3).setVisible(false).setAngle(90);

        this.next = this.add.image(1500, 835, 'next').setOrigin(0).setScale(0.35).setInteractive().setVisible(true);
        this.typewriteText("In this section, we will practice cooking foods to their proper temperature.");
        this.textbox.setSize(this.textboxImage.width, this.textboxImage.height);
        this.textbox.add([this.textboxImage, this.textboxText]);
        this.textbox.setScale(this.textboxScale);

        this.next.on('pointerdown', () => {
        if(this.welcomeTexts.length > 0) {
            this.typewriteText(this.welcomeTexts[0]);
            this.welcomeTexts.shift();
        }
        else if (this.instructions.length > 0) {
            this.textbox.setScale(1.05);
            this.textbox.x = 65;
            this.typewriteText(this.instructions[0], defaultTypingSpeed, 60);
            this.instructions.shift();
        }
        else if (this.gameMessages.length > 0){
          this.textbox.setScale(0.52);
          this.typewriteText(this.gameMessages[0], defaultTypingSpeed);
          this.beefPan.setVisible(true);
          this.beefBowl.setVisible(true);
          this.gameMessages.shift();
          this.next.setVisible(false);
        }
        else if (this.mealMessages.length > 0){
          this.meatThermometer.setVisible(false);
          this.meatThermometerHand.setVisible(false);
          this.veggieThermometer.setVisible(false);
          this.veggieThermometerHand.setVisible(false);
          this.mealbg.setVisible(true);
          this.textbox.setScale(0.7);
          this.textbox.x = 350;
          this.textbox.y = 50
          this.typewriteText(this.mealMessages[0]);
          this.mealMessages.shift();
        }
        else{
          callUpdate("m2");
          window.navigateToPage("/");
        }  
});

        this.input.on('drag', (pointer, gameObject, x, y) =>{
          if(gameObject === this.beefBowl){
            this.beefBowl.x = x;
            this.beefBowl.y = y;
          }
          if (gameObject === this.pepperBowl){
            this.pepperBowl.x = x;
            this.pepperBowl.y = y;
          }
          if (gameObject === this.onionBowl){
            this.onionBowl.x = x;
            this.onionBowl.y = y;
          }
          if(gameObject === this.veggieThermometer){
            this.veggieThermometer.x = x;
            this.veggieThermometer.y = y;
            this.veggieThermometerHand.x = this.veggieThermometer.getCenter().x;
            this.veggieThermometerHand.y = this.veggieThermometer.getCenter().y;
          }
          if(gameObject === this.meatThermometer){
            this.meatThermometer.x = x;
            this.meatThermometer.y = y;
            this.meatThermometerHand.x = this.meatThermometer.getCenter().x;
            this.meatThermometerHand.y = this.meatThermometer.getCenter().y;
          }
        })

        this.input.on('drop', (pointer, gameObject, dropZone) => {
          if (gameObject === this.beefBowl && dropZone === this.beefPan) {
              this.beefBowl.setVisible(false).disableInteractive();
              this.beefPan.disableInteractive();
              this.panBeef.setVisible(true);
              this.hideIngredient(this.panBeef);
              this.showIngredient(this.cookedBeef);
              this.typewriteText(this.gameMessages[0]);
              this.gameMessages.shift();
              this.veggiePan.setVisible(true);
              this.pepperBowl.setVisible(true);
          }
          else if (gameObject === this.pepperBowl && dropZone === this.veggiePan) {
              this.pepperBowl.setVisible(false).disableInteractive();
              this.panPepper.setVisible(true);
              this.onionBowl.setVisible(true);
              this.hideIngredient(this.panPepper);
              this.showIngredient(this.cookedPepper);
              this.typewriteText(this.gameMessages[0]);
              this.gameMessages.shift();
          }
          else if (gameObject === this.onionBowl && (dropZone === this.veggiePan || dropZone === this.cookedPepper)) {
              this.veggiePan.disableInteractive();
              this.onionBowl.setVisible(false).disableInteractive();
              this.panOnion.setVisible(true);
              this.hideIngredient(this.panOnion);
              this.showIngredient(this.cookedOnion);
              this.typewriteText(this.gameMessages[0]);
              this.meatThermometer.setVisible(true);
              this.meatThermometerHand.setVisible(true);
              this.gameMessages.shift();
          }
          else if (gameObject === this.meatThermometer && dropZone === this.cookedBeef) {
              this.meatThermometer.x = this.cookedBeef.x;
              this.meatThermometer.y = this.cookedBeef.y;
              this.meatThermometerHand.x = this.meatThermometer.getCenter().x;
              this.meatThermometerHand.y = this.meatThermometer.getCenter().y;
              this.meatThermometer.disableInteractive();
              this.typewriteText(this.gameMessages[0]);
              this.gameMessages.shift();
              this.veggieThermometer.setVisible(true);
              this.veggieThermometerHand.setVisible(true);
              this.growTemp(this.meatThermometerHand);

          }
        else if (gameObject === this.veggieThermometer && (dropZone === this.cookedPepper || dropZone === this.panPepper || dropZone === this.panOnion || dropZone === this.cookedOnion)) {
              this.veggieThermometer.x = this.cookedOnion.x;
              this.veggieThermometer.y = this.cookedOnion.y;
              this.veggieThermometerHand.x = this.veggieThermometer.getCenter().x;
              this.veggieThermometerHand.y = this.veggieThermometer.getCenter().y;
              this.veggieThermometer.disableInteractive();
              this.typewriteText(this.gameMessages[0]);
              this.gameMessages.shift();
              this.growTemp(this.veggieThermometerHand);
          }
    });
    
      }
growTemp(hand){
   if(hand === this.meatThermometerHand){
    this.duration = 20000;
  }
  else{
    this.duration = 10000;
  }
  this.tweens.add({
    targets: hand,
    angle: 300,
    duration: this.duration,
    ease:'Linear',
    onComplete: () => {
      if(hand === this.meatThermometerHand){
        this.meatCooked = true;
      }
      if(hand === this.veggieThermometerHand) {
        this.vegCooked = true;
      }

      if(this.meatCooked && this.vegCooked){
        this.typewriteText(this.gameMessages[0]);
        this.gameMessages.shift();
        this.next.setVisible(true);
      }
    }
  })
  return true;
}
hideIngredient(raw){
  if(raw === this.panBeef){
    this.duration = 20000;
  }
  else{
    this.duration = 10000;
  }
  this.tweens.add({
    targets: raw,
    alpha: 0,
    duration: this.duration,
    ease:'Linear',
    onComplete: () => {
      raw.setVisible(false);
    }
  })
}
showIngredient(cooked){
   if(cooked === this.cookedBeef){
    this.duration = 20000;
  }
  else{
    this.duration = 10000;
  }
  this.tweens.add({
    targets: cooked,
    alpha: 1,
    duration: this.duration,
    ease:'Linear'
  })
}
typewriteText(text, speed = defaultTypingSpeed, fontSize = null) {
  this.textboxText.setText("");
  this.isTyping = true;
  this.next.disableInteractive();
  this.beefBowl.disableInteractive();
  this.onionBowl.disableInteractive();
  this.pepperBowl.disableInteractive();
  this.meatThermometer.disableInteractive();
  this.veggieThermometer.disableInteractive();
  if (fontSize) {
    this.textboxText.setFontSize(fontSize); 
  } else {
    this.textboxText.setFontSize(defaultFontSize);
  }

  let i = 0;
  this.time.addEvent({
    delay: speed,
    repeat: text.length - 1,
    callback: () => {
      this.textboxText.text += text[i];
      i++;
      if (i === text.length) {
        this.isTyping = false;
        this.next.setInteractive();
        this.beefBowl.setInteractive();
        this.onionBowl.setInteractive();
        this.pepperBowl.setInteractive();
        this.meatThermometer.setInteractive();
        this.veggieThermometer.setInteractive();
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
      scene: [Cooking],
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
    </div>
);
}