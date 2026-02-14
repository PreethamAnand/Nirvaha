# 🧘 Nirvaha - Premium Spiritual Wellness Platform

A modern, full-featured spiritual wellness platform built with React and TypeScript. Nirvaha offers meditation, sound healing, community engagement, gaming, and companion services to promote holistic well-being.

**[View Figma Design](https://www.figma.com/design/wuyAqmOYAiebQP1swCzIrt/Premium-Spiritual-Wellness-Website)**

---

## ✨ Features

- **🧘 Meditation Hub** - Guided meditation sessions with wellness content
- **🎵 Sound Healing** - Curated sound therapy experiences
- **🎮 Gaming Hub** - Wellness-focused gaming experiences
- **👥 Community** - Social feed, connections, and shared experiences
- **🤖 AI Chatbot** - Intelligent assistant for wellness guidance
- **📊 Dashboard** - Personal wellness analytics and activity tracking
- **🛍️ Marketplace** - Spiritual products and services
- **🎯 Companion Services** - Professional guidance and support
- **👤 User Profiles** - Personalized user profiles with activity history
- **🔐 Role-Based Access** - Admin dashboard for content and user management
- **🌙 Dark Mode Support** - Theme switching capability

---

## 🛠️ Tech Stack

### Frontend Framework
- **React 18.3.1** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Next-generation build tool

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS transformation
- **Radix UI** - Headless UI components
- **Lucide React** - Beautiful icon library
- **Framer Motion** - Animation library
- **GSAP** - Advanced animation toolkit

### State Management & Forms
- **React Router v6** - Client-side routing
- **React Hook Form** - Form state management
- **Context API** - Global state management (Auth, Roles)

### Additional Libraries
- **next-themes** - Theme management
- **react-helmet-async** - Document head management
- **html2canvas** - Screenshot/export functionality
- **Embla Carousel** - Carousel component
- **Recharts** - Data visualization
- **Sonner** - Toast notifications
- **Vaul** - Drawer component

---

## 📁 Project Structure

```
src/
├── components/              # Reusable UI components
│   ├── common/             # Shared components (ProtectedRoute, SEOHead)
│   ├── community/          # Community features (Feed, PostCard, Search)
│   ├── companion/          # Companion services
│   ├── dashboard/          # Dashboard sections
│   ├── figma/              # Figma-designed components
│   ├── landing/            # Landing page sections
│   ├── marketplace/        # Marketplace UI
│   ├── pages/              # Page-level components
│   ├── ui/                 # Base UI components
│   ├── hooks/              # Custom React hooks
│   └── [Component].tsx     # Feature components
├── admin/                  # Admin dashboard
│   ├── components/         # Admin UI components
│   ├── layout/            # Admin layout
│   └── pages/             # Admin pages
├── pages/                  # Page components
│   ├── auth/              # Authentication pages
│   └── [Page].tsx         # Feature pages
├── contexts/              # React Context providers
├── hooks/                 # Custom hooks
├── lib/                   # Utilities and API
├── config/                # Configuration files
├── styles/                # Global styles
├── App.tsx                # Root component
└── main.tsx               # Entry point

public/                    # Static assets
├── robots.txt
├── sitemap.xml
└── [feature folders]/     # Feature-specific assets
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality |
| `npm run type-check` | Run TypeScript type checking |

---

## 🏗️ Architecture

### State Management
- **AuthContext** - Manages user authentication state and login/logout
- **RoleContext** - Manages user roles and permissions for access control

### Routing
- Public routes for landing, login, marketplace, and community
- Protected routes requiring authentication (Dashboard, Profile, Companion)
- Role-protected routes for admin functions (Admin Dashboard, User Management)

### API Integration
- Centralized API client in `lib/contentApi.ts`
- Backend configuration in `config/backend.ts`
- RESTful endpoints for all features

### Styling Strategy
- Global styles in `styles/globals.css`
- Component-scoped Tailwind classes
- Theme support with next-themes
- Dark mode compatible

---

## 🔐 Authentication & Authorization

- **Role-Based Access Control (RBAC)** - Different user roles (User, Admin, Companion)
- **Protected Routes** - Components wrapped with `ProtectedRoute` for auth-required pages
- **Role-Protected Routes** - Admin features behind role verification with `RoleProtectedRoute`

---

## 📱 Responsive Design

The platform is fully responsive and works seamlessly on:
- 📱 Mobile devices
- 📱 Tablets  
- 🖥️ Desktop/Laptop screens

Built with Tailwind CSS mobile-first approach for optimal performance.

---

## 🎨 Customization

### Theme Configuration
- Edit `tailwind.config.js` for color scheme and design tokens
- Use next-themes for light/dark mode switching
- Update CSS variables in `styles/globals.css`

### Component Customization
- Radix UI components in `src/components/ui/`
- All components use Tailwind classes for easy styling modifications

---

## 📦 Deployment

### Build for Production
```bash
npm run build
```

### Deployment Options
- **Netlify** - Configuration in `netlify.toml`
- **Vercel** - Vite apps deploy seamlessly
- **Any Static Hosting** - Generated `dist/` folder contains production build

### Environment Variables
Create a `.env.local` file in the root directory for environment-specific variables:
```
VITE_API_URL=your_api_endpoint
VITE_APP_NAME=Nirvaha
```

---

## 🧪 Testing & Quality

- **TypeScript** - Type safety across the codebase
- **ESLint Integration** - Code quality standards
- **Responsive Testing** - Cross-device browser testing

---

## 📚 Key Components & Pages

### Core Pages
- **LandingPage** - Main landing page with hero section
- **LoginPage** - User authentication
- **ProfilePage** - User profile and settings
- **DashboardPage** - Personal wellness analytics
- **MarketplacePage** - Browse and discover services
- **CommunityPage** - Social feed and connections

### Admin Pages
- **AdminDashboardPage** - Overview and analytics
- **UserManagementPage** - User administration
- **ContentManagementPage** - Manage meditation, sound healing content
- **BookingManagementPage** - Manage companion bookings
- **MarketplaceManagementPage** - Marketplace administration

### Feature Components
- **WellnessDashboardSection** - Activity tracking and analytics
- **MeditationPreview** - Meditation content showcase
- **SoundHealingPreview** - Sound therapy showcase
- **GamingHubSection** - Gaming experiences
- **CommunitySection** - Social engagement
- **SpiritualOrb** - Animated spiritual visualization

---

## 🤝 Contributing

1. Create a new branch for your feature: `git checkout -b feature/your-feature`
2. Make your changes and commit: `git commit -am 'Add new feature'`
3. Push to the branch: `git push origin feature/your-feature`
4. Submit a pull request

### Code Style
- Follow TypeScript best practices
- Use functional components with hooks
- Maintain consistent formatting (configured in project)
- Add comments for complex logic

---

## 📄 License

This project is part of the Nirvaha Spiritual Wellness Platform. All rights reserved.

---

## 📞 Support & Contact

For issues, feature requests, or questions, please reach out to the development team.

---

## 🙏 Acknowledgments

- Design inspiration from [Figma Design](https://www.figma.com/design/wuyAqmOYAiebQP1swCzIrt/Premium-Spiritual-Wellness-Website)
- Built with modern web technologies and best practices
- Dedicated to promoting spiritual wellness and holistic well-being
