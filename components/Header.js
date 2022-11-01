import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Header({active}) {
    return (
      <>
        <header className={styles.header}>
          <Link href="/" className={styles.Hero}>
            <Image
              alt="profile photo"
              src="/profile.png"
              width={80}
              height={80}
              style={{ marginRight: "20px" }}
            />
            <h3>Iyobed Zekarias</h3>
          </Link>
          <div className={styles.navigation}>
            <Link
              href="/"
              className={active == "Home" ? styles.Active : styles.NActive}
            >
              Home
            </Link>
            <Link
              href="/About"
              className={active == "About" ? styles.Active : styles.NActive}
            >
              About Me
            </Link>
            <Link
              href="/Projects"
              className={active == "Projects" ? styles.Active : styles.NActive}
            >
              Projects
            </Link>
            <Link
              href="/Resume"
              className={active == "Resume" ? styles.Active : styles.NActive}
            >
              Resume
            </Link>
          </div>
        </header>
      </>
    );
}