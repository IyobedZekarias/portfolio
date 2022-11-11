import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import Header from "../../components/Header";
import { useEffect, useState } from "react";

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

export default function Cryptography(props) {
  
  const [current, setCurrent] = useState();
  const [body, setBody] = useState({});
  const [level2, set2] = useState(false);
  const [load2, setL2] = useState(false)
  const [level3, set3] = useState(false)
  const [load3, setL3] = useState(false)
  const [answer, setAnswer] = useState({});

  const endLoads = () => {
    setL2(false)
    setL3(false)
  }

  const resetState = () => {
    setBody({});
    set2(false);
    set3(false)
    setAnswer({});
    endLoads()
  };

  const handleAPIcall = async (e, submit) => {
    const config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submit),
    };

    try {
      const response = await fetch("/api/proj/crypto", config);
      
      const json = await response.json();
      endLoads()

      if (response.status == 405) {
        alert(json["Message"]);
        return;
      }
      setAnswer(json)
      setBody({})
    } catch (error) {
      alert(error);
    }
  };

  const handleFocus = (e) => {
    if(!(e.target.name in body)) setBody({ ...body, [e.target.name]: "" });
  };
  const handleChange = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.container}>
      <Header
        active="Projects"
        projActive="cryptography"
        CaptchaVariables={props.CaptchaVariables}
      />

      <main className={styles.main}>
        {/* DESCRIPTION */}
        <div
          className={
            current == "Description" ? styles.ANumerical : styles.Numerical
          }
          onMouseEnter={() => {
            if (current != "Description") {
              setCurrent("Description");
              resetState();
            }
          }}
        >
          <h1 className={styles.AboutTitle}>Cryptography</h1>
          <p className={styles.AboutParagraph}>
            This is my cryptography library that I built using C++. This library
            was mostly meant as a way to be a much lighter version of openssl
            which allows user to build keys for transmitting data all over. To
            create this project I created a RESTful API with C++ (easier said
            than done) and deployed it to heroku. Using the routes I connected
            to my cryptography library crypto_iz and started running all the
            functionality as API endpoints.
            <br />
            <br />
            The main points about this project are the library that I created
            and the RESTful API that I created.
            <br />
            The library is a production worthy C++ shared object that allows the
            user to implement a number of Cryptography functions that aren't
            freely available many other places.
            <br />
            <br />
            The API was built using CROW a C++ library that was built to be as
            similar to python flask as possible.
          </p>
          <p className={styles.AboutParagraph}>
            Below are the implementations of the programs functions, just click
            on a name to get started.
          </p>
          <p className={styles.AboutParagraph}>
            The code for the Cryptography Library can be found here{" "}
            <a
              href={"https://github.com/IyobedZekarias/Crypto/tree/main"}
              style={{ color: "#0070f3" }}
            >
              here
            </a>
            .
          </p>
          <p className={styles.AboutParagraph}>
            The code for the C++ REST API can be found here{" "}
            <a
              href={"https://github.com/IyobedZekarias/cppAPI"}
              style={{ color: "#0070f3" }}
            >
              here
            </a>
            .
          </p>
        </div>

        {/* AES */}
        <div
          onMouseEnter={() => {
            if (current != "AES") {
              setCurrent("AES");
              resetState();
            }
          }}
          className={current == "AES" ? styles.ANumerical : styles.Numerical}
        >
          <h1 className={styles.AboutTitle}>AES Cipher</h1>
          {current == "AES" ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <form className={styles.ModalForm}>
                <label
                  className={styles.ModalName}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  Plain Text To Cipher
                  <textarea
                    className={styles.ModalInput}
                    type="text"
                    name="plain"
                    placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam nulla porttitor massa id. Platea dictumst vestibulum rhoncus est pellentesque. Mattis molestie a iaculis at erat pellentesque adipiscing commodo elit."
                    cols={70}
                    rows={6}
                    style={{ resize: "none" }}
                    value={body["plain"]}
                    onFocus={handleFocus}
                    onChange={handleChange}
                  />
                </label>
                <button
                  className={styles.ModalSubmit}
                  type="button"
                  value="Submit"
                  onClick={(e) => {
                    const submit = {
                      ...body,
                      direction: "encode",
                      function: "aes",
                    };
                    setL2(true);
                    handleAPIcall(e, submit);
                    set2(true);
                  }}
                >
                  Run Encoding
                </button>
              </form>
              {level2 ? (
                <div
                  className={styles.Matrix}
                  style={{
                    display: "flex",
                    maxWidth: "80%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {load2 ? (
                    <>
                      <Image
                        src="/RippleLoad.svg"
                        alt="Loading Logo"
                        width={100}
                        height={100}
                      />
                    </>
                  ) : (
                    <div
                      className={styles.matrixTot}
                      style={{ maxWidth: "100%", overflowWrap: "anywhere" }}
                    >
                      <p className={styles.matrixVal}>Your key</p>
                      <p className={styles.matrixVal}>{answer["key"]}</p>
                      <br />
                      <p className={styles.matrixVal}>Your encoded cipher</p>
                      <p className={styles.matrixVal}>{answer["cipher"]}</p>
                    </div>
                  )}
                </div>
              ) : (
                <></>
              )}
              {level2 && !load2 ? (
                <form className={styles.ModalForm}>
                  <label
                    className={styles.ModalName}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      marginTop: "2vh",
                    }}
                  >
                    Key
                    <input
                      className={styles.ModalInput}
                      type="text"
                      name="key"
                      placeholder="5I68BR+32Wpq1BiVWfv4Pw=="
                      value={body["key"]}
                      onFocus={handleFocus}
                      onChange={handleChange}
                    />
                  </label>
                  <label
                    className={styles.ModalName}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    Cipher Text to Decode
                    <textarea
                      className={styles.ModalInput}
                      type="text"
                      name="cipher"
                      placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam nulla porttitor massa id. Platea dictumst vestibulum rhoncus est pellentesque. Mattis molestie a iaculis at erat pellentesque adipiscing commodo elit."
                      cols={70}
                      rows={6}
                      style={{ resize: "none" }}
                      value={body["cipher"]}
                      onFocus={handleFocus}
                      onChange={handleChange}
                    />
                  </label>
                  <button
                    className={styles.ModalSubmit}
                    type="button"
                    value="Submit"
                    onClick={(e) => {
                      const submit = {
                        ...body,
                        direction: "decode",
                        function: "aes",
                      };
                      setL3(true);
                      handleAPIcall(e, submit);
                      set3(true);
                    }}
                  >
                    Run Decoding
                  </button>
                </form>
              ) : (
                <></>
              )}
              {level3 ? (
                <div
                  className={styles.Matrix}
                  style={{
                    display: "flex",
                    maxWidth: "80%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {load3 ? (
                    <>
                      <Image
                        src="/RippleLoad.svg"
                        alt="Loading Logo"
                        width={100}
                        height={100}
                      />
                    </>
                  ) : (
                    <div
                      className={styles.matrixTot}
                      style={{ maxWidth: "100%", overflowWrap: "anywhere" }}
                    >
                      <p className={styles.matrixVal}>Your key</p>
                      <p className={styles.matrixVal}>{answer["key"]}</p>
                      <br />
                      <p className={styles.matrixVal}>Your decoded plaintext</p>
                      <p className={styles.matrixVal}>{answer["plain"]}</p>
                    </div>
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <></>
          )}
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
