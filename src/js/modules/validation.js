import JustValidate from 'just-validate';

const formValidate = form => {
  return new JustValidate(form);
}

export default formValidate;

/* Приклад */
// formValidate('form')
//   .addField('#name', [
//     {
//       rule: 'required',
//       value: true,
//       errorMessage: "Name is required"
//     },
//     {
//       rule: 'minLength',
//       value: 3,
//       errorMessage: "To short value"
//     },
//     {
//       rule: 'minLength',
//       value: 10,
//       errorMessage: "To long value"
//     },
//   ])
//   .onSuccess((event) => {
//     console.log('Validation passes and form submitted', event);
//   })
//   .onFail((fields) => {
//     console.log('Form failds', fields);
//   });