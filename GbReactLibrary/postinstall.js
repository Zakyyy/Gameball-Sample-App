// post-install.js

/**
 * Script to run after npm install
 *
 * Copy selected files to user's directory
 */

'use strict'

var gentlyCopy = require('gently-copy')

var filesToCopy = ['src/widget/Web.bundle/loader.html']

// User's local directory
var userPath = process.env.INIT_CWD

// Moving files to user's local directory
gentlyCopy('src/widget/Web.bundle', userPath+'/html')