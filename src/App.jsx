import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Paperclip, Terminal, Zap, ArrowRight, Database, Shield, Cpu } from 'lucide-react';

export default function App() {
    const [view, setView] = useState('home'); // 'home' or 'chat'
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
            icon: <Shield className="text-emerald-500" />,
            capability: "Audit & Compliance"
        },
        {
            title: "Project Timeline & Delivery Monitoring Agent",
            desc: "Delays, timelines, approvals vs reality, execution health.",
            icon: <Cpu className="text-purple-500" />,
            capability: "Resource Management"
        },
        {
            title: "Risk, Status & Compliance Agent",
            desc: "Risk exposure, environmental categories, project status health.",
            icon: <Cpu className="text-purple-500" />,
            capability: "Resource Management"
        },
        {
            title: "Web Agent",
            desc: "Filtering by document types, disclosure rules, metadata exploration.",
            icon: <Cpu className="text-purple-500" />,
            capability: "Resource Management"
        }
    ];

    // --- Chat Logic ---
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

        setMessages(prev => [...prev, {
            role: 'assistant',
            content: 'Analyzing request via Databricks Agent...',
            isThinking: true
        }]);

        try {
            const response = await fetch('https://dbrix-orchestrator-2.onrender.com/ask', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // send `input` (list of messages) to match backend + Databricks
                body: JSON.stringify({ input: [...messages, userMessage] }),
              });

              const data = await response.json();

              setMessages(prev => {
                const filtered = prev.filter(m => !m.isThinking);

                // Prefer Databricks agents response shape
                const outputs = data.output || [];
                let replyText = null;

                // Walk outputs from last to first, pick the first non-<name>... tag
                for (let i = outputs.length - 1; i >= 0; i--) {
                  const t = outputs[i]?.content?.[0]?.text?.trim();
                  if (t && !/^<name>.*<\/name>$/i.test(t)) {
                    replyText = t;
                    break;
                  }
                }

                // Fallbacks for other response formats
                if (!replyText) {
                  replyText =
                    data.choices?.[0]?.message?.content ??
                    data.result ??
                    "No response received.";
                }

                return [
                  ...filtered,
                  {
                    role: 'assistant',
                    content: replyText,
                  },
                ];
              });
        } catch (error) {
            setMessages(prev => [...prev.filter(m => !m.isThinking), { role: 'assistant', content: 'Error connecting to service.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    // --- Views ---
    const HomeView = () => (
        <div className="flex-1 overflow-y-auto bg-slate-50">
            <div className="max-w-5xl mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <div className="inline-block p-3 bg-blue-100 rounded-2xl mb-6">
                        <Zap size={40} className="text-blue-600" />
                    </div>
                    <h1 className="text-5xl font-bold text-slate-900 mb-6">FIS Agentic Hub</h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Deploy, manage, and interact with specialized AI agents powered by Databricks Mosaic AI.
                    </p>
                    <button 
                        onClick={() => setView('chat')}
                        className="mt-10 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center gap-2 mx-auto shadow-lg shadow-blue-200"
                    >
                        Launch Orchestrator <ArrowRight size={20} />
                    </button>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {agents.map((agent, i) => (
                        <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-blue-300 transition-all shadow-sm group">
                            <div className="mb-4">{agent.icon}</div>
                            <h3 className="text-lg font-bold mb-2">{agent.title}</h3>
                            <p className="text-slate-500 text-sm mb-4 leading-relaxed">{agent.desc}</p>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                {agent.capability}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const ChatView = () => (
        <div className="flex flex-col flex-1 h-full">
            <header className="h-16 border-b bg-white flex items-center justify-between px-6 shadow-sm">
                <div className="flex items-center gap-3">
                    <button onClick={() => setView('home')} className="text-slate-400 hover:text-slate-600 mr-2 text-sm font-medium">← Back</button>
                    <div className="bg-blue-100 p-2 rounded-full">
                        <Bot size={20} className="text-blue-600" />
                    </div>
                    <div>
                        <h2 className="font-semibold text-sm">Agent Orchestrator</h2>
                        <p className="text-xs text-green-500">System Ready</p>
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-4 space-y-6">
                <div className="max-w-3xl mx-auto">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex gap-4 mb-6 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'assistant' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                                {msg.role === 'assistant' ? <Bot size={16} /> : <User size={16} />}
                            </div>
                            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm ${msg.role === 'assistant' ? 'bg-white border border-slate-200 rounded-tl-none text-slate-800' : 'bg-blue-600 rounded-tr-none text-white'}`}>
                                {msg.isThinking ? (
                                    <div className="flex items-center gap-2 italic animate-pulse">
                                        <Terminal size={14} /> {msg.content}
                                    </div>
                                ) : msg.content}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </main>

            <footer className="p-4 bg-white border-t">
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-center bg-slate-100 rounded-xl border border-slate-200 focus-within:border-blue-400 p-2">
                        <button className="p-2 text-slate-400"><Paperclip size={20} /></button>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask the agent to run a workflow..."
                            className="flex-1 bg-transparent border-none focus:ring-0 text-sm px-2 py-2"
                        />
                        <button onClick={handleSend} className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 shadow-md">
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );

    return (
        <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
            {/* Sidebar remains constant or could be hidden on Home */}
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

            {view === 'home' ? <HomeView /> : <ChatView />}
        </div>
    );
}
