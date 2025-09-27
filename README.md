Deploying the Animal Bite Clinic static site to Vercel

What I changed
- Added `vercel.json` that rewrites `/` to `/login.html` so visitors land on the login page.
- Added a small client-side redirect in `public/index.html` as a fallback when opening locally or on hosts where `vercel.json` isn't used.

How to deploy
1. Install the Vercel CLI (optional) or use the Vercel dashboard.

   Using PowerShell:

   npm i -g vercel

   vercel login
   cd "c:\Users\Yoshida Yuko\OneDrive\Desktop\froy\Thesis"
   vercel --prod

2. Alternatively, create a new project in the Vercel dashboard and point it to this repository/folder. Vercel will detect the static site and deploy the `public` folder.

Notes and troubleshooting
- The `vercel.json` file is minimal and uses a rewrite so that the root path serves `/login.html`.
- I also added a client-side redirect in `public/index.html` so opening the site locally (file server) will show the login first.
- If you already use routes or need more complex auth redirects, we can switch the rewrites to redirects or add role-based checks (serverless functions) later.
