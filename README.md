# DevFolio - Full-Stack Portfolio CMS

A complete full-stack portfolio and content management system built with Node.js, Express, React, Redux, and MySQL.

## 🚀 Features

### Public-Facing Site

- **Home Page** - Beautiful landing page with feature highlights
- **Projects Showcase** - Display portfolio projects with descriptions, images, and links
- **Blog Platform** - Share articles and insights
- **Awards/Badges** - Highlight achievements and certifications
- **About/Profile** - Personal profile and bio

### Admin Dashboard

- **Projects Management** - CRUD operations for projects
- **Blog Management** - Draft and publish articles
- **Awards Management** - Manage achievements
- **Profile Editor** - Update personal information
- **Publish Control** - Draft vs Published toggle for all content
- **Image Upload** - Support for image URLs

### Technical Features

- **Authentication** - Secure JWT-based authentication with bcrypt password hashing
- **State Management** - Redux Toolkit for predictable state management
- **Database** - MySQL with proper schema and relationships
- **RESTful API** - Well-structured Express API
- **Responsive UI** - TailwindCSS for modern, mobile-friendly design

## 📁 Project Structure

```
devfolio/
├── backend/              # Node.js + Express API
│   ├── src/
│   │   ├── routes/       # API endpoints
│   │   ├── controllers/  # Route handlers
│   │   ├── models/       # Data models
│   │   ├── middleware/   # Custom middleware
│   │   ├── config/       # Configuration files
│   │   └── index.js      # Entry point
│   ├── package.json
│   └── .env.example
│
├── frontend/             # React + Vite
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── redux/        # Redux store, slices
│   │   ├── api/          # Axios instance
│   │   ├── styles/       # TailwindCSS styles
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
│
├── database/             # MySQL scripts
│   ├── schema.sql        # Database schema
│   └── README.md
│
└── docs/                 # Documentation
```

## 🛠️ Tech Stack

**Backend:**

- Node.js
- Express.js
- MySQL 2
- JWT Authentication
- bcryptjs

**Frontend:**

- React 18
- Vite
- Redux Toolkit
- TailwindCSS
- React Router
- Axios

## ⚙️ Setup & Installation

### Prerequisites

- Node.js (v16 or higher)
- MySQL Server
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file from `.env.example`:

```bash
cp .env.example .env
```

4. Update `.env` with your database credentials:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=devfolio_db
JWT_SECRET=your_jwt_secret_key
SERVER_PORT=5000
```

5. Create the database:

```bash
mysql -u root -p < ../database/schema.sql
```

6. Start the server:

```bash
npm run dev
```

Server runs on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

Frontend runs on `http://localhost:3000`

## 📚 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Projects

- `GET /api/projects` - Get all published projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (admin)
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Blog Posts

- `GET /api/posts` - Get all published posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create post (admin)
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### Awards

- `GET /api/awards` - Get all published awards
- `POST /api/awards` - Create award (admin)
- `PUT /api/awards/:id` - Update award
- `DELETE /api/awards/:id` - Delete award

### Users

- `GET /api/users/:handle` - Get user profile
- `PUT /api/users/:id` - Update profile

## 🎨 Frontend Pages

- `/` - Home page
- `/projects` - Projects showcase
- `/blog` - Blog listing
- `/login` - Login page
- `/register` - Registration page
- `/dashboard` - Admin dashboard

## 📝 Usage

### Creating a Project

1. Log in to the admin dashboard
2. Navigate to Projects section
3. Create new project with:
   - Title
   - Description
   - Tags
   - Repository URL
   - Live demo URL
   - Image URL
4. Save as draft or publish immediately

### Writing a Blog Post

1. Go to Blog section in dashboard
2. Create new post
3. Write content
4. Add featured image
5. Publish when ready

### Managing Profile

1. Click on profile settings
2. Update:
   - Full name
   - Tagline
   - Bio
   - Avatar URL

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT authentication tokens
- HTTP-only cookie support
- CORS protection
- Input validation

## 📦 Build for Production

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run build
```

This creates an optimized production build in the `dist/` folder.

## 🤝 Contributing

Feel free to extend this project with additional features like:

- Comment system
- Search functionality
- Tags/Categories
- Social sharing
- Analytics
- Email notifications

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🚀 Future Enhancements

- [ ] Email verification
- [ ] Password reset
- [ ] Social media integration
- [ ] Analytics dashboard
- [ ] Dark mode
- [ ] Multi-language support
- [ ] SEO optimization
- [ ] Performance monitoring

---

**Happy coding! Build something amazing with DevFolio! 🎉**
