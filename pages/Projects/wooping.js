import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import Header from "../../components/Header";
import { useState } from "react";

export function getStaticProps() {
  return {
    props: {
      CaptchaVariables: {
        service: process.env.SERVICE,
        template: process.env.TEMPLATE,
        publicKey: process.env.PUBLICKEY,
        captchKey: process.env.CAPTCHAKEY,
      },
    },
  };
}

export default function Wooping(props) {
  const [current, setCurrent] = useState();
  const resetState = () => { }
  return (
    <div className={styles.container}>
      <Header
        active="Projects"
        projActive="wooping"
        CaptchaVariables={props.CaptchaVariables}
      />

      <main className={styles.main}>
        <div
          className={current == "MORE" ? styles.ANumerical : styles.Numerical}
          onMouseEnter={() => {
            if (current != "MORE") {
              setCurrent("MORE");
              resetState();
            }
          }}
        >
          <h1 className={styles.AboutTitle}>IMPLEMENTATION COMING SOON</h1>
          <p className={styles.AboutParagraph}>
            Currently working on getting the API endpoints finished
          </p>
          <Link className={styles.AboutParagraph} href="/Projects/numerical">
            Click here to check out Numerical Project to see fully implemented
            project
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/IyobedZekarias"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by{" "}
          <span className={styles.logo}>
            <Image src="/Iyobed.svg" alt="Vercel Logo" width={76} height={36} />
          </span>
        </a>
      </footer>
    </div>
  );
}
