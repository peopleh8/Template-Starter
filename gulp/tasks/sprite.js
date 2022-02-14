import svgSprite from 'gulp-svg-sprite'; // Плагін для створення svg-спрайтів

export const sprite = () => {
  return app.gulp.src(app.path.src.svgIcons)
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "SVG SPRITE",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../icons/sprite.svg',
          example: !app.isBuild
        }
      }
    }))
    .pipe(app.gulp.dest(app.path.build.images));
}