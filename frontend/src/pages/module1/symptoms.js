import { useEffect } from "react";
import Phaser from "phaser";

import bg1 from "../../assets/M1G1/HouseBackground.png";
import healthy from "../../assets/M1G1/Healthy.png";
import fever from "../../assets/M1G1/Fever.png";
import runnyNose from "../../assets/M1G1/RunnyNose.png";
import nausea from "../../assets/M1G1/Nausea.png";
import check from "../../assets/M1G1/Check.png";
import xMark from "../../assets/M1G1/X.png";
import textbox from "../../assets/M1G1/Textbox.png";
import next from "../../assets/M1G1/nextbutton.png";

export default function Symptoms() {

  useEffect(() => {
    class Example extends Phaser.Scene {
        erinX = 1300;
        erinY = 175;
        erinScale = 1.1;
        textboxScale = 0.75;
        textFontSize = 70;
        markY = 650;
        welcomeTexts = ["In this module, you will learn how to tell if you are fit to volunteer and about what hygiene practices you should follow before volunteering.",
         "It's important to stay home when you are not feeling well. Let's see if the volunteer is fit for the job today!"];
        instructions = ["In the following game, the volunteer will share different symptoms with you, and you will determine if they should volunteer or stay home. \n\n If they should stay home, tap the red X, if they can volunteer, tap the green check."];
        transitions = ["Great job identifying when you should stay home! In the next section, we'll get this volunteer ready for their shift."]
      

      constructor() {
        super("Example");
      }

      preload() {
        this.load.image("bg1", bg1);
        this.load.image("nausea", nausea);
        this.load.image("fever", fever);
        this.load.image("runnyNose", runnyNose);
        this.load.image("healthy", healthy);
        this.load.image("check", check);
        this.load.image("x", xMark);
        this.load.image("textbox", textbox);
        this.load.image("next", next);
      }

      create ()
    {
        this.bg1 = this.add.image(0,0, 'bg1').setOrigin(0).setScale(1);
        this.nausea= this.add.image(this.erinX,this.erinY, 'nausea').setOrigin(0).setScale(this.erinScale).setVisible(false);
        this.runnyNose= this.add.image(this.erinX,this.erinY, 'runnyNose').setOrigin(0).setScale(this.erinScale).setVisible(false);
        this.fever= this.add.image(this.erinX,this.erinY, 'fever').setOrigin(0).setScale(this.erinScale).setVisible(false);
        this.healthy= this.add.image(this.erinX,this.erinY, 'healthy').setOrigin(0).setScale(this.erinScale).setVisible(true);
        this.xMark = this.add.image(865, this.markY, 'x').setScale(0.3).setInteractive({ pixelPerfect: true}).setVisible(false);
        this.check = this.add.image(565,this.markY,'check').setScale(0.3).setInteractive().setVisible(false);
        this.next = this.add.image(this.erinX * 1.25, this.erinY * 4.35, 'next').setOrigin(0).setScale(0.35).setInteractive().setVisible(true);
        this.volunteerScenario = [
        {
            question: "Hey! I have an upset stomach today, and I'm feeling a bit nauseous, am I still good to come in?",
            correctAnswer: "no",
            popup: "No! If you are experiencing symptoms like nausea, diarrhea, vomiting, you must be symptom free for at least 24 hours before attempting to volunteer. Illnesses with these symptoms are really contagious and put customer and coworker health at risk.",
            erinType: this.nausea
        },
        {
            question: "Hey! I've been coughing and sneezing a lot lately, and my throat is feeling sore, am I still good to come in?",
            correctAnswer: "no",
            popup: "No! If you are experiencing symptoms like coughing, runny/stuffy nose, or sore throat you must be symptom free for at least 24 hours before attempting to volunteer.",
            erinType: this.runnyNose
        },
        {
            question: "Hey! I was having chills last night, and today I'm feeling really achey, weak, and feverish, am I good to come in?",
            correctAnswer: "no",
            popup: "No! If you are experiencing symptoms like chills and fever with body aches you must be symptom free for at least 24 hours before attempting to volunteer.",
            erinType: this.fever
        },
        {
            question: "I'm feeling really great today, am I good to volunteer?",
            correctAnswer: "yes",
            popup: "Yes! If you've been symptom free of any contagious illness for at least 24 hours and you're feeling great, you are good to volunteer!",
            erinType: this.healthy
        }
      ];

        this.volunteerScenario[this.volunteerScenario.length - 1].erinType.setVisible(true);
        this.textbox = this.add.container(145, 112);
        this.textboxImage = this.add.image(0,0, 'textbox').setOrigin(0);
        this.textboxText = this.add.text(100, 100, "", {
        font: '70px Arial',
        color: '#000',
        wordWrap: {
            width: this.textboxImage.width * 0.9
        }
    }).setOrigin(0);
        this.typewriteText("Welcome to the personal hygiene module!");
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
            this.textboxText.setFontSize(50);
            this.typewriteText(this.instructions[0]);
            this.instructions.shift();
        }
        else if (this.volunteerScenario.length > 0){
          this.textbox.setScale(this.textboxScale);
          this.textboxText.setFontSize(this.textFontSize);
          this.typewriteText(this.volunteerScenario[0].question);
          this.volunteerScenario[this.volunteerScenario.length - 1].erinType.setVisible(false);
          this.volunteerScenario[0].erinType.setVisible(true);
          this.xMark.setVisible(true);
          this.check.setVisible(true);
          this.next.setVisible(false);
        }
        else if (this.transitions.length > 0){
           this.xMark.setVisible(false);
           this.check.setVisible(false);
           this.textbox.setScale(1.05);
           this.textboxText.setColor('#000');
           this.textboxText.setFontSize(50);
           this.typewriteText(this.transitions[0]);
           this.transitions.shift();
        }
      
});
        this.xMark.on('pointerdown', () => {
          this.handleAnswer(this.volunteerScenario, this.xMark);
        });
        this.check.on('pointerdown', () => {
          this.handleAnswer(this.volunteerScenario, this.check);
        });

/*
        this.text = this.add.text(300, 300, 'Please set your\nphone to landscape', { font: '48px Courier', fill: '#00ff00', align: 'center' }).setOrigin(0.5);
        this.checkOriention();
        this.scale.on('resize', this.checkOriention, this); */   
}

typewriteText(text, speed = 5) {
  this.textboxText.setText("");
  this.isTyping = true;
  this.next.disableInteractive();

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
      }
    }
  });
}

handleAnswer(scenarios, button) {
  this.scenario = scenarios[0];
  if (this.scenario.correctAnswer === "no" && button === this.xMark || this.scenario.correctAnswer === "yes" && button === this.check) {
    scenarios.shift(); 
    if (scenarios.length > 0) {
      this.textboxText.setColor('#000');
      this.textbox.setScale(this.textboxScale);
      this.textboxText.setFontSize(this.textFontSize);
      this.typewriteText(scenarios[0].question);
      scenarios[0].erinType.setVisible(true);
    }

  } else {
    this.textboxText.setFontSize(this.textFontSize * 0.8);
    this.textboxText.setColor('rgb(252, 0, 0)');
    this.typewriteText(this.scenario.popup);
  }
   if (scenarios.length === 0){
    this.next.setVisible(true);
  } 
}

checkOriention ()
{
    if (window.innerHeight > window.innerWidth)
    {
        this.textbox.alpha = 0.2;
        this.text.setVisible(true);
    }
    else
    {
        this.textbox.alpha = 1;
        this.text.setVisible(false);
    }
}
    }

const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  parent: "phaser-game",
  scene: [Example],
  scale: {
    mode: Phaser.Scale.ENVELOP,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  backgroundColor: 0x000000,
};
    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, []);

  return (
<div
  id="phaser-wrapper"
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
    backgroundColor: "black",
  }}
>
  <div
    id="phaser-game"
    style={{
      width: "100%",
      height: "100%",
      maxWidth: `${window.innerHeight * (16/9)}px`,
      maxHeight: "100%",
    }}
  />
</div>
);
}