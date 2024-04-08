"use server";

import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

import { signIn, signOut } from "./auth";
import { Post, User } from "./models";
import { connectToDb } from "./utils";
import { arch } from "os";

export const handleGithubLogin = async () => {
  await signIn("github");
};

export const addPost = async (prevState, formData) => {
  const { title, desc, body, userId } = Object.fromEntries(formData);

  try {
    connectToDb();
    const newPost = new Post({
      title,
      desc,
      body,
      userId,
    });

    await newPost.save();
    console.log("saved to db");
    revalidatePath("/main/blog");
    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const deletePost = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    await Post.findByIdAndDelete(id);
    console.log("deleted from db");
    revalidatePath("/main/blog");
    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const updatePost = async (prevState, formData) => {
  const { id, title, desc, body, archive } = Object.fromEntries(formData);

  try {
    connectToDb();

    const updateFields = {
      title,
      desc,
      body,
      archive: typeof archive !== "undefined",
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await Post.findByIdAndUpdate(id, updateFields);
    revalidatePath("/main/posts");
    return { success: true };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update user!");
  }
};

export const addUser = async (prevState, formData) => {
  const { username, email, password, isAdmin } = Object.fromEntries(formData);

  try {
    connectToDb();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isAdmin,
    });

    await newUser.save();
    console.log("saved to db");
    revalidatePath("/main/users");
    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    await Post.deleteMany({ userId: id });
    await User.findByIdAndDelete(id);
    console.log("deleted from db");
    revalidatePath("/main/users");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const updateUser = async (formData) => {
  const { id, username, email, password, isAdmin } =
    Object.fromEntries(formData);

  try {
    connectToDb();

    const updateFields = {
      username,
      email,
      password,
      isAdmin,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    if (typeof updateFields.password !== "undefined") {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateFields.password = hashedPassword;
    }

    await User.findByIdAndUpdate(id, updateFields);
    revalidatePath("/main/users");
    return { success: true };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update user!");
  }
};

export const handleGithubLogout = async () => {
  await signOut();
};

export const register = async (prevState, formData) => {
  const { username, email, password, passwordRepeat } =
    Object.fromEntries(formData);

  if (password !== passwordRepeat) {
    return { error: "Passwords do not match" };
  }

  try {
    connectToDb();

    const user = await User.findOne({ username });

    if (user) {
      return { error: "Username already exists" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    console.log("saved to db");

    return { success: true };
  } catch (err) {
    console.log(err);
    return {
      error: "Something went wrong!",
    };
  }
};

export const login = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (err) {
    if (err.type === "CredentialsSignin") {
      return { error: "Invalid username or password" };
    }

    throw err;
  }
};
