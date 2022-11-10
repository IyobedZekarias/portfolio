import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Email from "./Email"
import { useState, useEffect, useRef } from 'react'


export default function Header({ active, projActive, CaptchaVariables }) {
  const [emailOpen, OpenEmail] = useState(false)
  const [showProjects, setShowProjects] = useState(false)
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);


  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (!showProjects && ref.current && !ref.current.contains(event.target)) {
          setShowProjects(false)
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }


  const ProjectsList = (
    <div
      className={styles.projectList}
      onMouseLeave={() => setShowProjects(false)}
    >
      <Link
        href="/Projects/numerical"
        className={projActive == "numerical" ? styles.projact : styles.proj}
      >
        Numerical
      </Link>
      <Link
        href="/Projects/cryptography"
        className={projActive == "cryptography" ? styles.projact : styles.proj}
      >
        Cryptography
      </Link>
      <Link
        href="/Projects/wooping"
        className={projActive == "wooping" ? styles.projact : styles.proj}
      >
        Wooping
      </Link>
    </div>
  );

  return (
    <>
      <header className={styles.header}>
        {emailOpen ? <Email CloseEmail={OpenEmail} CaptchaVariables={CaptchaVariables} /> : <></>}
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
          <div
            className={styles.projects}
            ref={wrapperRef}
            onMouseLeave={() => setShowProjects(false)}
          >
            <Link
              href=""
              className={active == "Projects" ? styles.Active : styles.NActive}
              onMouseEnter={() => setShowProjects(true)}
              onClick={() => setShowProjects(!showProjects)}
            >
              Projects
            </Link>
            {showProjects ? ProjectsList : <></>}
          </div>
          <Link
            href="/Resume"
            className={active == "Resume" ? styles.Active : styles.NActive}
          >
            Resume
          </Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.Email}
            onClick={() => OpenEmail(true)}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <rect x="3" y="5" width="18" height="14" rx="2"></rect>
            <polyline points="3 7 12 13 21 7"></polyline>
          </svg>
        </div>
      </header>
    </>
  );
}