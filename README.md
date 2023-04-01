# The Alveus Twitch Extension

A Twitch extension that helps viewers that watch [Maya Higa](https://www.twitch.tv/maya)'s Twitch streams identify and learn about the ambassadors at [Alveus](https://www.alveussanctuary.org/), Maya's wild life sanctuary.

## Demo
### Overlay


https://user-images.githubusercontent.com/49528805/229294979-1cf91fc2-420a-43ec-95c4-78c06d4ec99d.mp4

### Panel


https://user-images.githubusercontent.com/49528805/229295136-675313d2-54e4-4758-a42c-76961c4d2e66.mp4

### Mobile



https://user-images.githubusercontent.com/49528805/229295376-6490d0a5-5f01-456b-8509-6e551ce82f1c.mp4



## Local Set Up

1. Head up to https://dev.twitch.tv/console/extensions/create and create a new extension.
   You will need to create a new version: Select `Panel`, `Mobile` and `Video - Fullscreen` for the extension type. Leave all other settings as they are.
2. Copy the `.env.sample` file to `.env` (which sets `REACT_APP_CHAT_COMMANDS_PRIVILEGED_USER`)
3. Copy the `.env.development.local.sample` file to `.env.development.local` (which sets `HTTPS=true`, `HOST=localhost`, and `PORT=8080`). You may add a channel and user to test chat commands here (e.g. `REACT_APP_CHAT_COMMANDS_TEST_CHANNEL=testuser` and `REACT_APP_CHAT_COMMANDS_PRIVILEGED_USER=testuser`)
4. Install dependencies for the project with `npm install`
5. Start the development server with `npm start`

There are two ways to run the extension. You can either add it to a channel on Twitch, or use the developer rig to test locally.
Testing via Twitch itself is recommended here, as the developer rig runs a rather outdated version of Chromium and often isn't the best experience.

### Running via Twitch

If you're using Chrome, enable `allow invalid certificates for resources loaded from localhost`: [`chrome://flags/#allow-insecure-localhost`](chrome://flags/#allow-insecure-localhost).
If using Firefox, once you have started the development server, you will want to navigate to [`https://localhost:8080`](https://localhost:8080), click advanced and select accept the risk.

To test the overlay directly on Twitch, you will need to be live on Twitch with the extension installed.
The panel for the extension can be tested on Twitch while offline, as this is displayed on the channel page.

Under the `Status` tab of the extension version, scroll to the bottom and click on `View on Twitch and Install`. Install the extension on your channel and activate it.

If you are wanting to test the overlay, activate it for your overlay slot. Once activated, started broadcasting and the extension should be visible.
If you are testing the panel, make sure to activate the extension for a panel slot. You should then be able to see in on the channel about page.

If you want to use an alternate account, add the account to `Testing Account Allowlist` under the `Access` tab of the extension version and install the extension on that account.

### Running without Twitch

If you just want to test out the overlay, or the panel, locally without Twitch, you can do so by directly opening the pages in a browser. After all, Twitch overlays and panels are just embedded web apps.

The panel is available at [localhost:8080/panel.html](https://localhost:8080/panel.html) and the overlay is available at [localhost:8080/video_overlay.html](https://localhost:8080/video_overlay.html) while the development server is running.

### Running via Developer Rig

To test the overlay locally with Twitch, you'll need to install the [Twitch Developer Rig](https://dev.twitch.tv/docs/extensions/rig/).

Open the rig application and authenticate it with your Twitch account. Click on `Create your First Project` in the rig UI, and select the extension you created earlier.
When prompted, select the root of the repository as the project directory and select `None - I'll use my own code` for the boilerplate code option.

Access the `Extension Views` tab and create a new view. Choose which view you wish to test and save it.

### Hiding CSS Files

If you're using VSCode, CSS files are hidden through the `settings.json` file in `.vscode`.

If you're using an IntelliJ IDE, switch the Project View the `Extension` scope (as defined by `Extension.xml` in `.idea/scopes`).

## Converting Single-Page App to Multi-Page App

react-app-rewired-multiple-entry is used to add multiple entry points to the app. it uses the config-overrides.js file to add the entry points.

found out about it through this web link: https://gitgud.io/-/snippets/376

package link: https://www.npmjs.com/package/react-app-rewire-multiple-entry

env-cmd: used to add environment variables to the start script in package.json

## Chatbot Commands

!\[ambassador]: displays the card of the corresponding ambassador

-    Note: \[ambassador] is the first name of any ambassador (Ex: !nilla = Nilla Wafer, !snork = snork)

!welcome: displays the Alveus introduction section

## Contribute

Contributions are always welcome! If you have any ideas, suggestions, fixes, feel free to contribute. Make sure to discuss what you plan to work on either as an issue or in the discussion page. You can also throw in any ideas at all in the discussion page. You can contribute to the codebase by going through the following steps:

1. Clone this repo
2. Create a branch: `git checkout -b youruserame/your-feature`
3. Make some changes
4. Test your changes
5. Push your branch and open a Pull Request

<b>\*Note:</b> All contributions must be possible for all displays (Overlay & Panel) and responsive to their different sizes (including mobile).
