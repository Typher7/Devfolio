**HCI Capstone Project – DevFolio (Full-Stack Public Portfolio + Admin CMS)**
---
Database, backend, frontend (public + admin), authentication, Redux, media, documentation, and presentation.

---

# **PHASE 0 — PROJECT SETUP & PLANNING**

### **0.1 Create a master project folder**

```
devfolio/
  backend/
  frontend/
  docs/
  presentation/
```

### **0.2 Define your stack**

Recommended stack:

* **Backend:** Node.js + Express
* **Database:** MySQL
* **Auth:** bcrypt + JWT (HTTP-only cookie)
* **Frontend:** React + Vite
* **State Management:** Redux Toolkit
* **UI:** TailwindCSS

### **0.3 Define MVP features (from assignment)**

You must deliver:

#### **Owner (student) dashboard:**

* CRUD Projects
* CRUD Blog Posts
* CRUD Awards/Badges
* Profile editor
* Draft vs published toggle
* Image upload via URL

#### **Public-facing site:**

* Home
* Projects
* Blog
* About/Resume

---

<br>

# **PHASE 1 — DATABASE DESIGN IN MYSQL WORKBENCH**

The goal is to model ALL the tables your CMS will use.

---

## **1.1 Create a new schema**

Name it:

```
devfolio_db
```

---

## **1.2 Create tables (minimum required)**

### **→ users table**

* id (PK)
* email (unique)
* password (hashed)
* full_name
* handle (unique vanity URL)
* tagline
* bio
* avatar_url
* created_at
* updated_at

### **→ projects table**

* id
* user_id (FK → users)
* title
* description
* tags (comma separated or separate table)
* repo_url
* live_url
* image_url
* is_published
* created_at
* updated_at

### **→ posts (blog articles)**

* id
* user_id
* title
* content
* cover_image_url
* is_published
* created_at
* updated_at

### **→ awards**

* id
* user_id
* title
* description
* issuer
* image_url
* is_published
* created_at
* updated_at

### **→ site_settings (OPTIONAL, for resume link, social links, theme)**

---

## **1.3 Export SQL**

Save the DDL in:

```
docs/database-schema.sql
```

You will include this in your documentation.

---

<br>

# **PHASE 2 — BACKEND (API) SETUP**

---

## **2.1 Create backend project**

In `/backend`:

```
npm init -y
npm install express mysql2 dotenv bcrypt jsonwebtoken cookie-parser cors
```

---

## **2.2 Create folder structure**

```
backend/
  src/
    config/
      db.js
    middleware/
      auth.js
    controllers/
      authController.js
      profileController.js
      projectController.js
      postController.js
      awardController.js
    routes/
      authRoutes.js
      profileRoutes.js
      projectRoutes.js
      postRoutes.js
      awardRoutes.js
    server.js
```

---

## **2.3 Database connection**

`db.js` uses mysql2 pool.

---

## **2.4 Implement Authentication**

### Required endpoints (as assignment states):

#### **POST /api/auth/register**

* Validate unique email
* Hash password with bcrypt
* Create JWT
* Set token in HTTP-only cookie

#### **POST /api/auth/login**

* Compare password
* Return cookie + user info

#### **POST /api/auth/logout**

* Clear cookie

#### **GET /api/auth/me**

* Reads JWT from cookie
* Returns user profile

Implement middleware:

```
authRequired → verifies token
```

---

# **PHASE 3 — API MODULES**

You must organize your API documentation by categories (assignment requirement).

---

## **3.1 Profile Routes (owner only)**

### **GET /api/profile**

Returns all profile info.

### **PUT /api/profile**

User updates:

* tagline
* bio
* avatar_url
* resume_link

---

## **3.2 Projects CRUD**

Routes:

* POST /api/projects
* GET /api/projects
* GET /api/projects/:id
* PUT /api/projects/:id
* DELETE /api/projects/:id

Supports:

* tags
* draft/published
* image_url

---

## **3.3 Posts CRUD (blog)**

Similar to projects.

---

## **3.4 Awards CRUD**

Same structure.

---

## **3.5 Public API Routes (no auth required)**

### **GET /api/public/:handle**

Returns:

* profile
* published projects
* published posts
* published awards

This enables **vanity URL portfolios**, such as:

```
yourdomain.com/brocode
```

---

<br>

# **PHASE 4 — FRONTEND (REACT + VITE)**

---

## **4.1 Install React project**

```
npm create vite@latest frontend --template react
```

Inside frontend:

```
npm install react-router-dom redux react-redux @reduxjs/toolkit axios tailwindcss
```

---

## **4.2 Setup folder structure**

```
frontend/
  src/
    app/
      store.js
    features/
      auth/
      profile/
      projects/
      posts/
      awards/
    components/
    pages/
      public/
        Home.jsx
        Projects.jsx
        Blog.jsx
        About.jsx
      dashboard/
        DashboardHome.jsx
        ManageProjects.jsx
        ManagePosts.jsx
        ManageAwards.jsx
        EditProfile.jsx
    utils/
    styles/
```

---

## **4.3 Implement routing**

### **Public pages (no auth):**

```
/
:handle
:handle/projects
:handle/posts
:handle/about
```

### **Private dashboard pages**

Protected using a custom component:

```
<ProtectedRoute>
   <Dashboard />
</ProtectedRoute>
```

---

## **4.4 Redux Slices**

You must include these because the assignment requires it.

### **authSlice**

* user
* token
* isAuthenticated

### **profileSlice**

Profile data CRUD.

### **projectsSlice**

Handles Project CRUD state.

### **postsSlice**

Blog CRUD.

### **awardsSlice**

Awards CRUD.

---

## **4.5 UI Components**

Examples:

* ProjectCard
* PostCard
* AwardCard
* Form inputs (reusable)
* Navbar
* DashboardSidebar
* PublicPortfolioLayout

Using Tailwind ensures consistent styling.

---

<br>

# **PHASE 5 — PUBLIC PORTFOLIO PAGES**

---

## **5.1 Public Home Page**

Loads content from:

```
GET /api/public/:handle
```

Shows:

* Avatar
* Tagline
* About summary
* Featured projects
* Blog previews

---

## **5.2 Projects Page**

Shows published projects only.

---

## **5.3 Blog Page**

Paginated list of posts.

---

## **5.4 About/Resume Page**

Includes:

* Bio
* Resume link
* Skills
* Awards

---

<br>

# **PHASE 6 — DASHBOARD (OWNER CMS)**

---

## **6.1 Dashboard Home**

Stats such as:

* Project count
* Post count
* Awards count

---

## **6.2 Project Management**

CRUD UI:

* Create form
* Edit form
* Toggle "published"
* Delete

---

## **6.3 Blog Management**

Similar to projects.

---

## **6.4 Awards Management**

Simple badge upload section.

---

## **6.5 Profile Settings**

Editable fields:

* Name
* Tagline
* Bio
* Avatar URL
* Resume URL
* Social links (optional)

---

<br>

# **PHASE 7 — MEDIA HANDLING**

Assignment requires “Image URL upload.”

So instead of file upload:

* User pastes image URL
* Store as string in database
* Frontend displays image

Optional improvement:
Use cloud storage (Cloudinary).

---

<br>

# **PHASE 8 — DOCUMENTATION (MANDATORY FOR GRADE)**

Place everything inside `/docs`.

Your teacher explicitly requires:

---

## **8.1 Database Documentation**

For each table:

* Name
* Columns
* Types
* Key constraints
* Relationship diagram
* SQL code

---

## **8.2 API Documentation**

Organized by categories:

* Auth
* Profile
* Projects
* Posts
* Awards

For each endpoint:

* Method
* URL
* JSON body example
* Success response
* Error response
* Authentication requirements

---

## **8.3 Frontend Routes**

Separate sections:

### Public routes

* `/`
* `/:handle`
* `/:handle/projects`
* `/:handle/posts`
* `/:handle/about`

### Private routes

* `/dashboard`
* `/dashboard/projects`
* `/dashboard/posts`
* `/dashboard/awards`
* `/dashboard/profile`

---

## **8.4 Key Components**

Document important React components:

* ProjectCard
* ProjectForm
* DashboardSidebar
* PortfolioLayout

---

## **8.5 Redux Slices Overview**

Document:

* authSlice
* profileSlice
* projectsSlice
* postsSlice
* awardsSlice

Show:

* Initial state
* Actions
* Async thunks

---

## **8.6 Project Structure**

Explain your folder tree for backend + frontend.

---

## **8.7 Challenges & Reflections**

Teacher requires you to answer:

* What caused issues?
* Where did you find answers?
* What you liked/disliked?
* Additional features added

---

# **PHASE 9 — TESTING**

### **9.1 Backend Testing**

Use Postman to test:

* Register
* Login
* CRUD for all content
* Public endpoints

### **9.2 Frontend Testing**

Verify:

* Dashboard is protected
* CRUD forms work
* Public profile loads correctly
* Published items appear, drafts do not

---

# **PHASE 10 — FINAL DELIVERABLES & SUBMISSION**

Your teacher requires:

### **10.1 Zip the entire project folder**

Include:

* backend
* frontend
* docs
* presentation

### **10.2 Final Documentation PDF**

Inside `/docs`:

```
DevFolio_Documentation.pdf
```

### **10.3 Presentation**

Prepare slides covering:

* Overview
* Features
* Database design
* API design
* Frontend screenshots
* Challenges
* Demo

---

# **PHASE 11 — OPTIONAL ADVANCED FEATURES**

Only if you have time:

* Dark/Light theme toggle
* WYSIWYG editor for blog posts
* Drag & drop project ordering
* Analytics dashboard
* Markdown support

---

✅ A full ERD for the database
✅ A complete SQL schema
✅ API endpoint documentation
✅ Recommended folder trees
✅ Redux slice templates
✅ React routing template
✅ CSS/Tailwind starter components
✅ Presentation slides




Nice — I’ll generate everything you asked for. Below you’ll find a complete set of deliverables you can copy-and-paste into your project:

* Textual ERD (tables + relationships)
* Full MySQL DDL (schema + tables + indexes + example seed rows)
* API documentation (endpoints, request/response examples, auth)
* Backend & Frontend recommended folder trees (ready to create)
* Redux Toolkit slice templates (auth, profile, projects, posts, awards)
* React routing template + ProtectedRoute implementation
* Tailwind starter components / example UI components (JSX + class names)
* Presentation slide outline (ready to paste into slides)

I made the code practical and production-lean so you can drop it in and iterate. If you want, I can also generate Postman collection JSON or a basic React/Vite repo structure next — just say which.

---

# 1) TEXTUAL ERD — Entities & Relationships

Entities (primary fields shown). Foreign keys and cardinality follow.

* **users**

  * id PK
  * email (UNIQUE)
  * password (hashed)
  * full_name
  * handle (UNIQUE) — vanity url (e.g. /brocode)
  * tagline
  * bio
  * avatar_url
  * resume_url
  * social_links JSON (optional)
  * created_at, updated_at

* **projects**

  * id PK
  * user_id FK → users.id (many projects per user)
  * title
  * short_description
  * long_description (TEXT)
  * tags JSON or comma-separated
  * repo_url
  * live_url
  * image_url
  * is_published BOOLEAN
  * published_at DATETIME NULL
  * created_at, updated_at

* **posts**

  * id PK
  * user_id FK → users.id
  * title
  * slug (UNIQUE per user or global)
  * content (TEXT/markdown)
  * excerpt
  * cover_image_url
  * is_published BOOLEAN
  * published_at DATETIME NULL
  * created_at, updated_at

* **awards**

  * id PK
  * user_id FK → users.id
  * title
  * description
  * issuer
  * issue_date DATE
  * image_url
  * is_published BOOLEAN
  * created_at, updated_at

* **project_images (optional)**

  * id PK
  * project_id FK → projects.id
  * image_url
  * caption
  * order_index

* **tags (optional normalized)**

  * id PK
  * name UNIQUE

* **project_tags (join if tags normalized)**

  * project_id FK → projects.id
  * tag_id FK → tags.id

* **sessions (optional refresh / server sessions)**

  * id PK
  * user_id FK → users.id
  * token_hash
  * created_at
  * expires_at

Notes on relationships:

* users 1 — * projects (one user can have many projects)
* users 1 — * posts
* users 1 — * awards
* projects * — * tags (if normalized)

---

# 2) COMPLETE MYSQL DDL (ready to run)

Copy the block below into MySQL Workbench or a `.sql` file. It creates `devfolio_db` schema and tables with sensible constraints and indexes.

```sql
-- DevFolio schema DDL
CREATE DATABASE IF NOT EXISTS devfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE devfolio_db;

-- USERS
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(150),
  handle VARCHAR(100) NOT NULL UNIQUE,
  tagline VARCHAR(255),
  bio TEXT,
  avatar_url VARCHAR(1024),
  resume_url VARCHAR(1024),
  social_links JSON NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- PROJECTS
CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  short_description VARCHAR(500),
  long_description TEXT,
  tags JSON NULL, -- array of strings e.g. ["React","Node"]
  repo_url VARCHAR(1024),
  live_url VARCHAR(1024),
  image_url VARCHAR(1024),
  is_published TINYINT(1) DEFAULT 0,
  published_at DATETIME NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_published ON projects(is_published);

-- POSTS (BLOG)
CREATE TABLE IF NOT EXISTS posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(300) NOT NULL,
  slug VARCHAR(300) NOT NULL,
  excerpt VARCHAR(600),
  content LONGTEXT,
  cover_image_url VARCHAR(1024),
  is_published TINYINT(1) DEFAULT 0,
  published_at DATETIME NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY uq_posts_user_slug (user_id, slug)
) ENGINE=InnoDB;

CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_published ON posts(is_published);

-- AWARDS / BADGES
CREATE TABLE IF NOT EXISTS awards (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(300) NOT NULL,
  description TEXT,
  issuer VARCHAR(255),
  issue_date DATE NULL,
  image_url VARCHAR(1024),
  is_published TINYINT(1) DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE INDEX idx_awards_user_id ON awards(user_id);

-- OPTIONAL: project_images
CREATE TABLE IF NOT EXISTS project_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT NOT NULL,
  image_url VARCHAR(1024) NOT NULL,
  caption VARCHAR(500),
  order_index INT DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- OPTIONAL: tags (normalized)
CREATE TABLE IF NOT EXISTS tags (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS project_tags (
  project_id INT NOT NULL,
  tag_id INT NOT NULL,
  PRIMARY KEY (project_id, tag_id),
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- SAMPLE SEED USER (change password after hashing in your app or pre-hash)
INSERT INTO users (email, password, full_name, handle, tagline)
VALUES ('demo@example.com', '$2b$10$REPLACE_WITH_HASHED_PASSWORD', 'Demo User', 'demo', 'Full-stack tinkerer');

-- sample project
INSERT INTO projects (user_id, title, short_description, long_description, tags, repo_url, live_url, image_url, is_published, published_at)
VALUES (1, 'DevFolio', 'Personal portfolio CMS', 'Long description goes here...', JSON_ARRAY('React','Node','Tailwind'), 'https://github.com/demo/devfolio', 'https://demo.devfolio.app', 'https://example.com/image.png', 1, NOW());
```

> Tip: For `password` seed, create a bcrypt hash in Node and paste it in. Alternatively, register via your API to create a real hashed password.

---

# 3) API DOC — Endpoints, bodies, success examples, auth

All endpoints assume `BASE_URL = /api`. Auth uses JWT stored in an **HTTP-only cookie** named `token`. Protected routes require the cookie; backend middleware `authRequired` decodes JWT and appends `req.user = { id, email, handle }`.

> Security notes:
>
> * Use `SameSite=Strict` or `Lax` according to your needs.
> * Use HTTPS in production and set `secure: true`.
> * Use short JWT lifetimes; implement refresh tokens or session table for long logins.

---

## AUTH

### `POST /api/auth/register`

Request body (JSON):

```json
{
  "email":"me@example.com",
  "password":"P@ssw0rd!",
  "fullName":"Bro Code",
  "handle":"brocode",
  "tagline":"Software tinkerer"
}
```

Success (201):

```json
{
  "user": {
    "id": 12,
    "email":"me@example.com",
    "full_name":"Bro Code",
    "handle":"brocode",
    "tagline":"Software tinkerer",
    "avatar_url": null
  }
}
```

Also sets HTTP-only cookie `token`.

Errors:

* 400 validation errors (missing/duplicate email/handle).

---

### `POST /api/auth/login`

Request:

```json
{
  "email":"me@example.com",
  "password":"P@ssw0rd!"
}
```

Success (200): sets cookie and returns user:

```json
{ "user": { "id":12, "email":"me@example.com", "handle":"brocode" } }
```

Error 401 for bad credentials.

---

### `POST /api/auth/logout`

Clears token cookie. Returns `{ "ok": true }`.

---

### `GET /api/auth/me`

Protected. Returns current user profile (no password).

```json
{ "user": { "id":12, "email":"me@example.com", "handle":"brocode", "full_name":"Bro Code" } }
```

---

## PROFILE

### `GET /api/profile/:handle`

Public. Returns profile + published content:
Response:

```json
{
  "profile": { "id":12, "full_name":"Bro Code", "handle":"brocode", "tagline":"...", "bio":"..." },
  "projects":[ ... published projects ... ],
  "posts": [... published posts ...],
  "awards":[ ... published awards ... ]
}
```

---

### `GET /api/profile` (protected)

Get own profile.

### `PUT /api/profile`

Protected — update profile fields:
Body example:

```json
{
  "full_name": "Bro Code",
  "tagline": "Software tinkerer",
  "bio": "I build things.",
  "avatar_url": "https://...png",
  "resume_url": "https://...pdf",
  "social_links": {
    "github":"https://github.com/brocode",
    "linkedin":"https://linkedin.com/in/brocode"
  }
}
```

---

## PROJECTS

### `GET /api/projects` (protected)

Return all projects for current user (drafts + published).

### `GET /api/projects/:id` (public if published else protected)

Return specific project. If not published, only owner can access.

### `POST /api/projects` (protected)

Create project.
Body:

```json
{
  "title":"My Project",
  "short_description":"One-liner",
  "long_description":"Detailed",
  "tags":["React","Node"],
  "repo_url":"https://github.com/...",
  "live_url":"https://...",
  "image_url":"https://...",
  "is_published": false
}
```

Success: 201 + created object.

### `PUT /api/projects/:id` (protected)

Edit. Toggle `is_published`.

### `DELETE /api/projects/:id` (protected)

Delete.

---

## POSTS

Analogous to projects:

* `GET /api/posts` (protected)
* `GET /api/posts/:id` (public if published)
* `POST /api/posts`
* `PUT /api/posts/:id`
* `DELETE /api/posts/:id`

Body uses `content` (markdown allowed) and `slug` for friendly URLs.

---

## AWARDS

CRUD endpoints same pattern: `GET /api/awards`, `POST /api/awards`, etc.

---

## PUBLIC PAGES / ROUTES API

### `GET /api/public/:handle/projects`

Published projects for handle.

### `GET /api/public/:handle/posts`

Published posts for handle (with pagination queries `?page=1&limit=10`).

### `GET /api/public/:handle/about`

Returns profile and resume link.

---

# 4) RECOMMENDED FOLDER TREES

Create these with `mkdir -p` or in your IDE.

## Backend

```
backend/
  package.json
  .env
  src/
    server.js
    app.js
    config/
      db.js
      jwt.js
    controllers/
      auth.controller.js
      profile.controller.js
      project.controller.js
      post.controller.js
      award.controller.js
    routes/
      auth.routes.js
      profile.routes.js
      project.routes.js
      post.routes.js
      award.routes.js
    middleware/
      auth.middleware.js
      error.middleware.js
    models/
      user.model.js (or use raw queries)
      project.model.js
      post.model.js
      award.model.js
    utils/
      validators.js
      slugify.js
      pagination.js
    tests/
      auth.test.js
  migrations/ (optional)
  docs/
```

## Frontend

```
frontend/
  package.json
  vite.config.js
  tailwind.config.js
  postcss.config.js
  src/
    main.jsx
    index.css
    App.jsx
    app/
      store.js
      rootReducer.js (if needed)
    features/
      auth/
        authSlice.js
        authAPI.js
      profile/
        profileSlice.js
        profileAPI.js
      projects/
        projectsSlice.js
        projectsAPI.js
      posts/
      awards/
    components/
      ui/
        Button.jsx
        Input.jsx
        Avatar.jsx
      layout/
        PublicLayout.jsx
        DashboardLayout.jsx
        Navbar.jsx
        Footer.jsx
      projects/
        ProjectCard.jsx
        ProjectForm.jsx
      posts/
        PostCard.jsx
        PostEditor.jsx
    pages/
      public/
      dashboard/
    routes/
      AppRoutes.jsx
    hooks/
      useAuth.js
    utils/
      apiClient.js (axios instance)
  public/
    index.html
```

---

# 5) REDUX TOOLKIT SLICE TEMPLATES

Below are compact but complete slices (async thunks included). You can paste into `src/features/...`.

### a) authSlice.js

```js
// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/apiClient';

// fetch current user (reads cookie token)
export const fetchMe = createAsyncThunk('auth/fetchMe', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get('/auth/me');
    return res.data.user;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

export const login = createAsyncThunk('auth/login', async (creds, { rejectWithValue }) => {
  try {
    const res = await axios.post('/auth/login', creds);
    return res.data.user;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

export const register = createAsyncThunk('auth/register', async (payload, { rejectWithValue }) => {
  try {
    const res = await axios.post('/auth/register', payload);
    return res.data.user;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, status: 'idle', error: null },
  reducers: {
    logoutLocal(state) {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMe.fulfilled, (state, action) => { state.user = action.payload; state.status='succeeded'; })
      .addCase(fetchMe.pending, (state) => { state.status='loading'; })
      .addCase(fetchMe.rejected, (state, action) => { state.status='failed'; state.error=action.payload; })
      .addCase(login.fulfilled, (state, action) => { state.user = action.payload; })
      .addCase(register.fulfilled, (state, action) => { state.user = action.payload; });
  }
});

export const { logoutLocal } = authSlice.actions;
export default authSlice.reducer;
```

### b) projectsSlice.js

```js
// src/features/projects/projectsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/apiClient';

export const fetchProjects = createAsyncThunk('projects/fetch', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get('/projects'); // protected returns all for user
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

export const createProject = createAsyncThunk('projects/create', async (payload, { rejectWithValue }) => {
  try {
    const res = await axios.post('/projects', payload);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

export const updateProject = createAsyncThunk('projects/update', async ({id, data}, { rejectWithValue }) => {
  try {
    const res = await axios.put(`/projects/${id}`, data);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

export const deleteProject = createAsyncThunk('projects/delete', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`/projects/${id}`);
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

const projectsSlice = createSlice({
  name: 'projects',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.fulfilled, (state, action) => { state.items = action.payload; state.status='succeeded'; })
      .addCase(createProject.fulfilled, (state, action) => { state.items.unshift(action.payload); })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.items = state.items.map(p => p.id === action.payload.id ? action.payload : p);
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p.id !== action.payload);
      });
  }
});

export default projectsSlice.reducer;
```

> Use the same pattern for `postsSlice.js` and `awardsSlice.js`. `profileSlice.js` should have `fetchProfile`, `updateProfile`.

---

# 6) REACT ROUTING TEMPLATE + ProtectedRoute

`src/routes/AppRoutes.jsx` and `ProtectedRoute.jsx` snippets.

```jsx
// src/routes/ProtectedRoute.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute({ redirectTo = '/login' }) {
  const user = useSelector(s => s.auth.user);
  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }
  return <Outlet />;
}
```

```jsx
// src/routes/AppRoutes.jsx
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicLayout from '../components/layout/PublicLayout';
import DashboardLayout from '../components/layout/DashboardLayout';
import Home from '../pages/public/Home';
import ProjectsPage from '../pages/public/Projects';
import ProjectDetail from '../pages/public/ProjectDetail';
import Blog from '../pages/public/Blog';
import About from '../pages/public/About';
import Login from '../pages/auth/Login';
import DashboardHome from '../pages/dashboard/DashboardHome';
import ManageProjects from '../pages/dashboard/ManageProjects';
import ProtectedRoute from './ProtectedRoute';
import { useDispatch } from 'react-redux';
import { fetchMe } from '../features/auth/authSlice';

export default function AppRoutes(){
  const dispatch = useDispatch();
  useEffect(() => { dispatch(fetchMe()); }, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        {/* public */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/:handle" element={<Home />} />
          <Route path="/:handle/projects" element={<ProjectsPage />} />
          <Route path="/:handle/projects/:id" element={<ProjectDetail />} />
          <Route path="/:handle/blog" element={<Blog />} />
          <Route path="/:handle/about" element={<About />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* dashboard protected */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="projects" element={<ManageProjects />} />
            <Route path="posts" element={<div>Manage Posts</div>} />
            <Route path="awards" element={<div>Manage Awards</div>} />
            <Route path="profile" element={<div>Edit Profile</div>} />
          </Route>
        </Route>

        {/* fallback */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

# 7) API CLIENT (axios) setup for frontend

`src/utils/apiClient.js`

```js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || '/api',
  withCredentials: true, // important: send/receive http-only cookie
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
```

---

# 8) TAILWIND & UI STARTER COMPONENTS

Assume Tailwind is installed and configured. Example components below use Tailwind classes.

### Navbar.jsx

```jsx
export default function Navbar({ user }) {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-xl font-semibold">DevFolio</div>
        <div className="flex items-center gap-4">
          <a href="/" className="text-sm hover:underline">Home</a>
          <a href="/projects" className="text-sm hover:underline">Projects</a>
          <a href="/blog" className="text-sm hover:underline">Blog</a>
          {user ? <a href="/dashboard" className="btn btn-primary">Dashboard</a> : <a href="/login" className="btn">Login</a>}
        </div>
      </div>
    </nav>
  );
}
```

### ProjectCard.jsx

```jsx
export function ProjectCard({ project }) {
  return (
    <article className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition p-0">
      <img src={project.image_url || '/placeholder.png'} alt={project.title} className="w-full h-48 object-cover"/>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <p className="text-sm text-gray-600 my-2">{project.short_description}</p>
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">{project.tags?.join?.(', ')}</div>
          <a className="text-sm text-indigo-600 hover:underline" href={project.live_url || project.repo_url}>View</a>
        </div>
      </div>
    </article>
  );
}
```

### Buttons (Tailwind classes)

For consistency, define:

```css
/* index.css - small utilities (if you want) */
.btn {
  @apply inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium border;
}
.btn-primary {
  @apply bg-indigo-600 text-white border-transparent hover:bg-indigo-700;
}
```

---

# 9) SAMPLE COMPONENT: ProjectForm (Create/Edit)

```jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProject, updateProject } from '../../features/projects/projectsSlice';

export default function ProjectForm({ initial = null, onDone }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(initial?.title ?? '');
  const [short_description, setShort] = useState(initial?.short_description ?? '');
  const [tags, setTags] = useState((initial?.tags ?? []).join(', '));
  const [repo_url, setRepo] = useState(initial?.repo_url ?? '');
  const [live_url, setLive] = useState(initial?.live_url ?? '');
  const [image_url, setImage] = useState(initial?.image_url ?? '');
  const [is_published, setPublished] = useState(initial?.is_published ?? false);

  const submit = async (e) => {
    e.preventDefault();
    const payload = {
      title, short_description, tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      repo_url, live_url, image_url, is_published
    };
    if (initial?.id) {
      await dispatch(updateProject({ id: initial.id, data: payload }));
    } else {
      await dispatch(createProject(payload));
    }
    onDone?.();
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="w-full p-2 border rounded"/>
      <textarea value={short_description} onChange={e=>setShort(e.target.value)} placeholder="Short description" className="w-full p-2 border rounded" />
      <input value={tags} onChange={e=>setTags(e.target.value)} placeholder="Tags (comma separated)" className="w-full p-2 border rounded"/>
      <input value={repo_url} onChange={e=>setRepo(e.target.value)} placeholder="Repo URL" className="w-full p-2 border rounded"/>
      <input value={live_url} onChange={e=>setLive(e.target.value)} placeholder="Live URL" className="w-full p-2 border rounded"/>
      <input value={image_url} onChange={e=>setImage(e.target.value)} placeholder="Image URL" className="w-full p-2 border rounded"/>
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={is_published} onChange={e=>setPublished(e.target.checked)}/>
        Publish
      </label>
      <div><button className="btn btn-primary">{initial ? 'Save' : 'Create'}</button></div>
    </form>
  );
}
```

---

# 10) PRESENTATION SLIDES OUTLINE (10–12 slides)

Use this as your slide deck content. Copy into Google Slides / PowerPoint.

1. **Title Slide**

   * DevFolio — Public Portfolio CMS
   * Your name, course, date

2. **Project Overview**

   * What it is: public portfolio + private CMS
   * Core personas: Owner & Visitor
   * Key features listed (auth, projects, blog, awards)

3. **Tech Stack**

   * Backend: Node/Express, MySQL
   * Frontend: React + Vite, Redux Toolkit, Tailwind
   * Auth: bcrypt + JWT (http-only cookie)

4. **Database Design**

   * Show ERD (use exported image or the textual ERD)
   * Key tables: users, projects, posts, awards

5. **API Surface**

   * Auth routes + profile + projects + posts + awards
   * Example request/response snippets

6. **Frontend Architecture**

   * Folder tree screenshot
   * Pages vs components vs features

7. **Demo — Public Portfolio**

   * Screenshots or live demo
   * Show Home, Projects, Blog, About

8. **Demo — Dashboard**

   * CRUD flows
   * Create project, publish toggle, edit post

9. **Key Components & Redux**

   * ProjectCard, ProjectForm, ProtectedRoute
   * Slices: auth, projects, posts, awards

10. **Challenges & Solutions**

    * Example: CORS + cookies; solved with axios `withCredentials`
    * Markdown vs WYSIWYG choice
    * Image handling (URL vs cloud storage)

11. **Future Work / Optional Features**

    * Cloud media, analytics, markdown renderer, sharing

12. **Q&A / Thank you**

    * Contact info + repo link

---

# 11) DEPLOYMENT NOTES (quick)

* Backend: deploy to Railway / Render / Heroku (node + environment variables). Ensure DB connection string is set via env var.
* MySQL: use PlanetScale, Azure DB, or ClearDB. Use connection pooling.
* Frontend: Vercel / Netlify. Set `VITE_API_BASE` environment variable to your backend public URL.
* Cookie domain: When deploying to separate domains, ensure proper cookie domain and `sameSite`/`secure` flags.

---

# 12) CHECKLIST / NEXT STEPS (practical order to implement)

1. Create MySQL schema (run DDL).
2. Scaffold backend (routes/controllers) and connect DB.
3. Implement auth (register/login/logout/me).
4. Build projects API + posts + awards (CRUD + published visibility logic).
5. Scaffold frontend with routing + Redux store + apiClient.
6. Implement public pages (consume `GET /api/public/:handle`).
7. Implement dashboard with forms and operations.
8. Polish UI (Tailwind classes), add validations.
9. Document in `/docs` (DB DDL, API docs, folder tree, screenshots).
10. Prepare slides and demo.

---

# 13) EXTRA: small README template to include at project root

```markdown
# DevFolio

## Overview
DevFolio is a full-stack portfolio CMS with a public site and private dashboard for creating projects, posts, and awards.

## Tech
- Backend: Node.js + Express
- DB: MySQL
- Frontend: React + Vite + Redux Toolkit
- Styling: TailwindCSS

## Local dev
1. Create `.env` with DB and JWT secret:
```

DB_HOST=...
DB_USER=...
DB_PASS=...
DB_NAME=devfolio_db
JWT_SECRET=supersecret

```
2. `cd backend && npm install && npm run dev`
3. `cd frontend && npm install && npm run dev`

## DB
Run `docs/database-schema.sql` to create schema.

## Testing
Use Postman to exercise auth and CRUD endpoints.

## License
MIT
```

---

If you want, I can:

* Generate a downloadable `.sql` file, or seed data with many realistic projects (I can create sample JSON seed rows).
* Produce a Postman collection JSON for all API endpoints.
* Create a minimal runnable starter repo (zipped) with the backend and frontend scaffolding (I can prepare code files you can download).

Which of those (if any) would you like me to produce next?

