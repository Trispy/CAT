import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import map from "../../assets/Maprenovated.png";
import "./map.css";
import Phaser from "phaser";
import menubutton from "../../assets/menubutton.png";
import Menu from "../../components/menu.js";
import Settings from "../../components/settings";
const API = process.env.REACT_APP_API_URL;
function Map({ openMenu }) {
    const [showMenu, setShowMenu] = useState(false);
    const [summary, setSummary] = useState([]);

    const navigate = useNavigate();

    // fetch module summary
    useEffect(() => {
  let isMounted = true;

  const fetchSummary = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API}/api/game/moduleSummary`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-cache"
        }
      });

      if (!res.ok) throw new Error("Auth failed");

      const data = await res.json();

      if (isMounted) {
        setSummary(data);
      }
    } catch (err) {
      console.error("FETCH ERROR:", err);
    }
  };

  // initial load
  fetchSummary();


  window.addEventListener("focus", fetchSummary);


  return () => {
    isMounted = false;
    window.removeEventListener("focus", fetchSummary);
  };
}, []);

    // phaser
    useEffect(() => {
        if (!summary) return;

        const isModule2Done =
            summary.finished_m1;
        const isModule3Done =
            summary.finished_m1 && 
            summary.finished_m2; 
        const isModule4Done =
            summary.finished_m1 && 
            summary.finished_m2; 
        const isModule5Done =
            summary.finished_m1 && 
            summary.finished_m2
        const isModule6Done =
            summary.finished_m1 && 
            summary.finished_m2
        

        const unlocked = {
            module1: true,
            module2: isModule2Done,
            module3: isModule3Done, 
            module4: isModule4Done,
            module5: isModule5Done,
            module6: isModule6Done
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
                // mod 4
                const x4 = this.map.x - this.map.displayWidth / 2 + this.map.displayWidth * 0.67;
                const y4 = this.map.y - this.map.displayHeight / 2 + this.map.displayHeight * 0.70;

                if (unlocked.module4) {
                    const mod4 = this.add.circle(x4, y4, 50, 0xfff600);

                    this.tweens.add({
                        targets: mod4,
                        alpha: 0.2,
                        duration: 500,
                        yoyo: true,
                        repeat: -1
                    });

                    mod4.setInteractive();
                    mod4.on("pointerdown", () => {
                        window.navigateToPage("/module4/toteCleaning");
                    });
                }
                // mod 5
                const x5 = this.map.x - this.map.displayWidth / 2 + this.map.displayWidth * 0.40;
                const y5 = this.map.y - this.map.displayHeight / 2 + this.map.displayHeight * 0.70;

                if (unlocked.module5) {
                    const mod5 = this.add.circle(x5, y5, 50, 0xfff600);

                    this.tweens.add({
                        targets: mod5,
                        alpha: 0.2,
                        duration: 500,
                        yoyo: true,
                        repeat: -1
                    });

                    mod5.setInteractive();
                    mod5.on("pointerdown", () => {
                        window.navigateToPage("/module5/coldPreparedTransport");
                    });
                }
                // mod 6
                const x6 = this.map.x - this.map.displayWidth / 2 + this.map.displayWidth * 0.10;
                const y6 = this.map.y - this.map.displayHeight / 2 + this.map.displayHeight * 0.70;

                if (unlocked.module6) {
                    const mod6 = this.add.circle(x6, y6, 50, 0xfff600);

                    this.tweens.add({
                        targets: mod6,
                        alpha: 0.2,
                        duration: 500,
                        yoyo: true,
                        repeat: -1
                    });

                    mod6.setInteractive();
                    mod6.on("pointerdown", () => {
                        window.navigateToPage("/module6/foodServiceSetUp");
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
            
            <div
                  style={{
                    position: "absolute",
                    top: "4px",
                    right: "110px",
                    width: "100px",
                    zIndex: 10
                  }}
                >
                  <Settings openMenu={openMenu}/>
                </div>

            
        </div>
    );
}

export default Map;