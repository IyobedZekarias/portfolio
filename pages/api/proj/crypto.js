export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
  // const body = req.body
  // body['api-addition'] = true;


  if (req.body["function"] == 'rsa' && req.body["op"].includes("key")) {
    res
      .status(405)
      .send({
        message:
          "For RSA keys open a websocket with wss://cppapi-portfolio-iz.herokuapp.com/rsakey",
      });
    return
  }
  const config = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body),
  };

  try {
    const response = await fetch(
      "https://cppapi-portfolio-iz.herokuapp.com/crypto",
      config
    );

    const json = await response.json();
    res.status(response.status).json(json);
    return;
  } catch (error) {
    console.log(error);
    res.status(405).send({ error: error });
  }
}
