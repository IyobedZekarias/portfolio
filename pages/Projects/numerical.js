import Image from "next/image";
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

const exampleEquations = (
        <label className={styles.ModalName}>
            <label
                className={styles.ModalName}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                }}
            >
                **Available Functions: ln, e, cos, sin, tan, sqrt
                <br />
                e(x) {">"} e^x &nbsp;--&nbsp; sqrt(x) {">"} √x
                &nbsp;--&nbsp; 2x {">"} (2 * x)
                <br />
                <br />
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
                <p style={{ color: "red" }}>Example:</p>
                <p>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sin(x**2
                    + 3) * (6 * x) + e(x) &nbsp;=&nbsp; sin(x
                    <sup>2</sup> + 3) * 6x + e<sup>x</sup>
                </p>
                <p>
                    use ** for power notation: x**2 = x<sup>2</sup>
                </p>
                <p style={{ color: "red" }}>Example: </p>
                <p>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(3 *
                    x**3) + (2 * x**2) - (3 * x) / sqrt(x**3)
                    &nbsp;=&nbsp; 3x
                    <sup>3</sup> + 2x
                    <sup>2</sup> - 3x &#xf7; √x<sup>3</sup>
                </p>
            </label>
        </label>
    );


export default function Numerical(props) {
    const [current, setCurrent] = useState(['Description'])
  // -------- INTERPOLATION/extrapolation VALUES -------- //
    const [interpVarCount, setInterpVarCount] = useState(20)
    const [interpVals, setInterpVals] = useState({
        x: [[],[]], 
        y: [[],[]]
    })
    const [doneInterpVals, setDoneInterpVals] = useState(false)
    const [xValue, setxValue] = useState({
        num: 32434, 
        den: 23452
    })
    const [interpAnswer, setInterpAnswer] = useState({})
    const [interpFin, setInterpFin] = useState(false)
    const [extrapValFin, setExtrapValFin] = useState(false)
    const [extrapFunction, setExtrapFunction] = useState('')
    const [extrapAnswer, setExtrapAnswer] = useState({})
    const [extrapFin, setExtrapFin] = useState(false)
    const [currentie, setCurrentie] = useState("")

  // -------- MATRIX STATE VALUES -------- //
    const initial = {
        rows: "",
        cols: "",
    };
    const [matrixVals, setMatrixVals] = useState(initial);
    const [showMatrix, setShowMatrix] = useState(false);
    const [matrix, setMatrix] = useState([]);
    const [gausAnswer, setGaus] = useState({});
    const [gausetrue, setGausTrue] = useState(false);

    // ------- MONTE CARLO STATE VALUES ------//
    const [monteCarlonum, setMonteCarloNum] = useState(1)
    const [mcNumsFin, setMCNumFin] = useState(false)
    const [mcVars, setMCVars] = useState([])
    const [mcFormStg, setMCFormStg] = useState(false)
    const [mcForm, setMCForm] = useState('')
    const [mcBoundsStg, setMCBoundsStg] = useState(false)
    const [mcBounds, setMCBounds] = useState([])
    const [mcFin, setMCFin] = useState(false)
    const [mcAns, setMCAns] = useState({})

    // -------- INTEGRATION ----------/
    const [intFunc, setIntFunc] = useState('')
    const [intFuncFin, setIntFuncFin] = useState(false)
    const [intBounds, setIntBounds] = useState({ upper: 1, lower: 0 })
    const [intAns, setIntAns] = useState({})
    const [intFin, setIntFin] = useState(false)



    // const resetState = () => {
    //     if (current == 'Gauss') {
    //         setMatrixVals(initial)
    //         setShowMatrix(false)
    //         setMatrix([])
    //         setGaus({})
    //         setGausTrue(false)
    //     }
    //     if (current.includes('Interp') || current.includes('Extrap')) {
    //         setInterpVarCount(20)
    //         setInterpVals({
    //             x: [[],[]], 
    //             y: [[],[]]
    //         })
    //         setDoneInterpVals(false)
    //         setxValue({
    //           num: 32434,
    //           den: 23452,
    //         });
    //         setInterpAnswer({})
    //         setInterpFin(false)
    //         setExtrapValFin(false)
    //         setExtrapFunction('')
    //         setExtrapAnswer({})
    //         setExtrapFin(false)
    //     }
    //     if (current == 'Monte') {
    //         setMonteCarloNum(1)
    //         setMCNumFin(false)
    //         setMCVars([''])
    //         setMCFormStg(false)
    //         setMCForm('')
    //         setMCBoundsStg(false)
    //         setMCBounds([[]])
    //         setMCFin(false)
    //         setMCAns({})
    //     }
    //     if (current == 'Int') {
    //         setIntFunc('')
    //         setIntFuncFin(false)
    //         setIntBounds({ upper: 1, lower: 0 })
    //         setIntAns({})
    //         setIntFin(false)
    //     }
    // }

    const handleInterpSubmit = () => {
        let xnum = [], ynum = [], xden = [], yden = []
        for (let i = 0; i < interpVarCount; i++) {
            xnum.push(Math.floor(Math.random() * (1000 - 100) + 10));
            ynum.push(Math.floor(Math.random() * (1000 - 100) + 10));
            xden.push(Math.floor(Math.random() * (1000 - 100) + 10));
            yden.push(Math.floor(Math.random() * (1000 - 100) + 10));
        }
        setInterpVals({ ...interpVals, x: [xnum, xden], y: [ynum, yden] })
        setDoneInterpVals(true)
    }
    
    const handleMatrixSubmit = () => {

        setMatrix([]);
        for (let i = 0; i < matrixVals.rows; i++) {
            let row = [];
            let nums = [];
            let dens = [];
            for (let j = 0; j < matrixVals.cols; j++) {
                let randomnum = Math.floor(Math.random() * (1000 - 100) + 10);
                let randomden = Math.floor(Math.random() * (1000 - 100) + 10);
                nums.push(randomnum);
                dens.push(randomden);
            }
            row.push(nums);
            row.push(dens);
            setMatrix((matrix) => [...matrix, row]);
        }
        setShowMatrix(true);
    };

    const handleMatrixChange = (e) => {
        if (e.target.value == "") {
            setMatrixVals(initial);
            return;
        }
        //setMatrixVals({ ...matrixVals, [e.target.name]: parseInt(e.target.value) })
        if (e.target.name == Object.keys(matrixVals)[0]) {
            setMatrixVals({
            rows: parseInt(e.target.value),
            cols: parseInt(e.target.value) + 1,
            });
        } else {
            setMatrixVals({
            cols: parseInt(e.target.value),
            rows: parseInt(e.target.value) - 1,
            });
        }
    };

    const handleNumericalRequest = async (dest) => {
        let obj = {
            function: dest,
        };
        switch (dest) {
            case "Gaussian":
                matrix.forEach((i, iindex) => {
                    obj[iindex] = i;
                });
                break;
            case "Interp":
                obj['x'] = xValue
                obj['points'] = interpVals
                break;
            case "Extrap":
                obj['x'] = xValue;
                obj["f(x)"] = extrapFunction;
                break;
            case 'Monte':
                obj["f(x)"] = mcForm;
                obj['bounds'] = mcBounds;
                obj['vars'] = mcVars;
                break;
            case 'Integrate':
                obj["f(x)"] = intFunc
                obj['bounds'] = intBounds
                break;
            default: return;
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
            const response = await fetch("/api/proj/numer", config);

            const json = await response.json();
            if (response.status == 405) {
                alert(json["Message"]);
                return;
            }
            switch (dest) {
                case ('Gaussian'):
                    setGaus(json);
                    setGausTrue(true);
                    break;
                case ('Interp'):
                    setInterpAnswer(json)
                    setInterpFin(true)
                    break;
                case ('Extrap'):
                    setExtrapAnswer(json)
                    setExtrapFin(true)
                    break;
                case ('Monte'):
                    setMCFin(true)
                    setMCAns(json)
                    break;
                case ('Integrate'):
                    setIntFin(true)
                    setIntAns(json)
                    break
                default: return;
            }
        } catch (error) {
            alert(error);
        }
    };

    const reservedVars = ['l','n','e','c','o','s','i','t','a','q','r','t'];


    return (
      <div className={styles.container}>
        <Header active="Projects" projActive="numerical" CaptchaVariables={ props.CaptchaVariables } />

        <main className={styles.main}>
          {/* INTRO */}
          <div
            className={
              current.at(current.length - 1) == "Description" ? styles.ANumerical : styles.Numerical
            }
            onMouseEnter={() => {
              setCurrent([...current, "Description"]);
                
            }}
          >
            <h1 className={styles.AboutTitle}>Numerical Analysis</h1>
            <p className={styles.AboutParagraph}>
              In this project I wrote well studied algorithms from the branch of
              mathematics, numerical analysis. All code for the project was
              written in python and implements some interesting classes. One
              issue with python is that floats do not have enough precision for
              the types of operations required in these algorithms. So I
              implemented a Rational class to achieve more precision. The
              rational class represents floating point numbers as a fraction
              denoted as 1/2 instead of representing numbers as .5 for example.
              Doing so allows more precise approximations since rounding does
              not occur nearly as often. Using this Rational class I was able to
              approximate integrals, use Newton interpolation, Richardson
              Extrapolation, use Monte Carlo integral approximation, and
              implement a Real Numbers class. I implemented a RESTful python api
              to send and retrieve data between this front end and the program.
              Data is sent to the program in the form of JSON. There are still
              some problems with the program though. When trying to stress test
              the program on complex functions it is easy to get numbers
              greateer than 2<sup>64</sup> which is greater than the maximum
              value of a python integer. To combat this it would be best to use
              a multi-precision library like GMP for C++.
            </p>
            <p className={styles.AboutParagraph}>
              Below are the implementations of the programs functions, just
              click on a name to get started.
            </p>
            <p className={styles.AboutParagraph}>
              All the code for this project can be found{" "}
              <a
                href={"https://github.com/IyobedZekarias/Numerical"}
                style={{ color: "#0070f3" }}
              >
                here
              </a>
              .
            </p>
          </div>
          {/* GAUSSIAN ELIMINATION*/}
          <div
            onMouseEnter={() => {
                setCurrent([...current, "Gauss"]);
            }}
            className={
              current.at(current.length - 1) == "Gauss" ? styles.ANumerical : styles.Numerical
            }
          >
            <h1 className={styles.AboutTitle}>Gaussian Elimination</h1>
            {current.includes("Gauss") ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <p className={styles.AboutTitle}>
                  (recommend small numbers at first)
                </p>
                <form className={styles.ModalForm}>
                  <label className={styles.ModalName}>
                    Rows:
                    <input
                      className={styles.ModalInput}
                      type="text"
                      name="rows"
                      placeholder="3"
                      value={matrixVals.rows}
                      onChange={handleMatrixChange}
                    />
                  </label>
                  <label className={styles.ModalName}>
                    Cols:
                    <input
                      className={styles.ModalInput}
                      type="text"
                      name="cols"
                      placeholder="4"
                      value={matrixVals.cols}
                      onChange={handleMatrixChange}
                    />
                  </label>
                  <button
                    className={styles.ModalSubmit}
                    type="button"
                    value="Submit"
                    onClick={handleMatrixSubmit}
                  >
                    Make Random Matrix
                  </button>
                </form>

                {showMatrix ? (
                  <div className={styles.Matrix}>
                    {matrix.map((i, iindex) => {
                      return (
                        <div className={styles.MatrixTot} key={iindex}>
                          {i[0].map((j, jindex) => {
                            return (
                              <p key={jindex} className={styles.matrixVal}>
                                &nbsp;&nbsp;{j}/{i[1][jindex]}&nbsp;&nbsp;
                              </p>
                            );
                          })}
                          <br />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <></>
                )}
                {showMatrix ? (
                  <div className={styles.numOps}>
                    <button
                      className={styles.ModalSubmit}
                      style={{ width: "auto" }}
                      type="button"
                      value="Submit"
                      onClick={() => handleNumericalRequest("Gaussian")}
                    >
                      Gaussian Elimination
                    </button>
                    <div className={styles.Matrix}>
                      {gausetrue ? (
                        <div style={{ padding: "10px" }}>
                          <h3 style={{ color: "black" }}>
                            Naive Gaussian Calculation
                          </h3>
                          {gausAnswer["Naive"].map((i, iindex) => {
                            return (
                              <div
                                key={iindex}
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "flex-start",
                                  color: "black",
                                  fontSize: "2vw",
                                  overflowWrap: "anywhere",
                                }}
                              >
                                x<p style={{ fontSize: "1vw" }}>{iindex + 1}</p>
                                = {i}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <></>
                      )}
                      {gausetrue ? (
                        <div style={{ padding: "10px" }}>
                          <h3 style={{ color: "black" }}>
                            Improved Gaussian Calculation
                          </h3>
                          {gausAnswer["Gaussian"].map((i, iindex) => {
                            return (
                              <div
                                key={iindex}
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "flex-start",
                                  color: "black",
                                  fontSize: "2vw",
                                  overflowWrap: "anywhere",
                                }}
                              >
                                x<p style={{ fontSize: "1vw" }}>{iindex + 1}</p>
                                = {i}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                ) : (
                  <></>
                )}

                {gausetrue ? (
                  <p className={styles.AboutParagraph}>
                    What is Gaussian Elimination? it is a method of breaking
                    down multiple varialbes in a system of equations for example
                    <br />
                    <br />
                    x + y = 3
                    <br />
                    2x - y = 9
                    <br />
                    <br />
                    In this example x = 4 and y = -1. An equation as simple as
                    this can be solved in your head, but as the number of
                    variables grow the calculation becomes more and more
                    difficult. Gaussian elimination solves this problem using
                    matrices with the number that is equaled in the rightmost
                    column and the coefficients and constants in the other
                    columns. In our example the matrix would look like this
                    <br />
                    <br />
                    1 &nbsp; 1 &nbsp; 3 <br /> 2 -1 &nbsp; 9
                    <br />
                    <br />
                    You can read more about Gaussian elimination{" "}
                    <a
                      style={{ textDecoration: "underline" }}
                      href="https://en.wikipedia.org/wiki/Gaussian_elimination"
                    >
                      here
                    </a>
                    <br />
                    <br />
                    This api endpoint takes a json object in the form
                    <br /> obj ={" {"}
                    <br />{" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"0"
                    : <br />{" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {"["}
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {"["} 0, 1, 2 {"],"}
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {"["} 3, 4, 5 {"]"}
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {"]"},
                    <br />{" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"1"
                    : <br />{" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {"["}
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {"["} 6, 7, &nbsp;&nbsp;8 {"],"}
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {"["} 9, 10, 11 {"]"}
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {"]"},<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;function
                    :{' "'}Guassian{'"'}
                    <br />
                    &nbsp;{"}"}
                    <br /> <br />
                    This will give the matrix:
                    <br />
                    <br />
                    0/3 &nbsp; 1/4 &nbsp; 2/5 <br /> 6/9 7/10 &nbsp; 8/11
                    <br />
                  </p>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>

          {/* INTERP/EXTRAP */}
          <div
            onMouseEnter={() => {
                setCurrent([...current, "Interp/Extrap"]);
            }}
            className={
              current.at(current.length - 1) == "Interp/Extrap"
                ? styles.ANumerical
                : styles.Numerical
            }
          >
            <h1 className={styles.AboutTitle}>Interpolation / Extrapolation</h1>
            {current.includes("Interp/Extrap")? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <button
                  className={styles.ModalSubmit}
                  type="button"
                  value="Submit"
                  onClick={() => {
                    setCurrentie("Interp")
                    
                  }}
                >
                  Interpolation
                </button>
                <button
                  className={styles.ModalSubmit}
                  type="button"
                  value="Submit"
                  onClick={() => {
                    setCurrentie("Extrap")
                    
                  }}
                >
                  Extrapolation
                </button>
              </div>
            ) : (
              <></>
            )}
            {currentie == "Interp" ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <form className={styles.ModalForm}>
                  <label className={styles.ModalName}>
                    Number of Variables:
                    <input
                      className={styles.ModalInput}
                      type="text"
                      name="rows"
                      placeholder="20"
                      value={interpVarCount}
                      onChange={(e) => setInterpVarCount(e.target.value)}
                    />
                  </label>
                  <button
                    className={styles.ModalSubmit}
                    type="button"
                    value="Submit"
                    onClick={handleInterpSubmit}
                  >
                    Make x and f(x) Variables
                  </button>
                </form>
                {doneInterpVals ? (
                  <div className={styles.Matrix}>
                    <div style={{ padding: "10px" }}>
                      {Object.keys(interpVals).map((key, iindex) => {
                        return (
                          <div
                            key={iindex}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "flex-start",
                              color: "black",
                              fontSize: "2vw",
                              flexWrap: "wrap",
                            }}
                          >
                            {iindex ? (
                              <p className={styles.MatrixVal}>
                                f{"("}x{")"} = &nbsp;{"{"}&nbsp;&nbsp;
                              </p>
                            ) : (
                              <p className={styles.MatrixVal}>
                                x = &nbsp;{"{"}&nbsp;&nbsp;
                              </p>
                            )}
                            {interpVals[key][0].map((j, jindex) => {
                              return (
                                <p className={styles.MatrixVal} key={jindex}>
                                  {j}/{interpVals[key][1][jindex]}
                                  {jindex != interpVals[key][0].length - 1
                                    ? ","
                                    : ""}{" "}
                                  &nbsp;&nbsp;
                                </p>
                              );
                            })}
                            <p className={styles.MatrixVal}>{"}"}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                {doneInterpVals ? (
                  <div>
                    <form className={styles.ModalForm}>
                      <label className={styles.ModalName}>
                        Enter x to Interpolate f(x)
                      </label>
                      <label className={styles.ModalName}>
                        numerator:
                        <input
                          className={styles.ModalInput}
                          type="text"
                          name="num"
                          placeholder="20"
                          value={xValue["num"]}
                          onChange={(e) =>
                            setxValue({
                              ...xValue,
                              [e.target.name]: e.target.value,
                            })
                          }
                          onBlur={(e) => {
                            if (!isNaN(parseInt(e.target.value))) {
                              setxValue({
                                ...xValue,
                                [e.target.name]: parseInt(e.target.value),
                              });
                            } else setxValue({ ...xValue, [e.target.name]: 0 });
                          }}
                        />
                      </label>
                      <label className={styles.ModalName}>
                        denominator:
                        <input
                          className={styles.ModalInput}
                          type="text"
                          name="den"
                          placeholder="20"
                          value={xValue["den"]}
                          onChange={(e) =>
                            setxValue({
                              ...xValue,
                              [e.target.name]: e.target.value,
                            })
                          }
                          onBlur={(e) => {
                            if (!isNaN(parseInt(e.target.value))) {
                              setxValue({
                                ...xValue,
                                [e.target.name]: parseInt(e.target.value),
                              });
                            } else setxValue({ ...xValue, [e.target.name]: 0 });
                          }}
                        />
                      </label>
                      {xValue["den"] != 0 ? (
                        <button
                          className={styles.ModalSubmit}
                          type="button"
                          value="Submit"
                          onClick={() => {
                            handleNumericalRequest("Interp");
                          }}
                        >
                          Interpolate
                        </button>
                      ) : (
                        <button
                          className={styles.ModalSubmitDisabled}
                          type="button"
                          value="Submit"
                        >
                          Interpolate
                        </button>
                      )}
                    </form>
                  </div>
                ) : (
                  <></>
                )}
                {interpFin ? (
                  <div
                    className={styles.Matrix}
                    style={{
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <h3 style={{ color: "black" }}>Newton Interpolation</h3>
                    <div className={styles.MatrixTot}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "flex-start",
                          color: "black",
                          fontSize: "2vw",
                          overflowWrap: "anywhere",
                        }}
                      >
                        <p className={styles.MatrixVal}>
                          {"f(x) for x = " +
                            xValue["num"] +
                            "/" +
                            xValue["den"] +
                            " = " +
                            interpAnswer["Newton"]}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                {interpFin ? (
                  <p className={styles.AboutParagraph}>
                    Newton's Interpolation is a method of finding the value of x
                    given multiple x-y points of the same function. Newton's
                    interpolation doesn't actually return the formula but rather
                    an approximation of what f(x) is given an x value. This api
                    endpoint takes a json object in the form
                    <br /> obj ={" {"}
                    <br />{" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"x"
                    : <br />{" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {"{"}
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {'"num": '}123
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {'"den": '}456
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {"}"},
                    <br />{" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"points"
                    : <br />{" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {"{"}
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {"x: ["}
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {"[ 6, 7, 8 ]"},
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {"[ 9, 10, 11]"},
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {"]"},
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {"y: ["}
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {"[ 12, 13, 14 ]"},
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {"[ 15, 16, 17]"},
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {"]"}
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {"}"},<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;function
                    :{' "'}Interpolate{'"'}
                    <br />
                    &nbsp;{"}"}
                  </p>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <></>
            )}
            {currentie == "Extrap" ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <form className={styles.ModalForm}>
                  <label className={styles.ModalName}>
                    Enter x to Extrapolate f(x)
                  </label>
                  <label className={styles.ModalName}>
                    numerator:
                    <input
                      className={styles.ModalInput}
                      type="text"
                      name="num"
                      placeholder="20"
                      value={xValue["num"]}
                      onChange={(e) =>
                        setxValue({
                          ...xValue,
                          [e.target.name]: e.target.value,
                        })
                      }
                      onBlur={(e) => {
                        if (!isNaN(parseInt(e.target.value))) {
                          setxValue({
                            ...xValue,
                            [e.target.name]: parseInt(e.target.value),
                          });
                        } else setxValue({ ...xValue, [e.target.name]: 0 });
                      }}
                    />
                  </label>
                  <label className={styles.ModalName}>
                    denominator:
                    <input
                      className={styles.ModalInput}
                      type="text"
                      name="den"
                      placeholder="20"
                      value={xValue["den"]}
                      onChange={(e) =>
                        setxValue({
                          ...xValue,
                          [e.target.name]: e.target.value,
                        })
                      }
                      onBlur={(e) => {
                        if (!isNaN(parseInt(e.target.value))) {
                          setxValue({
                            ...xValue,
                            [e.target.name]: parseInt(e.target.value),
                          });
                        } else setxValue({ ...xValue, [e.target.name]: 0 });
                      }}
                    />
                  </label>
                  {xValue["den"] != 0 ? (
                    <button
                      className={styles.ModalSubmit}
                      type="button"
                      value="Submit"
                      onClick={() => {
                        setExtrapValFin(true);
                      }}
                    >
                      Enter f(x)
                    </button>
                  ) : (
                    <button
                      className={styles.ModalSubmitDisabled}
                      type="button"
                      value="Submit"
                    >
                      Enter f(x)
                    </button>
                  )}
                </form>
                {extrapValFin ? (
                  <div style={{ marginTop: "20px" }}>
                    <form className={styles.ModalForm}>
                      <label
                        className={styles.ModalName}
                        style={{ margintop: "10px", marginBottom: "2px" }}
                      >
                        <input
                          className={styles.ModalInput}
                          style={{ width: "100%" }}
                          type="text"
                          name="function"
                          placeholder="sin(x**2 + 3) * (6 * x) + e(x)"
                          value={extrapFunction}
                          onChange={(e) => {
                            setExtrapFunction(e.target.value);
                          }}
                        />
                      </label>
                      {extrapFunction != "" ? (
                        <div className={styles.Matrix}>
                          <div
                            className={styles.MatrixTot}
                            style={{ overflowWrap: "anywhere" }}
                          >
                            <p
                              style={{ color: "black" }}
                              className={styles.MatrixVal}
                            >
                              {extrapFunction}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                      <button
                        type="button"
                        value="Submit"
                        className={styles.ModalSubmit}
                        onClick={() => handleNumericalRequest("Extrap")}
                      >
                        Extrapolate
                      </button>
                      {!extrapFin ? exampleEquations : <></>}
                    </form>
                  </div>
                ) : (
                  <></>
                )}
                {extrapFin ? (
                  <div
                    className={styles.Matrix}
                    style={{
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      maxWidth: "100%",
                    }}
                  >
                    <h3 style={{ color: "black" }}>Richardson Extrapolation</h3>
                    <div className={styles.MatrixTot}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "black",
                          fontSize: "",
                          overflowWrap: "anywhere",
                          padding: "20px",
                        }}
                      >
                        <p className={styles.MatrixVal}>
                          f'(x)={extrapAnswer["Richardson"]}
                        </p>
                        <p className={styles.MatrixVal}>
                          where f'(x) = {extrapFunction} d/dx
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                {extrapFin ? (
                  <p className={styles.AboutParagraph}>
                    Richardson's extrapolation method is a way of extrapolating
                    the value of f'(x) given f(x) and x. it returns a matrix and
                    the most accurate extrapolation is in the bottom rightmost
                    cell of the matrix. The main benefit of Richardson
                    extrapolation is that it is incredibly faster than normal
                    derivation, but the downside is that it is not practical to
                    do without the help of a computer.
                    <br /> obj ={" {"}
                    <br />{" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"x"
                    : <br />{" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {"{"}
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {'"num": '}123
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {'"den": '}456
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {"}"},
                    <br />{" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"f(x)"
                    : "x + 2," <br />{" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"function"
                    :{' "'}Extrapolate{'"'}
                    <br />
                    &nbsp;{"}"}
                  </p>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>

          {/* MONTE CARLO INTEGRATION */}
          <div
            onMouseEnter={() => {
                setCurrent([...current, "Monte"]);
            }}
            className={
              current.at(current.length - 1) == "Monte" ? styles.ANumerical : styles.Numerical
            }
          >
            <h1 className={styles.AboutTitle}>Monte Carlo Integration</h1>
            {current.includes("Monte") ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <form
                  onSubmit={(e) => {
                    setMCNumFin(true);
                    setMCVars(Array(monteCarlonum).fill(""));
                    e.preventDefault();
                  }}
                  className={styles.ModalForm}
                >
                  <label className={styles.ModalName}>
                    Enter number of variables in formula up to 40
                  </label>
                  <label className={styles.ModalName}>
                    <input
                      className={styles.ModalInput}
                      type="text"
                      name="monteNum"
                      placeholder="20"
                      value={monteCarlonum}
                      onBlur={(e) => {
                        if (
                          !isNaN(parseInt(e.target.value)) &&
                          parseInt(e.target.value) < 41
                        ) {
                          setMonteCarloNum(parseInt(e.target.value));
                        } else if (isNaN(parseInt(e.target.value)))
                          setMonteCarloNum(1);
                        else if (parseInt(e.target.value) > 40)
                          setMonteCarloNum(40);
                      }}
                      onChange={(e) => {
                        setMonteCarloNum(e.target.value);
                      }}
                    />
                  </label>
                  <button
                    className={styles.ModalSubmit}
                    type="button"
                    value="Submit"
                    onClick={() => {
                      setMCNumFin(true);
                      setMCVars(Array(monteCarlonum).fill(""));
                      setMCBounds(Array(monteCarlonum).fill([0, 1]));
                    }}
                  >
                    Next
                  </button>
                </form>
                {mcNumsFin ? (
                  <div style={{ marginTop: "20px", width: "100%" }}>
                    <form
                      className={styles.ModalForm}
                      style={{ width: "100%" }}
                    >
                      <label
                        className={styles.ModalName}
                        style={{ padding: "12px" }}
                      >
                        Input Variable Letters (caplital letters treated
                        uniquely from lowercase e.g. X =/= x)
                      </label>
                      <label
                        className={styles.ModalName}
                        style={{
                          margintop: "10px",
                          marginBottom: "2px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          flexDirection: "row",
                          flexWrap: "wrap",
                        }}
                      >
                        {Array.apply(null, Array(monteCarlonum)).map((e, i) => (
                          <input
                            key={i}
                            className={styles.ModalInput}
                            style={{ width: "10%" }}
                            type="text"
                            name={`variable_${i}`}
                            placeholder="x"
                            value={mcVars[i]}
                            maxLength={1}
                            onChange={(e) => {
                              setMCVars([
                                ...mcVars.slice(0, i),
                                e.target.value.replace(
                                  /([lnecositaqrt]|[^a-z])/gi,
                                  ""
                                ),
                                ...mcVars.slice(i + 1),
                              ]);
                            }}
                          />
                        ))}
                      </label>
                      <div>
                        <label className={styles.ModalName}>
                          Reserved Letters:
                        </label>
                        {reservedVars.map((e, i) => (
                          <label key={i} className={styles.ModalName}>
                            &nbsp;&nbsp;{e}{" "}
                            {i == reservedVars.length - 1 ? "" : ","}
                          </label>
                        ))}
                      </div>
                      {!mcVars.includes("") ? (
                        <button
                          type="button"
                          value="Submit"
                          className={styles.ModalSubmit}
                          onClick={() => setMCFormStg(true)}
                        >
                          Enter Variable Letters
                        </button>
                      ) : (
                        <button
                          type="button"
                          value="Submit"
                          className={styles.ModalSubmitDisabled}
                        >
                          Enter Variable Letters
                        </button>
                      )}
                    </form>
                  </div>
                ) : (
                  <></>
                )}
                {mcFormStg ? (
                  <div style={{ marginTop: "20px" }}>
                    <form className={styles.ModalForm}>
                      <p style={{ lineHeight: ".2" }}>
                        Enter Formula For Integration
                      </p>
                      <p style={{ lineHeight: ".2" }}>
                        Must include ALL VARIABLES:
                      </p>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {mcVars.map((e, i) => (
                          <p style={{ lineHeight: ".2" }} key={i}>
                            &nbsp;&nbsp;{e} {i == mcVars.length - 1 ? "" : ","}
                          </p>
                        ))}
                      </div>
                      <label
                        className={styles.ModalName}
                        style={{ margintop: "3px", marginBottom: "2px" }}
                      >
                        <input
                          className={styles.ModalInput}
                          style={{ width: "100%" }}
                          type="text"
                          name="function"
                          placeholder="sin(x**2 + 3) * (6 * x) + e(x)"
                          value={mcForm}
                          onChange={(e) => {
                            setMCForm(e.target.value);
                          }}
                        />
                      </label>
                      {mcForm != "" ? (
                        <div className={styles.Matrix}>
                          <div
                            className={styles.MatrixTot}
                            style={{ overflowWrap: "anywhere" }}
                          >
                            <p
                              style={{ color: "black" }}
                              className={styles.MatrixVal}
                            >
                              {mcForm}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                      {mcVars.every((item) => mcForm.includes(item)) ? (
                        <button
                          type="button"
                          value="Submit"
                          className={styles.ModalSubmit}
                          onClick={() => setMCBoundsStg(true)}
                        >
                          Enter f(x)
                        </button>
                      ) : (
                        <button
                          type="button"
                          value="Submit"
                          className={styles.ModalSubmitDisabled}
                        >
                          Enter f(x)
                        </button>
                      )}
                      {!mcBoundsStg ? exampleEquations : <></>}
                    </form>
                  </div>
                ) : (
                  <></>
                )}
                {mcBoundsStg &&
                mcVars.every((item) => mcForm.includes(item)) ? (
                  <div style={{ marginTop: "20px", width: "100%" }}>
                    <form
                      className={styles.ModalForm}
                      style={{ width: "100%" }}
                    >
                      <label className={styles.ModalName}>
                        Enter Bounds for Integration For Each Variable
                      </label>
                      <label style={{ display: "flex", flexDirection: "row" }}>
                        {mcVars.map((e, i) => (
                          <p style={{ lineHeight: ".2" }} key={i}>
                            {!i ? "In" : ""} {e}{" "}
                            {i == mcVars.length - 1 ? " order" : ","}
                          </p>
                        ))}
                      </label>
                      <label
                        className={styles.ModalName}
                        style={{
                          margintop: "10px",
                          marginBottom: "2px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          flexDirection: "row",
                          flexWrap: "wrap",
                        }}
                      >
                        {Array.apply(null, Array(monteCarlonum)).map((e, i) => (
                          <div
                            key={i}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              marginTop: "20px",
                            }}
                          >
                            <p>{mcVars[i]} bound</p>
                            <label className={styles.ModalName}>
                              upper:
                              <input
                                className={styles.ModalInput}
                                type="text"
                                name="num"
                                placeholder="20"
                                value={mcBounds[i][1]}
                                onBlur={(e) => {
                                  if (!isNaN(parseInt(e.target.value))) {
                                    setMCBounds([
                                      ...mcBounds.slice(0, i),
                                      [
                                        mcBounds[i][0],
                                        parseInt(e.target.value),
                                      ],
                                      ...mcBounds.slice(i + 1),
                                    ]);
                                  } else if (isNaN(parseInt(e.target.value)))
                                    setMCBounds([
                                      ...mcBounds.slice(0, i),
                                      [mcBounds[i][0], 1],
                                      ...mcBounds.slice(i + 1),
                                    ]);
                                }}
                                onChange={(e) => {
                                  setMCBounds([
                                    ...mcBounds.slice(0, i),
                                    [mcBounds[i][0], e.target.value],
                                    ...mcBounds.slice(i + 1),
                                  ]);
                                }}
                              />
                            </label>
                            <label className={styles.ModalName}>
                              lower:
                              <input
                                className={styles.ModalInput}
                                type="text"
                                name="den"
                                placeholder="20"
                                value={mcBounds[i][0]}
                                onBlur={(e) => {
                                  if (!isNaN(parseInt(e.target.value))) {
                                    setMCBounds([
                                      ...mcBounds.slice(0, i),
                                      [
                                        parseInt(e.target.value),
                                        mcBounds[i][1],
                                      ],
                                      ...mcBounds.slice(i + 1),
                                    ]);
                                  } else if (isNaN(parseInt(e.target.value)))
                                    setMCBounds([
                                      ...mcBounds.slice(0, i),
                                      [parseInt(e.target.value), 0],
                                      ...mcBounds.slice(i + 1),
                                    ]);
                                }}
                                onChange={(e) => {
                                  setMCBounds([
                                    ...mcBounds.slice(0, i),
                                    [e.target.value, mcBounds[i][1]],
                                    ...mcBounds.slice(i + 1),
                                  ]);
                                }}
                              />
                            </label>
                          </div>
                        ))}
                      </label>

                      <button
                        type="button"
                        value="Submit"
                        className={styles.ModalSubmit}
                        onClick={() => handleNumericalRequest("Monte")}
                      >
                        Integrate
                      </button>
                    </form>
                    {mcFin ? (
                      <div
                        className={styles.Matrix}
                        style={{
                          alignItems: "center",
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "column",
                          maxWidth: "100%",
                        }}
                      >
                        <h3 style={{ color: "black" }}>
                          Monte Carlo Integration
                        </h3>
                        <h4 style={{ color: "black" }}>Approximation</h4>
                        <div className={styles.MatrixTot}>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "black",
                              fontSize: "",
                              overflowWrap: "anywhere",
                            }}
                          >
                            {mcBounds
                              .slice(0)
                              .reverse()
                              .map((e, i) => (
                                <p
                                  style={{ fontSize: "25px" }}
                                  key={i}
                                  className={styles.MatrixVal}
                                >
                                  &#8747;
                                  <sub style={{ fontSize: "10px" }}>{e[0]}</sub>
                                  <sup style={{ fontSize: "10px" }}>{e[1]}</sup>
                                </p>
                              ))}
                            <p>&nbsp;&nbsp;</p>
                            <p className={styles.MatrixVal}>
                              ({mcForm})&nbsp;&nbsp;
                            </p>
                            {mcVars.map((e, i) => (
                              <p key={i} className={styles.MatrixVal}>
                                d{e}
                              </p>
                            ))}
                            <p className={styles.MatrixVal}>
                              &nbsp;=&nbsp;{mcAns["Monte"]}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                ) : (
                  <></>
                )}
                {mcFin ? (
                  <p className={styles.AboutParagraph}>
                    Monte Carlo Integration is a powerful approximation tool
                    that allows us to find integrals at very high powers.
                    Finding an exact integral for a function with 10 variables
                    would be difficult withoug Monte Carlo. The way that it
                    works is that it generates a random number x and finds f(x)
                    then it multiplies that number by the difference of upper
                    bound (a) and lower bound (b). By doing so it find the area
                    of a square with height f(x) and width b-a. The Monte Carlo
                    part of this is that it does this operation thousands of
                    times and finds the average of all squares. In this way it
                    finds an approximate area below the curve within the bounds
                    of a b. The API accepts json in the form:
                    <br /> obj ={" {"}
                    <br />{" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"vars"
                    : ['x', 'y', 'z'],
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"bounds":
                    [[0,1], [-1, 2], [3, 5]],
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"f(x)"
                    : "x + 2," <br />{" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"function"
                    :{' "'}Monte{'"'}
                    <br />
                    &nbsp;{"}"}
                  </p>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>

          {/* INTEGRATION */}
          <div
            onMouseEnter={() => {
                setCurrent([...current, "Int"]);
            }}
            className={current.at(current.length - 1) == "Int" ? styles.ANumerical : styles.Numerical}
          >
            <h1 className={styles.AboutTitle}>Integration</h1>
            {current.includes("Int") ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                {current.includes("Int") ? (
                  <div style={{ marginTop: "20px" }}>
                    <form className={styles.ModalForm}>
                      <p>Enter f(x) to Integrate</p>
                      <label
                        className={styles.ModalName}
                        style={{ margintop: "10px", marginBottom: "2px" }}
                      >
                        <input
                          className={styles.ModalInput}
                          style={{ width: "100%" }}
                          type="text"
                          name="function"
                          placeholder="sin(x**2 + 3) * (6 * x) + e(x)"
                          value={intFunc}
                          onChange={(e) => {
                            setIntFunc(e.target.value);
                          }}
                        />
                      </label>
                      {intFunc != "" ? (
                        <div className={styles.Matrix}>
                          <div
                            className={styles.MatrixTot}
                            style={{ overflowWrap: "anywhere" }}
                          >
                            <p
                              style={{ color: "black" }}
                              className={styles.MatrixVal}
                            >
                              {intFunc}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                      <button
                        type="button"
                        value="Submit"
                        className={styles.ModalSubmit}
                        onClick={() => setIntFuncFin(true)}
                      >
                        Enter f(x)
                      </button>
                      {!intFuncFin ? exampleEquations : <></>}
                    </form>
                  </div>
                ) : (
                  <></>
                )}
                {intFuncFin ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <form className={styles.ModalForm}>
                      <label className={styles.ModalName}>
                        Enter Bounds for Integration
                      </label>
                      <label className={styles.ModalName}>
                        upper:
                        <input
                          className={styles.ModalInput}
                          type="text"
                          name="upper"
                          placeholder="20"
                          value={intBounds["upper"]}
                          onChange={(e) =>
                            setxValue({
                              ...intBounds,
                              [e.target.name]: e.target.value,
                            })
                          }
                          onBlur={(e) => {
                            if (!isNaN(parseInt(e.target.value))) {
                              setxValue({
                                ...intBounds,
                                [e.target.name]: parseInt(e.target.value),
                              });
                            } else
                              setxValue({ ...intBounds, [e.target.name]: 1 });
                          }}
                        />
                      </label>
                      <label className={styles.ModalName}>
                        lower:
                        <input
                          className={styles.ModalInput}
                          type="text"
                          name="lower"
                          placeholder="20"
                          value={intBounds["lower"]}
                          onChange={(e) =>
                            setxValue({
                              ...intBounds,
                              [e.target.name]: e.target.value,
                            })
                          }
                          onBlur={(e) => {
                            if (!isNaN(parseInt(e.target.value))) {
                              setxValue({
                                ...intBounds,
                                [e.target.name]: parseInt(e.target.value),
                              });
                            } else
                              setxValue({ ...intBounds, [e.target.name]: 0 });
                          }}
                        />
                      </label>
                      <button
                        className={styles.ModalSubmit}
                        type="button"
                        value="Submit"
                        onClick={() => {
                          handleNumericalRequest("Integrate");
                        }}
                      >
                        Integrate
                      </button>
                    </form>
                  </div>
                ) : (
                  <></>
                )}

                {intFin ? (
                  <div
                    className={styles.Matrix}
                    style={{
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      maxWidth: "100%",
                    }}
                  >
                    <h3 style={{ color: "black" }}>Integration Operations</h3>
                    <div className={styles.MatrixTot}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "black",
                          overflowWrap: "anywhere",
                        }}
                      >
                        <p
                          style={{ fontSize: "25px" }}
                          className={styles.MatrixVal}
                        >
                          &#8747;
                          <sub style={{ fontSize: "10px" }}>
                            {intBounds["lower"]}
                          </sub>
                          <sup style={{ fontSize: "10px" }}>
                            {intBounds["upper"]}
                          </sup>
                          &nbsp;&nbsp; ({intFunc})&nbsp;&nbsp;dx
                        </p>
                        <p className={styles.MatrixVal}>
                          Simpson Integration: &nbsp;{intAns["Simpson"]}
                        </p>
                        <p className={styles.MatrixVal}>
                          Romberg Integration: &nbsp;{intAns["Romberg"]}
                        </p>
                        <p className={styles.MatrixVal}>
                          Trapezoidal Integration: &nbsp;&nbsp;{intAns["Trapezoidal"]}
                        </p>
                      </div>
                    </div>
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
