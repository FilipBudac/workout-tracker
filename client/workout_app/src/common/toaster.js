// create toaster class with methods (success, error, ...)
// isolating toaster functionality from everywhere in code to here

// OR

// register custom messages

// Example

// import Toasted from 'vue-toasted';
// Vue.use(Toasted);
//
// // options to the toast
// let options = {
//     type : 'error',
//     icon : 'error_outline'
// };
//
// // register the toast with the custom message
// Vue.toasted.register('my_app_error',
//     (payload) => {
//
//         // if there is no message passed show default message
//         if(! payload.message) {
//             return "Oops.. Something Went Wrong.."
//         }
//
//         // if there is a message show it with the message
//         return "Oops.. " + payload.message;
//     },
//     options
// )