const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { fetch, Headers } = require("fetch-h2");

const config = functions.config();

exports.suggestion = functions.https.onCall(
  async ({ roomId, text }, context) => {
    if (!context.auth || !context.auth.token.email_verified) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "Nejste ověřeno."
      );
    }

    const apiToken = (config.openai && config.openai.key) || "";
    const engine = "davinci";
    const url = `https://api.openai.com/v1/engines/${engine}/completions`;

    const headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${apiToken}`,
    });

    const json = {
      prompt: text,
      temperature: 0.96,
      max_tokens: 32,
      frequency_penalty: 0.1,
      presence_penalty: 0.6,
      stop: ["\n", ". "],
    };

    const response = await fetch(url, {
      method: "POST",
      headers,
      json,
    });

    const { choices: [{ text: suggestion = "" } = {}] = [] } = await response.json();

    if (suggestion.length === 0) {
      throw new functions.https.HttpsError("unknown", "Nepodařilo se.");
    }

    return suggestion;
  }
);
