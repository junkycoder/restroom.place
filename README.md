# Restroom Place
Místo, kde anonymně zanecháte vzkaz pro ostatní spolusráče. Pseudo sociální síť,
kde své veřejné profily mají reálná místa, ale její uživatelé jsou anonymní.

* [wireframes](https://app.excalidraw.com/l/3morKKwsyGZ/9wcWz7uzmqn)
## Development
Celý to běží na **Firebase**.

```bash
npm i -g firebase-tools
firebase emulators:start
open localhost:5000
```
### Frontend
Vše co najdete ve složce `public/`. 

Pravidla jednoduchosti jsou:
* **Nepoužívá** NPM, ale import ESM modulu z CDN.
* **Nepoužívá** bundler, ale prostě moduly.
* Pure **HTML**, **JavaScript**, **CSS** a klasické assety.
* **Není** SPA, ale [routing řeší hosting](./firebase.json).
* **Nejsou** stejže (prod, dev, test), pouze lokální emulace.
* Není to PWA/fullscreen, využívá navigační prvky prohlížeče

### Backend
Složenej z [cloud funkcí](./functions), [firestore](./firestore.rules) a [storage](./storage.rules).
## Deployment
```bash
git commit
git pull
git push
```
