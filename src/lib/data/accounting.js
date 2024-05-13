import { connectToDb } from "@/lib/utils";
import {
  Account,
  Expanse,
  Income,
  Transfer,
  Record,
} from "@/lib/models/accounting";

//
// account
//
export const fetchAccounts = async (q, page, condition) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 10;

  try {
    connectToDb();
    const count = await Account.find({
      title: { $regex: regex },
      ...condition,
    }).count();

    const accounts = await Account.find({
      title: { $regex: regex },
      ...condition,
    })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, accounts };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch accounts!");
  }
};

export const getAccount = async (id) => {
  try {
    connectToDb();
    const account = await Account.findOne({ _id: id });
    return account;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch account!");
  }
};

//
// expanse
//
export const fetchExpanses = async (q, page, condition) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 10;

  try {
    connectToDb();
    const count = await Expanse.find({
      major: { $regex: regex },
      ...condition,
    }).count();

    const expanses = await Expanse.find({
      major: { $regex: regex },
      ...condition,
    })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, expanses };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch expanses!");
  }
};

export const getExpanse = async (id) => {
  try {
    connectToDb();
    const expanse = await Expanse.findOne({ _id: id });
    return expanse;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch expanse!");
  }
};

//
// income
//
export const fetchIncomes = async (q, page, condition) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 10;

  try {
    connectToDb();
    const count = await Income.find({
      major: { $regex: regex },
      ...condition,
    }).count();

    const incomes = await Income.find({
      major: { $regex: regex },
      ...condition,
    })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, incomes };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch incomes!");
  }
};

export const getIncome = async (id) => {
  try {
    connectToDb();
    const income = await Income.findOne({ _id: id });
    return income;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch income!");
  }
};

//
// transfer
//
export const fetchTransfers = async (q, page, condition) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 10;

  try {
    connectToDb();
    const count = await Transfer.find({
      major: { $regex: regex },
      ...condition,
    }).count();

    const transfers = await Transfer.find({
      major: { $regex: regex },
      ...condition,
    })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, transfers };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch transfers!");
  }
};

export const getTransfer = async (id) => {
  try {
    connectToDb();
    const transfer = await Transfer.findOne({ _id: id });
    return transfer;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch transfer!");
  }
};

//
// record
//
export const fetchRecords = async (q, page, condition) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 10;

  try {
    connectToDb();
    const count = await Record.find({
      note: { $regex: regex },
      ...condition,
    }).count();

    const records = await Record.find({
      note: { $regex: regex },
      ...condition,
    })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, records };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch records!");
  }
};

export const getRecord = async (id) => {
  try {
    connectToDb();
    const record = await Record.findOne({ _id: id });
    return record;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch record!");
  }
};
