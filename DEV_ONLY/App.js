import React from 'react';
import {
  render
} from 'react-dom';

import '../src/styles.css';

import VidzPlayer from '../src';

const styles = {
  boxSizing: 'border-box',
  padding: 5,
  maxWidth: 800
};

const App = () => {
  return (
    <div style={styles}>
      <VidzPlayer
        loop
        mp4="https://d2v9y0dukr6mq2.cloudfront.net/video/preview/slow-motion-flames-from-bottom-of-screen_byiidqveh__PM.mp4"
        muted
        playOnClick
      />
    </div>
  )
};

const div = document.createElement('div');

div.id = 'app-container';

render((
  <App/>
), div);

document.body.appendChild(div);

document.body.style.margin = 0;