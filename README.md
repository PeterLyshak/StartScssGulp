# Gulp Starter Pack
This package intended to solve common front-end development tasks. Works best for psd/sketch/figma to html projects and save you a lot of time setting up local environment

### Dependencies
Name               | Minimum required version                                                      
:------------------|:----------------------------------
NPM                | v6.4.1
Node.js            | v8.12.0


## How to start
* `npm i` - install npm dependencies
* `gulp` - run dev-server
* `gulp build` - build project from sources

## List of Gulp tasks
To run separate task type in command line `gulp [task_name]`.

### Main tasks
Task name          | Description                                                      
:------------------|:----------------------------------
`default`          | will start all tasks required by project in dev mode: initial build, watch files, run server with livereload
`build`            | build production-ready project (with code optimizations)

### Other tasks
Task name          | Description                                                      
:------------------|:----------------------------------
`sass` 	           | compile .sass/.scss to .css. Included [autoprefixer](https://github.com/postcss/autoprefixer)
`html`             | compile html templates templates
`scripts`          | minifies `./assets/js/` .js code into separate files into `./build/js` 
`scripts:lib`      | combines `./assets/js/libs/` vendor files and custom .js code into `./build/js/plugins.min.js`
`svg`              | create svg symbol sprites or icon font (you can uncomment needed code in /gulp/tasks/svg.js)
`img`              | optimize, minify and clone images
`serve`            | run dev-server powered by [BrowserSync](https://www.browsersync.io/)
`clean`            | clean `./build` folder
`fonts`            | copy fonts files from `./assets/fonts/` path to `./build/fonts/` path

All available tasks are placed in a folder `./gulp/tasks` as separate **.js** files.

