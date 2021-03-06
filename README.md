<h1 align="center">
<br>

<b>🔥 F I R E C D N</b>

<br>
</h1>
<br>

## What's that?

Firecdn is a low latancy cdn using firebase, You can directly upload a file (Authenticated) and share it on internet. It will be pretty much handy and very fast because you can choose your server's location.

## Deploy

Deploy is not quite simple. But if you are a tech lover you will definitely enjoy. Deployment is divided into two parts.

<!--[![Watch it on Youtube](https://shields.io/badge/WATCH-HOW%20TO%20DEPLOY-red?logo=youtube&style=for-the-badge "Watch it on Youtube")](http://youtu.be/ "Watch it on Youtube")-->

### 1. Setup Firebase

Setup the Firebase is simple. But firebase storage comes without `access-control-allow-origin` header (CORS) that's why we have to setup the cors.

- Open [Firebase Console](https://console.firebase.google.com/)
- Create a New Project (Click on Add Project)
- Give a Name, and setup the project
- We have set write on storage only from the authenticated request, that's why we have to setup Firebase Auth. So, click on `Authentication` in Dashboard and hit `Get Started`
- Enable `Email/Password` method in `Sign-in providers`
- Click on users and add an user by entering Email & Password
- Copy `User UID` of that created user
- Now in Project's Dashboard click on `Storage`, Click on `Get Started`
- Click on `Next` for security rules (Will change it later)
- For cloud storage location, Setup your nearest location ([Check this out](https://cloud.google.com/about/locations)) and hit `Next`
- Copy the bucket url for later (starts with gs://)
- Click on `Rules` and replace it with (Don't forget to add the Copied UID) 👇
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth.uid == "copied_uid";
    }
  }
}
```
- Now everything is ready to go, Now have to setup the cors. For that got to [shell.cloud.google.com](https://shell.cloud.google.com/) (Same Account which is used in Firebase)
- Paste the script in terminal 👇
```
curl -sSL https://git.io/JqTL4 | bash
```
- It will ask for `bucket-url` (Previously Copied), Paste that and hit enter and you are ready to go

### 2. Setup Website

- Firstly fork this Repo (Also give a Star 😁)
- Open Firebase again, go to that created project and click `add an web app`
- Give any name to it
- It will give you some configuration scripts, Only copy this part like below
```
var firebaseConfig = {
    apiKey: "AIzaSyB9eBs10atrgeGAI-WQm6UO72lhzmT-vpo",
    authDomain: "thefirecdn.firebaseapp.com",
    projectId: "thefirecdn",
    storageBucket: "thefirecdn.appspot.com",
    messagingSenderId: "707022422419",
    appId: "1:707022422419:web:b51d29ade5652390246866"
  };
```
- Edit `firebase_config.js`
- Replace with the copied script in marked place
- Now you can host the website using Vercel / Netlify / Github Pages etc.
## License & Copyright :
- This Project is [Apache-2.0](https://github.com/cachecleanerjeet/firecdn/blob/main/LICENSE) Licensed
- Copyright 2021 by [Tuhin Kanti Pal](https://github.com/cachecleanerjeet)

## Connect :
- [Channel](https://telegram.dog/tprojects)
- [Support Group](https://telegram.dog/t_projects)
