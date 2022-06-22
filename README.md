## firebase-cloudfunction-demo

Create a demo REST service based on firebase cloud function and firestore.

### Preparation
1. Create firebase project and cloud firestore (A demo project and firestore was already created).
2. Install nodejs 16.x.
3. Install firebase cli: `npm i -g firebase-tools`.
4. Install java runtime for local firestore emulator.

### Local development
1. Login firebase: `firebase login`.
2. Serve cloud functions and firestore locally: `cd service && npm run serve`.

### Deploy to production environment
1. Run `cd service && npm run deploy`.
2. The REST api is available on the `https://us-central1-demoproj-limeng.cloudfunctions.net/customers`.


