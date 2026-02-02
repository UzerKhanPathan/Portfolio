import React, { useState } from 'react';
import { Send, MessageCircle, CheckCircle } from 'lucide-react';
import { API_URL } from '../config';

const AnonymousChat = () => {
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!message.trim()) return;

        setIsSubmitting(true);

        try {
            const response = await fetch(`${API_URL}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message.trim() }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send message');
            }

            setSubmitted(true);
            setMessage('');

            // Reset after 5 seconds
            setTimeout(() => {
                setSubmitted(false);
            }, 5000);
        } catch (error) {
            console.error('Error sending message:', error);
            alert(error.message || 'Failed to send message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="anonymous-chat" className="py-24">
            <div className="container mx-auto px-6 max-w-3xl">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                        <MessageCircle className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Anonymous Message</h2>
                    <p className="text-slate-400 text-lg">
                        Send me a message anonymously. No name required!
                    </p>
                </div>

                <div className="bg-black/30 backdrop-blur-2xl border border-white/20 rounded-2xl p-8 shadow-2xl">
                    {submitted ? (
                        <div className="text-center py-12">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/10 rounded-full mb-6">
                                <CheckCircle className="w-12 h-12 text-green-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                            <p className="text-slate-400">
                                Thank you for your anonymous message. I'll read it soon!
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label htmlFor="anonymous-message" className="block text-sm font-medium text-slate-300 mb-3">
                                    Your Message
                                </label>
                                <textarea
                                    id="anonymous-message"
                                    rows="6"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Type your message here... (completely anonymous)"
                                    className="w-full px-4 py-3 bg-black/20 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none"
                                    required
                                />
                                <p className="text-xs text-slate-500 mt-2">
                                    🔒 Your identity is completely anonymous. No tracking, no logs.
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting || !message.trim()}
                                className="w-full px-8 py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        Send Anonymous Message
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>

                <div className="mt-8 text-center">
                    <p className="text-sm text-slate-500">
                        💡 Tip: Be respectful and constructive. All messages are appreciated!
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AnonymousChat;
