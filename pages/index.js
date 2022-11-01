import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback } from "react";
import styles from '../styles/Home.module.css'
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Header from '../components/Header'

export default function Home() {
  const options = {
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          area: 1000,
        },
      },
      color: {
        value: ["#fff", "#232338"],
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 1,
      },
      size: {
        value: { min: 1, max: 2 },
      },
      links: {
        enable: true,
        distance: 150,
        color: "#808080",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: false,
        straight: false,
        outModes: "out",
      },
    },
    interactivity: {
      detect_on: "window",
      events: {
        onHover: {
          enable: true,
          mode: "grab",
        },
        onClick: {
          enable: true,
          mode: "push",
        },
      },
      modes: {
        bubble: {
          distance: 400,
        },
        grab: {
          distance: 140,
          links: {
            opacity: 1,
          },
        },
        push: {
          quantity: 1,
        },
      },
    },
  };
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);
  return (
    <div className={styles.container}>
      <Particles
        className={styles.Particles}
        options={options}
        init={particlesInit}
      />
      <Head>
        <title>Iyobed Zekarias Portfolio</title>
        <meta name="description" content="Iyobed's projects and work" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <Header active="Home" />

      <main className={styles.main}>
        <div className={styles.Content}>
          <h1 className={styles.title}>Welcome to my Portfolio</h1>

          <p className={styles.description}>
            {" "}
            I set up this portfolio as a way of showcasing some of the projects
            that I am most proud of. There are projects included here that were
            written in python, C++, Javascript, and more. For my projects to run here I used
            a graphql schema to communicate between them and this front-end. The front end was created using the NextJS framework for React. In additon to the frontend, NextJS was used to build the api to connect to the projects as well. 
          </p>
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
