/* Імпорт основних модулів */
import gulp from 'gulp';
import { path } from './gulp/config/path.js';
/* Імпорт тасків */
import { copy } from './gulp/tasks/copy.js';
import { clean } from './gulp/tasks/clean.js';
import { server } from './gulp/tasks/server.js';
import { html } from './gulp/tasks/html.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { otfToTtf, ttfToWoff, fontsStyle } from './gulp/tasks/fonts.js'
import { sprite } from './gulp/tasks/sprite.js';
import { zip } from './gulp/tasks/zip.js';
import { ftp } from './gulp/tasks/ftp.js';
/* Імпорт головних плагінів */
import { plugins } from './gulp/config/plugins.js';

/* Об'єкт NodeJS, доступний в усіх модулях */
global.app = {
  path, 
  gulp, 
  plugins,
  isBuild: process.argv.includes('--build'),
  isDev: !process.argv.includes('--build')
};

/* Слідкування за файлами */
const watcher = () => {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
}

/* Обробка шрифтів */
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

/* Одночасне виконання основних задач */
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images));

/* Робота gulp в 2 режимах (dev, prod), таски в залежності від режимів будуть працювати по різному, послідовне виконання */
const dev = gulp.series(clean, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(clean, mainTasks);
const deployZIP = gulp.series(clean, mainTasks, sprite, zip);
const deployFTP = gulp.series(clean, mainTasks, sprite, ftp);

/* 
Експорт для мождивості переназначити команди в файлі package.json (npm run dev -> gulp dev) 
Запуск: npm run sprite
*/
export { sprite }
/* Запуск в режимі dev: npm run dev */
export { dev }
/* Запуск в режимі prod: npm run build */
export { build }
/* Запуск таску для створення архіву: npm run zip */
export { deployZIP }
/* Запуск таску для створення архіву: npm run ftp */
export { deployFTP }

/* Дефолтний таск (gulp) */
gulp.task('default', dev);