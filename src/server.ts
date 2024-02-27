import express from "express";
import payload from "payload";

require("dotenv").config();

const app = express();

const collections = [
  "items",
  "color",
  "supplier",
  "ubication",
  "textil",
  "packaging",
];

collections.forEach((collection) => {
  app.get(`/api/${collection}`, async (req, res) => {
    const filterCollection = await payload.find({
      collection: collection,
      pagination: false,
    });
    res.json(filterCollection);
  });
});

// Redirect root to Admin panel
app.get("/", (_, res) => {
  res.redirect("/admin");
});

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  // Add your own express routes here

  app.listen(process.env.PORT || 3000);
};

start();
