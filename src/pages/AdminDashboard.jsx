import React, { useState, useEffect } from 'react';
import { Shield, Trash2, RefreshCw, LogOut, MessageSquare, Calendar, Clock, Lock } from 'lucide-react';
import { API_URL } from '../config';

const AdminDashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const savedPassword = localStorage.getItem('adminToken');
        if (savedPassword) {
            setPassword(savedPassword);
            verifyLogin(savedPassword);
        }
    }, []);

    const verifyLogin = async (pwd) => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: pwd })
            });
            const data = await res.json();

            if (data.success) {
                setIsAuthenticated(true);
                localStorage.setItem('adminToken', pwd);
                fetchMessages(pwd);
            } else {
                localStorage.removeItem('adminToken');
                setError('Invalid password');
            }
        } catch (err) {
            setError('Login failed');
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        verifyLogin(password);
    };

    const fetchMessages = async (pwd = password) => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/messages`, {
                headers: { 'x-admin-password': pwd }
            });
            if (res.ok) {
                const data = await res.json();
                setMessages(data.messages || []);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this message?')) return;

        try {
            const res = await fetch(`${API_URL}/messages?id=${id}`, {
                method: 'DELETE',
                headers: { 'x-admin-password': password }
            });

            if (res.ok) {
                setMessages(messages.filter(msg => msg.id !== id));
            }
        } catch (err) {
            alert('Failed to delete');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setPassword('');
        setMessages([]);
        localStorage.removeItem('adminToken');
    };

    // Format date nicely
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-full mb-4">
                            <Lock className="w-8 h-8 text-blue-500" />
                        </div>
                        <h1 className="text-2xl font-bold text-white">Admin Access</h1>
                        <p className="text-slate-400 mt-2">Enter credentials to view messages</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter admin password"
                                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                autoFocus
                            />
                        </div>
                        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all disabled:opacity-50"
                        >
                            {loading ? 'Verifying...' : 'Access Dashboard'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <header className="flex justify-between items-center mb-10 pb-6 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                        <Shield className="w-8 h-8 text-blue-500" />
                        <h1 className="text-2xl font-bold text-white">Message Control Center</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => fetchMessages()}
                            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                            title="Refresh"
                        >
                            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors border border-red-500/20"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Total Messages</p>
                                <h3 className="text-3xl font-bold text-white mt-1">{messages.length}</h3>
                            </div>
                            <div className="p-3 bg-blue-500/10 rounded-xl">
                                <MessageSquare className="w-6 h-6 text-blue-500" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid gap-4">
                    {messages.length === 0 ? (
                        <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-slate-800">
                            <MessageSquare className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                            <p className="text-slate-500">No messages found</p>
                        </div>
                    ) : (
                        messages.map((msg) => (
                            <div key={msg.id} className="group bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-blue-500/30 transition-all">
                                <div className="flex justify-between items-start gap-4 mb-4">
                                    <div className="flex items-center gap-4 text-xs text-slate-500 font-mono">
                                        <span className="flex items-center gap-1 bg-slate-950 px-2 py-1 rounded">
                                            <Calendar className="w-3 h-3" />
                                            {formatDate(msg.created_at)}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            ID: {msg.id}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(msg.id)}
                                        className="text-slate-600 hover:text-red-400 p-1 opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
