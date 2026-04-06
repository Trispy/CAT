import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import map from "../../assets/Maprenovated.png";
import "./map.css";
import Phaser from "phaser";
import menubutton from "../../assets/menubutton.png";
import Menu from "../../components/menu.js";

function Map() {
    const [showMenu, setShowMenu] = useState(false);
    const [summary, setSummary] = useState([]);

    const navigate = useNavigate();

    // fetch module summary
    useEffect(() => {
        const token = localStorage.getItem("token");

        fetch("http://localhost:3001/api/game/moduleSummary", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                if (!res.ok) throw new Error("Auth failed");
                return res.json();
                console.log("RESPONSE:", res);
            })
            .then(data => setSummary(data))
            .catch(err => console.error("FETCH ERROR:", err));
    }, []);

    // phaser
    useEffect(() => {
        if (!summary) return;

        const isModule2Done =
            summary.module2?.module2part1 &&
            summary.module2?.chopping &&
            summary.module2?.cooking;
        const isModule3Done =
            summary.module3?.module3part1 &&
            summary.module3?.module3part2 &&
            summary.module3?.module3part3;
        const isModule4Done =
            summary.module4?.module4part1 &&
            summary.module4?.module4part2 &&
            summary.module4?.module4part3;
        const isModule5Done =
            summary.module5?.module5part1 &&
            summary.module5?.module5part2 &&
            summary.module5?.module5part3;
        const isModule6Done =
            summary.module6?.module6part1 &&
            summary.module6?.module6part2 &&
            summary.module6?.module6part3;
        

        const unlocked = {
            module1: true,
            module2: summary.finished_m1,
            module3: isModule2Done, 
            module4: isModule3Done,
            module5: isModule4Done,
            module6: isModule5Done
        };

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

               
                const x = this.map.x - this.map.displayWidth / 2 + this.map.displayWidth * 0.12;
                const y = this.map.y - this.map.displayHeight / 2 + this.map.displayHeight * 0.4;

                if (unlocked.module1) {
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
                }

                // mod 2
                const x1 = this.map.x - this.map.displayWidth / 2 + this.map.displayWidth * 0.53;
                const y1 = this.map.y - this.map.displayHeight / 2 + this.map.displayHeight * 0.4;

                if (unlocked.module2) {
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
                        window.navigateToPage("/module2");
                    });
                }

                // mod 3
                const x2 = this.map.x - this.map.displayWidth / 2 + this.map.displayWidth * 0.85;
                const y2 = this.map.y - this.map.displayHeight / 2 + this.map.displayHeight * 0.4;

                if (unlocked.module3) {
                    const mod3 = this.add.circle(x2, y2, 50, 0xfff600);

                    this.tweens.add({
                        targets: mod3,
                        alpha: 0.2,
                        duration: 500,
                        yoyo: true,
                        repeat: -1
                    });

                    mod3.setInteractive();
                    mod3.on("pointerdown", () => {
                        window.navigateToPage("/module3");
                    });
                }
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

    }, [summary, navigate]);

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
                    right: "150px",
                    width: "100px",
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
                        zIndex: 20,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Menu />

                    <div
                        onClick={() => setShowMenu(false)}
                        style={{
                            position: "absolute",
                            top: "2px",
                            right: "120px",
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