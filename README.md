# Harvest of Hearts 🌾💖

A cozy web app inspired by **Stardew Valley**, showcasing villagers, gifts, and favorite items.
Built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Sanity CMS**.

*"This project was lovingly crafted as a tribute to Stardew Valley — a cozy world that continues to inspire creativity and warmth."*

---

## 🎨 Features

* View all characters and their gift preferences (loves, likes, dislikes, hates)
* Browse items by category (food, artisan goods, forage, etc.)
* Search items dynamically in the header
* Responsive, rustic/rustic-inspired UI
* Animated search bar using Framer Motion

---

## 🏗 Project Structure

```
my-project/
├── sanity/          # Sanity Studio (do zarządzania treścią)
├── src/             # Next.js frontend
├── public/          # Static assets
├── package.json     # Next.js dependencies and scripts
├── next.config.js
└── vercel.json      # Configuration to deploy only Next.js
```

---

## ⚡ Getting Started (Frontend)

1. Clone this repo:

```bash
git clone https://github.com/yourusername/harvest-of-hearts.git
cd harvest-of-hearts
```

2. Install dependencies:

```bash
npm install
```

3. Add environment variables in `.env.local`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=yourProjectId
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
```

4. Run development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📝 Sanity Studio

Sanity Studio is stored in the `sanity/` folder.

* Install dependencies inside `sanity/`:

```bash
cd sanity
npm install
```

* Run Studio locally:

```bash
npx sanity dev
```

* Deploy Studio (optional):

```bash
npx sanity deploy
```

> **Note:** Studio is **not deployed on Vercel**. Only the Next.js frontend is deployed.

---

## 🚀 Deployment on Vercel

1. Push your repo to GitHub.
2. Connect your repository to Vercel.
3. Make sure the **root folder** for deployment is the Next.js project folder.
4. **Do not include the `sanity/` folder** in the build; it is ignored via `vercel.json`.
5. Vercel will automatically build and deploy your Next.js frontend.

---

## 🎨 Styling

* Tailwind CSS is used for styling.

---

## 🛠 Tech Stack

* **Next.js** (App Router, TypeScript)
* **Sanity CMS** (headless content management)
* **Tailwind CSS** (styling)
* **Framer Motion** (animations)
* **Lucide React** (icons)

---

## 📜 License

MIT License
