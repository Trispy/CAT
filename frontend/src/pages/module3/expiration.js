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
import { useNavigate } from "react-router-dom";
import babyfood from "../../assets/M3G2/babyfood.png"; 
import beefexpired from "../../assets/M3G2/beefexpired.png"; 
import chickenexpired from "../../assets/M3G2/chickenexpired.png"; 
import greens from "../../assets/M3G2/greens.png"; 
import infantformula from "../../assets/M3G2/infantformua.png"; 
import pasta from "../../assets/M3G2/pasta.png";
import peanutbutter from "../../assets/M3G2/peanutbutter.png"; 
import salad from "../../assets/M3G2/salad.png"; 
import saltinecrackers from "../../assets/M3G2/saltinecrackers.png"; 
import soup from "../../assets/M3G2/soup.png"; 
import spoiledgreens from "../../assets/M3G2/spoiledgreens.png"; 

export default function Expiration() {
    const navigate = useNavigate();

    useEffect(() => {
        window.navigateToPage = navigate;

        class ExpirationScene extends Phaser.Scene {
            erinX = 1300;
            erinY = 175;
            erinScale = 1.1;
            textboxScale = 0.75;
            textFontSize = 70;
            markY = 750;

            welcomeTexts = [
                "In this module, you will learn when to dispose of foods based on expiration dates, sell by dates, and best by dates",
                "You will only work with expiration dates and best by dates in this module. Sell by dates are for stores to know when to put an item out."
            ];

            instructions = [
                "In the following game, the volunteer will sort items based on whether or not the item should be disposed of based on the expiration date or best by date.\n\nIf the item should be discarded, drag the item to the box with the X. If it is good to be used, drag it to the box with the check.",
                "In this module, we will following the following rules for expiration dates and best by dates: ",
                "Items with expiraton dates should be disposed of if the date is even one more day after the expiration date. Expiration date is a hard deadline.",
                "For best by date, we will use a specific rule but many food banks use a different rule, so remember to consult your supervisor on the rules.",
                "For this module, items with best buy dates should be disposed of if the date is 6 months after the expiration date."
                
            ];

            transitions = [
                "As a volunteer, you will may be hands on with all sorts of food products. While understanding when a package is good to use is important, it is equally as important to ask a supervisor if you have any questions, or aren't sure whether a package or can is bad."
            ];

            constructor() {
                super("CanScene");
            }

            preload() {
                this.load.image("bg1", bg1);
                this.load.image("check", check);
                this.load.image("x", xMark);
                this.load.image("textbox", textbox);
                this.load.image("erinText", erinText);
                this.load.image("next", next);
                this.load.image("babyfood", babyfood); 
                this.load.image("beefexpired", beefexpired); 
                this.load.image("chickenexpired", chickenexpired); 
                this.load.image("greens", greens); 
                this.load.image("infantformula", infantformula); 
                this.load.image("pasta", pasta); 
                this.load.image("peanutbutter", peanutbutter); 
                this.load.image("salad", salad); 
                this.load.image("saltinecrackers", saltinecrackers); 
                this.load.image("soup", soup); 
                this.load.image("spoiledgreens", spoiledgreens); 
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
                    this.popupOpen = false;

                    // Enable dragging after the date is read
                    this.input.setDraggable(this.currentSprite);
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
                this.babyfood = this.add.image(this.canX, this.canY, "babyfood")
                    .setOrigin(0)
                    .setScale(this.erinScale)
                    .setVisible(false);

                this.beefexpired = this.add.image(this.canX, this.canY, "beefexpired")
                    .setOrigin(0)
                    .setScale(this.erinScale)
                    .setVisible(false);

                this.chickenexpired = this.add.image(this.canX, this.canY, "chickenexpired")
                    .setOrigin(0)
                    .setScale(this.erinScale)
                    .setVisible(false);

                this.greens = this.add.image(this.canX, this.canY, "greens")
                    .setOrigin(0)
                    .setScale(this.erinScale)
                    .setVisible(false);

                this.infantformula = this.add.image(this.canX, this.canY, "infantformula")
                    .setOrigin(0)
                    .setScale(this.erinScale)
                    .setVisible(false);

                this.pasta = this.add.image(this.canX, this.canY, "pasta")
                    .setOrigin(0)
                    .setScale(this.erinScale)
                    .setVisible(false);

                this.peanutbutter = this.add.image(this.canX, this.canY, "peanutbutter")
                    .setOrigin(0)
                    .setScale(this.erinScale)
                    .setVisible(false);

                this.salad = this.add.image(this.canX, this.canY, "salad")
                    .setOrigin(0)
                    .setScale(this.erinScale)
                    .setVisible(false);

                this.saltinecrackers = this.add.image(this.canX, this.canY, "saltinecrackers")
                    .setOrigin(0)
                    .setScale(this.erinScale)
                    .setVisible(false);
                this.soup = this.add.image(this.canX, this.canY, "soup")
                    .setOrigin(0)
                    .setScale(this.erinScale)
                    .setVisible(false);
                this.spoiledgreens = this.add.image(this.canX, this.canY, "spoiledgreens")
                    .setOrigin(0)
                    .setScale(this.erinScale)
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
                    this.erinY * 4.35,
                    "next"
                )
                    .setOrigin(0)
                    .setScale(0.35)
                    .setInteractive()
                    .setVisible(true);
                this.input.on("gameobjectdown", (pointer, gameObject) => {
                    if (this.popupOpen) return;

                    if (gameObject !== this.currentSprite) return;

                    this.popupOpen = true;

                    this.showPopup(`${this.currentItem.label}\n\nClick X to close`);
                });
                this.currentIndex = 0;
                this.currentItem = null;
                this.popupOpen = false;
                // Scenario logic
                this.foodItems = [
                    {
                        key: "babyfood",
                        label: "Expiration Date: March 20, 2026",
                        type: "expiration",
                        correct: "dispose",
                        reason: "8 days past expiration"
                    },
                    {
                        key: "infantformula",
                        label: "Use By: March 15, 2026",
                        type: "expiration",
                        correct: "dispose",
                        reason: "Expired"
                    },
                    {
                        key: "chickenexpired",
                        label: "Use By: March 27, 2026",
                        type: "expiration",
                        correct: "dispose",
                        reason: "1 day past"
                    },
                    {
                        key: "beefexpired",
                        label: "Use By: March 30, 2026",
                        type: "expiration",
                        correct: "keep",
                        reason: "Still valid"
                    },
                    {
                        key: "salad",
                        label: "Use By: March 29, 2026",
                        type: "expiration",
                        correct: "keep",
                        reason: "Valid today"
                    },
                    {
                        key: "greens",
                        label: "Best By: August 2025",
                        type: "bestby",
                        correct: "dispose",
                        reason: "7+ months past"
                    },
                    {
                        key: "saltinecrackers",
                        label: "Best By: January 2026 (mold present)",
                        type: "bestby",
                        correct: "dispose",
                        reason: "Mold present"
                    },
                    {
                        key: "peanutbutter",
                        label: "Best By: February 2025",
                        type: "bestby",
                        correct: "dispose",
                        reason: "Over 1 year past"
                    },
                    {
                        key: "pasta",
                        label: "Best By: November 2025",
                        type: "bestby",
                        correct: "keep",
                        reason: "~4 months past"
                    },
                    {
                        key: "soup",
                        label: "Best By: October 2025",
                        type: "bestby",
                        correct: "keep",
                        reason: "~5 months past, can intact"
                    }
                ];
                                this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
                    gameObject.x = dragX;
                    gameObject.y = dragY;
                });

                this.input.on("dragend", (pointer, gameObject) => {
                    if (!this.currentSprite) return;

                    const itemBounds = gameObject.getBounds();
                    const checkBounds = this.check.getBounds();
                    const xBounds = this.xMark.getBounds();

                    if (Phaser.Geom.Intersects.RectangleToRectangle(itemBounds, checkBounds)) {
                        this.handleFoodAnswer(this.check);
                    } else if (Phaser.Geom.Intersects.RectangleToRectangle(itemBounds, xBounds)) {
                        this.handleFoodAnswer(this.xMark);
                    }
                });
                this.textboxErin = this.add.container(this.bg1.width / 2 - 640, 50);

                this.textboxErinImage = this.add.image(0, 0, "erinText").setOrigin(0);

                this.textboxErin.setSize(this.textboxErinImage.width, this.textboxErinImage.height);
                this.textboxErin.add(this.textboxErinImage);
                this.textboxErin.setScale(this.textboxScale);
                this.textboxErinImage.setVisible(false);

                

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
                        this.typewriteText(this.welcomeTexts.shift());
                    } else if (this.instructions.length > 0) {
                        this.textbox.setScale(1.05);
                        this.textboxText.setFontSize(50);
                        this.typewriteText(this.instructions.shift());
                    } else {
                        // START GAME
                        this.textbox.setVisible(false);
                        this.textboxErinImage.setVisible(false);

                        this.loadNextItem();
                        this.next.setVisible(false);
                    }
                });
                this.loadNextItem();

            }
            loadNextItem() {
                if (this.currentIndex >= this.foodItems.length) {
                    this.typewriteText("All items sorted!");
                    this.xMark.setVisible(false);
                    this.check.setVisible(false);
                    return;
                }

                const item = this.foodItems[this.currentIndex];
                this.currentItem = item;

                // hide all the sprites at first
                Object.values(this).forEach(obj => {
                    if (obj?.texture?.key && this.foodItems.some(f => f.key === obj.texture.key)) {
                        obj.setVisible(false);
                    }
                });

                const sprite = this[item.key];
                this.currentSprite = sprite;

                sprite.setVisible(true);
                sprite.setInteractive({ useHandCursor: true });

                this.input.setDraggable(sprite, false); // popup must be viewed before you can drag the sprite

                this.xMark.setVisible(true);
                this.check.setVisible(true);
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
                                this.handleFoodAnswer(this.check);
                            }
                            else if (Phaser.Geom.Intersects.RectangleToRectangle(itemBounds, xBounds)) {
                                this.handleFoodAnswer(this.xMark);
                            }
                        });
                };

            handleFoodAnswer(button) {
                const correct =
                    (this.currentItem.correct === "dispose" && button === this.xMark) ||
                    (this.currentItem.correct === "keep" && button === this.check);

                if (correct) {
                    this.typewriteText(`Correct!\n${this.currentItem.reason}`, "popup");
                    this.currentSprite.destroy();

                    this.currentIndex++;
                    this.loadNextItem();
                } else {
                    this.typewriteText(`Incorrect!\n${this.currentItem.reason}`, "popup");

                    if (button === this.xMark) {
                        this.check.preFX.addShine(1, 0.5, 5);
                    } else {
                        this.xMark.preFX.addShine(1, 0.5, 5);
                    }
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
            scene: [ExpirationScene],
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