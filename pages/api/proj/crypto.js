export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
  // const body = req.body
  // body['api-addition'] = true;

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
