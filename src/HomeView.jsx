import { Send, Bot, User, Paperclip, Terminal, Zap, ArrowRight, Database, Shield, Cpu } from 'lucide-react';


export default function HomeView  ({ setView, agents })  {
    <div className="flex-1 overflow-y-auto bg-slate-50">
        <div className="max-w-5xl mx-auto px-6 py-20">
            <div className="text-center mb-16">
                <div className="inline-block p-3 bg-blue-100 rounded-2xl mb-6">
                    <Zap size={40} className="text-blue-600" />
                </div>
                <h1 className="text-5xl font-bold text-slate-900 mb-6">FIS Agentic Hub</h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                    Interact with specialized AI agents powered by Databricks Mosaic AI.
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
};
