import Vue from "vue";
import Toasted from "vue-toasted";

const Toaster = {
    init() {
        Vue.use(Toasted, {
            iconPack : 'material'
        })
    },

    successMessage (message, icon) {
        Vue.toasted.success(message, {
            theme: 'bubble',
            position: 'top-center',
            duration: 2000,
            icon : icon,
            className: ['toaster-bg-color',]
        })
    },

    errorMessage (message, icon){
        Vue.toasted.error(message, {
            theme: 'bubble',
            position: 'top-center',
            duration: 2000,
            icon : icon
        })
    }
}

export default Toaster;


// OR

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