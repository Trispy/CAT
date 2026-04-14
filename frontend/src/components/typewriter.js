import { useEffect, useState, useRef } from "react";

// Corey's Version
/*function useTypewriter(text, speed = 30) {
    this.textboxText.setText("");
    this.isTyping = true;
    this.next.disableInteractive();

    let i = 0;
    this.time.addEvent({
        delay: speed,
        repeat: text.length - 1,
        callback: () => {
            this.textboxText.text += text[i];
            i++;
            if (i === text.length) {
                this.isTyping = false;
                this.next.setInteractive();
            }
        }
    });
}*/

// Arisha's Version

function useTypewriter(text, isActive = true, speed = 50) { //this is the type writer that actually types the text out one character at a time. It takes in the text to display, whether it should be active, and the speed of typing.
    const [typedText, setTypedText] = useState("");
    
    useEffect(() => {
        if (!text || !isActive) return;

        
        setTypedText("");

        let i = 0;

        const interval = setInterval(() => {
            setTypedText(prev => {
                if (i >= text.length) {
                    clearInterval(interval);
                    return prev;
                }
                return prev + text[i++];
            });
        }, speed);

        return () => clearInterval(interval);

    }, [text, isActive, speed]);

    return typedText;
}

export default useTypewriter;