// const { initizeFirebaseAdmin } = require("./library");

// const admin = initizeFirebaseAdmin();
const { fetch, Headers } = require("fetch-h2");

async function main() {
  // const snapshot = await admin.firestore().collection("neco").get();

  // const urls = snapshot.docs.map(
  //   (doc) => `https://restroom.place/room/${doc.id}`
  // );

  // const batch = admin.firestore().batch();

  // for (let index = 0; index < snapshot.docs.length; index++) {
  //   const doc = snapshot.docs[index];
  //   batch.update(doc.ref, {
  //     qr: svgs[index],
  //   });
  // }

  // await batch.commit();

  const engine = "davinci";
  const url = `https://api.openai.com/v1/engines/${engine}/completions`;

  const headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  });

  const prompt = process.argv[2] || "Ahoj, kolik je hodin?";
  const json = {
    prompt: `${prompt}`,
    temperature: 0.9,
    max_tokens: 42,
    frequency_penalty: 0.0,
    presence_penalty: 0.6,
    stop: ["\n", ". "],
  };

  const response = await fetch(url, {
    method: "POST",
    headers,
    json,
  });

  const { choices: [{ text = "" } = {}] = [] } = await response.json();
  console.log(text);
}

main().catch(console.error);
