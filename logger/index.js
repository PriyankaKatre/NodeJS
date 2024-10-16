import "dotenv/config";
import express from "express";
import logger from "./logger.js";
import morgan from "morgan";

const app = express();
const morganFormat = ":method :url :status :response-time ms";
app.use(express.json());

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

// It is good practice to add post number in .env file otherwise app will crash during deployment
const PORT = process.env.PORT || 3000;

let teaData = [];
let teaId = 1;

app.post("/teas", (req, res) => {
  const { name, price } = req.body;

  let newTea = {
    id: teaId++,
    name,
    price,
  };
  teaData.push(newTea);
  res.status(200).send(teaData);
});

app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

app.get("/teas/:id", (req, res) => {
  let tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    res.status(404).send("No tea found");
  }
  res.status(200).send(tea);
});

app.put("/teas/:id", (req, res) => {
  let tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    res.status(404).send("No tea found");
  }
  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.status(200).send(tea);
});

//Delete Tea

app.delete("/teas/:id", (req, res) => {
  let index = teaData.findIndex((t) => t.id === parseInt(req.params.id));
  console.log(index);
  if (index === -1) {
    res.status(404).send("Tea not found");
  } else {
    teaData.splice(index, 1);
    res.status(200).send("deleted");
  }
});

app.listen(PORT, () => {
  console.log(`app is running on ${PORT}`);
});
