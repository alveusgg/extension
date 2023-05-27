import website from '../../../../assets/alveusIntro/website.jpg'
import amazonWishlist from '../../../../assets/alveusIntro/amazonWishlist.jpg'
import instagram from '../../../../assets/alveusIntro/instagram.jpg'
import tiktok from '../../../../assets/alveusIntro/tiktok.jpg'
import twitter from '../../../../assets/alveusIntro/twitter.jpg'
import gitHub from '../../../../assets/alveusIntro/github.jpg'

import styles from './alveusIntro.module.css'

interface AlveusIntroProps {
    showAlveusIntro: boolean;
}
export default function AlveusIntro(props: AlveusIntroProps){
    return(
        <div className={`${styles.alveusIntro} ${props.showAlveusIntro ? styles.visible : styles.hidden}`}>
            <h2 className={styles.title}>Welcome to Alveus</h2>

            <p className={styles.intro}>
              Alveus is a 501(c)(3) non-profit organization that functions as
              an exotic animal sanctuary and as a virtual education center.
              These animals function as educational ambassadors so viewers can
              learn from and build a connection to them. This helps viewers
              develop a love for the species and the natural world as a whole.
            </p>

            <ul className={styles.socials}>
                <li>
                    <a href="https://www.alveussanctuary.org/" rel="noreferrer" target="_blank">
                        <img src={website} alt="Website"/>
                    </a>
                </li>
                <li>
                    <a href="https://smile.amazon.com/hz/wishlist/ls/ZM472JRT5QXG" rel="noreferrer" target="_blank">
                        <img src={amazonWishlist} alt="Amazon Wishlist" />
                    </a>
                </li>
                <li>
                    <a href="https://www.instagram.com/alveussanctuary/" rel="noreferrer" target="_blank">
                        <img src={instagram} alt="Instagram" />
                    </a>
                </li>
                <li>
                    <a href="https://www.tiktok.com/@alveussanctuary" rel="noreferrer" target="_blank">
                        <img src={tiktok} alt="TikTok" />
                    </a>
                </li>
                <li>
                    <a href="https://twitter.com/AlveusSanctuary" rel="noreferrer" target="_blank">
                        <img src={twitter} alt="Twitter" />
                    </a>
                </li>
            </ul>

            <a className={styles.contribute} href="https://github.com/alveusgg/extension" rel="noreferrer" target="_blank">
                Contribute to the Extension
                <img src={gitHub} alt="GitHub" />
            </a>
        </div>
    )
}
