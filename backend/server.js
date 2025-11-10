const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let users = [];
let posts = [];
let comments = [];
let uid=1,pid=1,cid=1;

// register
app.post('/users', (req,res)=>{
  const user={id:uid++, name:req.body.name, bio:req.body.bio||''};
  users.push(user); res.json(user);
});

// get user
app.get('/users/:id', (req,res)=>{
  const u=users.find(x=>x.id==req.params.id);
  if(!u) return res.status(404).send(); res.json(u);
});

// create post
app.post('/posts', (req,res)=>{
  const post={id:pid++, userId:req.body.userId, title:req.body.title, content:req.body.content};
  posts.push(post); res.json(post);
});

// get posts
app.get('/posts', (req,res)=>res.json(posts));

// comment
app.post('/comments', (req,res)=>{
  const c={id:cid++, postId:req.body.postId, userId:req.body.userId, text:req.body.text};
  comments.push(c); res.json(c);
});

// get comments by post
app.get('/posts/:id/comments', (req,res)=>{
  res.json(comments.filter(c=>c.postId==req.params.id));
});

app.listen(5000,()=>console.log('Blog API running on 5000'));
