import React, { useLayoutEffect, useRef, useState } from "react";

import gsap from "gsap";

import "../../styles/mathematics.css";

import Application from "../../threejsCode/Application";

const text = "MATHEMATICS • MATHEMATICS • MATHEMATICS • MATHEMATICS • ";

const HoverAnimation = () => {
    const ringRef = useRef(null);
    const containerRef = useRef(null);
    const mathematicsCanvasRef = useRef(null);
    const introAnimationCompleted = useRef(false);

    const canvasRef = useRef(null);
    const [introPage, setIntroPage] = useState(false);

    const chars = text.split("");

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // initial states
            gsap.set(containerRef.current, { "--radius": "400px" });
            gsap.set(".mathematics .title .loading-text", { "--wipe": "0%" });

            gsap.set(".mathematics .title .enter-text", { rotateX: -90 })

            const tl = gsap.timeline();

            tl.to(containerRef.current, {
                "--radius": "200px",
                duration: 1,
                ease: "power2.out",
            });

            tl.to(".mathematics .title .loading-text", {
                "--wipe": "100%",
                duration: 1,
                ease: "none",

                onComplete: () => {
                    tl.to('.mathematics .title .loading-text', {
                        '--opacity': 0,
                        opacity: 0,
                        rotateX: 90,
                        duration: 1,
                    }).to('.mathematics .title .enter-text', {
                        opacity: 1,
                        rotateX: 0,
                        duration: 1,
                        onComplete: () => { introAnimationCompleted.current = true }
                    }, "<")
                }
            }, 0.2);

            // keep ring spinning
            gsap.to(ringRef.current, {
                rotation: 360,
                duration: 10,
                ease: "none",
                repeat: -1,
                transformOrigin: "50% 50%",
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    useLayoutEffect(() => {
        if (!introPage) return;

        gsap.to(
            ".intro-container",
            {
                opacity: 0,
                duration: 1,
                onComplete: () => { document.querySelector('.mathematics .intro-container').classList.add('hidden') },
            },
        );

        gsap.to('.canvas-container', {
            opacity: 1,
            duration: 0.5,

            onComplete: () => { 
                document.querySelector('.mathematics').classList.add('relative'); 
                document.querySelector('.mathematics').classList.remove('fixed');
            }
        }, ">")

        gsap.to(document.body, {
            backgroundColor: '#181818',
            duration: 1,
        })

    }, [introPage])

    useLayoutEffect(() => {
        if (!mathematicsCanvasRef || canvasRef.current) return;

        canvasRef.current = Application.getInstance();

        canvasRef.current.createMathsPage({
            $canvas: mathematicsCanvasRef.current,
        })
    }, [])

    return (
        <div
            ref={containerRef}
            className="mathematics fixed w-screen min-h-screen top-0 left-0 z-[1000] flex-col items-center justify-center"
        >
            <div className="intro-container z-1" onClick={() => { if (introAnimationCompleted.current === true) setIntroPage(true) }}>
                <div ref={ringRef} className="spin-text relative w-[600px] h-[600px] text-white">
                    {chars.map((char, i) => {
                        const angle = (360 / chars.length) * i;

                        return (
                            <span
                                key={i}
                                className="char absolute left-1/2 top-1/2 text-lg font-semibold"
                                style={{ "--angle": `${angle}deg` }}
                            >
                                {char}
                            </span>
                        );
                    })}
                </div>

                <div className="title">
                    <h1 className="loading-text">Loading...</h1>
                    <h1 className="enter-text">Enter</h1>
                </div>
            </div>

            <div className="scroll-placeholder w-screen h-[400dvh] relative"></div>

            <div className="canvas-container fixed w-screen h-screen top-0 left-0 opacity-0">
                <canvas ref={mathematicsCanvasRef} className="absolute w-screen h-screen top-0 left-0 z-0" />
            </div>
        </div>
    );
};

export default HoverAnimation;