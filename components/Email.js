import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useState, useRef, useEffect } from 'react'
import { keys } from './email.keys'
import emailjs from '@emailjs/browser'
import ReCAPTCHA from "react-google-recaptcha";

export default function Email({ CloseEmail }) {
    const refCaptcha = useRef();
    const [capStage, setCapStage] = useState(false)

    const [toSend, setToSend] = useState({
        user_name: '',
        email: '',
        message: '',
    })


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
    }
    const handleChange = (e) => {
        setToSend({ ...toSend, [e.target.name]: e.target.value })
    }
    return (
      <>
        <div
          onClick={() => {
            CloseEmail(false);
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
                  CloseEmail(false);
                  setCapStage(false);
                }}
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <rect x="4" y="4" width="16" height="16" rx="2"></rect>
                <path d="M10 10l4 4m0 -4l-4 4"></path>
              </svg>
            </div>
            <form className={styles.ModalForm}>
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
                    console.log(capStage);
                  }}
                >
                  Submit
                </button>
              )}
            </form>
          </div>
        </div>
      </>
    );
};