import { Send, Bot, User, Paperclip, Terminal, Zap, ArrowRight, Database, Shield, Cpu } from 'lucide-react';

export default function ChatView ({ setView, messages, input, setInput, handleSend, messagesEndRef }) {
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
};
