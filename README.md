# Emma Scent & MUSK — Perfume Website (React)

## Chalane ka tareeqa (Beginner Guide)

1. **Node.js install karein** (agar pehle se nahi hai):
   https://nodejs.org se LTS version download karein.

2. **Terminal me is folder ke andar jayein:**
   ```
   cd perfume-website
   ```

3. **Dependencies install karein:**
   ```
   npm install
   ```

4. **Website start karein:**
   ```
   npm start
   ```

5. Browser automatically khulega `http://localhost:3000` par.

## Folder Structure

```
perfume-website/
├── public/
│   └── index.html
└── src/
    ├── assets/
    │   └── homepage-perfume.png   ← homepage ki perfume image
    ├── components/
    │   ├── Navbar.js / Navbar.css
    │   ├── Home.js / Home.css     ← homepage (website name, About, Search, Signin, Signup)
    │   ├── SignIn.js              ← alag Sign In page
    │   ├── SignUp.js              ← alag Sign Up page
    │   └── Auth.css               ← SignIn & SignUp ki shared styling
    ├── App.js                     ← saare routes yahan set hain (react-router-dom)
    ├── index.js
    └── index.css
```

## Routes

- `/` → Home page
- `/signin` → Sign In page
- `/signup` → Sign Up page

## Aage kya karna hai (next steps)

- `Navbar.js` aur `SignIn.js` / `SignUp.js` me jo `console.log` hain, unki jagah
  apna backend API call add karein (login/signup ke liye).
- Homepage ki image `src/assets/homepage-perfume.png` hai — apni khud ki perfume
  product photos yahan replace kar sakte hain.
