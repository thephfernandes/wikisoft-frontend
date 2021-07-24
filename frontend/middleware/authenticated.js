export default function ({ store, redirect }) {
  if (!store.state.user.authenticated) {
    // Login, signup, auth redirect, pwd recover, etc...
    return redirect('/login');
  }
}