export default (context) => {
  if (process.server) {
    const userAgent = context.req.headers['user-agent'];
    context.isMobile = /mobile/i.test(userAgent);
  }
}