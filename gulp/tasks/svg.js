module.exports = function() {

    $.gulp.task('svg', function() {
        var fontName = 'ico-font';
        var runTimestamp = Math.round(Date.now()/1000);

        // Icon Font code

        return $.gulp.src('assets/img/svg-icons/*.svg')
            .pipe($.gp.iconfontCss({
                fontName: fontName, // The name that the generated font will have
                path: 'assets/scss/plugins/icons-font-template.scss', // The path to the template that will be used to create the SASS/LESS/CSS file
                targetPath: '../../scss/plugins/icons.scss', // The path where the file will be generated
                fontPath: '../fonts/icofont/', // The path to the icon font file
                cacheBuster: runTimestamp
            }))
            .pipe($.gp.iconfont({
                prependUnicode: true, // Recommended option 
                fontName: fontName, // Name of the font
                formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'], // The font file formats that will be created
                normalize: true,
                timestamp: runTimestamp // Recommended to get consistent builds when watching files
            }))
            .pipe($.gulp.dest('assets/fonts/icofont'));


        // SVG Sprite code

        // return $.gulp.src('assets/img/svg-icons/*.svg')
        //     .pipe($.gp.svgstore({
        //         inlineSvg: true
        //     }))
        //     .pipe($.gp.rename('sprite.html'))
        //     .pipe($.gulp.dest('assets/template'));
    });
}
