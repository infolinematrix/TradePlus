export default function ({
  store,
  redirect
}) {

  if (!store.getters['auth/check']) {
    return redirect('/auth/login')
  } else {
    store.dispatch('auth/fetchUser')
  }

}
