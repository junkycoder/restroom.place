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
    // const engine = "davinci";
    const engine = "content-filter-alpha";
    const url = `https://api.openai.com/v1/engines/${engine}/completions`;

    const headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${apiToken}`,
    });

    const json = {
      prompt: `<|endoftext|>${text}\n--\nLabel:`,
      temperature: 0.0,
      max_tokens: 1,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      logprobs: 10,
    };

    const response = await fetch(url, {
      method: "POST",
      headers,
      json,
    });

    let fok;

    const {
      choices: [
        {
          text: suggestion = "",
          logprobs: { top_logprobs: [logprobs] = [] } = {},
        } = {},
      ] = [],
    } = fok =await response.json();

    console.log(JSON.stringify(fok, null, 2));

    if (suggestion.length === 0) {
      throw new functions.https.HttpsError("unknown", "Nepodařilo se.");
    }

    return suggestion;
  }
);
