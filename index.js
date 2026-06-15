import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { randomUUID } from "crypto";
 
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
 
const app = express();
const PORT = process.env.PORT || 3000;
 
// In-memory post store
let posts = [
  {
    id: randomUUID(),
    title: "The Unreasonable Effectiveness of Just Starting",
    excerpt:
      "Most people wait for the perfect moment to begin. There is no perfect moment. There is only now, and the compounding returns of momentum.",
    content: `Most people wait for the perfect moment to begin. There is no perfect moment. There is only now, and the compounding returns of momentum.
 
I've watched countless brilliant people delay shipping their work, waiting for one more revision, one more round of feedback, one more week of polish. Meanwhile, the people who ship imperfect things consistently — they get better. They get faster. They develop the most important skill in any creative field: the ability to finish.
 
The first version of anything is going to be bad. This isn't pessimism; it's mechanics. Writing, building, designing — these are skills that improve through iteration, and iteration requires having something to iterate on.
 
So start. Write the ugly first draft. Ship the rough prototype. Post the half-formed thought. The momentum you build from completing things — even imperfect things — is worth more than the perfect thing that never exists.`,
    author: "Editorial",
    date: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    tag: "Essay",
  },
  {
    id: randomUUID(),
    title: "On Reading Slowly in a Fast World",
    excerpt:
      "Speed reading is a myth sold to people who are afraid of being bored. The best books reward slowness.",
    content: `Speed reading is a myth sold to people who are afraid of being bored. The best books reward slowness.
 
There's a particular kind of reading that happens when you're in a hurry — skimming for information, hunting for the thesis, extracting the useful bits. It's efficient. It's also a form of strip mining. You get the ore but miss the landscape.
 
Slow reading is different. It's closer to conversation than extraction. You pause. You argue with the author. You follow a footnote down a rabbit hole and emerge somewhere unexpected, having forgotten what you were originally looking for.
 
Some books I've read twice as fast the second time, not because I was rushing, but because I understood the architecture — I knew where the author was going, and could appreciate the journey rather than just trying to keep up.
 
The goal isn't pages per hour. The goal is the kind of reading that changes how you think.`,
    author: "Editorial",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    tag: "Reflection",
  },
];
 
// Middleware
app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));
app.use(express.static(join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
 
// Helper: format date
function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
 
// ─── Routes ──────────────────────────────────────────────────────────────────
 
// Home — list all posts
app.get("/", (req, res) => {
  res.render("index", { posts, formatDate });
});
 
// New post form
app.get("/posts/new", (req, res) => {
  res.render("new", { error: null });
});
 
// Create post
app.post("/posts", (req, res) => {
  const { title, content, author, tag } = req.body;
  if (!title?.trim() || !content?.trim()) {
    return res.render("new", { error: "Title and content are required." });
  }
  const lines = content.trim().split(/\n+/);
  const excerpt = lines[0].slice(0, 160) + (lines[0].length > 160 ? "…" : "");
  posts.unshift({
    id: randomUUID(),
    title: title.trim(),
    excerpt,
    content: content.trim(),
    author: author?.trim() || "Anonymous",
    date: new Date().toISOString(),
    tag: tag?.trim() || "Note",
  });
  res.redirect("/");
});
 
// View single post
app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === req.params.id);
  if (!post) return res.redirect("/");
  res.render("post", { post, formatDate });
});
 
// Edit form
app.get("/posts/:id/edit", (req, res) => {
  const post = posts.find((p) => p.id === req.params.id);
  if (!post) return res.redirect("/");
  res.render("edit", { post, error: null });
});
 
// Update post
app.post("/posts/:id/edit", (req, res) => {
  const { title, content, author, tag } = req.body;
  const idx = posts.findIndex((p) => p.id === req.params.id);
  if (idx === -1) return res.redirect("/");
  if (!title?.trim() || !content?.trim()) {
    return res.render("edit", {
      post: posts[idx],
      error: "Title and content are required.",
    });
  }
  const lines = content.trim().split(/\n+/);
  const excerpt = lines[0].slice(0, 160) + (lines[0].length > 160 ? "…" : "");
  posts[idx] = {
    ...posts[idx],
    title: title.trim(),
    excerpt,
    content: content.trim(),
    author: author?.trim() || "Anonymous",
    tag: tag?.trim() || "Note",
  };
  res.redirect(`/posts/${posts[idx].id}`);
});
 
// Delete post
app.post("/posts/:id/delete", (req, res) => {
  posts = posts.filter((p) => p.id !== req.params.id);
  res.redirect("/");
});
 
// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Blog running → http://localhost:${PORT}`);
});