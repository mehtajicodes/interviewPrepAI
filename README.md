# AI-Powered Interview Practice Platform

An intelligent, full-stack platform to help users prepare for technical, behavioral, and system design interviews using AI-powered feedback, real-time analysis, and secure Web3 authentication.

---

## 🚀 Features

- **AI-Powered Question Generation:** Get unique, context-aware interview questions using Google Gemini AI.
- **Real-Time Answer Analysis:** Receive instant, AI-driven feedback and scoring on your responses.
- **Multiple Interview Categories:** Practice for Technical, Behavioral, and System Design interviews.
- **Performance Tracking:** Visualize your progress and review session history.
- **Follow-Up Questions:** Get dynamic follow-up questions based on your answers.
- **Session History:** Save and revisit your previous interview sessions.
- **Web3 Authentication:** Secure, multi-chain login with Civic Auth.
- **Modern UI:** Responsive, accessible design using Tailwind CSS and Shadcn UI components.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS, Shadcn UI
- **AI Integration:** Google Gemini AI API
- **Authentication:** Civic Auth (Web3-native, multi-chain)
- **State Management:** React Query, Wagmi
- **Other:** Framer Motion, Lucide Icons, Radix UI

---

## 📁 Folder Structure

```
app/                # Next.js app directory (pages, API routes, layouts)
components/         # Reusable UI and logic components
hooks/              # Custom React hooks
lib/                # Utility libraries (AI, storage, categories)
public/             # Static assets (SVGs, images)
utils/              # Data management utilities
```

---

## ⚡ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Google Gemini API key
- Civic Auth credentials

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/interview-practice-platform.git
   cd interview-practice-platform
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables:**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
   NEXT_PUBLIC_CIVIC_CLIENT_ID=your_civic_client_id
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser:**  
   Visit [http://localhost:3000](http://localhost:3000)

---

## 🧑‍💻 Usage

1. **Select Interview Category:** Technical, Behavioral, or System Design.
2. **Choose Experience Level:** Tailor questions to your background.
3. **Practice:** Answer AI-generated questions and receive instant feedback.
4. **Review:** Analyze your performance and get improvement suggestions.
5. **Follow-Up:** Practice with dynamic follow-up questions.
6. **Track Progress:** Access your session history and scores.

---

## 🔐 Authentication with Civic Auth

- **Web3-native authentication** for secure, decentralized login.
- **Multi-chain support** for flexibility.
- **Customizable flows** and secure credential management.

**Setup:**
1. Sign up at [Civic](https://www.civic.com/)
2. Create a project and obtain your Client ID.
3. Add your Client ID to `.env.local` as shown above.

---

## 🏗️ Project Architecture

- **API Routes:** Located in `app/api/`, handle AI requests and authentication.
- **Middleware:** Secures protected routes using Civic Auth.
- **UI Components:** Modular, accessible, and reusable (see `components/`).
- **State & Data:** Managed with React Query and Wagmi for Web3.

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add YourFeature'`)
4. Push to your branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Google Gemini AI** for interview question generation and analysis
- **Civic** for secure Web3 authentication
- **Shadcn UI** for the component library
