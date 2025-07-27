const { Router } = require("express");
const path = require("path");
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const router = Router();

const multer = require("multer");
const uploadFileToS3 = require("../utils/s3Upload");

const upload = multer({ storage: multer.memoryStorage() });


router.get("/add-new", (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comments = await Comment.find({ blogId: req.params.id }).populate(
    "createdBy"
  );

  return res.render("blog", {
    user: req.user,
    blog,
    comments,
  });
});

router.post("/comment/:blogId", async (req, res) => {
  await Comment.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });
  return res.redirect(`/blog/${req.params.blogId}`);
});

// edit 
router.get('/edit/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate('createdBy');

  if (!blog) return res.status(404).send('Blog not found');

  if (
    req.user._id.toString() !== blog.createdBy._id.toString() &&
    req.user.role !== 'admin'
  ) {
    return res.status(403).send('Unauthorized');
  }

  res.render('edit-blog', { blog });
});


router.post('/edit/:id', upload.single('coverImage'), async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) return res.status(404).send('Blog not found');

  if (
    req.user._id.toString() !== blog.createdBy.toString() &&
    req.user.role !== 'admin'
  ) {
    return res.status(403).send('Unauthorized');
  }

  blog.title = req.body.title;
  blog.body = req.body.body;

  if (req.file) {
    blog.coverImageURL = req.file.location;
  }

  await blog.save();
  res.redirect(`/blog/${blog._id}`);
});

// delete


router.post('/delete/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).send('Blog not found');
    }


    await Blog.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.post("/", upload.single("coverImage"), async (req, res) => {
  const { title, body } = req.body;
  let imageUrl = "";
  if (req.file) {
    imageUrl = await uploadFileToS3(req.file); // upload to S3 and get URL
  }

  const blog = await Blog.create({
    title,
    body,
    createdBy: req.user._id,
    coverImageURL: imageUrl,
  });

  return res.redirect(`/blog/${blog._id}`);
});

module.exports = router;
