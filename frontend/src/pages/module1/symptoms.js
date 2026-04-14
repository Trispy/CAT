import { useEffect } from "react";
import Phaser from "phaser";

import moduleUpdate from "../../components/moduleupdate";

import bg1 from "../../assets/M1G1/HouseBackground.png";
import healthy from "../../assets/M1G1/Healthy.png";
import fever from "../../assets/M1G1/Fever.png";
import runnyNose from "../../assets/M1G1/RunnyNose.png";
import nausea from "../../assets/M1G1/Nausea.png";
import check from "../../assets/M1G1/Check.png";
import xMark from "../../assets/M1G1/X.png";
import textbox from "../../assets/M1G1/Textbox.png";
import next from "../../assets/M1G1/nextbutton.png";
import mapbutton from "../../assets/mapbutton.png";
import { useNavigate } from "react-router-dom";
import Settings from "../../components/settings";
const API = process.env.REACT_APP_API_URL;

export default function Symptoms({ openMenu }) {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.navigateToPage = navigate;
    
    class Symptom extends Phaser.Scene {
      erinX = 1300;
      erinY = 175;
      erinScale = 1.1;
      textboxScale = 0.75;
      textFontSize = 70;
      markY = 650;

      welcomeTexts = [
        "In this module, you will learn how to tell  when you are fit to volunteer and which  hygiene practices you should follow before and during volunteering.",
        "It's important to stay home when you are not feeling well. Let's see if the volunteer is fit for the job today!"
      ];

      instructions = [
        "In the following game, the volunteer will share different symptoms with you, and you will determine if they can volunteer or should stay home. If they can volunteer, tap the green check, but if they should stay home, tap the red X."      ];

      transitions = [
        "Great job identifying when volunteers should stay home! In the next section,  you will prepare  this volunteer for their shift"
      ];

      constructor() {
        super("SymptomScene");
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

      create() {
        // Background
        this.bg1 = this.add.image(
          this.scale.width / 2,
          this.scale.height / 2,
          "bg1"
        );

        const scaleX = this.scale.width / this.bg1.width;
        const scaleY = this.scale.height / this.bg1.height;

        // ORIGINAL behavior (fit entire image)
        const scale = Math.min(scaleX, scaleY);

        this.bg1.setScale(scale);

        // Characters
        this.nausea = this.add.image(this.erinX, this.erinY, "nausea")
          .setOrigin(0)
          .setScale(this.erinScale)
          .setVisible(false);

        this.runnyNose = this.add.image(this.erinX, this.erinY, "runnyNose")
          .setOrigin(0)
          .setScale(this.erinScale)
          .setVisible(false);

        this.fever = this.add.image(this.erinX, this.erinY, "fever")
          .setOrigin(0)
          .setScale(this.erinScale)
          .setVisible(false);

        this.healthy = this.add.image(this.erinX, this.erinY, "healthy")
          .setOrigin(0)
          .setScale(this.erinScale)
          .setVisible(true);

        // Buttons
        this.xMark = this.add.image(865, this.markY, "x")
          .setScale(0.3)
          .setInteractive({ pixelPerfect: true })
          .setVisible(false);

        this.check = this.add.image(565, this.markY, "check")
          .setScale(0.3)
          .setInteractive()
          .setVisible(false);

        this.next = this.add.image(
          this.erinX * 1.25,
          this.erinY * 4.35,
          "next"
        )
          .setOrigin(0)
          .setScale(0.35)
          .setInteractive()
          .setVisible(true);

        // Scenario logic
        this.volunteerScenario = [
          {
            question: "Hey! I have an upset stomach, and I'm feeling a bit nauseous. Can I volunteer today?",
            correctAnswer: "no",
            popup: "Try again. If you are experiencing symptoms like nausea, diarrhea, or vomiting, you cannot volunteer. You must be symptom free for at least 24 hours before volunteering because contagious illnesses put customer and coworker health at risk.",
            erinType: this.nausea
          },
          {
            question: "Hey! I've been coughing and sneezing a lot this morning, and my throat is feeling sore. Can I volunteer today?",
            correctAnswer: "no",
            popup: "Try again. If you are experiencing symptoms like coughing, runny/stuffy nose, or sore throat, you must be symptom free for at least 24 hours before volunteering. ",
            erinType: this.runnyNose
          },
          {
            question: "Hey! I was having chills last night, and today I'm feeling really achey, weak, and feverish. Can I volunteer today?",
            correctAnswer: "no",
            popup: "Try again. If you are experiencing symptoms like chills and fever with body aches, you must be symptom free for at least 24 hours before volunteering.",
            erinType: this.fever
          },
          {
            question: "I'm feeling really great today. Can I volunteer?",
            correctAnswer: "yes",
            popup: "Try again. If you have been symptom free of any contagious illness for at least 24 hours and are feeling healthy, you can volunteer.",
            erinType: this.healthy
          }
        ];

        this.volunteerScenario[this.volunteerScenario.length - 1].erinType.setVisible(true);

        // Textbox
        this.textbox = this.add.container(145, 112);

        this.textboxImage = this.add.image(0, 0, "textbox").setOrigin(0);

        this.textboxText = this.add.text(100, 100, "", {
          font: "bold 70px sans-serif",
          color: "#000",
          wordWrap: {
            width: this.textboxImage.width * 0.9
          }
        }).setOrigin(0);

        this.typewriteText("Welcome to the personal hygiene module!");

        this.textbox.setSize(this.textboxImage.width, this.textboxImage.height);
        this.textbox.add([this.textboxImage, this.textboxText]);
        this.textbox.setScale(this.textboxScale);

        // Interactions
        this.next.on("pointerdown", () => {
          if (this.welcomeTexts.length > 0) {
            this.typewriteText(this.welcomeTexts[0]);
            this.welcomeTexts.shift();
          } else if (this.instructions.length > 0) {
            this.textbox.setScale(1.05);
            this.textboxText.setFontSize(50);
            this.typewriteText(this.instructions[0]);
            this.instructions.shift();
          } else if (this.volunteerScenario.length > 0) {
            this.textbox.setScale(this.textboxScale);
            this.textboxText.setFontSize(this.textFontSize);
            this.typewriteText(this.volunteerScenario[0].question);

            this.volunteerScenario[this.volunteerScenario.length - 1].erinType.setVisible(false);
            this.volunteerScenario[0].erinType.setVisible(true);

            this.xMark.setVisible(true);
            this.check.setVisible(true);
            this.next.setVisible(false);
          } else {
            moduleUpdate(`${API}/api/game/module1/symptoms/completed`);
            window.navigateToPage("/module1/personalHygiene");
          }
        });

        this.xMark.on("pointerdown", () => {
          this.handleAnswer(this.volunteerScenario, this.xMark);
        });

        this.check.on("pointerdown", () => {
          this.handleAnswer(this.volunteerScenario, this.check);
        });
      }

      typewriteText(text, speed = 25) {
        this.textboxText.setText("");
        this.next.disableInteractive();
        this.xMark.disableInteractive();
        this.check.disableInteractive();

        let i = 0;

        this.time.addEvent({
          delay: speed,
          repeat: text.length - 1,
          callback: () => {
            this.textboxText.text += text[i];
            i++;

            if (i === text.length) {
              this.next.setInteractive();
              this.xMark.setInteractive();
              this.check.setInteractive();
            }
          }
        });
      }

      handleAnswer(scenarios, button) {
        this.scenario = scenarios[0];

        if (
          (this.scenario.correctAnswer === "no" && button === this.xMark) ||
          (this.scenario.correctAnswer === "yes" && button === this.check)
        ) {
          scenarios.shift();

          if (scenarios.length > 0) {
            this.textboxText.setColor("#000");
            this.textbox.setScale(this.textboxScale);
            this.textboxText.setFontSize(this.textFontSize);
            this.typewriteText(scenarios[0].question);

            scenarios[0].erinType.setVisible(true);
            this.check.preFX.clear();
            this.xMark.preFX.clear();
          }
        } else {
          if (button === this.xMark) {
            this.check.preFX.addShine(1, 0.5, 5);
          } else {
            this.xMark.preFX.addShine(1, 0.5, 5);
          }

          this.textboxText.setFontSize(this.textFontSize * 0.7);
          this.textboxText.setColor("rgb(252, 0, 0)");
          this.typewriteText(this.scenario.popup + "\nTap the ❌ button to continue.");
        }

        if (scenarios.length === 0) {
          this.textbox.setScale(1.05);
          this.textboxText.setColor("#000");
          this.textboxText.setFontSize(50);
          this.typewriteText(this.transitions[0]);

          this.xMark.setVisible(false);
          this.check.setVisible(false);
          this.next.setVisible(true);
        }
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
      scene: [Symptom],
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
    top: 0,
    right: 180,
    padding: "10px",
    display: "flex",
    zIndex: 30000
  }}
>
      <Settings openMenu={openMenu}/>
    </div>
    </div>
  );
}