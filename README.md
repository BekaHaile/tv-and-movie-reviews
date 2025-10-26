# 🎬 Elantil TV & Movies Review Assignment

> **Assignment built for Elantil by Beka Tola**

🌐 **Live Demo:** [tv-movie-reviews-laul.vercel.app](https://tv-movie-reviews-laul.vercel.app)

This project demonstrates a modern TV & Movies review platform as part of a technical assessment. It features reviews, ratings, filtering, and more.

---

## 🚀 Technologies Used

- ⚡ **Vite**
- 🎨 **HeroUI**
- 💨 **Tailwind CSS**
- 🧩 **Tailwind Variants**
- 🖼️ **Lucide Icons**
- 🟦 **TypeScript**
- 🎥 **Framer Motion**
- 🔄 **Tanstack Query**

---

## ▶️ How to Run

1. **Clone the project:**
   ```bash
   git clone https://github.com/BekaHaile/tv-and-movie-reviews.git
   cd tv-and-movie-reviews
   ```
2. **Install dependencies (using pnpm):**
   ```bash
   pnpm install
   ```
3. **Run the development server:**
   ```bash
   pnpm run dev
   ```
4. **Run tests:**
   ```bash
   pnpm test
   ```

---

## 📁 Folder Structure

```
tv-and-movie-reviews/
├── public/
├── src/
│   ├── api/         # API calls
│   ├── components/  # UI components & icons
│   ├── config/      # Config files
│   ├── hooks/       # Custom hooks
│   ├── layouts/     # Layout components
│   ├── pages/       # Page components
│   ├── styles/      # Global styles
│   ├── types/       # TypeScript types
│   └── _tests/      # Unit & integration tests
├── .env
├── package.json
├── pnpm-lock.yaml
├── README.md
└── ...
```

---

## 🧪 Tests

Unit and integration tests are located in the `src/_tests/` folder. Run all tests with:

```bash
pnpm test
```

---

## 🔗 Backend Connection

This app is connected to a [Directus](https://directus.io/) backend for data management. The API base URL is configured in the `.env` file: (This is usually not committed to version control)

```env
VITE_API_BASE_URL=https://elantil-fe-task.directus.app
```

---

## 📦 Package Manager

This project uses [pnpm](https://pnpm.io/) for fast, efficient dependency management. If you don't have pnpm installed, run:

```bash
npm install -g pnpm
```

---

## 🌐 Deployment

This app is deployed via [Vercel](https://vercel.com/) at:

**https://tv-movie-reviews-laul.vercel.app**

---

## License

Licensed under the [MIT license](LICENSE).
