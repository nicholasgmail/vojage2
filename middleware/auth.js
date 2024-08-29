export default function ({store, redirect}) {
  store.dispatch('setToken');
  // if (!store.getters.is_login && !store.getters.register) {
  //     return redirect('/login');
  // }
}
