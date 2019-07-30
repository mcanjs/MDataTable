import { task, dest, parallel, series, watch, src } from 'gulp';
import browserify   from 'browserify';
import babelify     from 'babelify';
import source       from 'vinyl-source-stream';
import buffer       from 'vinyl-buffer';
import uglify       from 'gulp-uglify';
import sourcemaps   from 'gulp-sourcemaps';
import postcss      from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano      from 'cssnano';
import gSass        from 'gulp-sass';
import rename       from 'gulp-rename';
import destination  from './destination.js';


// BrowserSync
const browserSync = require('browser-sync').create();

export const sass = task('sass', () => {
    return (
        src(destination.sass)
            .pipe(sourcemaps.init())
            .pipe(gSass())
            .on("error", gSass.logError)
            .pipe(sourcemaps.write())
            .pipe(dest(destination.css))
            .pipe(browserSync.stream())
    );
});

export const js = task('js', () => {

    return browserify({entries: destination.rootJs, debug: true})
        .transform("babelify", { presets: ["es2015"] })
        .bundle()
        .pipe(source('script.js'))
        .pipe(buffer())
        .pipe(dest(destination.js))
        .pipe(browserSync.stream());
});

export const prodSass = task('prodSass', () => {
    return (
        src(destination.sass)
            .pipe(sourcemaps.init())
            .pipe(gSass())
            .on("error", gSass.logError)
            .pipe(postcss([autoprefixer(), cssnano()]))
            .pipe(rename('style.min.css'))
            .pipe(sourcemaps.write())
            .pipe(dest(destination.css))
    );
});

export const prodJs = task('prodJs', () => {

    
    return browserify({entries: destination.rootJs, debug: true})
        .transform("babelify", { presets: ["es2015"] })
        .bundle()
        .pipe(source('script.min.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(dest(destination.js));
});

const reload = (done) => {
    browserSync.reload();
    done();
}

const server = () => {
    browserSync.init({
        server: {
            baseDir: destination.dist
        }
    });
}

export const dev = task('dev', () => {
    watch(destination.rootJs, series('js'));
    watch(destination.sourceJs, series('js'));
    watch(destination.rootSass, series('sass'));
    watch(destination.rootSass, series('sass'));
    watch(destination.sass, series('sass'));
    watch(destination.template, series('js'));

    server();

    watch(destination.html, reload);
});
 
export const prod = task('prod', parallel('prodJs', 'prodSass'));
