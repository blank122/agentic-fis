import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Paperclip, Terminal, Zap, ArrowRight, Database, Shield, Cpu } from 'lucide-react';
import ChatView from './ChatView';
import HomeView from './HomeView';

export default function App() {
    const [view, setView] = useState('home');
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hello! I am FIS Agent. How can I assist with you today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const agents = [
        {
            title: "Investment Portfolio & Financial Analysis Agent",
            desc: "Money in / money out, comparisons, trends, portfolio concentration.",
            icon: <Database className="text-blue-500" />,
            capability: "Workflow Automation"
        },
        {
            title: "Country & Regional Strategy Agent",
            desc: "Geographic performance, country comparisons, regional strategy.",
            icon: <Globe className="text-emerald-500" />, // Changed to Globe
            capability: "Audit & Compliance"
        },
        {
            title: "Project Timeline & Delivery Monitoring Agent",
            desc: "Delays, timelines, approvals vs reality, execution health.",
            icon: <Clock className="text-amber-500" />, // Changed to Clock
            capability: "Resource Management"
        },
        {
            title: "Risk, Status & Compliance Agent",
            desc: "Risk exposure, environmental categories, project status health.",
            icon: <AlertTriangle className="text-rose-500" />, // Changed to AlertTriangle
            capability: "Resource Management"
        },
        {
            title: "Web Agent",
            desc: "Filtering by document types, disclosure rules, metadata exploration.",
            icon: <Search className="text-indigo-500" />, // Changed to Search
            capability: "Resource Management"
        }
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (view === 'chat') scrollToBottom();
    }, [messages, view]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;
        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        setMessages(prev => [...prev, { role: 'assistant', content: 'Analyzing request...', isThinking: true }]);

        try {
            const response = await fetch('https://dbrix-orchestrator-2.onrender.com/ask', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ input: [...messages, userMessage] }),
            });
            const data = await response.json();
            setMessages(prev => {
                const filtered = prev.filter(m => !m.isThinking);
                const outputs = data.output || [];
                let replyText = null;
                for (let i = outputs.length - 1; i >= 0; i--) {
                    const t = outputs[i]?.content?.[0]?.text?.trim();
                    if (t && !/^<name>.*<\/name>$/i.test(t)) { replyText = t; break; }
                }
                if (!replyText) replyText = data.choices?.[0]?.message?.content ?? data.result ?? "No response received.";
                return [...filtered, { role: 'assistant', content: replyText }];
            });
        } catch (error) {
            setMessages(prev => [...prev.filter(m => !m.isThinking), { role: 'assistant', content: 'Error connecting to service.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
            <div className="hidden md:flex w-64 flex-col bg-slate-900 text-white">
                <div className="p-4 font-bold text-xl flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
                    <Zap className="text-blue-400" /> FIS Agentic Hub
                </div>
                <div className="flex-1 p-4">
                    <button
                        onClick={() => setView('chat')}
                        className={`w-full text-left p-3 rounded-lg text-sm transition ${view === 'chat' ? 'bg-slate-800 border-l-4 border-blue-500' : 'hover:bg-slate-800'}`}
                    >
                        Active Session
                    </button>
                </div>
            </div>

            {view === 'home' ? (
                <HomeView setView={setView} agents={agents} />
            ) : (
                <ChatView
                    setView={setView}
                    messages={messages}
                    input={input}
                    setInput={setInput}
                    handleSend={handleSend}
                    messagesEndRef={messagesEndRef}
                />
            )}
        </div>
    );
}
