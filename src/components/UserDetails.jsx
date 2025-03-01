import styles from '../css/UserDetails.module.css'

const UserDetails = ({handleUserUser, userDetails}) => {
    return(
        <div className={styles.UserDetails}>
            <span>John Gabriel Orbeta</span>
            <span>Gabaya Street Olongapo City</span>
            <span>09123456789</span>
            <span>john@gmail.com</span>
            <button onClick={handleUserUser} className={styles.Closee}>Close</button>
        </div>
    )
}

export default UserDetails;