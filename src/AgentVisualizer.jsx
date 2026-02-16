import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Table as TableIcon, BarChart3 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const AgentVisualizer = ({ content }) => {
    const [view, setView] = useState('table');

    const chartData = useMemo(() => {
        const lines = content.split('\n').filter(line => line.includes('|'));
        if (lines.length < 3) return null;

        const headers = lines[0].split('|').map(h => h.trim()).filter(Boolean);

        const data = lines.slice(2).map(row => {
            const cells = row.split('|').map(c => c.trim()).filter(Boolean);
            let obj = {};
            headers.forEach((header, i) => {
                const rawValue = cells[i] || "";
                const numericClean = rawValue.replace(/[$,%]/g, '').trim();
                const isNumeric = numericClean !== '' && !isNaN(numericClean);
                obj[header] = isNumeric ? parseFloat(numericClean) : rawValue;
            });
            return obj;
        });

        const numericKeys = headers.slice(1).filter(key =>
            data.some(row => typeof row[key] === 'number')
        );

        return { data, numericKeys, xAxisKey: headers[0] };
    }, [content]);

    const hasChartableData = chartData && chartData.numericKeys.length > 0;

    return (
        <div className="w-full overflow-hidden">
            {/* Tab Header - Removed outer border, kept bottom divider for clarity */}
            <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <div className="flex gap-1">
                    <button
                        onClick={() => setView('table')}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                            view === 'table' ? 'bg-slate-100 text-blue-600' : 'text-slate-500 hover:bg-slate-50'
                        }`}
                    >
                        <TableIcon size={14} /> Table
                    </button>
                    {hasChartableData && (
                        <button
                            onClick={() => setView('chart')}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                                view === 'chart' ? 'bg-slate-100 text-blue-600' : 'text-slate-500 hover:bg-slate-50'
                            }`}
                        >
                            <BarChart3 size={14} /> Chart
                        </button>
                    )}
                </div>
            </div>

            <div className="py-4">
                {view === 'table' || !hasChartableData ? (
                    <div className="prose prose-sm max-w-none prose-slate prose-th:bg-slate-50/50 prose-th:px-4 prose-td:px-4 prose-th:py-2">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
                    </div>
                ) : (
                    <div className="h-[350px] w-full mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={chartData.data}
                                layout="vertical"
                                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                                <XAxis type="number" hide />
                                <YAxis
                                    dataKey={chartData.xAxisKey}
                                    type="category"
                                    tick={{ fill: '#64748b', fontSize: 10 }}
                                    width={100}
                                />
                                <Tooltip
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                                />
                                {chartData.numericKeys.map((key) => (
                                    <Bar
                                        key={key}
                                        dataKey={key}
                                        radius={[0, 4, 4, 0]}
                                        barSize={20}
                                    >
                                        {chartData.data.map((entry, i) => (
                                            <Cell key={`cell-${i}`} fill={['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'][i % 5]} />
                                        ))}
                                    </Bar>
                                ))}
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AgentVisualizer;
