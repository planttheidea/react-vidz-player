# react-vidz-player

A simple video player built in React, leveraging vidz for the player creation.

#### Installation

```
$ npm i react-vidz-player --save
```

#### Usage

```javascript
// ES2015
import VidzPlayer from 'react-vidz-player';

// CommonJS
const VidzPlayer = require('react-vidz-player');

// script
const VidzPlayer = window.VidzPlayer;
```

#### Basic implementation

```javascript
const App = () => {
    <VidzPlayer mp4="./my/video.mp4"/>
};
```

#### Advanced implementation

```javascript
const App = () => {
    <VidzPlayer
        autoplay
        controlsBackgroundColor="rgba(255, 0, 60, 0.7)"
        controlsFontColor="#fff"
        controlsTrackColor="red"
        loop
        mp4="./my/video.mp4"
        ogg="./my/video.ogv"
        playOnClick
        preventAutoHideControls
        theme="light"
        webm="./my/video.webm"
    />
};
```

#### Available props

Most props available are those of [vidz](https://github.com/planttheidea/vidz), so check out the documentation there for the complete listing of those props (all passed to `VidzPlayer` will be passed to the `vidz` instance).

Props specific to `VidzPlayer`:
* controlsBackgroundColor `{string}`
    * Custom color used for the background of all controls
* controlsFontColor `{string}`
    * Custom color used for the color of icons and text for all controls
* controlsTrackColor `{string}`
    * Custom color used for the duration and volume track in controls
* playOnClick `{boolean}` *defaults to false*
    * Should the video toggle play / pause when the video itself is clicked
* preventAutoHideControls `{boolean}` *defaults to false*
    * Should the video auto-hide controls while playing after a brief period of no activity from the user
* theme `{string}` *valid values: "light", "dark", defaults to "dark"*
    * Choice of themes to apply rather than setting custom colors for background, font, and track
    * "light" is a simple reversal of colors of "dark"

#### Things to note

For the styling to be complete, you need to bring in the fonts and `fonts.css` file provided with the package, as they provide the icons used on each of the buttons. If you are using something like webpack or browserify this should be easy, simply `import 'react-vidz-player/fonts.css';` and everything else should fall into place. If you are using something else as your build setup, the files are available in the package in the `lib` folder, so you can copy them to your server and distribute them as you like.

`vidz` allows for a custom `height` / `width` parameter, and you can use those as well, however `VidzPlayer` tries to simplify the process for you by auto-determining the `width` based on whatever container it is applied in. It then also calculates the appropriate `height` based on the aspect ratio of the video applied to that calculated `width`, so that the video retains its original aspect ratio at any `width`. If `width` and / or `height` are provided as props they will be respected, but it likely will not be necessary unless you specifically want the video to be a different size than it's container.

Also, if you are using the UMD version provided in dist, there are a few externals required as dependencies:
* `react`
* `react-dom`
* `recompose`
* `vidz`

All of these should be available by either CDN or dist files in their respective repos.

#### Development

Standard stuff, clone the repo and `npm i` to get the dependencies. npm scripts available:
* `build` => builds the distributed JS with `NODE_ENV=development` and with sourcemaps
* `build-minified` => builds the distributed JS with `NODE_ENV=production` and minified
* `compile-for-publish` => runs the `lint`, `test`, `transpile`, `dist`, and `copy-fonts` scripts
* `copy-fonts` => runs the script to copy the fonts folder and file from `src` to `lib`
* `dev` => runs the webpack dev server for the playground
* `dist` => runs the `build` and `build-minified`
* `lint` => runs ESLint against files in the `src` folder
* `prepublish` => if in publish, runs `compile-for-publish`
* `transpile` => runs Babel against files in `src` to files in `lib`

Tests coming soon...