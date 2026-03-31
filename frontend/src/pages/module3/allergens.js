import { useEffect } from "react";
import Phaser from "phaser";

import bg1 from "../../assets/Plainbackground.png";
import healthy from "../../assets/M1G1/Healthy.png";
import fever from "../../assets/M1G1/Fever.png";
import runnyNose from "../../assets/M1G1/RunnyNose.png";
import nausea from "../../assets/M1G1/Nausea.png";
import check from "../../assets/M3G1/foodboxCheck.png";
import xMark from "../../assets/M3G1/foodboxX.png";
import textbox from "../../assets/M1G1/Textbox.png";
import erinText from "../../assets/M3G1/erintextbox.png"
import next from "../../assets/M1G1/nextbutton.png";
import { defaultFont } from "../../formatting";
import { defaultFontSize } from "../../formatting";
import { defaultFontColor } from "../../formatting";
import { defaultTypingSpeed } from "../../formatting";

import bar from "../../assets/M3G3/Bar.png";
import cookies from "../../assets/M3G3/Cookies.png";
import crackers from "../../assets/M3G3/Crackers.png";
import guest1 from "../../assets/M3G3/Guest.png";
import guest2 from "../../assets/M3G3/Guest2.png";
import guest3 from "../../assets/M3G3/Guest3.png";
import sauce from "../../assets/M3G3/Sauce.png";
import seaweed from "../../assets/M3G3/Seaweed.png";
import stock from "../../assets/M3G3/Stock.png";
import yogurt from "../../assets/M3G3/Yogurt.png";

import { useNavigate } from "react-router-dom";

export default function Allergens() {
    const navigate = useNavigate();

    useEffect(() => {
        window.navigateToPage = navigate;

        class Allergen extends Phaser.Scene {
            erinScale = 1.1;
            itemScale = 1;
            guestScale = 0.8;
            textboxScale = 0.75;
            textFontSize = 70;
            markY = 750;

            welcomeTexts = [
"The nine common allergens are eggs, milk, fish, shellfish, wheat, peanuts, tree nuts, soybeans, and sesame.",

"It is important that you know how to read and understand allergen and ingredient information on food items, as some patrons may have allergies.",

"We are about to practice reading allergen labels that feature these allergens."

            ];

            instructions = [
                "In the following game, a patron will tell you an allergy they have. Based on their allergy, you will determine whether or not they can have the shown item.\n\nIf they can consume the item, place it in the check box. If they cannot, place it in the “X” box."
            ];

            transitions = [
                "Great job identifying the allergens! You have now completed Module 3: Interpreting Food Labels and Packaging. Click the arrow to return to the home screen."
            ];

            constructor() {
                super("AllergenScene");
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

                this.load.image("bar", bar);
                this.load.image("cookies", cookies);                
                this.load.image("crackers", crackers);                
                this.load.image("guest1", guest1);
                this.load.image("guest2", guest2);                
                this.load.image("guest3", guest3);                
                this.load.image("sauce", sauce);                
                this.load.image("seaweed", seaweed);                
                this.load.image("stock", stock);                
                this.load.image("yogurt", yogurt);
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
                            font: "70px Arial",
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

                    overlay.add([bg, text, close]);
                    overlay.setDepth(30);
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

                this.erinX = this.bg1.width / 2 - 150;
                this.erinY = this.bg1.height / 2;

                this.itemX = this.bg1.width / 2 - 100;
                this.itemY = this.bg1.height / 2 - 300;

                this.guestX = 420;
                this.guestY = 98;

                // Characters
                this.fish = this.add.image(this.itemX, this.itemY, "sauce")
                    .setDepth(20)
                    .setOrigin(0)
                    .setScale(this.itemScale)
                    .setVisible(false);

                this.shellfish = this.add.image(this.itemX, this.itemY, "stock")
                    .setDepth(20)
                    .setOrigin(0)
                    .setScale(this.itemScale)
                    .setVisible(false);

                this.nowheat = this.add.image(this.itemX, this.itemY, "bar")
                    .setDepth(20)
                    .setOrigin(0)
                    .setScale(this.itemScale)
                    .setVisible(false);

                this.sesame = this.add.image(this.itemX, this.itemY, "seaweed")                    
                    .setDepth(20)
                    .setOrigin(0)
                    .setScale(this.itemScale)
                    .setVisible(false);

                this.soy = this.add.image(this.itemX, this.itemY, "crackers")
                    .setDepth(20)
                    .setOrigin(0)
                    .setScale(this.itemScale)
                    .setVisible(false);

                this.nosesame = this.add.image(this.itemX, this.itemY, "sauce")
                    .setDepth(20)
                    .setOrigin(0)
                    .setScale(this.itemScale)
                    .setVisible(false);

                this.wheateggs = this.add.image(this.itemX, this.itemY, "cookies")
                    .setDepth(20)
                    .setOrigin(0)
                    .setScale(this.itemScale)
                    .setVisible(false);

                this.nuts = this.add.image(this.itemX, this.itemY, "bar")
                    .setDepth(20)
                    .setOrigin(0)
                    .setScale(this.itemScale)
                    .setVisible(false);

                this.milk = this.add.image(this.itemX, this.guestY, "yogurt")
                    .setDepth(20)
                    .setOrigin(0)
                    .setScale(this.itemScale)
                    .setVisible(false);

                this.guest1 = this.add.image(this.guestX, this.guestY, "guest1")
                .setDepth(21)
                .setOrigin(0)
                .setScale(this.guestScale)
                .setVisible(false);
                
                this.guest2 = this.add.image(this.guestX, this.guestY, "guest2")
                .setDepth(21)
                .setOrigin(0)
                .setScale(this.guestScale)
                .setVisible(false);

                this.guest3 = this.add.image(this.guestX, this.guestY, "guest3")
                .setDepth(21)
                .setOrigin(0)
                .setScale(this.guestScale)
                .setVisible(false);

                this.guest4 = this.add.image(this.guestX, this.guestY, "guest1")
                .setDepth(21)
                .setOrigin(0)
                .setScale(this.guestScale)
                .setVisible(false);

                this.guest5 = this.add.image(this.guestX, this.guestY, "guest2")
                .setDepth(21)
                .setOrigin(0)
                .setScale(this.guestScale)
                .setVisible(false);

                this.guest6 = this.add.image(this.guestX, this.guestY, "guest3")
                .setDepth(21)
                .setOrigin(0)
                .setScale(this.guestScale)
                .setVisible(false);

                this.guest7 = this.add.image(this.guestX, this.guestY, "guest1")
                .setDepth(21)
                .setOrigin(0)
                .setScale(this.guestScale)
                .setVisible(false);

                this.guest8 = this.add.image(this.guestX, this.guestY, "guest2")
                .setDepth(21)
                .setOrigin(0)
                .setScale(this.guestScale)
                .setVisible(false);

                this.guest9 = this.add.image(this.guestX, this.guestY, "guest3")
                .setDepth(21)
                .setOrigin(0)
                .setScale(this.guestScale)
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
                    1300 * 1.25,
                    175 * 4.35,
                    "next"
                )
                    .setOrigin(0)
                    .setScale(0.35)
                    .setInteractive()
                    .setVisible(true);

               

                this.textboxErin = this.add.container(this.bg1.width / 2 - 640, 50);

                this.textboxErinImage = this.add.image(0, 0, "erinText").setOrigin(0);

                this.textboxErin.setSize(this.textboxErinImage.width, this.textboxErinImage.height);
                this.textboxErin.add(this.textboxErinImage);
                this.textboxErin.setScale(this.textboxScale);
                this.textboxErinImage.setVisible(false);

                this.erin = this.add.image(this.erinX, this.erinY, "healthy")
                    .setOrigin(0)
                    .setScale(this.erinScale)
                    .setVisible(true);

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

                this.typewriteText("In this section, we will look at the nine common allergens.");

                this.textbox.setSize(this.textboxImage.width, this.textboxImage.height);
                this.textbox.add([this.textboxImage, this.textboxText]);
                this.textbox.setScale(this.textboxScale);

                 // Scenario logic
                this.volunteerScenario = [
                    {
                        question: "I’m allergic to fish. Is it ok for me to eat this?",
                        correctAnswer: "no",
                        popup: "Fish is one of the listed ingredients, so the patron should not be given this item.",
                        damageType: this.fish,
                        person: this.guest1
                    },
                    {
                        question: "I’m allergic to shellfish. Is it ok for me to eat this?",
                        correctAnswer: "no",
                        popup: "The “may contain” statement lists shellfish. It is possible for the patron to have an allergic reaction to the item, so they should not be given it.",
                        damageType: this.shellfish,                        
                        person: this.guest2

                    },
                    {
                        question: "I’m allergic to wheat. Is it ok for me to eat this?",
                        correctAnswer: "yes",
                        popup: "Wheat is not one of the listed ingredients. It is also not listed in the “may contain” statement. The patron can safely have this item. ",
                        damageType: this.nowheat,                        
                        person: this.guest3

                    },
                    {
                        question: "I’m allergic to sesame. Is it ok for me to eat this?",
                        correctAnswer: "no",
                        popup: "Sesame oil is one of the listed ingredients, so the patron should not be given this item.",
                        damageType: this.sesame,
                        person: this.guest4
                    },
                    {
                        question: "I’m allergic to soy. Is it ok for me to eat this?",
                        correctAnswer: "no",
                        popup: "Soybeans is one of the listed ingredients, so the patron should not be given this item.",
                        damageType: this.soy,
                        person: this.guest5
                    },
                    {
                        question: "I’m allergic to sesame. Is it ok for me to eat this?",
                        correctAnswer: "yes",
                        popup: "Sesame is not one of the listed ingredients. It is also not in the “may contain” statement. The patron can safely have this item.",
                        damageType: this.nosesame,
                        person: this.guest6
                    },
                    {
                        question: "I’m allergic to wheat and eggs. Is it ok for me to eat this?",
                        correctAnswer: "no",
                        popup: "Wheat and eggs are both listed ingredients, so the patron should not be given this item.",
                        damageType: this.wheateggs,
                        person: this.guest7
                    },
                    {
                        question: "I’m allergic to tree nuts and peanuts. Is it ok for me to eat this?",
                        correctAnswer: "no",
                        popup: "Cashews is one of the listed ingredients and the “may contain” statement lists peanuts, so the patron should not be given the item.",
                        damageType: this.nuts,
                        person: this.guest8
                    },
                    {
                        question: "I’m allergic to milk. Is it ok for me to eat this?",
                        correctAnswer: "no",
                        popup: "Milk is one of the listed ingredients, so the patron should not be given this item.",
                        damageType: this.milk,
                        person: this.guest9
                    },
                ];
                
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
                        this.erin.setVisible(false);
                        this.textbox.setVisible(false);
                        this.textboxText = this.add.text(this.textboxErinImage.width * 0.47, this.textboxErinImage.height * 0.22, "", {
                            font: "54px Arial",
                            color: "#000000",
                            wordWrap: {
                                // change the value to adjust how close the text gets to the edge of the box
                                width: this.textboxErinImage.width * 0.42
                            }
                        }).setOrigin(0).setDepth(21);
                        this.textboxErinImage.setVisible(true);
                        this.textboxErinImage.setDepth(18);
                        this.textboxErin.setScale(this.textboxScale);
                        this.cycleScenarios();

                    } else {
                        window.navigateToPage("/map");
                    }
                });

            }

            typewriteText(text, type, speed = 1) {
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
                    console.log(this.volunteerScenario);
                        this.typewriteText(this.volunteerScenario[0].question);
                        this.volunteerScenario[0].person.setVisible(true);
                        //this.volunteerScenario[this.volunteerScenario.length - 1].damageType.setVisible(false);
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
                    this.volunteerScenario[0].person.destroy();
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
            scene: [Allergen],
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