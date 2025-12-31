# ✨ Wishes 2026 - Immersive New Year Experience

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FSahooShuvranshu%2FWishes-Websites%2Ftree%2FHappy-New-Year-Website)

A world-class, 3D immersive New Year's wish website built with **React**, **Three.js**, and **Google Gemini AI**. Users can watch a premium countdown to 2026, interact with a festive lantern-filled sky, and generate personalized AI-powered blessings.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Three.js](https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## 🌟 Features

- **🎨 Immersive 3D Environment**: Interactive sky lantern scene built with React Three Fiber and Drei.
- **⏳ Premium Countdown**: A custom-designed, animated countdown timer targeting January 1st, 2026.
- **🤖 AI-Powered Wishes**: Personalized, poetic blessings generated in real-time using the Google Gemini API.
- **📱 Responsive & Modern UI**: High-end glassmorphism design with fluid animations via Framer Motion.
- **🎊 Shareable Greetings**: Generate a beautiful card with your personalized wish and share it with friends via native share API.
- **🎈 Celebration Effects**: Interactive confetti cannons and festive visual feedback.

---

## 🚀 Quick Deploy to Vercel

1. **Click the Button Above**: Use the "Deploy with Vercel" button at the top of this file.
2. **Connect to Vercel**:
   - Log in to [Vercel](https://vercel.com).
   - Import the repository.
3. **Configure Environment Variables**:
   - During the import process, add a new Environment Variable:
     - **Key**: `API_KEY`
     - **Value**: *Your Google Gemini API Key* (Get one at [ai.google.dev](https://ai.google.dev/))
4. **Deploy**: Click "Deploy". Vercel will automatically detect the configuration.

---

## 🛠️ Local Development Setup

To run this project locally, follow these steps:

1. **Clone the project**:
   ```bash
   git clone https://github.com/SahooShuvranshu/Wishes-Websites.git
   cd Wishes-Websites
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up your API Key**:
   Create a `.env` file in the root directory:
   ```env
   API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

---

## 📦 Project Structure

```text
├── components/
│   ├── Scene3D.tsx        # Three.js / R3F Lantern Scene
│   ├── Countdown.tsx      # Animated Countdown Logic
│   ├── WishForm.tsx       # AI Wish Generation Form
│   ├── ShareableWish.tsx  # Final Result & Share View
├── App.tsx                # Main Application Shell
├── index.html             # Entry HTML & Styles
└── metadata.json          # App Metadata
```

---

## 🛡️ Credits

- **Developer**: Shuvranshu
- **Studio**: Crystal Studio Development
- **AI Engine**: Google Gemini API

---

## 📄 License

Distributed under the MIT License.

---
*Made with ❤️ & ☕ for a brighter 2026.*
