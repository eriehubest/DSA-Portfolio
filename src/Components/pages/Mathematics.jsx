import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

import { IoIosArrowBack } from "react-icons/io";

import "../../styles/mathematics.css";

const sections = [
    { id: "overview", label: "Overview" },
    { id: "achievements", label: "Achievements" },
];

const achievementTimeline = [
    {
        year: "2022",
        organisation: "UKMT",
        awards: [
            "JMC Gold",
        ],
        note:
            "This was the first year competition mathematics began to feel serious and personally meaningful.",
    },
    {
        year: "2023",
        organisation: "UKMT",
        awards: [
            "JMC Gold",
            "IMC Gold",
            "Junior Maths Olympiad Distinction",
        ],
        note:
            "The results widened from one competition into a stronger pattern of consistency across multiple stages.",
    },
    {
        year: "2024",
        organisation: "UKMT",
        awards: [
            "Cayley Olympiad Merit",
            "IMC Gold",
            "SMC Gold",
        ],
        note:
            "By this point the work was not only about interest, but about sustained performance across different UKMT tracks.",
    },
    {
        year: "2025",
        organisation: "AMC",
        awards: [
            "AMC 12B Distinction (Top 5%)",
        ],
        note:
            "This marked a strong benchmark in a different competition system and showed sharper precision under pressure.",
    },
];

const focusPoints = [
    "I enjoy questions where a hidden structure gradually reveals itself.",
    "I prefer clean arguments over clever shortcuts that are hard to trust.",
    "The discipline from mathematics carries directly into the way I build software.",
];

const Mathematics = ({ mathematicsPage, setMathematicsPage }) => {
    const [activeSection, setActiveSection] = useState("overview");
    const root = useRef(null);

    useLayoutEffect(() => {
        if (!mathematicsPage || !root.current) return;

        const ctx = gsap.context(() => {
            gsap.killTweensOf(".maths-page");
            gsap.fromTo(
                ".maths-page",
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 0.4,
                    ease: "power2.inOut",
                }
            );

            gsap.fromTo(
                ".maths-shell",
                { y: 32, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    ease: "power3.out",
                }
            );

            gsap.fromTo(
                ".maths-graphic .orbit-ring",
                { scale: 0.9, opacity: 0.25 },
                {
                    scale: 1.05,
                    opacity: 0.6,
                    duration: 2.5,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    stagger: 0.2,
                }
            );

            gsap.to(".maths-graphic .floating-chip", {
                y: -16,
                duration: 1.8,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: 0.18,
            });
        }, root);

        return () => ctx.revert();
    }, [mathematicsPage]);

    useLayoutEffect(() => {
        if (!mathematicsPage || !root.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".maths-main .section-panel.is-active",
                { y: 18, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.45,
                    ease: "power2.out",
                }
            );

            gsap.fromTo(
                ".maths-main .achievement-item, .maths-main .focus-item, .maths-main .signal-card, .maths-main .timeline-card, .maths-main .award-chip",
                { y: 20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.08,
                    ease: "power2.out",
                }
            );
        }, root);

        return () => ctx.revert();
    }, [activeSection, mathematicsPage]);

    if (!mathematicsPage) return null;

    return (
        <div
            ref={root}
            className="maths-page fixed z-[9999] bg-brown w-screen h-dvh text-white overflow-y-auto overscroll-none"
            data-lenis-prevent
        >
            <aside className="maths-sidebar z-10000">
                <div className="sidebar-copy">
                    <p className="eyebrow">Mathematics</p>
                    <p className="sidebar-note">
                        Use the side navigation to switch from the broader story to the competition record.
                    </p>
                </div>

                <nav className="side-nav" aria-label="Mathematics sections">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            type="button"
                            className={`side-link ${activeSection === section.id ? "is-active" : ""}`}
                            onClick={() => setActiveSection(section.id)}
                        >
                            {section.label}
                        </button>
                    ))}
                </nav>
            </aside>
            <div className="maths-shell">

                <div className="maths-main">
                    <section className={`section-panel ${activeSection === "overview" ? "is-active" : "is-hidden"}`}>
                        <div className="hero-block">
                            <div className="hero-copy">
                                <p className="eyebrow">Overview</p>
                                <h1>
                                    Mathematics is where I learned to make complexity feel legible.
                                </h1>
                                <p className="lede">
                                    I am most drawn to problems that reveal structure slowly. The appeal is not just solving them, but building a line of reasoning that stays stable under pressure.
                                </p>
                            </div>

                            <div className="maths-graphic" aria-hidden="true">
                                <div className="orbit-ring orbit-ring-1" />
                                <div className="orbit-ring orbit-ring-2" />
                                <div className="orbit-ring orbit-ring-3" />
                                <div className="graphic-core">
                                    <span>proof</span>
                                </div>
                                <div className="floating-chip chip-1">logic</div>
                                <div className="floating-chip chip-2">pattern</div>
                                <div className="floating-chip chip-3">clarity</div>
                            </div>
                        </div>

                        <div className="signal-grid">
                            <article className="signal-card">
                                <p className="signal-label">What I enjoy</p>
                                <p>
                                    Problems that force exact definitions, careful transitions, and a clean final argument.
                                </p>
                            </article>
                            <article className="signal-card">
                                <p className="signal-label">How it shows up in code</p>
                                <p>
                                    I naturally look for invariants, edge cases, and the structure underneath an interface before I build.
                                </p>
                            </article>
                        </div>

                        <div className="content-block">
                            <h2>Focus</h2>
                            <div className="focus-list">
                                {focusPoints.map((point) => (
                                    <div key={point} className="focus-item">
                                        {point}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className={`section-panel ${activeSection === "achievements" ? "is-active" : "is-hidden"}`}>
                        <div className="content-block achievements-block">
                            <p className="eyebrow">Achievements</p>
                            <h1>
                                A competition timeline showing how the results built up over time.
                            </h1>
                            <div className="timeline-list">
                                {achievementTimeline.map((item) => (
                                    <article key={item.year} className="timeline-card">
                                        <div className="timeline-marker" aria-hidden="true">
                                            <span className="marker-dot" />
                                            <span className="marker-line" />
                                        </div>

                                        <div className="timeline-content">
                                            <div className="timeline-header">
                                                <div className="timeline-year">
                                                    {item.year}
                                                </div>
                                                <div className="timeline-org">
                                                    {item.organisation}
                                                </div>
                                            </div>

                                            <div className="award-list">
                                                {item.awards.map((award) => (
                                                    <div key={award} className="award-chip">
                                                        {award}
                                                    </div>
                                                ))}
                                            </div>

                                            <p className="timeline-note">
                                                {item.note}
                                            </p>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <div
                className="back-button"
                onClick={() => setMathematicsPage(false)}
            >
                <div className="button">
                    <IoIosArrowBack />
                </div>
            </div>
        </div>
    );
};

export default Mathematics;
