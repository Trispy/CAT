import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import map from "../../assets/map.png";
import "./map.css";
import Phaser from "phaser";
import menubutton from "../../assets/menubutton.png";
import Menu from "../../components/menu.js";

function Map() {
    const [m1, setm1] = useState(sessionStorage.getItem("m1"));
    const [m2, setm2] = useState(sessionStorage.getItem("m2"));
    const [showMenu, setShowMenu] = useState(false);
    console.log(m1);
    console.log(m2);

    const navigate = useNavigate();

    const goToModule1 = () => {
        navigate("/module1/symptoms");
    };
    const goToModule2 = () => {
        navigate("/module2/therm");
    }


    const createClickIndicator = (modulename) => {
        return (
            <div className="indicator">
                <div className="text">{modulename}</div>
                <div className="circle"></div>

            </div>
        );
    };
    useEffect(() => {
        window.navigateToPage = navigate;

        class MapScene extends Phaser.Scene {
            constructor() {
                super("MapScene");
            }
            preload() {
                this.load.image("mapbg", map);
            }
            create() {
                this.map = this.add.image(
                    this.scale.width / 2,
                    this.scale.height / 2,
                    "mapbg"
                );

                const scale = Math.min(
                    this.scale.width / this.map.width,
                    this.scale.height / this.map.height
                );

                this.map.setScale(scale);

                // MODULE 1 indicator
                const x = this.map.x - this.map.displayWidth / 2 + this.map.displayWidth * 0.12;
                const y = this.map.y - this.map.displayHeight / 2 + this.map.displayHeight * 0.4;
                const mod1 = this.add.circle(x, y, 50, 0xfff600);
                this.tweens.add({
                    targets: mod1,
                    alpha: 0.2,
                    duration: 500,
                    yoyo: true,
                    repeat: -1
                });

                mod1.setInteractive();
                mod1.on("pointerdown", () => {
                    window.navigateToPage("/module1");
                });

                // MODULE 2 indicator
                const x1 = this.map.x - this.map.displayWidth / 2 + this.map.displayWidth * 0.53;
                const y1 = this.map.y - this.map.displayHeight / 2 + this.map.displayHeight * 0.4;
                const mod2 = this.add.circle(x1, y1, 50, 0xfff600);
                this.tweens.add({
                    targets: mod2,
                    alpha: 0.2,
                    duration: 500,
                    yoyo: true,
                    repeat: -1
                });

                mod2.setInteractive();
                mod2.on("pointerdown", () => {
                    window.navigateToPage("/module2/therm");
                });
            }

        }
        const config = {
            type: Phaser.AUTO,
            transparent: true,
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
            scene: [MapScene],
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
             <img
            src={menubutton}
            alt="menu"
            onClick={() => setShowMenu(true)}
            style={{
                position: "absolute",
                top: "0px",
                right: "90px",
                width: "250px",
                cursor: "pointer",
                zIndex: 10
            }}
        />

     
        {showMenu && (
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    height: "100%",
                    zIndex: 20
                }}
            >
                <Menu />

           
                <div
                    onClick={() => setShowMenu(false)}
                    style={{
                        position: "absolute",
                        top: "20px",
                        right: "20px",
                        fontSize: "40px",
                        color: "white",
                        cursor: "pointer",
                        zIndex: 30
                    }}
                >
                    ✖
                </div>
            </div>
        )}

            
        </div>
        
    );
}

export default Map;