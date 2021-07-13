export default function ({ params, store, redirect }) {
  const currentAccount = store.state.auth.user;
  const accountCompanies = store.state.companies.claimedCompanies;
  const accountPeople = store.state.people.claimedPeople;
  const { accountID, companyID, peopleID } = params;

  // Registration, signup and all other public pages wont work with this!
  // if (!currentAccount) {
  //   console.log(`${Date.now()} you aren't logged in\n`);
  //   return redirect('/login');
  // }

  if (accountID && accountID !== currentAccount) {
    console.log(`${Date.now()} you aren't allowed to see this account page\n`);
    // return redirect('/');
  }

  if (companyID && !accountCompanies.find(item => item.company_id === companyID)) {
    console.log(`${Date.now()} this company is not claimed by your wikiaccount\n`);
    // return redirect('/');s
  }

  if (peopleID && !accountPeople.find(item => item.person_id === peopleID)) {
    console.log(store.state.people)
    console.log(`${Date.now()} this profile is not claimed by your wikiaccount\n`);
    // return redirect('/');
  }
}
