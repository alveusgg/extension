//css
import styles from './animal.module.css';

interface AnimalProps{
  children: React.ReactNode;
  ClassName: string
  Id?: string

  onClick?: () => void
}
export default function Animal(props: AnimalProps) {
  return (
    <div id={props.Id} className={`${styles.animal} ${props.ClassName}`} onClick={props.onClick}> 
      {props.children}
    </div>
  )
}
