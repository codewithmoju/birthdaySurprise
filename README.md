# 🎉 Birthday Surprise Countdown

A beautiful, production-ready surprise birthday webpage featuring a timezone-aware countdown timer and an interactive celebration mode with confetti, animations, and birthday wishes.

## ✨ Features

- **Timezone-Aware Countdown**: Counts down to October 12, 2025 11:59 PM (PKT/Asia/Karachi, UTC+05:00)
- **Automatic Celebration Mode**: Seamlessly transitions to celebration when countdown reaches zero
- **Interactive Confetti**: Canvas-based confetti animations with click-to-burst interactions
- **Animated Overlays**: Lottie-powered floating hearts and balloons
- **Birthday Wishes**: Real-time wish submission and display with Supabase integration
- **Audio Controls**: User-triggered birthday music with play/pause controls
- **Fully Responsive**: Mobile-first design with breakpoints at 375px, 768px, and 1024px
- **Accessibility**: WCAG-compliant with ARIA labels, keyboard navigation, and reduced motion support
- **Performance Optimized**: Lazy-loaded libraries, optimized for mobile devices

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- A Supabase account (database is already configured)

### Installation

1. **Clone or download the project**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**

   The `.env` file is already configured with Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```

4. **Add Audio Asset (Optional)**

   Place a birthday song MP3 file at `/public/assets/birthday-song.mp3`
   - Recommended: Happy Birthday instrumental
   - Format: MP3, 128-192kbps
   - Duration: 2-3 minutes max

5. **Run Development Server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

The production build will be in the `dist/` directory.

## 📦 Deployment

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variables in Netlify dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow prompts and add environment variables when asked

### Deploy to Supabase Storage

```bash
npm run build
# Upload dist/ contents to Supabase Storage bucket configured for static hosting
```

## 🎨 Customization

### Change Names

Edit `index.html` to update the names displayed:

```html
<!-- Her name -->
<span class="name-highlight" id="her-name">Sarah</span>

<!-- His name -->
<span class="name-highlight" id="his-name">Alex</span>
```

Also update in the celebration section:
```html
<span class="name-highlight" id="her-name-celebration">Sarah</span>
```

### Change Target Date/Time

Edit `app.js` line 3:
```javascript
const TARGET_TIMESTAMP = '2025-10-13T00:00:00+05:00';
```

Format: ISO 8601 with timezone offset

### Customize Colors

Edit CSS custom properties in `styles.css`:
```css
:root {
  --color-primary: #ff6b9d;
  --color-secondary: #c44569;
  --color-accent: #feca57;
  /* ... more colors */
}
```

## 🧪 Testing

### Manual Testing Checklist

See `QA.md` for comprehensive test scenarios.

### Quick Test Celebration Mode

To test celebration mode without waiting:

1. Open browser DevTools
2. In Console, run:
   ```javascript
   document.getElementById('manual-celebration-btn').classList.remove('hidden');
   document.getElementById('manual-celebration-btn').click();
   ```

Or temporarily change the target date in `app.js` to a past date.

## 🗄️ Database Schema

The `wishes` table stores birthday messages:

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| message | text | Wish content (max 200 chars) |
| created_at | timestamptz | Submission timestamp |

RLS policies allow public read/write for guest submissions.

## 🔒 Security

- User input is sanitized using `textContent` to prevent XSS attacks
- Messages are limited to 200 characters
- Supabase RLS policies control database access
- No sensitive data is stored or transmitted
- Audio playback requires user interaction (no autoplay)

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari 14+
- Chrome Mobile 90+

## 🎯 Performance Features

- Lazy-loaded external libraries (canvas-confetti, lottie-web)
- Reduced confetti particles on low-memory mobile devices
- `prefers-reduced-motion` support
- Optimized animations with CSS transforms
- No layout shifts (CLS optimized)
- Font preconnect for faster loading

## 📄 License

This project is provided as-is for personal use.

## 🙏 Credits

- **Confetti**: [canvas-confetti](https://github.com/catdad/canvas-confetti) by catdad
- **Animations**: [lottie-web](https://github.com/airbnb/lottie-web) by Airbnb
- **Fonts**: Poppins and Inter from Google Fonts
- **Database**: Supabase
- **Icons**: Custom SVG icons

## 💡 Tips

- Test on actual mobile devices before the big day
- Consider adding a custom domain for a more personal touch
- Pre-test audio playback on target devices
- Share the link privately to avoid spoiling the surprise
- Monitor the Supabase dashboard for wish submissions

## 🐛 Troubleshooting

**Countdown shows 00:00:00**
- Check if target date has passed
- Verify timezone offset is correct in `TARGET_TIMESTAMP`

**Audio won't play**
- Ensure `birthday-song.mp3` exists in `/public/assets/`
- Check browser console for errors
- Verify user interaction triggered playback (browsers block autoplay)

**Wishes not saving**
- Check Supabase connection in browser console
- Verify `.env` credentials are correct
- Check Supabase dashboard for database status

**Confetti not appearing**
- Check if `prefers-reduced-motion` is enabled
- Open console to see if libraries loaded successfully
- Verify CDN URLs are accessible
