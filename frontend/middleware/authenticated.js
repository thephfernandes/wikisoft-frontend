export default function ({ store, redirect }) {
  if (process.client) {
    if (!store.state.user.authenticated) {
      console.error("user not authenticated")
      // Login, signup, auth redirect, pwd recover, etc...
      return redirect('/login');
    }
  }

}