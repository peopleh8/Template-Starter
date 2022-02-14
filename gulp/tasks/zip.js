import del from 'del'; // Плагін для видалення файлів і папок
import zipPlugin from 'gulp-zip'; // Плагін для створення zip-архіву

export const zip = () => {
  del(`./${app.path.rootFolder}.zip`);
  return app.gulp.src(`./${app.path.buildFolder}/**/*.*`, {})
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "ZIP",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(zipPlugin(`${app.path.rootFolder}.zip`))
    .pipe(app.gulp.dest('./'));
}