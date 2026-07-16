# PROJECT KNOWLEDGE BASE — portfolio

**Generated:** 2026-07-16

## OVERVIEW
Personal portfolio site v1. React 19 + Vite SPA. No 3D — static showcase with components-driven layout.

## STRUCTURE
```
portfolio/
├── src/
│   ├── components/   # 20+ React components
│   ├── data/         # portfolio.json (content data)
│   ├── hooks/        # Custom hooks
│   ├── App.jsx       # Root component
│   └── main.jsx      # Vite entry
├── public/           # Static assets
└── index.html
```

## WHERE TO LOOK
| Task | Location |
|------|----------|
| Portfolio content | `src/data/portfolio.json` |
| UI components | `src/components/` |
| Hooks | `src/hooks/` |

## CONVENTIONS
- **React 19** with Vite (not Next.js or CRA)
- **JSX** files (TypeScript installed but inactive)
- **oxlint** for linting (not ESLint)
- No CSS framework (plain CSS)
