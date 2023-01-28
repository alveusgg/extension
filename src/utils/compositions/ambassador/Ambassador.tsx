//css
import styles from './ambassador.module.css';

interface AmbassadorProps{
  children: React.ReactNode;
  ClassName: string
  Id?: string

  onClick?: () => void
}

export default function Ambassador(props: AmbassadorProps) {
  return (
    <div id={props.Id} className={`${styles.ambassador} ${props.ClassName}`} onClick={props.onClick}>
      {props.children}
    </div>
  )
}
