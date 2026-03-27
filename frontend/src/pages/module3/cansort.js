import { useEffect } from "react";
import Phaser from "phaser";

import bg1 from "../../assets/Background1.png";
import healthy from "../../assets/M1G1/Healthy.png";
import fever from "../../assets/M1G1/Fever.png";
import runnyNose from "../../assets/M1G1/RunnyNose.png";
import nausea from "../../assets/M1G1/Nausea.png";
import check from "../../assets/M1G1/Check.png";
import xMark from "../../assets/M1G1/X.png";
import textbox from "../../assets/M1G1/Textbox.png";
import erinText from "../../assets/M3G1/erintextbox.png"
import next from "../../assets/M1G1/nextbutton.png";
import { defaultFont } from "../../formatting";
import { defaultFontSize } from "../../formatting";
import { defaultFontColor } from "../../formatting";
import { defaultTypingSpeed } from "../../formatting";



import { useNavigate } from "react-router-dom";

export default function Cans() {
    const navigate = useNavigate();

    useEffect(() => {
        window.navigateToPage = navigate;

        class Can extends Phaser.Scene {
            erinX = 1300;
            erinY = 175;
            erinScale = 1.1;
            textboxScale = 0.75;
            textFontSize = 70;
            markY = 650;

            welcomeTexts = [
                "In this module, you will learn how interpret food safety labels and packaging.",
                "First, whether packing is damaged and should be discarded. Then, the different expiry date types. Finally, the nine common allergens."
            ];

            instructions = [
                "In the following game, the volunteer will sort items based on whether the packaging is damaged and should be discarded.\n\nIf the item should be discarded, drag the item to the box with the X. If it is good to be used, drag it to the box with the check."
            ];

            transitions = [
                "Great job identifying whether something should be discarded due to damage! In the next section, we'll play the same game with expiration dates."
            ];

            constructor() {
                super("CanScene");
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
                this.load.image("erinText", erinText);
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

                this.canX = this.bg1.width / 2 - 150;
                this.canY = this.bg1.height / 2;

                // Characters
                this.leak = this.add.image(this.canX, this.canY, "nausea")
                    .setOrigin(0)
                    .setScale(this.erinScale)
                    .setVisible(false);
                    //this.input.setDraggable(this.leak);

                this.runnyNose = this.add.image(this.canX, this.canY, "runnyNose")
                    .setOrigin(0)
                    .setScale(this.erinScale)
                    .setVisible(false);
                    //this.input.setDraggable(this.runnyNose);

                this.fever = this.add.image(this.canX, this.canY, "fever")
                    .setOrigin(0)
                    .setScale(this.erinScale)
                    .setVisible(false);
                    //this.input.setDraggable(this.fever);

                this.healthy = this.add.image(this.canX, this.canY, "healthy")
                    .setOrigin(0)
                    .setScale(this.erinScale)
                    .setVisible(false);
                    //this.input.setDraggable(this.healthy);

                // Buttons
                this.xMark = this.add.image(this.bg1.width / 2 - this.bg1.width * 0.25, this.markY, "x")
                    .setScale(0.3)
                    .setInteractive({ pixelPerfect: true })
                    .setVisible(false);

                this.check = this.add.image(this.bg1.width / 2 + this.bg1.width * 0.25, this.markY, "check")
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
                        question: "This can is dented and has some of the contents leaking from the top.",
                        correctAnswer: "no",
                        popup: "No! If you are experiencing symptoms like nausea, diarrhea, vomiting, you must be symptom free for at least 24 hours before attempting to volunteer. Illnesses with these symptoms are really contagious and put customer and coworker health at risk.",
                        damageType: this.leak
                    },
                    {
                        question: "Hey! I've been coughing and sneezing a lot lately, and my throat is feeling sore, am I still good to come in?",
                        correctAnswer: "no",
                        popup: "No! If you are experiencing symptoms like coughing, runny/stuffy nose, or sore throat you must be symptom free for at least 24 hours before attempting to volunteer.",
                        damageType: this.runnyNose
                    },
                    {
                        question: "Hey! I was having chills last night, and today I'm feeling really achey, weak, and feverish, am I good to come in?",
                        correctAnswer: "no",
                        popup: "No! If you are experiencing symptoms like chills and fever with body aches you must be symptom free for at least 24 hours before attempting to volunteer.",
                        damageType: this.fever
                    },
                    {
                        question: "I'm feeling really great today, am I good to volunteer?",
                        correctAnswer: "yes",
                        popup: "Yes! If you've been symptom free of any contagious illness for at least 24 hours and you're feeling great, you are good to volunteer!",
                        damageType: this.healthy
                    }
                ];

                this.textboxErin = this.add.container(this.bg1.width / 2 - 640, 50);

                this.textboxErinImage = this.add.image(0, 0, "erinText").setOrigin(0);

                this.textboxErin.setSize(this.textboxErinImage.width, this.textboxErinImage.height);
                this.textboxErin.add(this.textboxErinImage);
                this.textboxErin.setScale(this.textboxScale);
                this.textboxErinImage.setVisible(false);

                this.volunteerScenario[this.volunteerScenario.length - 1].damageType.setVisible(true);

                // Textbox
                this.textbox = this.add.container(145, 112);

                this.textboxImage = this.add.image(0, 0, "textbox").setOrigin(0);

                this.textboxText = this.add.text(100, 100, "", {
                    font: "70px Arial",
                    color: "#000",
                    wordWrap: {
                        width: this.textboxImage.width * 0.9
                    }
                }).setOrigin(0);

                this.typewriteText("Welcome to the label interpretation module!");

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
                        console.log(this.volunteerScenario);
                        this.textbox.setVisible(false);
                        this.textboxText = this.add.text(this.textboxErinImage.width * 0.5, this.textboxErinImage.height * 0.22, "", {
                            font: "54px Arial",
                            color: "#000000",
                            wordWrap: {
                                // change the value to adjust how close the text gets to the edge of the box
                                width: this.textboxErinImage.width * 0.42
                            }
                        }).setOrigin(0);
                        this.textboxErinImage.setVisible(true);
                        this.textboxErin.setScale(this.textboxScale);
                        this.cycleScenarios();

                    } else {
                        window.navigateToPage("/module1/personalHygiene");
                    }
                });

            }

            typewriteText(text, speed = 30) {
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

            cycleScenarios() {
                    console.log(this.volunteerScenario);
                        this.typewriteText(this.volunteerScenario[0].question);

                        this.volunteerScenario[this.volunteerScenario.length - 1].damageType.setVisible(false);
                        this.volunteerScenario[0].damageType.setVisible(true);
                        this.volunteerScenario[0].damageType.setInteractive({ useHandCursor: true });
                        this.input.setDraggable(this.volunteerScenario[0].damageType);

                        this.xMark.setVisible(true);
                        this.check.setVisible(true);
                        this.next.setVisible(false);

                        this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
                            gameObject.x = dragX;
                            gameObject.y = dragY;
                        });

                        this.volunteerScenario[0].damageType.on("dragend", () => {

                            const itemBounds = this.volunteerScenario[0].damageType.getBounds();
                            const checkBounds = this.check.getBounds();
                            const xBounds = this.xMark.getBounds();

                            if (Phaser.Geom.Intersects.RectangleToRectangle(itemBounds, checkBounds)) {
                                this.handleAnswer(this.volunteerScenario, this.check);
                            }
                            else if (Phaser.Geom.Intersects.RectangleToRectangle(itemBounds, xBounds)) {
                                this.handleAnswer(this.volunteerScenario, this.xMark);
                            }
                        });
                };

            handleAnswer(scenarios, button) {
                this.scenario = scenarios[0];

                if (
                    (this.scenario.correctAnswer === "no" && button === this.xMark) ||
                    (this.scenario.correctAnswer === "yes" && button === this.check)
                ) {
                    this.volunteerScenario[0].damageType.destroy();
                    this.textboxText.setColor("rgb(0, 133, 0)");
                    this.typewriteText(this.scenario.popup);
                    scenarios.shift();

                    if (scenarios.length > 0) {
                        this.textboxText.setColor("#000");
                        this.textbox.setScale(this.textboxScale);
                        this.textboxText.setFontSize(this.textFontSize);
                        this.typewriteText(scenarios[0].question);

                        scenarios[0].damageType.setVisible(true);
                        this.check.preFX.clear();
                        this.xMark.preFX.clear();
                        this.cycleScenarios();
                    }
                } else {
                    if (button === this.xMark) {
                        this.check.preFX.addShine(1, 0.5, 5);
                    } else {
                        this.xMark.preFX.addShine(1, 0.5, 5);
                    }

                    this.textboxText.setFontSize(this.textFontSize * 0.8);
                    this.textboxText.setColor("rgb(252, 0, 0)");
                    this.typewriteText(this.scenario.popup);
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
            scene: [Can],
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