import { configFTP } from '../config/ftp.js';
import vinylFTP from 'vinyl-ftp'; // Плагін, який відправляє файли на сервер
import util from 'gulp-util'; // Плагін, який показує хід відправки файлів

export const ftp = () => {
  configFTP.log = util.log;
  
  const FTPConnect = vinylFTP.create(configFTP);

  return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {})
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "FTP",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(FTPConnect.dest(`/${app.path.ftp}/${app.path.rootFolder}`))
}