"use server";

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";
import { CountryCode, Products } from "plaid";
import { plaidClient } from "../plaid";

// SIGN IN
export const signIn = async ({ email, password }: signInProps) => {
  try {
    // Mutation - Database - fetch data
    const { account } = await createAdminClient();

    const response = await account.createEmailPasswordSession(email, password);
    return parseStringify(response);
  } catch (error) {
    console.error("Error", error);
  }
};

//SIGN UP (EMAIL - PASSWORD) CREATE NEW ACCOUNT FOR USER - SESSTION - SAVE ON COOKIE
export const signUp = async (userData: SignUpParams) => {
  const { email, password, firstName, lastName } = userData;
  try {
    // create new user account
    const { account } = await createAdminClient();
    const newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    );

    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUserAccount);
  } catch (error) {
    console.error("Error", error);
  }
};

//Initilization function TO LOGGED IN USER BY APP-WRITE
// SO I CAN GET THE USER
export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    return parseStringify(user);
  } catch (error) {
    return null;
  }
}

//Initilization function TO LOGGED OUT

export async function logoutAccount() {
  try {
    const { account } = await createSessionClient();
    cookies().delete("appwrite-session");
    await account.deleteSession("current");
  } catch (error) {
    return null;
  }
}



export const createLinkToken = async (user: User) => {
  try {
    const tokenParams = {
      user: {
        client_user_id: user.$id,
      },
      client_name: `${user.firstName} ${user.lastName}`,
      products: ["auth"] as Products[],
      language: "en",
      country_codes: ["US"] as CountryCode[],
    };

    const response = await plaidClient.linkTokenCreate(tokenParams);

    return parseStringify({ linkToken: response.data.link_token })
  } catch (error) {
    console.log(error);
  }
}
