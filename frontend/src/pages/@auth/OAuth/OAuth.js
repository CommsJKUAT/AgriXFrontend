// src/appwrite.js
import { Client, Account, OAuthProvider } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1") // The Appwrite API endpoint
  .setProject("66f6d559002b9faafd1f"); // Your Appwrite project ID
export const account = new Account(client);
export { OAuthProvider };
