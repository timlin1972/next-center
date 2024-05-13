import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
  },
  { timestamps: true }
);

const expanseSchema = new mongoose.Schema(
  {
    major: {
      type: String,
      required: true,
    },
    minor: {
      type: String,
    },
  },
  { timestamps: true }
);

const incomeSchema = new mongoose.Schema(
  {
    major: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const transferSchema = new mongoose.Schema(
  {
    major: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const recordSchema = new mongoose.Schema(
  {
    // 0 - Expanse
    // 1 - Income
    // 2 - Transfer
    category: {
      type: Number,
      required: true,
    },
    subcategory: {
      type: mongoose.ObjectId,
      required: true,
    },
    account1: {
      type: mongoose.ObjectId,
      required: true,
    },
    account2: {
      type: mongoose.ObjectId,
    },
    amount1: {
      type: Number,
      required: true,
    },
    amount2: {
      type: Number,
    },
    datetime: {
      type: Date,
    },
    note: {
      type: String,
    },
    tag: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Account =
  mongoose.models?.Account || mongoose.model("Account", accountSchema);
export const Expanse =
  mongoose.models?.Expanse || mongoose.model("Expanse", expanseSchema);
export const Income =
  mongoose.models?.Income || mongoose.model("Income", incomeSchema);
export const Transfer =
  mongoose.models?.Transfer || mongoose.model("Transfer", transferSchema);
export const Record =
  mongoose.models?.Record || mongoose.model("Record", recordSchema);
