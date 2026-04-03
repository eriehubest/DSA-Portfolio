import React, {
    useLayoutEffect,
    useRef,
    useState,
} from "react";

import * as flubber from "flubber";

import gsap from "gsap";
import {
    ScrollTrigger,
    SplitText,
} from "gsap/all";
import { useGSAP } from "@gsap/react";

import ScreenScribble from "./HomeScribble";
import Application from "../../threejsCode/Application";
import AnimationTracker from "../../threejsCode/utils/AnimationTracker";
import TimelineLineSVG from "./TimelineSVG";
import Mathematics from "./Mathematics";
import ComputerScience from "./ComputerScience";

gsap.registerPlugin(
    ScrollTrigger,
    SplitText,
);

const animationTrack =
    AnimationTracker.getInstance();

const timelineEntries = [
    {
        year: "2022",
        topText:
            "I started developing an interest in Mathematics. That year I entered UKMT and discovered how much I enjoyed solving structured problems under pressure.",
        bottomText:
            "First serious exposure to competition mathematics and proof-style thinking.",
    },
    {
        year: "2023",
        topText:
            "I kept competing while starting to explore programming through Python. That was the point where algorithms began to feel like another form of problem solving.",
        bottomText:
            "Mathematical reasoning started connecting naturally with code.",
    },
    {
        year: "2024",
        topText:
            "I became deeply interested in frontend development and started building with JavaScript. I was drawn to how abstract ideas could become interactive systems.",
        bottomText:
            "From solving problems on paper to shaping interfaces on screen.",
    },
    {
        year: "2025",
        topText:
            "I took part in USACO, reached the Gold division, and received a distinction in AMC 12B. Those experiences reinforced both persistence and technical depth.",
        bottomText:
            "Competition work sharpened speed, clarity, and endurance.",
    },
];

const _achievementCards = [
    {
        id: "card1",
        title: "Competition Thinking",
        phase: "Foundation",
        year: "2022-2023",
        metric: "Problem Solving",
        metricValue: "Structured",
        summary:
            "The earliest stage was about learning how to stay patient inside difficult questions and move step by step instead of forcing answers.",
        tags: ["UKMT", "AMC", "Proof"],
        details: [
            "Built endurance through Olympiad-style mathematics and timed contests.",
            "Learned to break unfamiliar problems into smaller provable steps.",
            "Developed a habit of checking edge cases before trusting an answer.",
        ],
    },
    {
        id: "card2",
        title: "Technical Curiosity",
        phase: "Transition",
        year: "2024",
        metric: "Execution",
        metricValue: "Interactive",
        summary:
            "Programming became the place where mathematical habits started turning into visible systems, interfaces, and motion.",
        tags: ["JavaScript", "Frontend", "Animation"],
        details: [
            "Moved from simple scripting into frontend systems and animation-heavy interfaces.",
            "Became interested in how geometry, motion, and interaction shape understanding.",
            "Started using code as a medium for both logic and presentation.",
        ],
    },
    {
        id: "card3",
        title: "Current Direction",
        phase: "Now",
        year: "2025-Present",
        metric: "Focus",
        metricValue: "Systems",
        summary:
            "The current goal is to combine visual expression with technical rigor and make projects feel both precise and alive.",
        tags: ["Three.js", "GSAP", "Design"],
        details: [
            "Exploring the overlap between mathematical structure and software design.",
            "Interested in building systems that are visually expressive and technically rigorous.",
            "Using this portfolio as a space to test ideas, polish execution, and document growth.",
        ],
    },
];

const Home = ({
    setPagesLight,
    setCurrentPage,
    pagesLight,
}) => {
    const root = useRef(null);
    const [introAnimation] = useState(true);
    const [
        timelineAnimation,
        setTimelineAnimation,
    ] = useState(false);
    const [
        currentTimelineYear,
        setCurrentTImelineYear,
    ] = useState(null);
    const [
        mathematicsPage,
        setMathematicsPage
    ] = useState(false);
    const [
        computerSciencePage,
        setComputerSciencePage
    ] = useState(false);

    const canvasRef = useRef(null);
    const applicationRef = useRef(null);
    const timelineDirection = useRef(1);

    useLayoutEffect(() => {
        if (!canvasRef.current) return;

        if (applicationRef.current) return;

        applicationRef.current =
            Application.getInstance({
                $canvas: canvasRef.current,
            });
    }, [canvasRef]);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            // Intro Animation
            let heroDownSplitText =
                new SplitText(
                    ".transform-text",
                    {
                        type: "words",
                        wordsClass: "word",
                    },
                );

            gsap.set(".bgblackanimate", {
                // scaleX: 0,
                // scaleY: 0,
                width: 0,
                height: 0,
            });

            gsap.set(
                heroDownSplitText.words,
                { yPercent: 150 },
            );

            gsap.set(
                [
                    ".hero-eyebrow",
                    ".hero-chip",
                    ".hero-orbit",
                    ".scroll-cue",
                ],
                {
                    opacity: 0,
                    y: 24,
                },
            );

            gsap.set(".hero-glow", {
                opacity: 0,
                scale: 0.85,
            });

            const homeDom =
                document.querySelector(".home");

            if (!introAnimation) {
                document.body.classList.add(
                    "overflow-hidden",
                    "h-[100dvh]",
                );
                homeDom.classList.add(
                    "overflow-hidden",
                    "h-[100dvh]",
                );
                return;
            }

            applicationRef.current.HomeSetup({
                $canvas: canvasRef.current,
            })

            homeDom.classList.remove(
                "overflow-hidden",
                "h-[100dvh]",
            );

            const heroIntroTl = gsap.timeline({
                defaults: {
                    ease: "power3.out",
                },
                onComplete: () => {
                    document.body.classList.remove(
                        "overflow-hidden",
                        "h-[100dvh]",
                    );
                    ScrollTrigger.refresh();

                    gsap.to('.scrollbar-container', {
                        opacity: 1,
                        duration: 1,
                        ease: "power3.out",
                    });
                },
            });

            heroIntroTl
                .to(".hero-glow", {
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    ease: "power2.out",
                })
                .to(
                    ".hero-eyebrow",
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.45,
                    },
                    "<+=0.15",
                )
                .to(
                    heroDownSplitText.words,
                    {
                        yPercent: 0,
                        duration: 0.65,
                        stagger: 0.06,
                    },
                    "<+=0.1",
                )
                .to(
                    ".hero-divider",
                    {
                        opacity: 1,
                        y: 0,
                        scaleX: 1,
                        duration: 0.5,
                    },
                    "<+=0.1",
                )
                .to(
                    ".hero-orbit",
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        stagger: 0.12,
                    },
                    "-=0.25",
                )
                .to(
                    ".hero-chip",
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.45,
                        stagger: 0.08,
                    },
                    "-=0.25",
                )
                .to(
                    ".scroll-cue",
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.45,
                    },
                    "-=0.15",
                );

            gsap.to(".scroll-cue .cue-dot", {
                y: 16,
                repeat: -1,
                yoyo: true,
                duration: 0.9,
                ease: "sine.inOut",
                delay: 1.1,
            });

            gsap.timeline({
                scrollTrigger: {
                    trigger: ".hero",
                    start: "top top",
                    end: "35% top",
                    scrub: true,
                },
            }).to(
                ".hero-fade-item",
                {
                    opacity: 0,
                    y: -36,
                    ease: "none",
                    stagger: 0,
                },
                0,
            );

            gsap.timeline({
                scrollTrigger: {
                    trigger: ".hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: true,

                    onUpdate: (self) => {
                        animationTrack.updateEvent(
                            "HEROIN",
                            self.progress,
                        );
                    },
                },
            });

            // Scroll Timeline
            const journeytl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".journey",
                    start: "top top",
                    end: () =>
                        `+=${window.innerHeight * 6}`,
                    scrub: true,
                    pin: true,
                    pinSpacing: true,
                    onEnter: () => {
                        setPagesLight(true);
                    },
                    onLeave: () => {
                        setPagesLight(false);
                    },
                    onEnterBack: () => {
                        setPagesLight(true);
                    },
                    onLeaveBack: () => {
                        setPagesLight(false);
                    },

                    onUpdate: (self) => {
                        animationTrack.updateEvent(
                            "JOURNEYIN",
                            self.progress,
                        );
                    },
                },
            });

            let aboutTextSplit =
                new SplitText(".about-text", {
                    type: "words",
                    wordsClass: "word",
                });

            gsap.set(
                ".initiative-description",
                { opacity: 0 },
            );
            gsap.set(".initiative-title", {
                yPercent: 3,
                opacity: 0,
            });

            journeytl.to(
                ".bgblackanimate",
                {
                    // scaleX: 1,
                    // scaleY: 1,
                    width: "3000px",
                    height: "3000px",
                    duration: 0.3,
                },
                "<",
            );

            journeytl.to(
                {},
                { duration: 0.05 },
            );

            journeytl.to(
                aboutTextSplit.words,
                {
                    yPercent: -100,
                    opacity: 0,
                    duration: 0.1,
                    stagger: 0.01,
                    ease: "power2.out",
                },
            );

            journeytl
                .to(".initiative-title", {
                    yPercent: 0,
                    opacity: 1,
                    duration: 0.3,
                })
                .to(
                    ".initiative-description",
                    {
                        opacity: 1,
                        duration: 0.3,
                        ease: "power2.out",
                    },
                    "<",
                );

            // journeytl.to({}, {duration: 0.1})

            // journeytl.to('.initiative-col', { opacity: 0, xPercent: -80, duration: 0.2, ease: 'power2.inOut'})
            journeytl.to(
                {},
                { duration: 0.2 },
            );

            gsap.timeline({
                scrollTrigger: {
                    trigger: ".about",
                    start: "top bottom",
                    end: "top top",
                    scrub: true,
                    pinSpacer: true,
                    pinSpacing: true,

                    onUpdate: (self) => {
                        animationTrack.updateEvent(
                            "ABOUTIN",
                            self.progress,
                        );
                        timelineDirection.current =
                            self.direction;
                    },
                },
            });

            gsap.timeline({
                scrollTrigger: {
                    trigger: ".about",
                    start: "top top",
                    end: () =>
                        `+=${window.innerHeight * 4}`,
                    pin: true,
                    scrub: true,
                    pinSpacing: true,

                    onEnter: () =>
                        setCurrentPage("journey"),
                    onLeaveBack: () =>
                        setCurrentPage("home"),

                    onUpdate: (self) => {
                        animationTrack.updateEvent(
                            "TIMELINE",
                            self.progress,
                        );
                    },
                },
            });

            const cardsWrap =
                document.querySelector(
                    ".achievement-cards",
                );
            const cards = gsap.utils.toArray(
                ".achievement-cards .card",
            );

            if (cardsWrap && cards.length) {
                gsap.set(cardsWrap, {
                    perspective: 850,
                    transformStyle: "preserve-3d",
                });

                gsap.set(cards, {
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    xPercent: -50,
                    yPercent: -50,
                    transformStyle: "preserve-3d",
                    transformOrigin: "50% 100%",
                    willChange: "transform",
                });

                gsap.set("#card1", {
                    z: 0,
                    y: 0,
                });
                gsap.set("#card2", {
                    z: -5,
                    y: 20,
                });
                gsap.set("#card3", {
                    z: -10,
                    y: 40,
                });

                const achievementstl =
                    gsap.timeline({
                        scrollTrigger: {
                            trigger: ".achievements",
                            start: "top top",
                            end: () =>
                                `+=${window.innerHeight * 4}`,
                            pin: true,
                            pinSpacing: true,
                            scrub: true,
                            anticipatePin: 1,

                            onEnter: () =>
                                setCurrentPage(
                                    "achievements",
                                ),
                            onLeaveBack: () =>
                                setCurrentPage(
                                    "journey",
                                ),
                        },
                    });

                achievementstl.to(
                    {},
                    { duration: 0.15 },
                );

                achievementstl.to(
                    "#card1",
                    {
                        y: -1000,
                        z: 120,
                        rotationX: 25,
                        duration: 0.35,
                        ease: "power2.inOut",
                    },
                    "step1",
                );

                achievementstl.to(
                    "#card2",
                    {
                        y: 0,
                        z: 0,
                        rotationX: 0,
                        duration: 0.35,
                        ease: "power2.inOut",
                    },
                    "step1",
                );

                achievementstl.to(
                    {},
                    { duration: 0.15 },
                );

                achievementstl.to(
                    "#card2",
                    {
                        y: -1000,
                        z: 120,
                        rotationX: 25,
                        duration: 0.35,
                        ease: "power2.inOut",
                    },
                    "step2",
                );

                achievementstl.to(
                    "#card3",
                    {
                        y: 0,
                        z: 0,
                        rotationX: 0,
                        duration: 0.35,
                        ease: "power2.inOut",
                    },
                    "step2",
                );

                achievementstl.to(
                    {},
                    { duration: 0.1 },
                );
            }

            let journeyDescriptionSplitText = new SplitText('.description-container .real-text', {
                type: 'words',
                wordsClass: "word"
            })

            gsap.set(journeyDescriptionSplitText.words, { opacity: 0 })

            ScrollTrigger.refresh();

            const descriptiontl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".journey-detail",
                    start: () =>
                        `top -=${window.innerHeight * 4}`,
                    end: () =>
                        `bottom -=${window.innerHeight * 2}`,
                    scrub: true,

                    onEnter: () => {
                        setPagesLight(true);
                        setCurrentPage('achievements');
                    },
                    onLeaveBack: () => {
                        setPagesLight(false);
                        setCurrentPage('journey');
                    },
                },
            });

            descriptiontl.to(journeyDescriptionSplitText.words, {
                opacity: 1,
                duration: 0.5,
                stagger: 0.01
            })

            // GLOBAL scroll progress (pin-safe)
            ScrollTrigger.refresh();

            const scrollbarBall = document.querySelector('.scrollbar-ball');
            const scrollbarTopBar = document.querySelector('.top-scrollbar');
            const scrollbarBottomBar = document.querySelector('.bottom-scrollbar');
            const getScroll = ScrollTrigger.getScrollFunc(window);

            const updateScrollbar = () => {
                const max = ScrollTrigger.maxScroll(window);
                const y = getScroll();
                const p = max ? y / max : 0;

                gsap.set(scrollbarBall, { top: `${p * 100}%` });
                gsap.set(scrollbarTopBar, { height: `${p * 100}%` });
                gsap.set(scrollbarBottomBar, { height: `${90 - p * 100}%` });
            };

            ScrollTrigger.create({
                start: 0,
                end: () => ScrollTrigger.maxScroll(window),
                onUpdate: updateScrollbar,
                onRefresh: updateScrollbar,
            });

            ScrollTrigger.addEventListener("refresh", updateScrollbar);
            updateScrollbar();

            setTimelineAnimation(true);

            applicationRef.current.setAnimation(
                true,
            );
        });

        return () => {
            applicationRef.current.destructor();
            ctx.revert();
        };
    }, [introAnimation]);

    useLayoutEffect(() => {
        if (!root.current) return;

        root.current.style.setProperty(
            "--scrollbar-color",
            pagesLight ? "255 255 255" : "0 0 0"
        );
    }, [pagesLight]);

    const prevYearRef = useRef(null);
    useLayoutEffect(() => {
        const year = currentTimelineYear;

        if (!year) {
            gsap.killTweensOf(
                ".time-element",
            );
            gsap.set(".time-element", {
                autoAlpha: 0,
            });
            prevYearRef.current = null;
            return;
        }

        const currentEl =
            document.querySelector(
                `.year-${year}`,
            );
        if (!currentEl) return;

        const prevYear =
            prevYearRef.current;
        const prevEl = prevYear
            ? document.querySelector(
                `.year-${prevYear}`,
            )
            : null;

        gsap.killTweensOf(
            [currentEl, prevEl].filter(
                Boolean,
            ),
        );

        gsap.set(currentEl, {
            autoAlpha:
                gsap.getProperty(
                    currentEl,
                    "autoAlpha",
                ) || 0,
        });

        gsap
            .timeline({
                defaults: {
                    duration: 0.25,
                    ease: "power2.out",
                },
            })
            .to(prevEl, { autoAlpha: 0 }, 0)
            .to(
                currentEl,
                { autoAlpha: 1 },
                0,
            );

        prevYearRef.current = year;
    }, [currentTimelineYear]);

    useLayoutEffect(() => {
        const a = document.querySelector("#blobA");
        const b = document.querySelector("#blobB");
        if (!a || !b) return;

        const dA = a.getAttribute("d");
        const dB = b.getAttribute("d");

        const interp = flubber.interpolate(dA, dB, { maxSegmentLength: 2 });
        const obj = { t: 0 };

        const tl = gsap.timeline({
            repeat: -1,
            yoyo: true,
            defaults: { ease: "sine.inOut", duration: 2 },
        });

        tl.to(obj, {
            t: 1,
            onUpdate: () => a.setAttribute("d", interp(obj.t)),
        });

        return () => tl.kill();
    }, []);

    const topicsGridAnimationGate = useRef(false);
    useLayoutEffect(() => {
        if (topicsGridAnimationGate.current) return;

        const topicsGridElements = document.querySelectorAll('.row .element')

        topicsGridElements.forEach((element) => {
            element.addEventListener('pointermove', (e) => {
                const rect = element.getBoundingClientRect()
                const x = e.clientX - rect.left
                const y = e.clientY - rect.top

                const nx = (x - rect.width / 2) / (rect.width / 2)
                const ny = (y - rect.height / 2) / (rect.height / 2)

                gsap.killTweensOf(element)
                gsap.to(element, {
                    rotateX: -10 * ny,
                    rotateY: 5 * nx,
                    z: '40px',
                    duration: 0.2,
                    // overwrite: true
                })
            })

            element.addEventListener('pointerleave', () => {
                gsap.killTweensOf(element)
                gsap.to(element, {
                    rotateX: 0,
                    rotateY: 0,
                    z: '0px',
                    duration: 0.3,
                    // overwrite: true
                })
            })
        })

        topicsGridAnimationGate.current = true;
    }, []);

    return (
        <div className="home" ref={root}>
            {/* <ScreenScribble setIntroAnimation={setIntroAnimation} /> */}

            <div className="scrollbar-container z-9998">
                <div className="scrollbar">
                    <div className="top-scrollbar" />
                    <div className="bottom-scrollbar" />

                    <div className="scrollbar-ball">
                        <div className="scrollbar-outerball">
                            <div className="scrollbar-innerball" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="canvas">
                <canvas
                    ref={canvasRef}
                    className="block w-full h-full"
                ></canvas>
            </div>

            <div className="hero" id="home">
                <div className="hero-glow hero-fade-item" />
                <div className="hero-text hero-fade-item">
                    <p className="hero-eyebrow">
                        DSA Portfolio
                    </p>
                    <h1 className="transform-text">
                        Hu Wenxuan
                    </h1>
                    {/* <h2 className="transform-text">DSA Portfolio</h2> */}
                    <p className="transform-text">
                        A student focusing on
                        Mathematical Thinking and
                        Computer Science
                    </p>
                </div>

                <div className="hero-info relative hero-fade-item">
                    <div className="hero-orbit hero-orbit-left">
                        <span className="orbit-label">
                            Reasoning
                        </span>
                        <span className="orbit-value">
                            Built through mathematics
                        </span>
                    </div>
                    <div className="hero-chip hero-chip-1">
                        UKMT
                    </div>
                    <div className="hero-chip hero-chip-2">
                        Frontend
                    </div>
                    <div className="hero-orbit hero-orbit-right">
                        <span className="orbit-label">
                            Practice
                        </span>
                        <span className="orbit-value">
                            Shaped through code
                        </span>
                    </div>
                </div>

                <div className="bottom-text hero-fade-item">
                    <div className="scroll-cue">
                        <span className="cue-text">
                            Scroll to enter the timeline
                        </span>
                        <span className="cue-track">
                            <span className="cue-dot" />
                        </span>
                    </div>
                </div>
            </div>

            <div className="journey">
                    <div className="bgblackanimate">
                    <div className="about-text absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex-center">
                        <h1 className="text-[2rem] text-white font-ExconR leading-[1.5]">
                            I am interested in how abstract structures become systems that behave, adapt, and communicate ideas clearly.
                        </h1>
                    </div>
                </div>

                <div className="journey-content">
                    <div className="initiative-page">
                        <div className="initiative-col">
                            <h1 className="initiative-title">
                                How I Think
                            </h1>
                            <p className="initiative-description">
                                I approach problems by
                                looking for structure
                                first, then testing how
                                that structure holds
                                under pressure, edge
                                cases, and real use.
                            </p>
                        </div>

                        <div className="initiative-col">
                            <h1 className="initiative-title">
                                Principles
                            </h1>
                            <p className="initiative-description">
                                I break difficult work
                                into assumptions,
                                constraints, trade-offs,
                                and smaller decisions
                                that can be reasoned
                                through carefully.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="about"
                id="journey"
            >
                <TimelineLineSVG
                    setAnimation={
                        timelineAnimation
                    }
                    setCurrentTImelineYear={
                        setCurrentTImelineYear
                    }
                />

                    <div className="timeelements-container">
                        <div className="background-year-text">
                            {currentTimelineYear}
                        </div>
                        {timelineEntries.map((entry) => (
                            <div
                                key={entry.year}
                                className={`time-element year-${entry.year}`}
                            >
                                <div className="top">
                                    <div className="text-container">
                                        <p>{entry.topText}</p>
                                    </div>
                                </div>

                                <div className="bottom">
                                    <div className="text-container">
                                        <div className="bottom-text">
                                            {entry.bottomText}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                <div className="journey-detail">
                    <div className="spacer layer1"></div>

                    <div className="title relative">
                        <h1 className="z-2">
                            Fields of Interest
                        </h1>
                        <svg
                            id="visual"
                            viewBox="0 0 900 400"
                            width="900"
                            height="300"
                            className="z-1 absolute w-full h-full"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            version="1.1"
                        >
                            <g transform="translate(450 180)">
                                <path
                                    id="blobA"
                                    d="M57.8 -62.8C70.3 -45.3 72.6 -22.6 71.8 -0.8C71 21 67 42 54.5 60.5C42 79 21 95 -4.8 99.8C-30.6 104.6 -61.3 98.3 -74.6 79.8C-87.9 61.3 -84 30.6 -86.3 -2.4C-88.7 -35.4 -97.4 -70.7 -84 -88.2C-70.7 -105.7 -35.4 -105.4 -6.4 -99C22.6 -92.6 45.3 -80.3 57.8 -62.8"
                                    fill="#a3a380"
                                />
                                <path
                                    id="blobB"
                                    d="M82.4 -69.9C115.7 -49 157.8 -24.5 158.1 0.2C158.3 25 116.6 50 83.3 73.1C50 96.3 25 117.7 -0.4 118C-25.7 118.4 -51.4 97.7 -79.9 74.5C-108.4 51.4 -139.7 25.7 -138.6 1.1C-137.6 -23.6 -104.1 -47.1 -75.6 -68C-47.1 -88.8 -23.6 -106.9 0.5 -107.4C24.5 -107.8 49 -90.7 82.4 -69.9"
                                    fill="#a3a380"
                                    style={{ display: "none" }}
                                />
                            </g>
                        </svg>
                    </div>

                    <div className="description-container">
                        <p className="description-text shadow z-9">
                            Mathematics and Computer Science have shaped how I approach difficult problems.
                            Through competitions and independent projects, I’ve learned to analyse problems carefully, persist through complexity, and translate ideas into working systems.
                        </p>

                        <p className="description-text z-10 real-text">
                            Mathematics and Computer Science have shaped how I approach difficult problems.
                            Through competitions and independent projects, I’ve learned to analyse problems carefully, persist through complexity, and translate ideas into working systems.
                        </p>
                    </div>

                    <div className="topics-grid relative">
                        <div className="grid-container">
                            <div className="row row-left">
                                <div
                                    className="element bg-black/20"
                                    onClick={() => setMathematicsPage(true)}
                                >
                                    <div className="card-glow" />
                                    <div className="topic-grid-title">
                                        <span>Mathematics</span>
                                        <span className="card-status">
                                            Core lens
                                        </span>
                                    </div>

                                    <div className="information">
                                        <p>
                                            Contest mathematics trained me to slow down, define the structure of a problem, and prove each step cleanly before moving on.
                                        </p>
                                        <div className="info-pills">
                                            <span>Reasoning</span>
                                            <span>Abstraction</span>
                                            <span>Proof</span>
                                        </div>
                                        <div className="card-cta">
                                            Open detailed page
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row row-right">
                                <div
                                    className="element bg-black/20"
                                    onClick={() => setComputerSciencePage(true)}
                                >
                                    <div className="card-glow" />
                                    <div className="topic-grid-title">
                                        <span>Computer Science</span>
                                        <span className="card-status">
                                            Applied lens
                                        </span>
                                    </div>

                                    <div className="information">
                                        <p>
                                            Programming became the place where abstract reasoning turns into systems, interfaces, and interactions that can actually be tested.
                                        </p>
                                        <div className="info-pills">
                                            <span>Systems</span>
                                            <span>Interaction</span>
                                            <span>Iteration</span>
                                        </div>
                                        <div className="card-cta">
                                            Open detailed page
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="element bg-[#efebce]">
                                    <div className="topic-grid-title">
                                        Projects
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>

                    <div className="outro-journey border-t max-w-[80dvw] border-white">
                        <div className="outro-text-content">
                            Mathematics trained me to think precisely.
                            Competitions such as UKMT, AMC, and Cayley pushed me to analyse problems deeply, recognise patterns quickly, and construct clear logical arguments.
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="achievements" id="achievements">
                <div className="achievement-cards">
                    {achievementCards.map((card) => (
                        <div
                            key={card.id}
                            className="card"
                            id={card.id}
                        >
                            <div className="col">
                                <div className="card-meta">
                                    <span className="phase">
                                        {card.phase}
                                    </span>
                                    <span className="year">
                                        {card.year}
                                    </span>
                                </div>
                                <div className="heading">
                                    {card.title}
                                </div>
                                <p className="card-summary">
                                    {card.summary}
                                </p>
                                <div className="card-tags">
                                    {card.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="tag"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="card-metric">
                                    <span className="metric-label">
                                        {card.metric}
                                    </span>
                                    <span className="metric-value">
                                        {card.metricValue}
                                    </span>
                                </div>
                            </div>

                            <div className="col">
                                <ul className="details">
                                    {card.details.map((detail) => (
                                        <li key={detail}>
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div> */}

            <Mathematics mathematicsPage={mathematicsPage} setMathematicsPage={setMathematicsPage} />
            <ComputerScience computerSciencePage={computerSciencePage} setComputerSciencePage={setComputerSciencePage} />

            <div className="footer">
                <div className="footer-inner">
                    <p className="footer-kicker">
                        This draft is moving toward a portfolio about thought process, not just output.
                    </p>
                    {/* <h2 className="footer-heading">
                        Mathematics gives me structure. Programming gives that structure a form.
                    </h2> */}
                </div>
            </div>
        </div>
    );
};

export default Home;
