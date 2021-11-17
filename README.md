# Restroom Place
Místo, kde anonymně zanecháte vzkat pro ostatni spolusráče.

* [wireframes](https://app.excalidraw.com/l/3morKKwsyGZ/9wcWz7uzmqn)
## Development

1. `npm install -g firebase-tools` + `firebase login`
2. firebase emulators:start
3. open localhost:5000
4. develop 

* FE = `public/`, `firebase.json`
* BE = `functions/`, `firebase.rules`, `storage.rules`

## Deployment
Hosting automaticky pri push, backend funkce pomoci `firebase deploy --only functions` - musíš ale mít Node 14.
## Logs

- [x] Firebase inicializovaná. 

- [x] Hosting inicializovaný.

- [x] Firebase na klientu inicializovaný.

- [x] Struktura obrazovek podle [wireframes](https://app.excalidraw.com/l/3morKKwsyGZ/9wcWz7uzmqn) nahozena.

- [x] Firebase signInWithEmailLink

- [x] Emulatory vseho nahozeny

- [x] Print QR code sticker