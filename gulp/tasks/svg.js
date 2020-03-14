module.exports = function() {

    $.gulp.task('svg', function() {
        var fontName = 'ico-font';
        var runTimestamp = Math.round(Date.now()/1000);

        return $.gulp.src('assets/img/svg-icons/*.svg')
            .pipe($.gp.iconfontCss({
                fontName: fontName, // The name that the generated font will have
                path: 'assets/scss/plugins/icons-font-template.scss', // The path to the template that will be used to create the SASS/LESS/CSS file
                targetPath: '../../scss/plugins/icons.scss', // The path where the file will be generated
                fontPath: 'assets/fonts/icofont/' // The path to the icon font file
            }))
            .pipe($.gp.iconfont({
                prependUnicode: false, // Recommended option 
                fontName: fontName, // Name of the font
                formats: ['woff2', 'woff', 'svg'], // The font file formats that will be created
                normalize: true,
                timestamp: runTimestamp // Recommended to get consistent builds when watching files
            }))
            .pipe($.gulp.dest('assets/fonts/icofont/'));
    });
}
