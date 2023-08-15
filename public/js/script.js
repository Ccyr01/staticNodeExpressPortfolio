
'use strict';

const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));



/**
 * Handle mobile menu functionality to hide/reveal sidebar on mobile layouts
 */
const body = document.querySelector('body');
let headerBtnClicked = false;

document.querySelector('#menu-icon').addEventListener('click', e => {
  !headerBtnClicked ? body.style.transform = 'translateX(300px)' : body.style.transform = 'translateX(0px)';
  return headerBtnClicked = !headerBtnClicked;
});