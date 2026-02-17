# 💼 Agentic FIS – Frontend

A modern React-based AI interface for interacting with specialized Financial Intelligence System (FIS) Agents.

This frontend enables users to ask complex financial, strategic, operational, and risk-related questions and routes them to purpose-built AI agents hosted on Databricks.

---

# 🚀 Overview

Agentic FIS is an intelligent multi-agent financial assistant platform designed to handle diverse financial and enterprise-related queries.

The system consists of:

- 🎨 React + Tailwind Frontend (this repository)
- 🔐 FastAPI Backend Proxy (hosted on Render)
- 🤖 AI Agents deployed via Databricks Model Serving

The frontend provides a clean, responsive, and intuitive interface for interacting with six specialized AI agents.

---

# 🧠 FIS Agent System

The platform includes **six specialized AI agents**, each designed with a unique persona and domain focus:

---

## 1️⃣ Executive Portfolio Advisor

Focus:
- Portfolio performance analysis
- Revenue insights
- Strategic financial summaries
- KPI breakdowns
- Investment-level decision support

Best for:
- Executives
- Portfolio managers
- C-level reporting

---

## 2️⃣ Country & Regional Strategy Agent

Focus:
- Country-level financial performance
- Regional market comparisons
- Expansion strategy insights
- Macro-level business analysis

Best for:
- Strategy teams
- Regional directors
- Global business units

---

## 3️⃣ Project Delivery Timeline Agent

Focus:
- Project milestones
- Delivery tracking
- Timeline forecasting
- Budget vs timeline correlation
- Execution performance

Best for:
- Project managers
- Delivery leads
- Operations teams

---

## 4️⃣ Document & Project Intelligent Agent

Focus:
- Document summarization
- Project document analysis
- Extracting structured insights
- Intelligent contextual Q&A

Best for:
- PMOs
- Analysts
- Documentation-heavy workflows

---

## 5️⃣ Risk and Compliance Agent

Focus:
- Risk identification
- Regulatory concerns
- Compliance validation
- Financial risk exposure
- Governance insights

Best for:
- Risk officers
- Compliance teams
- Audit departments

---

## 6️⃣ Web Agent

Focus:
- General knowledge
- Non-financial queries
- Web-style informational questions

Purpose:
Acts as a fallback/general-purpose agent for non-financial conversations.

---

# 🏗 Architecture

User
↓
React + Tailwind Frontend (Vercel)
↓
Backend Proxy (Render)
↓
Databricks AI Agents


The frontend:

- Sends user queries to the backend `/api/chat`
- Displays streaming responses
- Maintains conversation history
- Allows selection between different agents

---

# 🛠 Tech Stack

- **React JS**
- **Tailwind CSS**
- **Vite (if used)**
- **Axios / Fetch API**
- **Vercel (Deployment)**

---

# 🎨 UI & Design

- Fully responsive layout
- Clean financial dashboard styling
- Tailwind utility-first styling
- Dark/light mode ready (if applicable)
- Chat-style conversational interface
- Agent persona selection support

---

# ⚙️ Environment Setup

Create a `.env` file in the root directory:


---

# 🛠 Installation & Setup

## 1️⃣ Clone the Repository

git clone https://github.com/your-username/agentic-fis-frontend.git

cd agentic-fis-frontend


## 2️⃣ Install Dependencies

npm install
## 3️⃣ Run Development Server
App will run at:
http://localhost:5173

---

# 🚀 Deployment

Frontend is deployed using **Vercel**.

## Deployment Steps

1. Push repository to GitHub
2. Import project in Vercel
3. Add environment variable:
VITE_API_BASE_URL
4. Deploy

Vercel automatically handles:
- CI/CD
- HTTPS
- Global CDN
- Automatic builds on push

---

# 🔐 Security Considerations

- No Databricks tokens stored in frontend
- All secure communication handled by backend
- HTTPS enforced via Vercel
- CORS controlled server-side

---

# 📂 Suggested Project Structure

src/
│
├── components/
│ ├── ChatWindow.jsx
│ ├── AgentSelector.jsx
│ ├── MessageBubble.jsx
│
├── pages/
│ └── Home.jsx
│
├── services/
│ └── api.js
│
├── App.jsx
├── main.jsx


---

# 🌟 Key Features

- Multi-agent financial intelligence system
- Persona-driven AI responses
- Streaming chat interface
- Real-time interaction
- Financial & strategic insight support
- Scalable architecture

---

# 📈 Future Improvements

- Conversation persistence (localStorage / DB)
- Authentication layer
- Role-based agent access
- Dashboard analytics view
- Agent usage metrics
- Chat export functionality
- Voice input support

---

# 🎯 Project Goal

Agentic FIS aims to demonstrate how multi-agent AI systems can:

- Improve financial decision-making
- Provide executive-ready insights
- Enhance project governance
- Support risk & compliance workflows
- Deliver contextual, domain-specific AI intelligence

This project showcases applied AI architecture combining:
Frontend UX + Secure Backend Proxy + Enterprise AI Agents.

---

# 📄 License

MIT License (or your chosen license)
