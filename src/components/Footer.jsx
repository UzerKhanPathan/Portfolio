import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-slate-950 py-8 border-t border-white/5">
            <div className="container mx-auto px-6 text-center">
                <p className="text-slate-500 text-sm">
                    © {new Date().getFullYear()} Uzerkhan Pathan. All rights reserved.
                </p>

            </div>
        </footer>
    );
};

export default Footer;
