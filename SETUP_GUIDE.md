# Group Project Setup Guide — WDD 430

Follow these steps to initialize this project for your new group.

---

## Step 1: Initialize a Fresh Git Repo

Open your terminal in the `handcrafted-haven` folder:

```bash
git init
git add .
git commit -m "Initial commit: Handcrafted Haven group project"
```

---

## Step 2: Create a New GitHub Repository

1. Go to [github.com](https://github.com) and sign in.
2. Click **New repository**.
3. Name it `handcrafted-haven` (or your group's chosen name).
4. Set it to **Public**.
5. Do **NOT** initialize with a README (you already have one).
6. Click **Create repository**.

---

## Step 3: Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/handcrafted-haven.git
git branch -M main
git push -u origin main
```

---

## Step 4: Invite Your Group Members

1. Go to your repo → **Settings** → **Collaborators**.
2. Add each group member by their GitHub username.

---

## Step 5: Set Up the GitHub Project Board (Kanban)

1. On your repo page, click the **Projects** tab.
2. Click **New Project** → choose **Board** template.
3. Name it (e.g., "Handcrafted Haven Board").
4. Link it to your repository.
5. Create at least these columns: **Backlog**, **In Progress**, **In Review**, **Done**.

### Minimum 10 User Story Work Items to Add:

| # | Title | Description |
|---|-------|-------------|
| 1 | Homepage Hero Section | As a visitor, I want to see an eye-catching hero with a shop CTA |
| 2 | Product Listing Page | As a buyer, I want to browse all handcrafted products |
| 3 | Product Detail Page | As a buyer, I want to view full details and images of a product |
| 4 | Seller Profile Page | As an artisan, I want a dedicated page to showcase my story and items |
| 5 | User Authentication | As a user, I want to sign up and sign in securely |
| 6 | Add Product (Seller) | As a seller, I want to list new items with price, description, and image |
| 7 | Product Search & Filter | As a buyer, I want to filter by category and price range |
| 8 | Reviews & Ratings | As a buyer, I want to leave a star rating and written review |
| 9 | Responsive Navigation | As a user, I want a clean navbar that works on mobile and desktop |
| 10 | Footer with Contact Info | As a visitor, I want to find contact information in the footer |

---

## Step 6: Each Member Clones the Repo

```bash
git clone https://github.com/YOUR_USERNAME/handcrafted-haven.git
cd handcrafted-haven
npm install
npm run dev
```

---

## Week 4 Submission Checklist

For your W04 Canvas submission, include:
- [ ] Group project repository URL
- [ ] GitHub Board URL
- [ ] Brief meeting summary (1 challenge, 1 success, 1 insight + participant list)

---

*WDD 430 — Web Full-Stack Development | BYU-Idaho*
