const express = require("express");
const authRouter = require("./auth");
const adminRouter = require("./admin");
const customerRouter = require("./customer");
const agentRouter = require("./agent");
const parcelRouter = require("./parcel");

const api = express.Router();

api.use("/auth", authRouter);
api.use("/admin", adminRouter);
api.use("/customer", customerRouter);
api.use("/agent", agentRouter);
api.use("/parcel", parcelRouter);

module.exports = api;
