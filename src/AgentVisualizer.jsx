import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Table, BarChart3, LayoutPanelLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const AgentVisualizer = ({ content }) => {
  const [view, setView] = useState('table'); // 'table' or 'chart'

  // Simple parser to turn Markdown tables into JSON for Recharts
  const parseTableData = (text) => {
    const lines = text.split('\n').filter(line => line.includes('|'));
    if (lines.length < 3) return null;

    // Extract headers and data rows
    const headers = lines[0].split('|').map(h => h.trim()).filter(Boolean);
    const dataRows = lines.slice(2).map(row => {
      const cells = row.split('|').map(c => c.trim()).filter(Boolean);
      let obj = {};
      headers.forEach((header, i) => {
        // Convert "$21,902 M" string to a number for the chart
        const val = cells[i]?.replace(/[^0-9.-]/g, '');
        obj[header] = isNaN(parseFloat(val)) ? cells[i] : parseFloat(val);
      });
      return obj;
    });
    return dataRows;
  };

  const chartData = parseTableData(content);

  return (
    <div className="space-y-4">
      {/* Switcher Tabs */}
      {chartData && (
        <div className="flex gap-2 mb-2 border-b border-slate-100 pb-2">
          <button 
            onClick={() => setView('table')}
            className={`flex items-center gap-1 px-3 py-1 rounded-md text-xs transition ${view === 'table' ? 'bg-blue-100 text-blue-700' : 'text-slate-500 hover:bg-slate-100'}`}
          >
            <Table size={14} /> Table
          </button>
          <button 
            onClick={() => setView('chart')}
            className={`flex items-center gap-1 px-3 py-1 rounded-md text-xs transition ${view === 'chart' ? 'bg-blue-100 text-blue-700' : 'text-slate-500 hover:bg-slate-100'}`}
          >
            <BarChart3 size={14} /> Chart
          </button>
        </div>
      )}

      {/* Conditional Rendering */}
      <div className="min-h-[300px]">
        {view === 'table' || !chartData ? (
          <div className="prose prose-sm max-w-none prose-slate">
             <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>
        ) : (
          <div className="h-[300px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey={Object.keys(chartData[0])[0]} tick={{fontSize: 12}} />
                <YAxis tick={{fontSize: 12}} />
                <Tooltip />
                <Legend />
                {/* Dynamically create bars for each column after the first one */}
                {Object.keys(chartData[0]).slice(1).map((key, index) => (
                  <Bar key={key} dataKey={key} fill={index % 2 === 0 ? '#2563eb' : '#fb7185'} radius={[4, 4, 0, 0]} />
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
