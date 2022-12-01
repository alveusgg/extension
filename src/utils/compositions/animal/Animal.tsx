//css
import styles from './animal.module.css';

interface AnimalProps{
  children: React.ReactNode;
  containerClassName: string
  onClick?: () => void
}
export default function Animal(props: AnimalProps) {
  return (
    <div className={`${styles.animal} ${props.containerClassName}`} onClick={props.onClick}> 
      {props.children}
    </div>
  )
}
