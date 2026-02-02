import React from 'react';

const Footer = () => {
    return (
        <footer className="py-8 border-t border-white/5">
            <div className="container mx-auto px-6 text-center">
                <p className="text-slate-500 text-sm">
                    © {new Date().getFullYear()} Uzairkhan Pathan. All rights reserved.
                </p>

            </div>
        </footer>
    );
};

export default Footer;
