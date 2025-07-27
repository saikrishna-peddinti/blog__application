# blogify

A full-stack blog application built using Node.js, Express.js, EJS, and MongoDB. It supports user authentication, blog CRUD operations, image uploads via AWS S3, and is deployed using AWS Elastic Beanstalk.

🚀 Features
📝 Create, edit, and delete blog posts
👤 User authentication and authorization
📷 Upload images to AWS S3
🌐 Fully deployed on AWS Elastic Beanstalk
🎨 Responsive UI with Bootstrap
💬 Comments section (optional if added)
🛠️ Tech Stack
Category	Technology
Backend	Node.js, Express.js
Frontend	EJS, Bootstrap
Database	MongoDB
File Storage	AWS S3
Deployment	AWS Elastic Beanstalk
Authentication	Passport.js / bcrypt
Template Engine	EJS
⚙️ Environment Setup
Create a .env file in the root directory with the following:

MONGO_URI=your_mongodb_connection_string
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_region
S3_BUCKET_NAME=your_bucket_name
SESSION_SECRET=your_session_secret
PORT=3000


blogify/
│
├── public/               # Static files (CSS, JS, images)
├── routes/               # Express route files
│   └── blog.js
├── models/               # Mongoose schemas
│   └── Blog.js
├── views/                # EJS templates
│   └── index.ejs
│   └── blog.ejs
├── controllers/          # Optional: Logic separation
├── uploads/              # (Temporarily holds files before S3 upload)
├── .env
├── app.js                # Main application
├── package.json
└── README.md
