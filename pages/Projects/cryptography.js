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
  
  const [current, setCurrent] = useState(["Description"]);
  const [body, setBody] = useState({});

  
  const [nnilevel2, setnni2] = useState(false);
  const [nniload2, setLnni2] = useState(false);
  const [modExp, setmodExp] = useState(false)

  const [aeslevel2, setaes2] = useState(false);
  const [aesload2, setLaes2] = useState(false);
  const [aeslevel3, setaes3] = useState(false);
  const [aesload3, setLaes3] = useState(false);

  const [shalevel2, setsha2] = useState(false);
  const [shaload2, setLsha2] = useState(false);

  const [nnianswer, setnniAnswer] = useState({});
  const [aesanswer, setaesAnswer] = useState({});
  const [shaanswer, setshaAnswer] = useState({});
  const [rsaanswer, setrsaAnswer] = useState({})

  const [rsakeys, setRSAKeys] = useState({})
  const [rsaLoad1, setRSAL1] = useState(true)
  const [rsaLoad2, setRSAL2] = useState(false)
  const [rsalevel2, setRSA2] = useState(false)
  const [rsaEffect, setRSAEffect] = useState(false)
  const [rsaExpand, setRSAExpand] = useState(false)


  const [rsaws, setRSAWS] = useState(undefined)
  const [genKeys, setGenKeys] = useState(true)

  useEffect(() => {
    setRSAWS(new WebSocket("wss://cppapi-portfolio-iz.herokuapp.com/rsakey"));
  }, [rsaEffect])

  useEffect(() => {
    if(rsaws == undefined || !genKeys) return
    rsaws.onopen = (event) => {
      console.log("opened websocket");
      if (!("pub" in rsakeys)) rsaws.send("regen")
      else rsaws.send("key");
    };

    rsaws.onmessage = (event) => {
      try {
        if(JSON.stringify(rsakeys) != event.data) setRSAKeys(JSON.parse(event.data));
        setRSAL1(false);
      } catch (e) {
        console.log(event.data);
      }
    };

    rsaws.onclose = (event) => {
      console.log("closed websocket");
    };
  }, [rsaws]);

  const endLoads = () => {
    setLnni2(false);
    setLaes2(false);
    setLaes3(false);
    setLsha2(false);
    setRSAL2(false)
  }

  const resetState = () => {
    setBody({});
  };

  const handleAPIcall = async (e, submit) => {
    // console.log(submit)
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

      if (response.status == 403) {
        alert(json["Message"]);
        return;
      }
      if(submit["function"] == "aes")
        setaesAnswer(json)
      else if (submit["function"] == "nni")
        setnniAnswer(json)
      else if (submit["function"] == "sha")
        setshaAnswer(json)
      else if (submit["function"] == "rsa")
        setrsaAnswer(json)
      
      setBody({shaplain:body["shaplain"], aesplain:body["aesplain"], a:body["a"], b:body["b"], rsatext:body["rsatext"]})
    } catch (error) {
      alert(error);
    }
  };

  const handleNNIrand = async (e, size) => {
    if(e.target.name != "e") setmodExp(false)
    const obj = {
      function: "nni", 
      op: "rand", 
      size: size
    }

    const config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    };
    try {
      setBody({...body, [e.target.name]: "Loading"})
      const response = await fetch("/api/proj/crypto", config);
      
      const json = await response.json();

      if (response.status == 403) {
        alert(json["Message"]);
        return;
      }
      setBody({...body, [e.target.name]: json["ans"]})
    } catch (error) {
      alert(error);
    }
  }

  const handleFocus = (e) => {
    if(!(e.target.name in body)) setBody({ ...body, [e.target.name]: "" });
  };
  const handleChange = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  const downloadKeys = () => {
    const elementpriv = document.createElement("a");
    const elementpub = document.createElement("a")
    const filepriv = new Blob([rsakeys["priv"]], { type: 'text/plain' });
    const filepub = new Blob([rsakeys["pub"]], { type: 'text/plain' })
    elementpub.href = URL.createObjectURL(filepub);
    elementpriv.href = URL.createObjectURL(filepriv)
    elementpub.download = "pub.iyo";
    elementpriv.download = "priv.iyo";
    document.body.appendChild(elementpub); // Required for this to work in FireFox
    document.body.appendChild(elementpriv);
    elementpub.click()
    elementpriv.click()
  }

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
            current.at(current.length - 1).includes("Description")
              ? styles.ANumerical
              : styles.Numerical
          }
          onMouseEnter={() => {
            setCurrent([...current, "Description"]);
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

        {/* NNI */}
        <div
          onMouseEnter={() => {
            setCurrent([...current, "NNI"]);
          }}
          className={
            current.at(current.length - 1).includes("NNI")
              ? styles.ANumerical
              : styles.Numerical
          }
        >
          <h1 className={styles.AboutTitle}>
            Multiprecision Non Negative Integers
          </h1>
          {current.includes("NNI") ? (
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
                  Enter two very big numbers or generate a random ones
                  <textarea
                    className={styles.ModalInput}
                    type="text"
                    name="a"
                    placeholder="203628331141104498555696721217956672687032336458202513544840206364338423529007609885075294830182683290567422018990753787543433642599771621545489102980293721128786695716193327892688817866015865827680088291194655207328329511794890588331141104498555696721217956672687032336458202513544840206364338423529007609885075294830182683290567422018990753787543433642599771621584235290076098850752948301826832905674220189907537875434336425997716215454891029802937211287866957161933278926888178660158658276800882911946552073283295117948905883311411044985556943384235290076098850752948301826832905674220189907537875434336425997716215454891029802937211287866957161933278926888178660158658276800882911946552073283295117948905883311411044985556967212179566726870323364582025135448402063643384235290076098850752948301826832905674220189907537875434336425997716215842352900760988507529483018268329056742201899075378754343364259977162154548910298029372112878669571619332789268881786601"
                    value={body["a"]}
                    onFocus={handleFocus}
                    onChange={(e) => {
                      const re = /^[0-9\b]*$/;
                      if (re.test(e.target.value)) handleChange(e);
                    }}
                  />
                  <button
                    className={styles.ModalSubmit}
                    type="button"
                    value="Submit"
                    name="a"
                    onClick={(e) => handleNNIrand(e, 100)}
                  >
                    Generate x
                  </button>
                  <textarea
                    className={styles.ModalInput}
                    type="text"
                    name="b"
                    placeholder="203628331141104498555696721217956672687032336458202513544840206364338423529007609885075294830182683290567422018990753787543433642599771621545489102980293721128786695716193327892688817866015865827680088291194655207328329511794890588331141104498555696721217956672687032336458202513544840206364338423529007609885075294830182683290567422018990753787543433642599771621584235290076098850752948301826832905674220189907537875434336425997716215454891029802937211287866957161933278926888178660158658276800882911946552073283295117948905883311411044985556943384235290076098850752948301826832905674220189907537875434336425997716215454891029802937211287866957161933278926888178660158658276800882911946552073283295117948905883311411044985556967212179566726870323364582025135448402063643384235290076098850752948301826832905674220189907537875434336425997716215842352900760988507529483018268329056742201899075378754343364259977162154548910298029372112878669571619332789268881786601"
                    value={body["b"]}
                    onFocus={handleFocus}
                    onChange={(e) => {
                      const re = /^[0-9\b]*$/;
                      if (re.test(e.target.value)) handleChange(e);
                    }}
                  />
                  <button
                    className={styles.ModalSubmit}
                    type="button"
                    value="Submit"
                    name="b"
                    onClick={(e) => handleNNIrand(e, 85)}
                  >
                    Generate y
                  </button>
                </label>

                {"a" in body &&
                body["a"] != "" &&
                "b" in body &&
                body["b"] != "" ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <button
                      className={styles.ModalSubmit}
                      type="button"
                      value="Submit"
                      onClick={(e) => {
                        const submit = {
                          ...body,
                          function: "nni",
                          op: "add",
                        };
                        setmodExp(false);
                        setLnni2(true);
                        handleAPIcall(e, submit);
                        setnni2(true);
                      }}
                    >
                      x + y
                    </button>
                    <button
                      className={styles.ModalSubmit}
                      type="button"
                      value="Submit"
                      onClick={(e) => {
                        const submit = {
                          ...body,
                          function: "nni",
                          op: "sub",
                        };
                        setmodExp(false);
                        setLnni2(true);
                        handleAPIcall(e, submit);
                        setnni2(true);
                      }}
                    >
                      x - y
                    </button>
                    <button
                      className={styles.ModalSubmit}
                      type="button"
                      value="Submit"
                      onClick={(e) => {
                        const submit = {
                          ...body,
                          function: "nni",
                          op: "mul",
                        };
                        setmodExp(false);
                        setLnni2(true);
                        handleAPIcall(e, submit);
                        setnni2(true);
                      }}
                    >
                      x * y
                    </button>
                    <button
                      className={styles.ModalSubmit}
                      type="button"
                      value="Submit"
                      onClick={(e) => {
                        const submit = {
                          ...body,
                          function: "nni",
                          op: "div",
                        };
                        setLnni2(true);
                        handleAPIcall(e, submit);
                        setnni2(true);
                      }}
                    >
                      x / y
                    </button>
                    <button
                      className={styles.ModalSubmit}
                      type="button"
                      value="Submit"
                      onClick={(e) => {
                        const submit = {
                          ...body,
                          function: "nni",
                          op: "mod",
                        };
                        setmodExp(false);
                        setLnni2(true);
                        handleAPIcall(e, submit);
                        setnni2(true);
                      }}
                    >
                      x mod y
                    </button>
                    <button
                      className={styles.ModalSubmit}
                      type="button"
                      value="Submit"
                      onClick={(e) => {
                        setmodExp(!modExp);
                      }}
                    >
                      x ^ e mod y
                    </button>
                  </div>
                ) : (
                  <></>
                )}
                {modExp ? (
                  <label
                    className={styles.ModalName}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    Enter e
                    <textarea
                      className={styles.ModalInput}
                      type="text"
                      name="e"
                      placeholder="203628331141104498555696721217956672687032336458202513544840206364338423529007609885075294830182683290567422018990753787543433642599771621545489102980293721128786695716193327892688817866015865827680088291194655207328329511794890588331141104498555696721217956672687032336458202513544840206364338423529007609885075294830182683290567422018990753787543433642599771621584235290076098850752948301826832905674220189907537875434336425997716215454891029802937211287866957161933278926888178660158658276800882911946552073283295117948905883311411044985556943384235290076098850752948301826832905674220189907537875434336425997716215454891029802937211287866957161933278926888178660158658276800882911946552073283295117948905883311411044985556967212179566726870323364582025135448402063643384235290076098850752948301826832905674220189907537875434336425997716215842352900760988507529483018268329056742201899075378754343364259977162154548910298029372112878669571619332789268881786601"
                      value={body["e"]}
                      onFocus={handleFocus}
                      onChange={(e) => {
                        const re = /^[0-9\b]*$/;
                        if (re.test(e.target.value)) handleChange(e);
                      }}
                    />
                    <button
                      className={styles.ModalSubmit}
                      type="button"
                      value="Submit"
                      name="e"
                      onClick={(e) => handleNNIrand(e, 100)}
                    >
                      Generate e
                    </button>
                    <button
                      className={styles.ModalSubmit}
                      type="button"
                      value="Submit"
                      onClick={(e) => {
                        const submit = {
                          ...body,
                          function: "nni",
                          op: "modexp",
                        };
                        setLnni2(true);
                        handleAPIcall(e, submit);
                        setnni2(true);
                      }}
                    >
                      Calculate
                    </button>
                  </label>
                ) : (
                  <></>
                )}
              </form>
              {nnilevel2 ? (
                <div
                  className={styles.Matrix}
                  style={{
                    display: "flex",
                    maxWidth: "80%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {nniload2 ? (
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
                      <p style={{ color: "black" }}>{nnianswer["ans"]}</p>
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

        {/* RSA */}
        <div
          onMouseEnter={() => {
            setCurrent([...current, "RSA"]);
          }}
          className={
            current.at(current.length - 1).includes("RSA")
              ? styles.ANumerical
              : styles.Numerical
          }
        >
          <h1 className={styles.AboutTitle}>RSA Encoding</h1>
          {current.includes("RSA") ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <div
                className={styles.Matrix}
                style={{
                  display: "flex",
                  maxWidth: "80%",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  transitionDuration: "3s",
                }}
              >
                {rsaLoad1 ? (
                  genKeys == true ? (
                    <>
                      <h3 style={{ color: "black" }}>
                        This is going to take some time... go grab a cup of
                        coffee!
                      </h3>
                      <br />
                      <Image
                        src="/RippleLoad.svg"
                        alt="Loading Logo"
                        width={100}
                        height={100}
                      />
                      <br />
                      <p style={{ color: "black" }}>
                        The reason this takes so long is becuase the RSA
                        algorithm is computationally expensive to do without a
                        library like GMP. In this algorithm I'm using my own
                        4096-bit Multiprecision integegers, which aren't nearly
                        as optimized as the best libraries in the world. OpenSSL
                        for example, does the same thing as what I am doing but
                        they are using a faster memory optimizing algorithm.
                      </p>
                      <br />
                      <p style={{ color: "black" }}>
                        To see why this algorithm takes so long on smaller or
                        bigger numbers go to the Multiprecision Non Negative
                        Integers (NNI) section and use the Modular
                        Exponentiation function
                      </p>
                      <button
                        className={styles.ModalSubmit}
                        type="button"
                        value="Submit"
                        onClick={(e) => {
                          rsaws.close();
                          setGenKeys(false);
                        }}
                      >
                        Upload Keys Instead
                      </button>
                    </>
                  ) : (
                    <>
                      <div
                        style={{
                          display: "flex",
                          maxWidth: "80%",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "row",
                        }}
                      >
                        <>
                          <label
                            className={styles.ModalSubmit}
                            type="button"
                            value="Submit"
                          >
                            Upload Public Key
                            <input
                              className={styles.ModalSubmit}
                              type="file"
                              hidden
                              accept=".iyo"
                              onChange={(e) => {
                                e.preventDefault();
                                const reader = new FileReader();
                                reader.onload = async (e) => {
                                  const text = e.target.result;
                                  setRSAKeys({ ...rsakeys, pub: text });
                                };
                                reader.readAsText(e.target.files[0]);
                              }}
                            />
                          </label>
                        </>
                        <>
                          <label
                            className={styles.ModalSubmit}
                            type="button"
                            value="Submit"
                          >
                            Upload Private Key
                            <input
                              className={styles.ModalSubmit}
                              type="file"
                              hidden
                              accept=".iyo"
                              onChange={(e) => {
                                e.preventDefault();
                                const reader = new FileReader();
                                reader.onload = async (e) => {
                                  const text = e.target.result;
                                  setRSAKeys({ ...rsakeys, priv: text });
                                };
                                reader.readAsText(e.target.files[0]);
                              }}
                            />
                          </label>
                        </>
                      </div>
                      <button
                        className={styles.ModalSubmit}
                        type="button"
                        value="Submit"
                        onClick={(e) => {
                          setRSAEffect(!rsaEffect);
                          setGenKeys(true);
                          setRSAKeys({});
                        }}
                      >
                        Generate Keys Instead
                      </button>
                    </>
                  )
                ) : (
                  <div
                    className={styles.matrixTot}
                    style={{
                      maxWidth: "100%",
                      overflowWrap: "anywhere",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <p style={{ color: "black" }}>Your public key</p>
                    <p style={{ color: "black" }}>
                      {rsaExpand
                        ? rsakeys["pub"]
                        : rsakeys["pub"].substr(0, 40).concat("...")}
                    </p>
                    <br />
                    <p style={{ color: "black" }}>Your private key</p>
                    <p style={{ color: "black" }}>
                      {rsaExpand
                        ? rsakeys["priv"]
                        : rsakeys["priv"].substr(0, 40).concat("...")}
                    </p>
                    <div>
                      <button
                        className={styles.ModalSubmit}
                        type="button"
                        value="Submit"
                        onClick={downloadKeys}
                      >
                        Download Your Keys
                      </button>
                      <button
                        className={styles.ModalSubmit}
                        type="button"
                        value="Submit"
                        onClick={() => setRSAExpand(!rsaExpand)}
                      >
                        {rsaExpand ? "Minimize":"Show Full Keys"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
              {"pub" in rsakeys && "priv" in rsakeys ? (
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
                    Text to Encode/Decode
                    <textarea
                      className={styles.ModalInput}
                      type="text"
                      name="rsatext"
                      placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam nulla porttitor massa id. Platea dictumst vestibulum rhoncus est pellentesque. Mattis molestie a iaculis at erat pellentesque adipiscing commodo elit."
                      value={body["rsatext"]}
                      onFocus={handleFocus}
                      onChange={handleChange}
                    />
                  </label>
                  <div>
                    <button
                      className={styles.ModalSubmit}
                      type="button"
                      value="Submit"
                      onClick={(e) => {
                        const submit = {
                          message: body["rsatext"],
                          pub: rsakeys["pub"],
                          op: "encode",
                          function: "rsa",
                        };
                        setRSAL2(true);
                        handleAPIcall(e, submit);
                        setRSA2(true);
                      }}
                    >
                      Run Encode
                    </button>
                    <button
                      className={styles.ModalSubmit}
                      type="button"
                      value="Submit"
                      onClick={(e) => {
                        const submit = {
                          cipher: body["rsatext"],
                          priv: rsakeys["priv"],
                          op: "decode",
                          function: "rsa",
                        };
                        setRSAL2(true);
                        handleAPIcall(e, submit);
                        setRSA2(true);
                      }}
                    >
                      Run Decode
                    </button>
                  </div>
                </form>
              ) : (
                <></>
              )}
              {rsalevel2 ? (
                <div
                  className={styles.Matrix}
                  style={{
                    display: "flex",
                    maxWidth: "80%",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "30px",
                  }}
                >
                  {rsaLoad2 ? (
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
                      {"cipher" in rsaanswer ? (
                        <>
                          <p className={styles.matrixVal}>Encoded Text</p>
                          <p className={styles.matrixVal}>
                            {rsaanswer["cipher"]}
                          </p>
                        </>
                      ) : (
                        <>
                          <p className={styles.matrixVal}>Decoded Message</p>
                          <p className={styles.matrixVal}>
                            {rsaanswer["message"]}
                          </p>
                        </>
                      )}
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

        {/* AES */}
        <div
          onMouseEnter={() => {
            setCurrent([...current, "AES"]);
          }}
          className={
            current.at(current.length - 1).includes("AES")
              ? styles.ANumerical
              : styles.Numerical
          }
        >
          <h1 className={styles.AboutTitle}>AES Cipher</h1>
          {current.includes("AES") ? (
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
                    name="aesplain"
                    placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam nulla porttitor massa id. Platea dictumst vestibulum rhoncus est pellentesque. Mattis molestie a iaculis at erat pellentesque adipiscing commodo elit."
                    value={body["aesplain"]}
                    onFocus={handleFocus}
                    onChange={handleChange}
                  />
                </label>
                <button
                  className={styles.ModalSubmit}
                  type="button"
                  value="Submit"
                  onClick={(e) => {
                    let plain = body["aesplain"];
                    const submit = {
                      ...body,
                      plain: body["aesplain"],
                      direction: "encode",
                      function: "aes",
                    };
                    setLaes2(true);
                    handleAPIcall(e, submit);
                    setaes2(true);
                    setBody({ ...body, key: "" });
                  }}
                >
                  Run Encoding
                </button>
              </form>
              {aeslevel2 ? (
                <div
                  className={styles.Matrix}
                  style={{
                    display: "flex",
                    maxWidth: "80%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {aesload2 ? (
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
                      <p className={styles.matrixVal}>{aesanswer["key"]}</p>
                      <br />
                      <p className={styles.matrixVal}>Your encoded cipher</p>
                      <p className={styles.matrixVal}>{aesanswer["cipher"]}</p>
                    </div>
                  )}
                </div>
              ) : (
                <></>
              )}
              {aeslevel2 && !aesload2 ? (
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
                      value={body["key"] == undefined ? "" : body["key"]}
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
                      setLaes3(true);
                      handleAPIcall(e, submit);
                      setaes3(true);
                    }}
                  >
                    Run Decoding
                  </button>
                </form>
              ) : (
                <></>
              )}
              {aeslevel3 ? (
                <div
                  className={styles.Matrix}
                  style={{
                    display: "flex",
                    maxWidth: "80%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {aesload3 ? (
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
                      <p className={styles.matrixVal}>{aesanswer["key"]}</p>
                      <br />
                      <p className={styles.matrixVal}>Your decoded plaintext</p>
                      <p className={styles.matrixVal}>{aesanswer["plain"]}</p>
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

        {/* SHA */}
        <div
          onMouseEnter={() => {
            setCurrent([...current, "SHA"]);
          }}
          className={
            current.at(current.length - 1) == "SHA"
              ? styles.ANumerical
              : styles.Numerical
          }
        >
          <h1 className={styles.AboutTitle}>SHA Encoding</h1>
          {current.includes("SHA") ? (
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
                  Plain Text To Encode
                  <textarea
                    className={styles.ModalInput}
                    type="text"
                    name="shaplain"
                    placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam nulla porttitor massa id. Platea dictumst vestibulum rhoncus est pellentesque. Mattis molestie a iaculis at erat pellentesque adipiscing commodo elit."
                    value={body["shaplain"]}
                    onFocus={handleFocus}
                    onChange={handleChange}
                  />
                  Enter SHA Level from 100 to 512
                  <input
                    className={styles.ModalInput}
                    type="text"
                    name="t"
                    placeholder="512"
                    value={body["t"] == undefined ? "" : body["t"]}
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
                      plain: body["shaplain"],
                      function: "sha",
                    };
                    setLsha2(true);
                    handleAPIcall(e, submit);
                    setsha2(true);
                  }}
                >
                  Run Encoding
                </button>
              </form>
              {shalevel2 ? (
                <div
                  className={styles.Matrix}
                  style={{
                    display: "flex",
                    maxWidth: "80%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {shaload2 ? (
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
                      <p className={styles.matrixVal}>Your Encoded Text</p>
                      <p className={styles.matrixVal}>{shaanswer["hash"]}</p>
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

        {/* MORE */}
        <div
          className={
            current.at(current.length - 1).includes("MORE")
              ? styles.ANumerical
              : styles.Numerical
          }
          onMouseEnter={() => {
            setCurrent([...current, "MORE"]);
          }}
        >
          <h1 className={styles.AboutTitle}>
            MORE IMPLEMENTATIONS COMING SOON
          </h1>
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
