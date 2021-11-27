# GitHub Multiapp OAuth Server

Add a `.env` file in the root of the project with:

```
OPENQ_ID=5fbd39c6916b7efb63cc
OPENQ_SECRET=<get from an admin>
ORIGIN_URL='http://localhost:3000'
```

A simple express server that can easily be configured to serve multiple OAuth apps.

The problem is that each OAuth app needs its own server endpoint to exchange an auth code for an access token.

https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps#2-users-are-redirected-back-to-your-site-by-github

I am working with GitHub OAuth quite often and most of the time it's the only reason I need a server. The token exchange can not happen publically because that would reveal your app secret. I'm a bit tired of setting up a server with just this one endpoint each time, so I created this handy little express server that simply takes a URL parameter to choose which OAuth app credentials to use.

```
git clone https://github.com/mktcode/github-multiapp-oauth-server.git
cd github-multiapp-oauth-server
npm ci
```

Then create a `.env` file with one or more OAuth app client ID and secret pairs.

```
MYAPP_ID=...
MYAPP_SECRET=...
OTHERAPP_ID=...
OTHERAPP_SECRET=...
```

Now you can start the server and make requests like this:

```
npm start
```

```
GET http://localhost:3000/?app=otherapp&code=...
```

You can also set the port and a path prexis in `.env`:

```
PORT=3001
PATH_PREFIX=/github-oauth
```

# CORS

By default all origins are allowed but you can restrict it per app.

```
OTHERAPP_ORIGIN=https://yourdomain.com,https://dev.yourdomain.com
```

# Deploy

Tag a commit as local, development, staging or production to deploy.