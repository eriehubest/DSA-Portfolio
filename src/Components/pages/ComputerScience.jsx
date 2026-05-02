import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

import { IoIosArrowBack } from "react-icons/io";

import "../../styles/mathematics.css";

const sections = [
    { id: "overview", label: "Overview" },
    { id: "projects", label: "Projects" },
    { id: "achievements", label: "Achievements" },
];

const projectCards = [
    {
        title: "Project Gallery",
        type: "Technical Case-Study Hub",
        note:
            "A self-designed project gallery built to present larger technical work more clearly, with linked project pages used to explain architecture, implementation choices, and what I learned from each system.",
        tags: ["Independent build", "Case studies", "Technical writing"],
    },
    {
        title: "Vehicle Systems Project",
        type: "Three.js / Rapier / Architecture",
        note:
            "A fully independent vehicle project organised into separate systems for rendering, physics, input, camera control, world construction, resource loading, and timing.",
        tags: ["Modular systems", "Physics", "Rendering pipeline"],
    },
    {
        title: "Portfolio Website",
        type: "React / GSAP / Three.js",
        note:
            "This submission website was also independently designed and built by me, using motion, layout, and interactive structure to present mathematical and technical work in a more intentional way.",
        tags: ["React", "GSAP", "Independent build"],
    },
];

const achievementTimeline = [
    {
        year: "2023",
        organisation: "Programming Foundations",
        awards: [
            "Started learning programming independently in Python",
        ],
        note:
            "This was the point where programming stopped feeling like syntax practice and started feeling like structured problem solving.",
    },
    {
        year: "2024",
        organisation: "Frontend and JavaScript",
        awards: [
            "Moved into self-taught web development",
            "Began building interactive systems instead of isolated scripts",
        ],
        note:
            "The focus widened from solving problems to designing interfaces, animations, and software behaviour that could be seen and tested.",
    },
    {
        year: "Recent",
        organisation: "USACO",
        awards: [
            "Bronze round: 900/1000",
            "Silver round: 500/1000",
        ],
        note:
            "USACO provided a competitive benchmark for algorithmic endurance, debugging discipline, and staying precise under contest pressure.",
    },
];

const focusPoints = [
    "I like building systems where logic, interaction, and presentation reinforce one another.",
    "I taught myself these tools by building projects large enough to force real architectural decisions.",
    "Competitive programming trained precision; projects trained independence, iteration, and system design.",
];

const ComputerScience = ({
    computerSciencePage,
    setComputerSciencePage,
}) => {
    const [activeSection, setActiveSection] = useState("overview");
    const root = useRef(null);

    useLayoutEffect(() => {
        if (!computerSciencePage || !root.current) return;

        const ctx = gsap.context(() => {
            gsap.killTweensOf(".cs-page");
            gsap.fromTo(
                ".cs-page",
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 0.4,
                    ease: "power2.inOut",
                }
            );

            gsap.fromTo(
                ".cs-page .maths-shell",
                { y: 32, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    ease: "power3.out",
                }
            );

            gsap.fromTo(
                ".cs-graphic .grid-pulse",
                { scale: 0.92, opacity: 0.25 },
                {
                    scale: 1.04,
                    opacity: 0.65,
                    duration: 2.3,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                }
            );

            gsap.to(".cs-graphic .code-chip", {
                y: -14,
                duration: 1.8,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: 0.18,
            });
        }, root);

        return () => ctx.revert();
    }, [computerSciencePage]);

    useLayoutEffect(() => {
        if (!computerSciencePage || !root.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".cs-page .maths-main .section-panel.is-active",
                { y: 18, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.45,
                    ease: "power2.out",
                }
            );

            gsap.fromTo(
                ".cs-page .maths-main .achievement-item, .cs-page .maths-main .focus-item, .cs-page .maths-main .signal-card, .cs-page .maths-main .timeline-card, .cs-page .maths-main .award-chip, .cs-page .maths-main .project-card, .cs-page .maths-main .project-callout",
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
    }, [activeSection, computerSciencePage]);

    if (!computerSciencePage) return null;

    return (
        <div
            ref={root}
            className="cs-page fixed z-[9999] w-screen h-dvh text-white overflow-y-auto overscroll-none"
        >
            <aside className="maths-sidebar z-10000">
                <div className="sidebar-copy">
                    <p className="eyebrow">Computer Science</p>
                    <p className="sidebar-note">
                        Use the side navigation to move between the overview, project evidence, and competition record.
                    </p>
                </div>

                <nav className="side-nav" aria-label="Computer science sections">
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
                <div className="maths-main" data-lenis-prevent>
                    <section className={`section-panel ${activeSection === "overview" ? "is-active" : "is-hidden"}`}>
                        <div className="hero-block">
                            <div className="hero-copy">
                                <p className="eyebrow">Overview</p>
                                <h1>
                                    Computing is where I turn abstract reasoning into systems I can build, test, and refine independently.
                                </h1>
                                <p className="lede">
                                    I am especially interested in the point where abstract logic turns into software with behaviour, interaction, and visible structure, and I have been teaching myself the tools needed to build that kind of work from scratch.
                                </p>
                            </div>

                            <div className="cs-graphic" aria-hidden="true">
                                <div className="grid-pulse" />
                                <div className="graphic-core">
                                    <span>build</span>
                                </div>
                                <div className="code-chip code-chip-1">three.js</div>
                                <div className="code-chip code-chip-2">usaco</div>
                                <div className="code-chip code-chip-3">systems</div>
                            </div>
                        </div>

                        <div className="signal-grid">
                            <article className="signal-card">
                                <p className="signal-label">What pulls me in</p>
                                <p>
                                    Problems where architecture, interaction, and implementation all matter at the same time.
                                </p>
                            </article>
                            <article className="signal-card">
                                <p className="signal-label">How I work</p>
                                <p>
                                    I usually begin by identifying the structure of a system first, then make the interface and motion express that structure clearly.
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

                    <section className={`section-panel ${activeSection === "projects" ? "is-active" : "is-hidden"}`}>
                        <div className="content-block achievements-block">
                            <p className="eyebrow">Projects</p>
                            <h1>
                                The main project work I built independently, used here as evidence of technical depth and self-directed learning.
                            </h1>
                            <div className="project-callout">
                                <div className="project-callout-copy">
                                    <p className="project-callout-label">Featured link</p>
                                    <h2 className="project-callout-title">Open the project gallery for the full technical case-study view.</h2>
                                    <p className="project-callout-note">
                                        The gallery contains the larger technical write-ups, including the vehicle project, system breakdowns, and the architectural decisions behind them.
                                    </p>
                                </div>

                                <div className="project-callout-actions">
                                    <a
                                        className="project-cta project-cta-primary"
                                        href="https://eriehubest.github.io/project-gallery/"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        View Project Gallery
                                    </a>

                                    <a
                                        className="project-cta project-cta-secondary"
                                        href="https://github.com/eriehubest/project-gallery"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        View Source Code
                                    </a>
                                </div>
                            </div>
                            <div className="project-list">
                                {projectCards.map((project) => (
                                    <article key={project.title} className="project-card">
                                        <div className="project-header">
                                            <div>
                                                <p className="project-type">{project.type}</p>
                                                <h2 className="project-title">{project.title}</h2>
                                            </div>
                                        </div>

                                        <p className="project-note">{project.note}</p>

                                        <div className="award-list">
                                            {project.tags.map((tag) => (
                                                <div key={tag} className="award-chip">
                                                    {tag}
                                                </div>
                                            ))}
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className={`section-panel ${activeSection === "achievements" ? "is-active" : "is-hidden"}`}>
                        <div className="content-block achievements-block">
                            <p className="eyebrow">Achievements</p>
                            <h1>
                                The main milestones so far, with USACO serving as a supporting competitive benchmark alongside independent project work.
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
                onClick={() => setComputerSciencePage(false)}
            >
                <div className="button">
                    <IoIosArrowBack />
                </div>
            </div>
        </div>
    );
};

export default ComputerScience;
