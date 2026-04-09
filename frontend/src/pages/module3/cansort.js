import { useEffect } from "react";
import Phaser from "phaser";

import moduleUpdate from "../../components/moduleupdate";

import bg1 from "../../assets/Plainbackground.png";
import bulgingCan from "../../assets/M3G1/bulgingCan.png";
import cereal from "../../assets/M3G1/cereal.png";
import cornCan from "../../assets/M3G1/cornCan.png";
import jar from "../../assets/M3G1/jar.png";
import moldyOrange from "../../assets/M3G1/moldyOrange.png";
import rice from "../../assets/M3G1/rice.png";
import slightDent from "../../assets/M3G1/slightDent.png";
import tomatoLeaking from "../../assets/M3G1/tomatoLeaking.png";
import waterDamage from "../../assets/M3G1/waterDamage.png";
import check from "../../assets/M3G1/foodboxCheck.png";
import xMark from "../../assets/M3G1/foodboxX.png";
import textbox from "../../assets/M1G1/Textbox.png";
import erinText from "../../assets/M3G1/erintextbox.png"
import next from "../../assets/M1G1/nextbutton.png";
import mapbutton from "../../assets/mapbutton.png";
import { useNavigate } from "react-router-dom";
import Settings from "../../components/settings";
const API = process.env.REACT_APP_API_URL;
export default function Cans({ openMenu }) {
    const navigate = useNavigate();

    useEffect(() => {
        window.navigateToPage = navigate;

        class Can extends Phaser.Scene {
            erinX = 1300;
            erinY = 175;
            objectScale = 0.2;
            textboxScale = 0.75;
            textFontSize = 70;
            markY = 750;

            welcomeTexts = [
                "In this module, you will learn how interpret food safety labels and packaging.",
                "First, whether packing is damaged and should be discarded. Then, the different expiry date types. Finally, the nine common allergens."
            ];

            instructions = [
                "In the following game, the volunteer will sort items based on whether the packaging is damaged and should be discarded.\n\nIf the item is questionable, drag the item to the box with the ❌ to ask a supervisor. If it is good to be used, drag it to the box with the ✅."
            ];

            transitions = [
                "As a volunteer, you may handle various food products, so it’s important to recognize when items are safe to use and to ask a supervisor if you're unsure about any package or can."
            ];

            constructor() {
                super("CanScene");
            }

            preload() {
                this.load.image("bg1", bg1);
                this.load.image("bulgingCan", bulgingCan);
                this.load.image("cereal", cereal);
                this.load.image("cornCan", cornCan);
                this.load.image("jar", jar);
                this.load.image("moldyOrange", moldyOrange);
                this.load.image("rice", rice);
                this.load.image("slightDent", slightDent);
                this.load.image("tomatoLeaking", tomatoLeaking);
                this.load.image("waterDamage", waterDamage);
                this.load.image("check", check);
                this.load.image("x", xMark);
                this.load.image("textbox", textbox);
                this.load.image("erinText", erinText);
                this.load.image("next", next);
            }
            
            showPopup(inputText) {
                    const { width, height } = this.scale;

                    const overlay = this.add.container(0, 0);

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

                const scaleX = this.scale.width / this.bg1.width;
                const scaleY = this.scale.height / this.bg1.height;

                // ORIGINAL behavior (fit entire image)
                const scale = Math.min(scaleX, scaleY);

                this.bg1.setScale(scale);

                this.canX = this.bg1.width / 2 - 150;
                this.canY = this.bg1.height / 2;

                // Characters
                this.dented = this.add.image(this.canX, this.canY, "tomatoLeaking")
                    .setOrigin(0)
                    .setScale(this.objectScale)
                    .setVisible(false);

                this.cornCan = this.add.image(this.canX, this.canY, "cornCan")
                    .setOrigin(0)
                    .setScale(this.objectScale)
                    .setVisible(false);

                this.jarPop = this.add.image(this.canX, this.canY, "jar")
                    .setOrigin(0)
                    .setScale(0.15)
                    .setVisible(false);

                this.smallDent = this.add.image(this.canX, this.canY, "slightDent")
                    .setOrigin(0)
                    .setScale(this.objectScale)
                    .setVisible(false);

                this.cereal = this.add.image(this.canX, this.canY, "cereal")
                    .setOrigin(0)
                    .setScale(0.15)
                    .setVisible(false);

                this.canMisshapen = this.add.image(this.canX, this.canY, "bulgingCan")
                    .setOrigin(0)
                    .setScale(this.objectScale)
                    .setVisible(false);

                this.waterDamage = this.add.image(this.canX, this.canY, "waterDamage")
                    .setOrigin(0)
                    .setScale(0.15)
                    .setVisible(false);

                this.mold = this.add.image(this.canX, this.canY, "moldyOrange")
                    .setOrigin(0)
                    .setScale(this.objectScale)
                    .setVisible(false);

                this.torn = this.add.image(this.canX, this.canY, "rice")
                    .setOrigin(0)
                    .setScale(0.15)
                    .setVisible(false);

                // Buttons
                this.xMark = this.add.image(this.bg1.width / 2 - this.bg1.width * 0.27, this.markY, "x")
                    .setScale(0.5)
                    .setInteractive({ pixelPerfect: true })
                    .setVisible(false);

                this.check = this.add.image(this.bg1.width / 2 + this.bg1.width * 0.30, this.markY, "check")
                    .setScale(0.5)
                    .setInteractive()
                    .setVisible(false);

                this.next = this.add.image(
                    this.erinX * 1.25,
                    this.erinY * 5.00,
                    "next"
                )
                    .setOrigin(0)
                    .setScale(0.35)
                    .setInteractive()
                    .setVisible(true);

                // Scenario logic
                this.canScenario = [
                    {
                        question: "This can is dented and has some of the contents leaking from the top.",
                        correctAnswer: "no",
                        popup: "If a can is dented in a way that compromises the seal, it should be thrown out.",
                        damageType: this.dented
                    },
                    {
                        question: "This can is slightly dented in the middle.",
                        correctAnswer: "yes",
                        popup: "A small dent that doesn't compromise the seal is fine.",
                        damageType: this.smallDent
                    },
                    {
                        question: "This jar's pop button is up, even though it is unopened.",
                        correctAnswer: "no",
                        popup: "If the pop button is up, the seal has been compromised, and should be thrown out.",
                        damageType: this.jarPop
                    },
                    {
                        question: "This can has corn in it. I don't like corn.",
                        correctAnswer: "yes",
                        popup: "This can is fine.",
                        damageType: this.cornCan
                    },
                    {
                        question: "This can is misshapen and bulging.",
                        correctAnswer: "no",
                        popup: "A bulging can indicates pathogen growth.",
                        damageType: this.canMisshapen
                    },
                    {
                        question: "This box has clearly has some water damage.",
                        correctAnswer: "no",
                        popup: "Any water damage could have affected the food inside- better to toss it.",
                        damageType: this.waterDamage
                    },
                    {
                        question: "This orange has... something... growing on it.",
                        correctAnswer: "no",
                        popup: "\"Something\" is probably mold, which can be much deeper in any food than just what you can see.",
                        damageType: this.mold
                    },
                    {
                        question: "This bag of rice was given to us open, and there are other things in there.",
                        correctAnswer: "no",
                        popup: "Anything with tears or foreign objects shouldn't be trusted.",
                        damageType: this.torn
                    },
                    {
                        question: "This is a perfect box of cereal.",
                        correctAnswer: "yes",
                        popup: "No visible damage or anything off with the packaging means it's safe to assume this item is usable.",
                        damageType: this.cereal
                    },
                ];

                this.textboxErin = this.add.container(this.bg1.width / 2 - 640, 50);

                this.textboxErinImage = this.add.image(0, 0, "erinText").setOrigin(0);

                this.textboxErin.setSize(this.textboxErinImage.width, this.textboxErinImage.height);
                this.textboxErin.add(this.textboxErinImage);
                this.textboxErin.setScale(this.textboxScale);
                this.textboxErinImage.setVisible(false);

                this.canScenario[this.canScenario.length - 1].damageType.setVisible(true);

                // Textbox
                this.textbox = this.add.container(150, 130);

                this.textboxImage = this.add.image(0, 0, "textbox").setOrigin(0);

                this.textboxText = this.add.text(100, 75, "", {
                    font: "bold 70px sans-serif",
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
                    } else if (this.canScenario.length > 0) {
                        console.log(this.canScenario);
                        this.textbox.setVisible(false);
                        this.textboxText = this.add.text(this.textboxErinImage.width * 0.47, this.textboxErinImage.height * 0.22, "", {
                            font: "bold 50px sans-serif",
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
                        moduleUpdate(`${API}/api/game/module3/canSorting/completed`);
                        window.navigateToPage("/module3/expiration");
                    }
                });

            }

            typewriteText(text, type, speed = 5) {
                if (type == "popup"){
                    this.showPopup(text);
                    return;
                }
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
                    console.log(this.canScenario);
                        this.typewriteText(this.canScenario[0].question);

                        this.canScenario[this.canScenario.length - 1].damageType.setVisible(false);
                        this.canScenario[0].damageType.setVisible(true);
                        this.canScenario[0].damageType.setInteractive({ useHandCursor: true });
                        this.input.setDraggable(this.canScenario[0].damageType);

                        this.xMark.setVisible(true);
                        this.check.setVisible(true);
                        this.next.setVisible(false);

                        this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
                            gameObject.x = dragX;
                            gameObject.y = dragY;
                        });

                        this.canScenario[0].damageType.on("dragend", () => {

                            const itemBounds = this.canScenario[0].damageType.getBounds();
                            const checkBounds = this.check.getBounds();
                            const xBounds = this.xMark.getBounds();

                            if (Phaser.Geom.Intersects.RectangleToRectangle(itemBounds, checkBounds)) {
                                this.handleAnswer(this.canScenario, this.check);
                            }
                            else if (Phaser.Geom.Intersects.RectangleToRectangle(itemBounds, xBounds)) {
                                this.handleAnswer(this.canScenario, this.xMark);
                            }
                        });
                };

            handleAnswer(scenarios, button) {
                
                this.scenario = scenarios[0];

                if (
                    (this.scenario.correctAnswer === "no" && button === this.xMark) ||
                    (this.scenario.correctAnswer === "yes" && button === this.check)
                ) {
                    this.canScenario[0].damageType.destroy();
                    this.textboxText.setColor("rgb(0, 133, 0)");
                    this.typewriteText(this.scenario.popup, "popup");
                    scenarios.shift();
                    
                    if (scenarios.length > 0) {
                        this.textboxText.setColor("#000");
                        this.textbox.setScale(this.textboxScale);
                        this.textboxText.setFontSize(this.textFontSize);
                        //this.typewriteText(scenarios[0].question);

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
                    this.typewriteText(this.scenario.popup, "popup");
                }
                
                if (scenarios.length === 0) {
                    this.textboxText.setColor("#000");
                    this.textboxErin.setScale(1.05);
                    this.textboxErin.setX(60);
                    this.textboxText.setWordWrapWidth(this.textboxErinImage.width * 0.47);
                    this.textboxText.setY(150);
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