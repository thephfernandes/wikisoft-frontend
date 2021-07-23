import { Directus } from '@directus/sdk';

export default ({ app }, inject) => {
  const grant_linkedin_login = async function (path) {
    try {
      const transport = new AxiosTransport(process.env.PUBLIC_URL || 'https://io.wikiprofile.com', new MemoryStorage(), async () => {
        await sdk.auth.refresh();
      });
      await transport.get('/server/info');
    } catch (error) {

    }
  }
  inject("grant", grant)
}