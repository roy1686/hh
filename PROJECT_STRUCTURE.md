# Project Structure

```
veritas-ai/
├── backend/                  # FastAPI Application
│   ├── app/
│   │   ├── api/              # REST & WebSocket endpoints
│   │   ├── core/             # Configuration & security
│   │   ├── agents/           # The 6 distinct AI agents
│   │   ├── services/         # PDF parsing, ChromaDB integration
│   │   ├── models/           # Pydantic schemas for data validation
│   │   └── main.py           # Application entry point
│   ├── tests/                # Pytest unit and integration tests
│   ├── requirements.txt      # Python dependencies
│   └── Dockerfile            # Backend containerization
│
├── frontend/                 # React + Vite Application
│   ├── src/
│   │   ├── assets/           # Images, icons, fonts
│   │   ├── components/       # Reusable UI components (buttons, cards)
│   │   ├── features/         # Feature-specific components (chat, workflow panel)
│   │   ├── hooks/            # Custom React hooks (e.g., useAgents)
│   │   ├── pages/            # Page components (Dashboard, Landing)
│   │   ├── types/            # TypeScript interfaces
│   │   ├── App.tsx           # Main application component
│   │   └── index.css         # Tailwind directives and custom CSS
│   ├── public/               # Static assets
│   ├── package.json          # Node dependencies
│   ├── tailwind.config.js    # Tailwind configuration
│   ├── vite.config.ts        # Vite configuration
│   └── tsconfig.json         # TypeScript configuration
│
├── .github/
│   └── workflows/            # CI/CD pipelines (ci.yml)
│
├── Architecture.md           # System architecture documentation
├── AGENTS.md                 # Agent definitions
├── AGENTS_AND_SKILLS.md      # Reusable skills documentation
└── README.md                 # Project overview and setup instructions
```
