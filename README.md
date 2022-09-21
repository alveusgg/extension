# Alveus Ambassadors

A Twitch extension that helps viewers that watch [Maya Higa](https://www.twitch.tv/maya)'s Twitch streams identify and learn about the ambassadors at [Alveus](https://www.alveussanctuary.org/), Maya's wild life sanctuary.

# Demo

https://user-images.githubusercontent.com/49528805/167273992-0cbe7329-9665-4d67-a38c-5e47e9353a18.mov

# Local Set Up
1. Enable Allow invalid certificates for resources loaded from localhost in Chrome: chrome://flags/#allow-insecure-localhost
2. Get the mongoDB URI from the Alveus Ambassadors team and add it to a .env file in the server folder 
3. Run the following in the server and root folder: `npm install` and `npm start`

## Note

CSS files are hidden through the settings.json file in .vscode

# Converting Single-Page App to Multi-Page App

react-app-rewired-multiple-entry is used to add multiple entry points to the app. it uses the config-overrides.js file to add the entry points.

found out about it through this web link: https://gitgud.io/-/snippets/376

package link: https://www.npmjs.com/package/react-app-rewire-multiple-entry

env-cmd: used to add environment variables to the start script in package.json
