import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { ExternalLink, Github, Server, Activity, Radio, Database } from 'lucide-react';

const Projects = () => {
    const flowRef = useRef(null);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        // Kafka Flow Animation
        const path = anime.path('.flow-path');

        anime({
            targets: '.data-packet',
            translateX: path('x'),
            translateY: path('y'),
            rotate: path('angle'),
            easing: 'linear',
            duration: 2000,
            loop: true,
            delay: anime.stagger(500),
        });

        // Pulse effect for nodes
        anime({
            targets: '.node-circle',
            scale: [1, 1.1],
            opacity: [0.8, 1],
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutSine',
            duration: 1000,
            delay: anime.stagger(200)
        });
    }, []);

    const projects = [
        {
            title: 'DollarConnect',
            role: 'MERN Stack Developer',
            desc: 'Freelance platform facilitating secure transactions using JWT authentication and Mailtrap for notifications.',
            tags: ['React', 'Node.js', 'MongoDB', 'JWT'],
            links: { github: '#', demo: '#' }
        },
        {
            title: 'People Counter',
            role: 'Computer Vision',
            desc: 'Real-time footfall counter using OpenCV and MobileNet SSD for accurate detection.',
            tags: ['Python', 'OpenCV', 'MobileNet SSD'],
            links: { github: '#', demo: '#' }
        }
    ];

    return (
        <div className="min-h-screen pt-24 pb-16 px-6">
            <div className="container mx-auto max-w-5xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center">Featured Projects</h1>

                {/* Kafka Flow Visualization Section (Atris) */}
                <section className="mb-20 bg-black/30 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                        <Activity size={200} />
                    </div>

                    <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
                        <div className="flex-1 space-y-6">
                            <div className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-semibold tracking-wider uppercase">
                                Architecture Deep Dive
                            </div>
                            <h2 className="text-3xl font-bold text-white">Atris: Text-to-Speech Engine</h2>
                            <p className="text-slate-400 leading-relaxed">
                                A robust TTS system powered by Apache Kafka for event streaming and Redis for caching.
                                Visualizing the asynchronous data flow from user input to audio generation.
                            </p>
                            <div className="flex gap-4 pt-4">
                                <span className="flex items-center gap-2 text-sm text-slate-300 bg-black/30 backdrop-blur-md px-3 py-1 rounded-md border border-white/20">
                                    <Server size={14} className="text-green-400" /> Apache Kafka
                                </span>
                                <span className="flex items-center gap-2 text-sm text-slate-300 bg-black/30 backdrop-blur-md px-3 py-1 rounded-md border border-white/20">
                                    <Database size={14} className="text-red-400" /> Redis
                                </span>
                            </div>
                        </div>

                        {/* SVG Animation Container */}
                        <div className="flex-1 w-full flex justify-center py-8">
                            <div className="relative w-full max-w-[400px] h-[200px] bg-black/20 backdrop-blur-lg rounded-xl border border-white/20 p-4 shadow-xl">
                                <svg viewBox="0 0 400 200" className="w-full h-full">
                                    {/* Path */}
                                    <path
                                        d="M 50 100 C 100 100, 150 50, 200 100 S 300 150, 350 100"
                                        fill="none"
                                        stroke="#334155"
                                        strokeWidth="2"
                                        className="flow-path opacity-50"
                                    />

                                    {/* Nodes */}
                                    <g transform="translate(50, 100)">
                                        <circle r="15" fill="#3b82f6" className="node-circle" />
                                        <text y="30" textAnchor="middle" fill="#94a3b8" fontSize="10">Input</text>
                                    </g>
                                    <g transform="translate(200, 100)">
                                        <circle r="20" fill="#22c55e" className="node-circle" />
                                        <text y="35" textAnchor="middle" fill="#94a3b8" fontSize="10">Kafka</text>
                                    </g>
                                    <g transform="translate(350, 100)">
                                        <circle r="15" fill="#f43f5e" className="node-circle" />
                                        <text y="30" textAnchor="middle" fill="#94a3b8" fontSize="10">Redis</text>
                                    </g>

                                    {/* Moving Data Packets */}
                                    <circle r="4" fill="#fff" className="data-packet shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                                    <circle r="4" fill="#fff" className="data-packet shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Other Projects Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project, idx) => (
                        <div key={idx} className="group bg-black/30 backdrop-blur-xl border border-white/20 p-8 rounded-2xl hover:border-primary/50 hover:bg-black/40 transition-all hover:-translate-y-1 hover:shadow-2xl shadow-xl">
                            <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                            <p className="text-sm text-primary mb-4 font-medium">{project.role}</p>
                            <p className="text-slate-400 mb-6 line-clamp-3">{project.desc}</p>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {project.tags.map(tag => (
                                    <span key={tag} className="text-xs px-3 py-1 bg-black/30 backdrop-blur-md text-slate-300 rounded-full border border-white/20">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-4">
                                <a href={project.links.github} className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm">
                                    <Github size={16} /> Code
                                </a>
                                <a href={project.links.demo} className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm">
                                    <ExternalLink size={16} /> Live Demo
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Projects;
