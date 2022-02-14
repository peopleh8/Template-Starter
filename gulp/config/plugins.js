import replace from 'gulp-replace'; // Пошук і заміна
import plumber from 'gulp-plumber'; // Обробка помилок
import notify from 'gulp-notify'; // Вивод повідомлень про помилку
import browserSync from 'browser-sync'; // Локальний сервер
import newer from 'gulp-newer'; // Перевірка оновлень файлу
import ifPlugin from 'gulp-if'; // Розділення тасків на режими: dev i prod


export const plugins = {
  replace, 
  plumber, 
  notify, 
  browserSync, 
  newer, 
  if: ifPlugin
};