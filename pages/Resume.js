import Image from "next/image";
import styles from "../styles/Home.module.css";
import React, { useState } from 'react'
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import Header from '../components/Header'


const options = {
  cMapUrl: "cmaps/",
  cMapPacked: true,
  standardFontDataUrl: "standard_fonts/",
};

export default function About(props) {
  const [file, setFile] = useState("Iyobed Zekarias Resume.pdf");
  const [numPages, setNumPages] = useState(null);

  console.log(props.CaptchaVariables)

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }
  return (
    <div className={styles.container}>
      <Header active="Resume" CaptchaVariables={props.CaptchaVariables} />

      <main className={styles.main}>
        <a className={styles.pdf} href={file} download>
          Download as PDF{" "}
          <Image alt="" src="/download.svg" width={20} height={20} />
        </a>
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          options={options}
          onLoadError={(e) =>
            console.log("Error while loading document! " + e.message)
          }
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              scale={props.isMobileView == true ? 0.65 : 1.0}
            />
          ))}
        </Document>
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


// About.getInitialProps = ( ctx ) => {
//   let isMobileView = (
//     ctx.req ? ctx.req.headers["user-agent"] : navigator.userAgent
//   ).match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i);

//   //Returning the isMobileView as a prop to the component for further use.
//   return {
//     isMobileView: Boolean(isMobileView),
//     CaptchaVariables: {
//       service: process.env.SERVICE,
//       template: process.env.TEMPLATE,
//       publicKey: process.env.PUBLICKEY,
//       captchKey: process.env.CAPTCHAKEY
//     }
//   };
// }

export function getStaticProps() {
  // let isMobileView = (
  //   ctx.req ? ctx.req.headers["user-agent"] : navigator.userAgent
  // ).match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i);

  return {
    props: {
      CaptchaVariables: {
        service: process.env.SERVICE,
        template: process.env.TEMPLATE,
        publicKey: process.env.PUBLICKEY,
        captchKey: process.env.CAPTCHAKEY,
      },
      isMobileView: true,
    },
  };
}