import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

import AnimationTracker from "../../threejsCode/utils/AnimationTracker";
import Application from "../../threejsCode/Application";

const clamp01 = (v) => Math.max(0, Math.min(1, v));

const getYearForT = (t) => {
    if (t < 0.25) return "2022";
    if (t < 0.5) return "2023";
    if (t < 0.75) return "2024";
    return "2025";
};

const TimelineLineSVG = ({ setAnimation, setCurrentTImelineYear }) => {
    const root = useRef(null);
    const linePathRef = useRef(null);
    const ballGroupRef = useRef(null);
    const labelRef = useRef(null);

    const PATH_DATA = `M 0 300 C 129.3333 300 221 267 389 265 C 574 272 705 367 895 363 C 1013 356 1026 315 1358 300`;

    useLayoutEffect(() => {
        const line = linePathRef.current;
        const group = ballGroupRef.current;
        const labelEl = labelRef.current;
        if (!line || !group || !setAnimation) return;

        const animationTracker = AnimationTracker.getInstance();
        const application = Application.getInstance();

        const ctx = gsap.context(() => {
            const length = line.getTotalLength();
            const state = { t: 0 };
            let lastYear = "";

            const updateLabel = (t) => {
                const year = getYearForT(t);
                if (year !== lastYear) {
                    labelEl.textContent = year;
                    lastYear = year;
                    setCurrentTImelineYear(year);
                }
            };

            const setBallAtT = (t) => {
                const tt = clamp01(t);
                const p = line.getPointAtLength(tt * length);

                // Move the entire group
                gsap.set(group, {
                    attr: { transform: `translate(${p.x}, ${p.y})` }
                });

                updateLabel(tt);
            };

            // Initial position
            setBallAtT(0);
            gsap.set(group, { opacity: 1 });

            const tl = gsap.timeline({ paused: true });

            tl.to(state, {
                t: 1,
                duration: 1,
                ease: "none",
                onUpdate: () => setBallAtT(state.t),
            });

            tl.fromTo(group, { opacity: 0 }, { opacity: 1, duration: 0.05, ease: "none" }, 0);

            // Fade out near end
            tl.to(group, { opacity: 0, duration: 0.05, ease: "none" }, 0.95);

            const onTick = () => {
                const p = clamp01(animationTracker.animationEvents["TIMELINE"] ?? 0);
                tl.progress(p);
            };

            application.time.events.on("tick", onTick);
        }, root);

        return () => ctx.revert();
    }, [setAnimation, setCurrentTImelineYear]);

    return (
        <svg
            ref={root}
            className="absolute top-0 left-0 w-screen min-h-dvh timeline-lineindicator z-3"
            viewBox="0 0 1358 600"
            preserveAspectRatio="none"
            aria-hidden="true"
        >
            <defs>
                <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="0.5">
                    <stop offset="0%" stopColor="#a3a380" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#a3a380" stopOpacity="1" />
                </linearGradient>
            </defs>

            <path
                d={`${PATH_DATA} L 1358 600 L 0 600 Z`}
                fill="url(#areaFill)"
            />

            <path
                ref={linePathRef}
                fill="none"
                d={PATH_DATA}
                stroke="rgba(0, 0, 0, 0)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* BALL + TEXT GROUP */}
            <g ref={ballGroupRef} opacity="0">
                <circle
                    r="6"
                    fill="#000"
                />

                <foreignObject
                    x="-60"
                    y="0"
                    width="120"
                    height="50"
                >
                    <div className="flex justify-center items-start w-full h-full">
                        <div
                            className="timeline-year-text w-full flex-center text-center h-full bg-black/0 text-[#432818] text-xl font-NecoM font-semibold px-3 py-1 rounded-full"
                            ref={labelRef}
                            textcontent={'2024'}
                        />
                    </div>
                </foreignObject>
            </g>
        </svg>
    );
};

export default TimelineLineSVG;
