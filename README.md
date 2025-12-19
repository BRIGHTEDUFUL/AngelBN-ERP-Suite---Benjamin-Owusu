# 🎬 ABN Broadcast Dashboard

> **Enterprise-Grade Broadcasting Operations Management System**

A sophisticated, modern React + TypeScript dashboard designed for professional broadcast operations. Features real-time rundown management, multi-platform scheduling, live studio monitoring, AI-powered assistance, and comprehensive analytics for radio and television networks.

## 🌟 Live Demo

**[View Live Application →](https://brighteduful.github.io/AngelBN-ERP-Suite---Benjamin-Owusu/)**

## ✨ Key Features

### 📊 **Real-Time Operations Dashboard**
- Live broadcast monitoring with audio waveform visualization
- Studio clock with synchronized timekeeping
- Breaking news ticker integration
- Multi-platform status tracking (Radio & TV)

### 📅 **Programming & Schedule Management**
- Comprehensive broadcast schedule with filtering by platform
- Drag-and-drop program management
- Rundown console for detailed show planning
- Edit and update programs in real-time

### 📦 **Media Repository**
- Digital asset management and archiving
- Batch export capabilities
- Quick search and categorization
- Status tracking (Public/Private/Archived)

### 📈 **Analytics & Intelligence**
- Audience reach metrics and trends
- Platform load distribution charts
- Historical performance data
- Custom reporting tools

### 📺 **Traffic & Advertising Control**
- Commercial campaign management
- Slot scheduling and optimization
- Priority-based ad placement
- Real-time status monitoring

### 🛠️ **Infrastructure Health Monitoring**
- Equipment inventory tracking
- Real-time diagnostic status
- Maintenance scheduling
- Health metrics and alerts

### 🤖 **AI Assistant**
- Powered by Google Gemini API
- Intelligent scheduling suggestions
- Content recommendations
- Operational insights

### 🔐 **Role-Based Access Control**
- Admin - Full system access
- Production Manager - Equipment & production oversight
- Producer - Program creation and management
- Programs Manager - Schedule coordination
- Traffic Manager - Ad campaign control

## 🚀 Quick Start

### Local Development

**Prerequisites:**
- Node.js 20+ and npm
- Git

**Setup Instructions:**

1. **Clone the repository**
```bash
git clone https://github.com/brighteduful/AngelBN-ERP-Suite---Benjamin-Owusu.git
cd AngelBN-ERP-Suite---Benjamin-Owusu
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment** (Optional - for AI features)
```bash
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY
```

4. **Start development server**
```bash
npm run dev
```

The application will be available at `http://localhost:3000/`

## 🏗️ Build & Deploy

### Production Build
```bash
npm run build
npm run preview  # Preview production build locally
```

### 🌐 GitHub Pages Deployment

The application automatically deploys to GitHub Pages using GitHub Actions when you push to the main branch.

**Deployment Steps:**
1. Push your changes to the `main` branch
2. GitHub Actions automatically builds and deploys
3. Access your site at: `https://brighteduful.github.io/AngelBN-ERP-Suite---Benjamin-Owusu/`

**Manual Deployment (if needed):**
```bash
# Build for GitHub Pages
BASE_PATH=/AngelBN-ERP-Suite---Benjamin-Owusu npm run build

# Or build to docs folder
$env:OUT_DIR = 'docs'
$env:BASE_PATH = '/AngelBN-ERP-Suite---Benjamin-Owusu'
npm run build
git add docs
git commit -m "Deploy to GitHub Pages"
git push
```

## 🛠️ Technology Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS with custom design system
- **Charts:** Recharts for data visualization
- **Icons:** Lucide React
- **AI Integration:** Google Gemini API
- **Deployment:** GitHub Pages with Actions

## 📂 Project Structure

```
abn-broadcast-dashboard/
├── components/              # React components
│   ├── AIAssistantModal.tsx
│   ├── BreakingNewsTicker.tsx
│   ├── EditProgramModal.tsx
│   ├── LandingPage.tsx
│   ├── LiveWaveform.tsx
│   ├── RundownModal.tsx
│   ├── ScheduleItemRow.tsx
│   ├── SettingsModal.tsx
│   ├── StatsCard.tsx
│   └── StudioClock.tsx
├── services/               # Business logic
│   └── geminiService.ts
├── public/                # Static assets
├── docs/                  # GitHub Pages deployment
├── App.tsx               # Main application
├── constants.ts          # Mock data and constants
├── types.ts             # TypeScript definitions
├── style.css            # Custom styles
├── vite.config.ts       # Vite configuration
└── package.json         # Dependencies
```

## ⚙️ Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
GEMINI_API_KEY=your_api_key_here
BASE_PATH=/AngelBN-ERP-Suite---Benjamin-Owusu
```

**Note:** Never commit `.env` files with real API keys. The `.gitignore` is configured to exclude them.

## 🎨 Features Showcase

### Dark Mode Support
Professional dark theme optimized for broadcast operations with:
- High-contrast color scheme
- Smooth transitions
- Reduced eye strain for long sessions

### Responsive Design
Fully responsive interface that works seamlessly on:
- Desktop monitors (1920x1080+)
- Tablets
- Mobile devices

### Real-Time Updates
- Live broadcast status indicators
- Animated waveforms
- Pulsing status badges
- Breaking news ticker

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Benjamin Owusu**
- GitHub: [@brighteduful](https://github.com/brighteduful)
- Project: [ABN Broadcast Dashboard](https://brighteduful.github.io/AngelBN-ERP-Suite---Benjamin-Owusu/)

## 🙏 Acknowledgments

- Designed for Angel Broadcasting Network (ABN)
- Built with modern web technologies
- Inspired by professional broadcast management systems

---

<div align="center">
  
**⭐ Star this repository if you find it helpful!**

Made with ❤️ for broadcast professionals

</div>
