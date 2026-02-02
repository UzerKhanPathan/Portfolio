import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '#home' },
        { name: 'Projects', path: '#projects' },
        { name: 'Education', path: '#education' },
    ];

    const contactInfo = {
        phone: '+91-9725699152',
        email: 'uzerpathan2004@gmail.com',
        location: 'Vadodara, Gujarat',
    };

    return (
        <>
            {/* Top Bar - Contact Info */}


            {/* Main Header */}
            <header
                className={`sticky top - 0 left - 0 w - full z - 40 transition - all duration - 300 ${isScrolled ? 'bg-slate-950/80 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'
                    } `}
            >
                <div className="container mx-auto px-6 flex justify-between items-center">
                    {/* Logo */}
                    <a href="#home" className="text-3xl font-bold tracking-tighter hover:text-primary transition-colors font-sans">
                        Uzerkhan<span className="text-primary">.</span>
                    </a>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex gap-8 items-center">
                        {navLinks.map((link) => (
                            <a
                                key={link.path}
                                href={link.path}
                                className="text-lg font-medium text-slate-400 hover:text-primary transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                        <a
                            href="/resume.pdf"
                            className="px-5 py-2 bg-primary/10 text-primary border border-primary/20 rounded-full text-lg font-medium hover:bg-primary hover:text-white transition-all"
                        >
                            Resume
                        </a>
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                {isMenuOpen && (
                    <div className="fixed inset-0 top-[60px] bg-slate-950/95 backdrop-blur-xl z-30 p-6 flex flex-col items-center gap-8 md:hidden">
                        {navLinks.map((link) => (
                            <a
                                key={link.path}
                                href={link.path}
                                className="text-xl font-medium text-slate-300 hover:text-white"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}
                        <div className="mt-8 flex flex-col items-center gap-4 text-sm text-slate-500">
                            <p>{contactInfo.email}</p>
                            <p>{contactInfo.phone}</p>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
};

export default Header;
