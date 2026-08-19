import { Fragment, ReactNode } from 'react'

// Os destaques vêm marcados com **asteriscos** para não prender JSX no
// dado; jogo e clássico renderizam a mesma string.
export function highlight(text: string): ReactNode {
  return text
    .split(/\*\*(.+?)\*\*/g)
    .map((part, i) =>
      i % 2 === 0 ? (
        <Fragment key={i}>{part}</Fragment>
      ) : (
        <strong key={i}>{part}</strong>
      ),
    )
}
