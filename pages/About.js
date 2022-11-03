import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'

export default function About() {
    return (
      <div className={styles.container}>
        <Header active="About" />

        <main className={styles.main}>
          <h1 className={styles.AboutTitle}>Learn About Me</h1>
          <div className={styles.About}>
            <p>
              Hello, my name is Iyobed Zekarias (yo-bed – zuh-car-ee-us), I am a
              computer programmer currently located in New York City. I have a
              passion for both technology and building things, building computer
              programs combines both of these passions. I try and seek out
              interesting new topics and areas to learn about in order to fill
              my tinkering needs. Lately, this has been in the areas of
              quantitative analytics. I have a background in business as well as
              technology so this has led me to look into the fields of finance
              and trading as I work towards getting my masters in financial
              engineering. My interests lately seem to take longer than there
              are hours in the day these days, but that might be a better
              problem to have than most. Professionally, I am currently working
              as a Technology Consultant in the Data and Analytics department of
              EY which has given me the opportunity to work on so many different
              technologies and has given me a broad understanding of how both
              business needs and new technologies interact every day.
            </p>
            <p>
              Some things about me, I love running, working out, and getting
              active in general. NYC is a great place to do that whether it’s
              going to a park, gym, or taking a train out of the city. I moved
              here along with my beautiful wife from Nashville, TN where I grew
              up. I also went to college in Nashville at Lipscomb University and
              have maintained a great relationship with that community. I’m
              looking forward to what the future holds in both professionally
              and personally as I traverse this concrete jungle.
            </p>
            <Image
              src="/Headshot.png"
              height={400}
              width={400}
              alt="photo of me"
            />
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
              <Image
                src="/Iyobed.svg"
                alt="Vercel Logo"
                width={76}
                height={36}
              />
            </span>
          </a>
        </footer>
      </div>
    );
}