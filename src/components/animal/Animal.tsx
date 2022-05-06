//css
import styles from './animal.module.css';

interface AnimalProps{
  children: React.ReactNode;
}
export default function Animal(props: AnimalProps) {
  return (
    <div className={styles.animal}> 
      {props.children}
    </div>
  )
}
