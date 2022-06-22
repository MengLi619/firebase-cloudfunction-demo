import * as admin from "firebase-admin";
import {Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import * as uuid from "uuid";
import {Customer} from "../types";

const COLLECTION = "Customers";

type DocumentType = Omit<Customer, "id">;

/**
 * Get top 10 customers order by created_at_num
 * @param {Request} req http request
 * @param {Response} res http response
 */
export async function getCustomers(req: Request, res: Response): Promise<void> {
  const limit = Number(req.query.limit || "10");
  try {
    const customers: Customer[] =
      (await admin.firestore().collection(COLLECTION)
          .orderBy("created_at_num")
          .limit(limit)
          .get()
      ).docs.map((doc) => {
        const data = doc.data() as DocumentType;
        return {
          id: doc.id,
          name: data.name,
          created_at: data.created_at,
          created_at_num: data.created_at_num,
        };
      });
    res.status(StatusCodes.OK).json(customers);
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
}

/**
 * Create customer with a given customer's name
 * @param {Request} req http request
 * @param {Response} res http response
 */
export async function createCustomer(
    req: Request,
    res: Response,
): Promise<void> {
  const name = req.body.name;
  if (!name) {
    res.status(StatusCodes.BAD_REQUEST).json({message: "name can't be empty"});
    return;
  }
  const date = new Date();
  const id = uuid.v4();
  const customer: DocumentType = {
    name: name,
    created_at: date.toISOString(),
    created_at_num: date.getTime(),
  };
  try {
    await admin.firestore().collection(COLLECTION).doc(id).set(customer);
    res.status(StatusCodes.CREATED).json({
      id: id,
      ...customer,
    });
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
}
