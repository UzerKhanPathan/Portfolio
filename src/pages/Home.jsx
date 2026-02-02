import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs';

import { Code, Server, Database, Globe, Cpu, Terminal, X, Phone, Linkedin, Mail, Github, MapPin } from 'lucide-react';
import HeroVisualizer from '../components/HeroVisualizer';

const Home = () => {
    const heroRef = useRef(null);
    const skillsRef = useRef(null);
    const nameRef = useRef(null);
    const [isContactOpen, setIsContactOpen] = useState(false);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            // Set final state immediately
            anime.set(nameRef.current.children, { translateY: 0, opacity: 1 });
            return;
        }

        // Hero Animation
        anime({
            targets: nameRef.current.children,
            translateY: [20, 0],
            opacity: [0, 1],
            delay: anime.stagger(100),
            easing: 'easeOutExpo',
            duration: 1500,
        });
    }, []);

    // Typewriter effect for subtitle
    const [typewriterText, setTypewriterText] = useState('');
    const fullText = 'B.Tech Computer Science Student & Full Stack Developer';

    useEffect(() => {
        let currentIndex = 0;
        const typingInterval = setInterval(() => {
            if (currentIndex <= fullText.length) {
                setTypewriterText(fullText.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(typingInterval);
            }
        }, 50);

        return () => clearInterval(typingInterval);
    }, []);

    const handleSkillsIntersection = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: '.skill-card',
                    scale: [0.8, 1],
                    opacity: [0, 1],
                    delay: anime.stagger(100, { grid: [3, 2], from: 'center' }), // Staggered grid effect
                    easing: 'spring(1, 80, 10, 0)',
                });
            }
        });
    };

    useEffect(() => {
        const observer = new IntersectionObserver(handleSkillsIntersection, { threshold: 0.2 });
        if (skillsRef.current) observer.observe(skillsRef.current);
        return () => observer.disconnect();
    }, []);

    const skills = [
        { name: 'Java', icon: <Code className="w-8 h-8 text-orange-500" /> },
        { name: 'Python', icon: <Terminal className="w-8 h-8 text-blue-500" /> },
        { name: 'Node.js', icon: <Server className="w-8 h-8 text-green-500" /> },
        { name: 'React', icon: <Globe className="w-8 h-8 text-cyan-500" /> },
        { name: 'Docker', icon: <Database className="w-8 h-8 text-blue-400" /> },
        { name: 'NLP', icon: <Cpu className="w-8 h-8 text-purple-500" /> },
    ];

    const contactDetails = {
        phone: "+91-9725699152",
        email: "uzerpathan2004@gmail.com",
        location: "Vadodara, Gujarat",
        linkedin: "https://linkedin.com/in/uzerkhan-pathan", // Assumed or placeholder, user can update
        github: "https://github.com/uzerkhan" // Placeholder
    };

    return (
        <div className="text-white">
            {/* Hero Section */}
            <section ref={heroRef} className="min-h-screen flex flex-col justify-center items-center relative px-6 md:px-20 overflow-hidden text-center md:text-left">

                {/* Particles Visualizer (Absolute Background) */}
                <div className="absolute inset-0 z-0">
                    {React.useMemo(() => <HeroVisualizer />, [])}
                </div>

                {/* Decorative Background Overlay (to dim particles slightly if needed) */}
                <div className="absolute inset-0 bg-[#000000]/20 pointer-events-none z-0"></div>

                <div ref={nameRef} className="z-10 space-y-6 md:w-2/3 mx-auto relative pointer-events-none">
                    <div className="pointer-events-auto">

                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4 text-center">
                            Uzairkhan <br /> Pathan
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto text-center min-h-[2rem]">
                            {typewriterText}
                            <span className="animate-pulse">|</span>
                        </p>
                        <div className="pt-8 flex flex-col md:flex-row gap-4 justify-center">
                            <a href="#projects" className="px-8 py-4 bg-white text-slate-900 rounded-lg font-bold hover:bg-slate-200 transition-colors">
                                View Work
                            </a>
                            <button
                                onClick={() => setIsContactOpen(true)}
                                className="px-8 py-4 border border-white/30 rounded-lg font-bold hover:bg-black/40 transition-all bg-black/20 backdrop-blur-md shadow-lg"
                            >
                                Contact Me
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section id="skills" ref={skillsRef} className="py-24">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Technical Expertise</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
                        {skills.map((skill, index) => (
                            <div
                                key={index}
                                className="skill-card opacity-0 bg-black/30 backdrop-blur-xl border border-white/20 p-8 rounded-2xl flex flex-col items-center gap-4 hover:border-primary/50 hover:bg-black/40 transition-all shadow-xl hover:shadow-2xl"
                            >
                                {skill.icon}
                                <span className="text-lg font-medium">{skill.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Modal */}
            {isContactOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setIsContactOpen(false)}>
                    <div
                        className="bg-black/40 backdrop-blur-2xl border border-white/20 p-8 rounded-2xl max-w-md w-full relative shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setIsContactOpen(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <h3 className="text-2xl font-bold text-white mb-6 text-center">Get in Touch</h3>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4 p-4 bg-black/20 backdrop-blur-md rounded-xl hover:bg-black/30 transition-all border border-white/10">
                                <div className="p-3 bg-primary/10 rounded-full text-primary">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-400">Phone</p>
                                    <a href={`tel:${contactDetails.phone}`} className="text-lg font-medium text-white hover:text-primary transition-colors">
                                        {contactDetails.phone}
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition-colors">
                                <div className="p-3 bg-blue-500/10 rounded-full text-blue-500">
                                    <Linkedin className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-400">LinkedIn</p>
                                    <a href={contactDetails.linkedin} target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-white hover:text-blue-400 transition-colors">
                                        View Profile
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition-colors">
                                <div className="p-3 bg-emerald-500/10 rounded-full text-emerald-500">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-400">Email</p>
                                    <a href={`mailto:${contactDetails.email}`} className="text-lg font-medium text-white hover:text-emerald-400 transition-colors">
                                        {contactDetails.email}
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition-colors">
                                <div className="p-3 bg-purple-500/10 rounded-full text-purple-500">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-400">Location</p>
                                    <p className="text-lg font-medium text-white">
                                        {contactDetails.location}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
