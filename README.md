# Restroom Place
Místo, kde anonymně zanecháte vzkaz pro ostatni spolusráče.

* [wireframes](https://app.excalidraw.com/l/3morKKwsyGZ/9wcWz7uzmqn)
## Development
```bash

```
### Frontend
Vše co najdete ve složce `public/`. 

Pravidla jednoduchosti jsou:
* **Nepoužívá** NPM, ale import ESM modulu z CDN.
* **Nepoužívá** bundler, Fe se nemusí buildit.

1. `npm install -g firebase-tools` + `firebase login`
2. firebase emulators:start
3. open localhost:5000
4. develop 

* FE = `public/`, `firebase.json`
* BE = `functions/`, `firebase.rules`, `storage.rules`

## Deployment
Hosting automaticky pri push, backend funkce pomoci `firebase deploy --only functions` - musíš ale mít Node 14.
