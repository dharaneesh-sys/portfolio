import { useMemo } from 'react'

export default function LetterStagger({ text, as: Tag = 'h1', className = '', accentIndices = [], accentClass = 'accent' }) {
  const letters = useMemo(() => {
    return text.split('').map((char, i) => {
      if (char === ' ') return { char: '\u00A0', type: 'space', index: i }
      return { char, type: 'letter', index: i }
    })
  }, [text])

  return (
    <Tag className={`hero-headline ${className}`} aria-label={text}>
      {letters.map((item, i) => (
        <span
          key={i}
          className={`hero-letter ${item.type === 'space' ? 'space' : ''} ${accentIndices.includes(i) ? accentClass : ''}`}
          style={{ animationDelay: `${0.05 + i * 0.035}s` }}
        >
          {item.char}
        </span>
      ))}
    </Tag>
  )
}
