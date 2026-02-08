# 🚀 Nirvaha Backend Integration - Quick Start Guide

## ✅ What's Running Now

```
Backend API:      http://localhost:4000    ✓ RUNNING
Frontend Server:  http://localhost:3001    ✓ RUNNING
SQLite Database:  ./backend/data/nirvaha.db ✓ INITIALIZED
```

## 🧪 Test the Integration

### 1. Admin Meditation Page
Open: **http://localhost:3001/dashboard/meditation**

**Expected Results:**
- ✓ Page loads with 3 sample meditations in a table
- ✓ Columns show: Title, Duration, Level, Category, Actions
- ✓ Sample data: "Morning Mindfulness", "Deep Sleep Meditation", "Stress Relief Session"

**Actions to Test:**
1. Click "Add Meditation" button
2. Fill form: Title="Test Meditation", Duration=25, Level="Beginner", etc.
3. Click "Create" 
4. **Verify:** New item appears in table immediately
5. Click Edit icon on any meditation
6. Change title and click "Update"
7. **Verify:** Changes are saved in real-time
8. Click Delete icon, confirm deletion
9. **Verify:** Item removed from table

### 2. Admin Sound Healing Page
Open: **http://localhost:3001/dashboard/sound**

**Expected Results:**
- ✓ Page loads with 3 sample sounds in a table
- ✓ Columns show: Title, Frequency, Duration, Mood, Category, Actions, Status
- ✓ Sample data: "Tibetan Singing Bowls", "Ocean Waves & Rain", "Theta Binaural Beats"
- ✓ Mood tags display as colored badges

**Actions to Test:**
1. Click "Add Sound" button
2. Fill form including:
   - Title = "Test Sound"
   - Artist = "Test Artist"  
   - Frequency = "432 Hz"
   - Duration = 20
   - Mood tags = Add "Calm", "Healing" (type and press Enter)
   - Category = "Test"
3. Click "Create"
4. **Verify:** New item with mood tags appears in table
5. Test edit/delete same as meditation page

### 3. Public Meditation Page
Open: **http://localhost:3001/dashboard/meditation** (from main nav, not admin)

**Expected Results:**
- ✓ Page displays meditation cards in "Guided Sessions" section
- ✓ Cards show: category tag, duration badge, title, level
- ✓ Only "Active" status meditations display (2 of 3 samples are Active)
- ✓ Loading state shown briefly while fetching

### 4. Public Sound Healing Page  
Open: **http://localhost:3001/dashboard/sound** (from main nav, not admin)

**Expected Results:**
- ✓ Page loads with featured track, playlists, and sound cards
- ✓ Dynamic playlists created from categories ("Bowl Therapy", "Nature Sounds", "Binaural")
- ✓ Player controls visible
- ✓ Can click cards to open full player
- ✓ Save/favorite buttons toggle state

---

## 🔗 API Testing (Advanced)

### Test Meditation Endpoints
```powershell
# Get all meditations
Invoke-WebRequest -Uri "http://localhost:4000/api/meditations" -UseBasicParsing | Select-Object -ExpandProperty Content

# Create new meditation
$body = @{
    title = "API Test Meditation"
    duration = 25
    level = "Beginner"
    category = "Test"
    description = "Created via API"
    status = "Active"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:4000/api/meditations" `
    -Method POST `
    -Headers @{"Content-Type"="application/json"} `
    -Body $body `
    -UseBasicParsing | Select-Object -ExpandProperty Content
```

### Test Sound Endpoints
```powershell
# Get all sounds
Invoke-WebRequest -Uri "http://localhost:4000/api/sounds" -UseBasicParsing | Select-Object -ExpandProperty Content

# Create new sound
$body = @{
    title = "API Test Sound"
    artist = "Test Artist"
    frequency = "528 Hz"
    duration = 20
    category = "Test"
    description = "Created via API"
    status = "Active"
    mood = @("Calm", "Focus")
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:4000/api/sounds" `
    -Method POST `
    -Headers @{"Content-Type"="application/json"} `
    -Body $body `
    -UseBasicParsing | Select-Object -ExpandProperty Content
```

---

## 🐛 Troubleshooting

### "Cannot reach API" / Connection refused
1. Verify backend is running: `http://localhost:4000/api/health`
2. Check `.env.local` has correct API URL
3. Reload frontend page (Ctrl+F5 to clear cache)

### Admin page blank / No data showing
1. Check browser console (F12) for errors
2. Verify API endpoint: `http://localhost:4000/api/meditations`
3. Check `.env.local` configuration

### Changes not persisting
1. Check Network tab in DevTools (F12) for failed requests
2. Verify backend is still running
3. Check backend console for error messages

### Port conflicts
```powershell
# List processes on ports
netstat -ano | findstr :4000
netstat -ano | findstr :3001

# Kill process (replace PID)
taskkill /PID <PID> /F
```

---

## 📊 Data Persistence

✅ All data entered via admin pages is **automatically saved to the SQLite database**

- Meditations stored in: `backend/data/nirvaha.db` → `meditations` table
- Sounds stored in: `backend/data/nirvaha.db` → `sounds` table
- Each record has auto-generated UUID and timestamp
- Changes persist across server restarts

---

## 🎯 Success Criteria

Your deployment is successful when:

- [x] Backend server running on port 4000
- [x] Frontend dev server running on port 3001  
- [x] SQLite database created with sample data
- [ ] Admin meditation page displays 3+ items
- [ ] Admin sound page displays 3+ items
- [ ] Can add new meditation and see it appear
- [ ] Can add new sound with mood tags
- [ ] Public pages load meditation/sound data
- [ ] Player controls work on sound page

---

## 📝 Notes

**Sample Data:** Automatically seeded on first backend start
- 3 Meditations (2 Active, 1 Draft status)
- 3 Sounds (All Active status)
- Can be edited/deleted like any user-created content

**File Uploads:** Currently using URL input fields (not file uploads)
- Set `thumbnailUrl` and `audioUrl` to image/audio URLs
- Future enhancement: Add S3 file upload endpoint

**Responsive Design:** All admin pages are mobile-friendly
- Works on desktop, tablet, and mobile screens

---

## 🔄 Restart Services

### Restart Backend (keeps data)
```bash
cd backend
node server.js
```

### Restart Frontend  
In VS Code Vite terminal: Press `Ctrl+C` then `npm run dev`

### Reset Database (delete all data)
```bash
# Stop backend first
rm backend/data/nirvaha.db
node server.js  # Will reseed
```

---

**🎉 Your Nirvaha backend is live and ready to use!**

Start with the admin pages to create content, then view it on the public pages.
