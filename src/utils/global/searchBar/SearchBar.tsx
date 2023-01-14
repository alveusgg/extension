//css
import styles from './searchBar.module.css'

interface SearchBarProps {
    // search: (value: string) => void
}
export default function SearchBar(props: SearchBarProps){
    function search(value: string){
        // props.search(value)
    }
    return (
        <input type="search" onChange={(e)=>search(e.target.value)} className={styles.searchBar} placeholder="Search Ambassador"/>
    )
}