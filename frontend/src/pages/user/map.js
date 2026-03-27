import { useNavigate} from "react-router-dom";
import React, { useEffect } from "react";
import map from "../../assets/map.png";
import "./map.css";
import Phaser from "phaser";

function Map() {

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
                    window.navigateToPage("/module1/symptoms");
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
        </div>
    );
}

export default Map;