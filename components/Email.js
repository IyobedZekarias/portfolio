import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useState, useRef, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import ReCAPTCHA from "react-google-recaptcha";

export default function Email(props) {
    const refCaptcha = useRef();
    const [capStage, setCapStage] = useState(false)

    const [toSend, setToSend] = useState({
        user_name: '',
        email: '',
        message: '',
    })

    const [sent, setSent] = useState(false)

    const [keys, setKeys] = useState(props.CaptchaVariables);

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = refCaptcha.current.getValue(); 

        const params = {
          ...toSend,
          "g-recaptcha-response": token,
        }; 

        console.log(token)

        emailjs.send(keys.service, keys.template, params, keys.publicKey, 'g-recaptcha-response')
            .then((response) => console.log('SUCCESS', response.status))
            , (error) => console.log(error.text);
        
        setToSend({
            user_name: "",
            email: "",
            message: "",
        });
      setCapStage(false)
      setSent(true)
    }
    const handleChange = (e) => {
        setToSend({ ...toSend, [e.target.name]: e.target.value })
    }
    return (
      <>
        <div
          onClick={() => {
            props.CloseEmail(false);
            setCapStage(false);
          }}
          className={styles.EmailModal}
        >
          <div onClick={(e) => e.stopPropagation()} className={styles.Modal}>
            <div className={styles.ModalClose}>
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
                onClick={() => {
                  props.CloseEmail(false);
                  setCapStage(false);
                }}
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <rect x="4" y="4" width="16" height="16" rx="2"></rect>
                <path d="M10 10l4 4m0 -4l-4 4"></path>
              </svg>
            </div>
            {sent ? (
              <div style={{ display: "flex", flexDirection: "row", marginBottom: '20px', alignItems:'center', justifyContent: 'center'}}>
                <p style={{color: 'black'}}>
                  Message Sent! &nbsp;&nbsp;&nbsp;
                </p>
                <svg
                  fill="#000000"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  width="100px"
                  height="100px"
                >
                  <path d="M 25 2 C 12.317 2 2 12.317 2 25 C 2 37.683 12.317 48 25 48 C 37.683 48 48 37.683 48 25 C 48 20.44 46.660281 16.189328 44.363281 12.611328 L 42.994141 14.228516 C 44.889141 17.382516 46 21.06 46 25 C 46 36.579 36.579 46 25 46 C 13.421 46 4 36.579 4 25 C 4 13.421 13.421 4 25 4 C 30.443 4 35.393906 6.0997656 39.128906 9.5097656 L 40.4375 7.9648438 C 36.3525 4.2598437 30.935 2 25 2 z M 43.236328 7.7539062 L 23.914062 30.554688 L 15.78125 22.96875 L 14.417969 24.431641 L 24.083984 33.447266 L 44.763672 9.046875 L 43.236328 7.7539062 z" />
                </svg>
              </div>
            ) : (
              <form className={styles.ModalForm}>
                <h1 style={{ color: "black" }}>Send Me a Message</h1>
                <label className={styles.ModalName}>
                  <input
                    className={styles.ModalInput}
                    onChange={handleChange}
                    type="text"
                    name="user_name"
                    placeholder="Name"
                    value={toSend.user_name}
                  />
                </label>
                <label className={styles.ModalEmail}>
                  <input
                    className={styles.ModalInput}
                    onChange={handleChange}
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={toSend.email}
                  />
                </label>
                <label className={styles.ModalMessage}>
                  <textarea
                    className={styles.ModalInput}
                    rows={5}
                    cols={39}
                    onChange={handleChange}
                    type="text"
                    name="message"
                    placeholder="Message"
                    value={toSend.message}
                  />
                </label>
                <ReCAPTCHA
                  ref={refCaptcha}
                  sitekey={keys.captchKey}
                  onChange={() => setCapStage(true)}
                  style={{ margin: "5px" }}
                />
                {capStage ? (
                  <button
                    className={styles.ModalSubmit}
                    type="button"
                    value="Submit"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    className={styles.ModalSubmitDisabled}
                    type="button"
                    value="Submit"
                    disabled={true}
                    onClick={() => {
                      setCapStage(true);
                      setSent(true);
                    }}
                  >
                    Submit
                  </button>
                )}
              </form>
            )}
          </div>
        </div>
      </>
    );
};