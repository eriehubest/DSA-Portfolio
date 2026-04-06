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
        title: "Portfolio Canvas System",
        type: "Three.js / Architecture",
        note:
            "The homepage scene is built as a reusable application layer with its own world setup, animation tracking, viewport logic, and scene management.",
        tags: ["Application.js", "Scene setup", "Animation"],
    },
    {
        title: "Interactive Particle Mathematics Scene",
        type: "Three.js / GLSL",
        note:
            "A point-cloud image shader that reacts to pointer movement through a displacement texture, combining geometry, shaders, and interaction design.",
        tags: ["ShaderMaterial", "Raycaster", "Particles"],
    },
    {
        title: "Cube Portrait World",
        type: "Three.js / Experiment",
        note:
            "A spatial composition built from grouped meshes, textured cube faces, wireframe layers, and lighting to test form, depth, and motion inside the portfolio.",
        tags: ["Textures", "Lighting", "3D layout"],
    },
];

const achievementTimeline = [
    {
        year: "2023",
        organisation: "Programming Foundations",
        awards: [
            "Started solving algorithmic problems in Python",
        ],
        note:
            "This was the point where programming stopped feeling like syntax practice and started feeling like structured problem solving.",
    },
    {
        year: "2024",
        organisation: "Frontend and JavaScript",
        awards: [
            "Moved into interactive web development",
            "Began building visual systems instead of isolated scripts",
        ],
        note:
            "The focus widened from solving problems to designing interfaces, animations, and software behaviour that could be seen and tested.",
    },
    {
        year: "2025",
        organisation: "USACO",
        awards: [
            "Reached Gold division",
        ],
        note:
            "USACO was the clearest benchmark for algorithmic endurance, debugging discipline, and staying precise under contest pressure.",
    },
];

const focusPoints = [
    "I like building systems where logic and presentation reinforce each other.",
    "Three.js is especially interesting because it turns technical structure into visible motion.",
    "Competitive programming trained speed and rigor; projects trained iteration and taste.",
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
                ".cs-page .maths-main .achievement-item, .cs-page .maths-main .focus-item, .cs-page .maths-main .signal-card, .cs-page .maths-main .timeline-card, .cs-page .maths-main .award-chip, .cs-page .maths-main .project-card",
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
                        Use the side navigation to move between the overview, project work, and competition record.
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
                                    Computer science is where reasoning becomes something I can build, test, and refine.
                                </h1>
                                <p className="lede">
                                    I am most interested in the point where abstract logic turns into software that has behaviour, interaction, and visible structure.
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
                                    I usually start by finding the structure of a system first, then make the interface and motion express that structure clearly.
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
                            <p className="eyebrow">Three.js Projects</p>
                            <h1>
                                A few projects and systems that show how I have been using Three.js in this portfolio.
                            </h1>
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
                            <div className="project-link">
                                <div
                                    className="link-start element"
                                    onClick={() => {
                                        window.location.href = "https://eriehubest.github.io/project-gallery/";
                                    }}
                                >
                                    View Projects
                                </div>

                                <div
                                    className="link-end element"
                                    onClick={() => {
                                        window.location.href = "https://github.com/eriehubest/project-gallery";
                                    }}
                                >
                                    View Source Code
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className={`section-panel ${activeSection === "achievements" ? "is-active" : "is-hidden"}`}>
                        <div className="content-block achievements-block">
                            <p className="eyebrow">Achievements</p>
                            <h1>
                                The main milestones so far, with USACO as the clearest competitive benchmark.
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
