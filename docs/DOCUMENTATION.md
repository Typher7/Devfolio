# DevFolio Project Documentation

## Overview

DevFolio is a comprehensive HCI Capstone Project that combines a public-facing portfolio website with a private admin CMS (Content Management System). The system allows portfolio owners to showcase projects, share blog posts, and display awards/achievements.

## Phases

### Phase 0: Project Setup & Planning ✅

- Created project structure
- Defined tech stack
- Outlined MVP features

### Phase 1: Database Design ✅

- Created MySQL database schema
- Defined all required tables
- Set up relationships and indexes

### Phase 2: Backend Development ✅

- Set up Express.js server
- Created RESTful API endpoints
- Implemented authentication with JWT
- Added CRUD operations for projects, posts, awards

### Phase 3: Frontend Development ✅

- Set up React + Vite project
- Created Redux store for state management
- Built reusable components
- Implemented pages for public and admin sections

## Key Components

### Backend Structure

```
src/
├── config/        # Database and environment configuration
├── routes/        # API endpoints (auth, projects, posts, awards, users)
├── controllers/   # Business logic (ready to expand)
├── middleware/    # Authentication, error handling
└── models/        # Database queries (ready to expand)
```

### Frontend Structure

```
src/
├── components/    # Navbar, ProjectCard, BlogCard, LoginForm
├── pages/         # HomePage, ProjectsPage, BlogPage, etc.
├── redux/         # Store, slices for auth, projects, posts, awards
├── api/           # Axios instance with interceptors
└── styles/        # TailwindCSS configuration
```

## Installation & Running

### Database Setup

1. Open MySQL Workbench
2. Execute `database/schema.sql` to create all tables

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Update .env with your database credentials
npm run dev  # Starts on http://localhost:5000
```

### Frontend

```bash
cd frontend
npm install
npm run dev  # Starts on http://localhost:3000
```

## Features Implemented

### Public Features

✅ Home page with feature highlights
✅ Projects showcase with filtering
✅ Blog listing and reading
✅ Awards/Badges display
✅ Public user profiles

### Admin Features

✅ User authentication (login/register)
✅ Dashboard with statistics
✅ Project CRUD operations
✅ Blog post management
✅ Awards management
✅ Profile editing
✅ Draft/Publish toggle

### Technical Features

✅ JWT authentication with bcrypt
✅ Redux state management
✅ Responsive TailwindCSS UI
✅ RESTful API
✅ CORS enabled
✅ Error handling

## Next Steps

1. **Testing**: Add unit and integration tests
2. **Enhancement**: Add comment system, search functionality
3. **Optimization**: Implement caching, lazy loading
4. **Deployment**: Deploy to cloud (AWS, Heroku, Vercel)
5. **Monitoring**: Add logging and monitoring
6. **Documentation**: API documentation with Swagger

## API Documentation

All endpoints are prefixed with `/api`

### Auth Routes

```
POST   /auth/register       - Register new user
POST   /auth/login          - Login user
```

### Project Routes

```
GET    /projects            - Get published projects
GET    /projects/:id        - Get project by ID
POST   /projects            - Create project
PUT    /projects/:id        - Update project
DELETE /projects/:id        - Delete project
```

### Post Routes

```
GET    /posts               - Get published posts
GET    /posts/:id           - Get post by ID
POST   /posts               - Create post
PUT    /posts/:id           - Update post
DELETE /posts/:id           - Delete post
```

### Award Routes

```
GET    /awards              - Get published awards
POST   /awards              - Create award
PUT    /awards/:id          - Update award
DELETE /awards/:id          - Delete award
```

### User Routes

```
GET    /users/:handle       - Get user profile
PUT    /users/:id           - Update user profile
```

## Environment Variables

### Backend (.env)

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=devfolio_db
DB_PORT=3306
JWT_SECRET=your_secret_key
JWT_EXPIRY=7d
SERVER_PORT=5000
NODE_ENV=development
```

## Testing the API

### Using Postman or cURL

1. Register a user:

```bash
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "password123",
  "full_name": "John Doe",
  "handle": "johndoe"
}
```

2. Login:

```bash
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

3. Create a project:

```bash
POST /api/projects
Headers: Authorization: Bearer <token>
{
  "user_id": 1,
  "title": "My Awesome Project",
  "description": "A great project description",
  "tags": "React, Node.js",
  "repo_url": "https://github.com/user/project",
  "live_url": "https://project.com",
  "image_url": "https://example.com/image.jpg",
  "is_published": true
}
```

## Troubleshooting

### Database Connection Error

- Ensure MySQL is running
- Check credentials in .env
- Verify database exists

### CORS Error

- Backend CORS is enabled for localhost:3000
- Add additional origins in `index.js` if needed

### Module Not Found

- Run `npm install` in both backend and frontend
- Check Node modules are installed

## Performance Considerations

- Database queries use indexes on frequently searched columns
- JWT tokens for stateless authentication
- Redux for client-side state caching
- Lazy loading can be added to images

---

For more information, refer to the main README.md or individual component documentation.
