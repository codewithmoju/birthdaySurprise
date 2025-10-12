# 🎉 Quick Start Guide

## In 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Customize Names
Edit `index.html` - Find and replace these 3 occurrences:
- Line 29: `<span class="name-highlight" id="her-name">Sarah</span>`
- Line 32: `<span class="name-highlight" id="his-name">Alex</span>`
- Line 90: `<span class="name-highlight" id="her-name-celebration">Sarah</span>`

Replace "Sarah" with her name and "Alex" with your name.

### 3. Add Birthday Song (Optional)
Place an MP3 file at: `/public/assets/birthday-song.mp3`

Skip this step if you don't want music - the page will work fine without it.

### 4. Run the App
```bash
npm run dev
```

Open: http://localhost:5173

### 5. Test Celebration Mode
Since the countdown won't reach zero yet, manually trigger celebration:

**Option A - Browser Console**
```javascript
document.getElementById('manual-celebration-btn').classList.remove('hidden');
document.getElementById('manual-celebration-btn').click();
```

**Option B - Change Date (Temporary Testing)**
Edit `app.js` line 3:
```javascript
const TARGET_TIMESTAMP = '2024-01-01T00:00:00+05:00'; // Past date for testing
```
Remember to change it back!

---

## Deploy for Real

### Netlify (Easiest)
1. Push code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Click "Import from Git"
4. Select your repo
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Add environment variables:
   - `VITE_SUPABASE_URL` (from .env)
   - `VITE_SUPABASE_ANON_KEY` (from .env)
8. Deploy!

### Vercel (Fast Alternative)
```bash
npm i -g vercel
vercel
```
Follow prompts and add env variables when asked.

---

## Important Dates

**Target**: October 12, 2025 at 11:59 PM (Pakistan Time - PKT/Asia/Karachi)

The countdown automatically adjusts for visitors in any timezone.

**Test Before**: October 10, 2025
- Verify from mobile phone
- Check audio playback works
- Submit a test wish
- Share with a friend to QA

---

## Change Target Date/Time

Edit `app.js` line 3:
```javascript
const TARGET_TIMESTAMP = '2025-10-13T00:00:00+05:00';
```

Format: `YYYY-MM-DDTHH:MM:SS+TIMEZONE`

Examples:
- New York (EST): `2025-12-25T00:00:00-05:00`
- London (GMT): `2025-12-25T00:00:00+00:00`
- Tokyo (JST): `2025-12-25T00:00:00+09:00`

---

## Troubleshooting

**Countdown shows 00:00:00**
→ Target date has passed. Change the date or click "Show Celebration" button.

**Wishes not saving**
→ Check browser console. Verify Supabase credentials in `.env` file.

**Audio won't play**
→ Ensure `birthday-song.mp3` exists in `/public/assets/` folder.

**Want to change colors?**
→ Edit `styles.css` and change the `:root` CSS variables at the top.

---

## Files You Can Edit Safely

✅ **index.html** - Names, text content
✅ **app.js** - Target date (line 3)
✅ **styles.css** - Colors, fonts, spacing
✅ **.env** - Supabase credentials (already configured)

❌ **Don't edit unless you know what you're doing:**
- package.json
- vite.config.ts
- tsconfig files

---

## Get Help

📖 **Full Documentation**: See `README.md`
✅ **Testing Checklist**: See `QA.md`
🔧 **Technical Details**: See `DEV_NOTES.md`

---

## Pre-Launch Checklist

- [ ] Names customized in HTML
- [ ] Target date/time verified
- [ ] Audio file added (or decided to skip)
- [ ] Tested on desktop browser
- [ ] Tested on mobile phone
- [ ] Deployed to hosting platform
- [ ] Shared link works from different device
- [ ] Wishes save and load correctly
- [ ] Everything looks beautiful 🎉

---

**Ready to surprise someone special? Let's go! 🎊**
