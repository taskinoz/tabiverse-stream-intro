# Tabiverse Stream Intro
An automated script to build my stream intro on twitch

## About
I recently saw the [Tabiverse Chrome Extension](https://chrome.google.com/webstore/detail/tabiverse/hpplgjkooibhfkmmepoikcjpadcojcik) and thought it would look good as an idle animation to entertain viewers as I begin my twitch stream. I originally modified the version I had installed on my browser, but the extension started getting some rapid updates, and the source Javascript file is minified.

I made this script to download the latest version of the extension and patch it based on strings that correspond to elements that I wanted to modify or remove.

## Usage
1) After cloning or downloading the repo, run:
    ```bash
    npm i
    node index.js
    ```

2) Create a new `Browser` source and set the URL to the file path of the `index.html` in `/extension` with your desired width and height

3) Remove the `Custom CSS` from the source

<p align="center" style="text-align:center"><img width="722" height="874" src="https://raw.githubusercontent.com/taskinoz/tabiverse-stream-intro/master/docs/obs-settings.png" alt="OBS settings for the stream intro" /></p>
