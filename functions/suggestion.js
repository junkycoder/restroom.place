const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { fetch, Headers } = require("fetch-h2");

const config = functions.config();

const MIN_INPUT_USER_LENGTH = 120;
const MAX_INPUT_USER_LENGTH = 100 * 4;

exports.suggestion = functions.https.onCall(
  async ({ roomId, text }, context) => {
    if (!context.auth || !context.auth.token.email_verified) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "Nejste ověřeno."
      );
    }

    if (text.length < MIN_INPUT_USER_LENGTH) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        `Nejprve zadejte alespoň ${MIN_INPUT_USER_LENGTH} znaků.`
      );
    }

    if (text.length > MAX_INPUT_USER_LENGTH) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        `Zadejte maximálně ${MAX_INPUT_USER_LENGTH} znaků.`
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
      temperature: 0.8,
      max_tokens: 30,
      // frequency_penalty: 0.1,
      // presence_penalty: 0.6,
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
