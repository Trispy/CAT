import { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import StartGame from './game/main';
import { EventBus } from './game/EventBus';

export const PhaserGame = forwardRef(function PhaserGame({ currentActiveScene }, ref) {

    const game = useRef();
    const containerRef = useRef(null);

    useLayoutEffect(() => {

        if (!game.current) {
            game.current = StartGame(containerRef.current);

            if (ref) {
                ref.current = { game: game.current, scene: null };
            }
        }

        return () => {
            if (game.current) {
                game.current.destroy(true);
                game.current = undefined;
            }
        };

    }, []);

    useEffect(() => {

        const handler = (currentScene) => {
            if (typeof currentActiveScene === 'function') {
                currentActiveScene(currentScene);
            }
            if (ref?.current) {
                ref.current.scene = currentScene;
            }
        };

        EventBus.on('current-scene-ready', handler);

        return () => {
            EventBus.off('current-scene-ready', handler);
        };

    }, [currentActiveScene]);

    return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;

});