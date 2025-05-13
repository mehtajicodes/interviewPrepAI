# AI-Powered Interview Practice Platform by using CIVIC Auth

An intelligent interview practice platform that helps users prepare for technical, behavioral, and system design interviews using AI-powered feedback and analysis.

## Features

- 🤖 AI-powered interview question generation
- 📝 Real-time answer analysis and feedback
- 🎯 Multiple interview categories:
  - Technical Interviews
  - Behavioral Interviews
  - System Design Interviews
- 📊 Performance tracking and scoring
- 🔄 Follow-up questions based on your answers
- 💾 Session history and progress tracking

## Tech Stack

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- Shadcn UI Components
- Google Gemini AI API
- Civic Auth for authentication

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Gemini API key
- Civic Auth credentials

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/interview-practice-platform.git
cd interview-practice-platform
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your environment variables:
```env
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_CIVIC_CLIENT_ID=your_civic_client_id
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Choose your interview category (Technical, Behavioral, or System Design)
2. Select your experience level
3. Start practicing with AI-generated questions
4. Submit your answers for instant feedback
5. Review your performance and suggested improvements
6. Practice with follow-up questions

## Authentication with Civic Auth

This project uses Civic Auth for secure authentication. Civic Auth provides:

- Web3-native authentication
- Multi-chain support
- Customizable authentication flows
- Secure credential management

To set up Civic Auth:

1. Sign up for a Civic account at [https://www.civic.com/](https://www.civic.com/)
2. Create a new project in the Civic dashboard
3. Get your Client ID and configure your authentication settings
4. Add the Client ID to your environment variables

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Google Gemini AI for powering the interview questions and analysis
- Civic for providing secure authentication
- Shadcn UI for the beautiful component library
