const express = require("express");

const setupExpressServer = () => {
  const app = express();
  app.use(express.json());

  app.get("/teapot", (req, res) => res.status(418).end());
  app.get("/hello", (req, res) => res.send("world"));
  app.get("/hellojson", (req, res) => res.send({ hello: "world" }));
  app.get("/greet", (req, res) => res.send(`Hello ${req.query.name}!`));
  app.get("/:a/plus/:b", (req, res) =>
    res.json({ result: ~~req.params.a + ~~req.params.b })
  );
  app.post("/echo", (req, res) => res.json(req.body));
  app.options("/echo", ({ body }, res) => {
    const result = {};
    for (const key in body) {
      result[body[key]] = key;
    }
    res.json(result);
  });

  app.use("/secret", (req, res, next) => {
    const token = parseInt(req.query.token, 10);
    if (token % 2 === 0) {
      return next();
    }
    res.status(401).end();
  });

  app.get("/secret", (req, res) => {
    res.status(200).end();
  });

  app.post("/secret/message", (req, res) => {
    const { key, shout } = req.body;
    if (key === 42 && shout === "marco") {
      return res.send("polo");
    }
    res.status(403).end();
  });

  return app;
};

module.exports = { setupExpressServer };
