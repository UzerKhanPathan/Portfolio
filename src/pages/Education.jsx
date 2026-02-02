import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { GraduationCap, Award, BookOpen, Calendar, MapPin } from 'lucide-react';

const Education = () => {
    const timelineRef = useRef(null);

    useEffect(() => {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reducedMotion) {
            anime.set('.timeline-entry', { opacity: 1, translateX: 0 });
            return;
        }

        // Timeline drawing animation
        anime({
            targets: '.timeline-path',
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'easeInOutSine',
            duration: 2000,
            delay: 500,
        });

        // Entries fade in
        anime({
            targets: '.timeline-entry',
            opacity: [0, 1],
            translateX: [-50, 0],
            delay: anime.stagger(400, { start: 1000 }),
            easing: 'easeOutQuad',
        });
    }, []);

    const educationHistory = [
        {
            degree: 'B.Tech in Computer Science',
            institution: 'Drs Kiran and Pallavi Patel Global University',
            year: '2024 - Present',
            score: 'Pursuing',
            details: 'Specializing in Full Stack Development and AI Agents.',
            icon: <GraduationCap size={24} className="text-primary" />
        },
        {
            degree: 'Diploma in Computer Engineering',
            institution: 'Sigma University',
            year: '2021 - 2024',
            score: '8.83 CGPA',
            details: 'Built strong foundation in Algorithms, Data Structures, and Web Technologies. Awarded top performer.',
            icon: <BookOpen size={24} className="text-secondary" />
        },
        {
            degree: 'Secondary Education',
            institution: 'Gujarat State Board',
            year: '2021',
            score: 'Distinction',
            details: 'Completed with focus on Science and Mathematics.',
            icon: <Award size={24} className="text-purple-400" />
        }
    ];

    return (
        <div className="min-h-screen pt-24 pb-16 px-6 text-white">
            <div className="container mx-auto max-w-4xl relative">
                <h1 className="text-4xl md:text-5xl font-bold mb-16 text-center">Academic Journey</h1>

                <div className="relative pl-8 md:pl-0">
                    {/* Vertical Line SVG */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 transform md:-translate-x-1/2">
                        <svg className="h-full w-full overflow-visible">
                            <line
                                x1="0" y1="0" x2="0" y2="100%"
                                stroke="#334155"
                                strokeWidth="2"
                                className="timeline-path"
                                strokeDasharray="1000"
                            />
                        </svg>
                    </div>

                    <div className="space-y-12">
                        {educationHistory.map((item, index) => (
                            <div
                                key={index}
                                className={`timeline-entry flex flex-col md:flex-row items-center gap-8 relative ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                                    }`}
                            >
                                {/* Timeline Node (Center) */}
                                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-[#000000] transform md:-translate-x-1/2 z-10 shadow-[0_0_15px_rgba(59,130,246,0.5)] flex items-center justify-center">
                                    {/* Optional icon inside node? Using separate icon for now */}
                                </div>

                                {/* Content Card */}
                                <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                                    <div className="bg-black/30 backdrop-blur-xl border border-white/20 p-6 rounded-2xl relative hover:border-primary/30 hover:bg-black/40 transition-all shadow-xl group">
                                        <div className="absolute -left-12 top-6 md:static md:mb-4 flex items-center justify-center w-12 h-12 bg-black/30 backdrop-blur-md rounded-full border border-white/20 md:group-hover:scale-110 transition-transform shadow-lg">
                                            {item.icon}
                                        </div>

                                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-2">
                                            {item.year}
                                        </span>
                                        <h3 className="text-xl font-bold text-white mb-1">
                                            {item.degree}
                                        </h3>
                                        <h4 className="text-slate-400 font-medium text-sm flex items-center gap-2 mb-3">
                                            <MapPin size={14} /> {item.institution}
                                        </h4>
                                        <p className="text-slate-500 text-sm leading-relaxed">
                                            {item.details}
                                        </p>
                                        {item.score && (
                                            <div className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-2 text-sm font-semibold text-green-400">
                                                <Award size={16} /> Score: {item.score}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Empty space for alternate side */}
                                <div className="hidden md:block w-1/2" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Education;
