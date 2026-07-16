const tools = [
  { icon: '⌘',   title: 'command'    },
  { icon: '⎋',   title: 'escape'     },
  { icon: '//',   title: 'comment'    },
  { icon: '{}',   title: 'block'      },
  { icon: '↔',   title: 'navigate'   },
  { icon: '⊕',   title: 'new branch' },
  { icon: '✎',   title: 'edit'       },
  { icon: '◎',   title: 'focus'      },
  { icon: '⋯',   title: 'more'       },
]

/**
 * DrawingToolbar — Hu-inspired vertical icon strip on the right edge of the hero.
 * Dev-themed: command palette / Vim-mode markers rendered in chalk style.
 */
export default function DrawingToolbar() {
  return (
    <div className="drawing-toolbar" aria-hidden="true">
      {tools.map((tool, i) => (
        <button
          key={i}
          className="drawing-tool"
          title={tool.title}
          tabIndex={-1}
        >
          {tool.icon}
        </button>
      ))}
    </div>
  )
}
