import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as cors from "cors";
import {createCustomer, getCustomers} from "./APIs/logic";

admin.initializeApp();

const app = express();
app.use(express.json());
app.use(cors());

// apis
app.get("/", getCustomers);
app.post("/", createCustomer);

exports.customers = functions.https.onRequest(app);
