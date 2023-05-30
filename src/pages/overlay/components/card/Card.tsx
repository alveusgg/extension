import { classes } from '../../../../utils/classes'

import styles from './card.module.scss'

interface CardProps {
  children?: React.ReactNode,
  title?: string,
  className?: string,
}

export default function Card(props: CardProps) {
  const { children, title, className } = props

  return (
    <div className={classes(styles.card, className)}>
      {title && <h2 className={styles.title}>{title}</h2>}
      {children}
    </div>
  )
}
