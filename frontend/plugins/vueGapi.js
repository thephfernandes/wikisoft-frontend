import Vue from 'vue';
import VueGapi from 'vue-gapi';

const config = {
  apiKey: process.env.GOOGLE_API_KEY,
  clientId: process.env.GOOGLE_CLIENT_ID,
  scope: 'https://www.googleapis.com/auth/contacts.readonly',
  discoveryDocs: ['https://people.googleapis.com/$discovery/rest?version=v1']
}

Vue.use(VueGapi, config)
