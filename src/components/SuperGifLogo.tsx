import { useEffect, useRef } from 'react';
import { drawSuperGifLogo } from '@/utils/characterAnimations';

export const SuperGifLogo = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const frameRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        canvas.width = 220;  // Increased width
        canvas.height = 60;

        let animationFrame: number;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawSuperGifLogo(ctx, canvas.width / 2, canvas.height / 2, frameRef.current);
            frameRef.current++;
            animationFrame = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                width: '220px',
                height: '60px',
                display: 'inline-block',
                verticalAlign: 'middle',
                marginRight: '8px',
                marginBottom: '8px'
            }}
        />
    );
};
