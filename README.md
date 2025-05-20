# Tay März Portfolio

A modern, responsive portfolio website showcasing my work, skills, and experience as a developer. Built with a focus on accessibility, performance, and beautiful animations.

## 🌟 Features

- **Modern Design**: Clean and professional layout with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Interactive Elements**: 
  - Live Last.fm integration
  - Interactive project cards
  - Animated skill badges
  - Particle.js background effects
- **Performance Optimized**: Fast loading times and smooth animations
- **Accessibility**: WCAG compliant with proper ARIA labels and semantic HTML
- **SEO Friendly**: Proper meta tags and structured data
- **Contact Form**: Integrated contact form with validation
- **Multilingual Support**: German and English versions of legal pages

## 🛠️ Tech Stack

- **Frontend**:
  - HTML5
  - CSS3 with Tailwind CSS
  - JavaScript (Vanilla)
  - Particles.js for background effects
- **Backend**:
  - Node.js
  - Express.js
- **APIs**:
  - Last.fm API for music integration
- **Tools**:
  - Tailwind CSS for styling
  - Particles.js for interactive background
  - Devicons for skill icons

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Vercel CLI (for deployment)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/taynotfound/profoolio.git
   cd profoolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```env
   LASTFM_API_KEY=your_lastfm_api_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open `http://localhost:3000` in your browser

### Deployment with Vercel

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Add your environment variables in the Vercel dashboard:
   - Go to your project settings
   - Add `LASTFM_API_KEY` with your Last.fm API key

4. Deploy:
   ```bash
   vercel
   ```

   For production deployment:
   ```bash
   vercel --prod
   ```

5. Your site will be live at `https://your-project-name.vercel.app`

## 📁 Project Structure

```
profoolio/
├── public/          # Static assets
│   ├── main.css     # Main stylesheet
│   ├── main.js      # Main JavaScript file
│   └── photo.jpg    # Profile photo
├── views/           # HTML templates
│   ├── index.html   # Main portfolio page
│   ├── impressum.html      # German legal page
│   └── impressum-en.html   # English legal page
├── server.js        # Express server
└── package.json     # Project dependencies
```

## 🎨 Customization

### Colors and Theme

The color scheme can be modified in the Tailwind configuration. The main colors are:
- Primary: Purple (`#7c3aed`)
- Background: Dark gradient from `#181824` to `#2d1a4d`
- Text: White and gray shades

### Adding Projects

To add a new project, add a new project card in the projects section of `index.html`:

```html
<div class="project-card interactive-hover">
  <img src="/screenshots/your-project.png" alt="Project Screenshot" class="project-img">
  <div class="project-overlay">
    <a href="https://your-project.com" target="_blank" class="project-btn bg-purple-600 hover:bg-purple-500">View Project</a>
    <a href="https://github.com/your-username/your-project" target="_blank" class="project-btn bg-gray-800 hover:bg-gray-700">GitHub</a>
  </div>
  <div class="project-content">
    <div class="font-bold text-purple-200">Project Name</div>
    <div class="text-gray-200 text-sm mb-2">Project description goes here.</div>
  </div>
</div>
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Tay März**
- Website: [taymaerz.de](https://taymaerz.de)
- GitHub: [@taynotfound](https://github.com/taynotfound)
- Email: hi@taymaerz.de

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework
- [Particles.js](https://vincentgarreau.com/particles.js/) for the interactive background
- [Devicons](https://devicon.dev) for the technology icons
- [Last.fm](https://www.last.fm/api) for the music integration API 