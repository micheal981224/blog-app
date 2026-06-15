Folio — Blog App A clean, editorial blog built with Node.js, Express.js, and EJS. Posts are stored in memory and reset on server restart (no database). Setup bash# 1. Install dependencies npm install

2. Start the server
npm start

3. Open in browser
open http://localhost:3000 For development with auto-reload (Node 18+): bashnpm run dev Project Structure blog-app/ ├── index.js # Express server & routes ├── package.json ├── views/ │ ├── partials/ │ │ ├── header.ejs # Shared header │ │ └── footer.ejs # Shared footer │ ├── index.ejs # Home — list all posts │ ├── post.ejs # Single post view │ ├── new.ejs # New post form │ └── edit.ejs # Edit post form └── public/ ├── css/ │ └── style.css # All styling └── js/ └── main.js # Client-side interactions Routes MethodPathDescriptionGET/List all postsGET/posts/newNew post formPOST/postsCreate postGET/posts/:idView single postGET/posts/:id/editEdit post formPOST/posts/:id/editUpdate postPOST/posts/:id/deleteDelete post Dependencies

express — HTTP server & routing ejs — HTML templating uuid — Unique post IDs (Node 14.17+ built-in crypto.randomUUID is used instead)
