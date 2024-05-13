"use server";

import { revalidatePath } from "next/cache";

import {
  Account,
  Expanse,
  Income,
  Transfer,
  Record,
} from "@/lib/models/accounting";
import { connectToDb } from "@/lib/utils";

//
// account
//
export const addAccount = async (prevState, formData) => {
  const { title, desc } = Object.fromEntries(formData);

  try {
    connectToDb();
    const newAccount = new Account({
      title,
      desc,
    });

    await newAccount.save();
    console.log("saved to db");
    revalidatePath("/main/accounting/account");
    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const updateAccount = async (prevState, formData) => {
  const { id, title, desc } = Object.fromEntries(formData);

  try {
    connectToDb();

    const updateFields = {
      title,
      desc,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await Account.findByIdAndUpdate(id, updateFields);
    revalidatePath("/main/accounting/account");
    return { success: true };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update account!");
  }
};

export const deleteAccount = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    await Account.findByIdAndDelete(id);
    console.log("deleted from db");
    revalidatePath("/main/accounting/account");
    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

//
// expanse
//
export const addExpanse = async (prevState, formData) => {
  const { major, minor } = Object.fromEntries(formData);

  try {
    connectToDb();
    const newExpanse = new Expanse({
      major,
      minor,
    });

    await newExpanse.save();
    console.log("saved to db");
    revalidatePath("/main/accounting/expanse");

    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const updateExpanse = async (prevState, formData) => {
  const { id, major, minor } = Object.fromEntries(formData);

  try {
    connectToDb();

    const updateFields = {
      major,
      minor,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await Expanse.findByIdAndUpdate(id, updateFields);
    revalidatePath("/main/accounting/expanse");
    return { success: true };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update expanse!");
  }
};

export const deleteExpanse = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    await Expanse.findByIdAndDelete(id);
    console.log("deleted from db");
    revalidatePath("/main/accounting/expanse");
    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

//
// income
//
export const addIncome = async (prevState, formData) => {
  const { major } = Object.fromEntries(formData);

  try {
    connectToDb();
    const newIncome = new Income({
      major,
    });

    await newIncome.save();
    console.log("saved to db");
    revalidatePath("/main/accounting/income");

    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const updateIncome = async (prevState, formData) => {
  const { id, major } = Object.fromEntries(formData);

  try {
    connectToDb();

    const updateFields = {
      major,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await Income.findByIdAndUpdate(id, updateFields);
    revalidatePath("/main/accounting/income");
    return { success: true };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update income!");
  }
};

export const deleteIncome = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    await Income.findByIdAndDelete(id);
    console.log("deleted from db");
    revalidatePath("/main/accounting/income");
    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

//
// transfer
//
export const addTransfer = async (prevState, formData) => {
  const { major } = Object.fromEntries(formData);

  try {
    connectToDb();
    const newTransfer = new Transfer({
      major,
    });

    await newTransfer.save();
    console.log("saved to db");
    revalidatePath("/main/accounting/transfer");

    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const updateTransfer = async (prevState, formData) => {
  const { id, major } = Object.fromEntries(formData);

  try {
    connectToDb();

    const updateFields = {
      major,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await Transfer.findByIdAndUpdate(id, updateFields);
    revalidatePath("/main/accounting/transfer");
    return { success: true };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update transfer!");
  }
};

export const deleteTransfer = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    await Transfer.findByIdAndDelete(id);
    console.log("deleted from db");
    revalidatePath("/main/accounting/transfer");
    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

//
// record
//
export const addRecord = async (prevState, formData) => {
  const {
    category,
    subcategory,
    account1,
    account2,
    amount1,
    amount2,
    datetime,
    note,
    tag,
  } = Object.fromEntries(formData);

  try {
    connectToDb();
    const newRecord = new Record({
      category,
      subcategory,
      account1,
      account2,
      amount1,
      amount2,
      datetime,
      note,
      tag,
    });

    await newRecord.save();
    console.log("saved to db");
    revalidatePath("/main/accounting/record");

    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const updateRecord = async (prevState, formData) => {
  const {
    id,
    category,
    subcategory,
    account1,
    account2,
    amount1,
    amount2,
    datetime,
    note,
    tag,
  } = Object.fromEntries(formData);

  try {
    connectToDb();

    const updateFields = {
      category,
      subcategory,
      account1,
      account2,
      amount1,
      amount2,
      datetime,
      note,
      tag,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await Record.findByIdAndUpdate(id, updateFields);
    revalidatePath("/main/accounting/record");
    return { success: true };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update record!");
  }
};

export const deleteRecord = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    await Record.findByIdAndDelete(id);
    console.log("deleted from db");
    revalidatePath("/main/accounting/record");
    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};
