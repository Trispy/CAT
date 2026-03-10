import { useEffect } from "react";
import Phaser from "phaser";


export default function Cooking() {
  useEffect(() => {
    class Cooking extends Phaser.Scene {
        constructor() {
        super("CookingScene");
      }

      preload() {
      }

      create (){  
      }

typewriteText(text, speed = 5) {
  this.textboxText.setText("");
  this.isTyping = true;
  let i = 0;
  this.time.addEvent({
    delay: speed,
    repeat: text.length - 1,
    callback: () => {
      this.textboxText.text += text[i];
      i++;
      if (i === text.length) {
        this.isTyping = false;
      }
    }
  });
}

    }

const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  parent: "phaser-game",
  scene: [Cooking],
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