# 🎯 Nirvaha Deployment - Quick Reference Card

## ✅ Current Status

```
BACKEND:  http://localhost:4000  ✓ RUNNING
FRONTEND: http://localhost:3001  ✓ RUNNING  
DATABASE: SQLite (backend/data/nirvaha.db) ✓ INITIALIZED
```

---

## 🔗 Access Points

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:3001 | Web application |
| Backend API | http://localhost:4000 | REST API server |
| API Meditations | http://localhost:4000/api/meditations | Meditation data |
| API Sounds | http://localhost:4000/api/sounds | Sound data |
| API Health | http://localhost:4000/api/health | Server status |

---

## 🧪 Test Instructions

### 1. View Sample Data
```
Visit: http://localhost:4000/api/meditations
Expected: JSON array with 3 meditation records
```

### 2. Admin Meditation Page
```
Visit: http://localhost:3001/dashboard/meditation
Expected: 3 sample meditations displayed in table
Actions: Add, Edit, Delete meditations
```

### 3. Admin Sound Page
```
Visit: http://localhost:3001/dashboard/sound
Expected: 3 sample sounds with mood tags
Actions: Add, Edit, Delete sounds with mood tags
```

### 4. Public Meditation Page
```
Visit: http://localhost:3001 → Navigate to Meditation
Expected: Active meditations displayed in cards
```

### 5. Public Sound Page
```
Visit: http://localhost:3001 → Navigate to Sound Healing
Expected: Sound player with playlists and tracks
```

---

## 💾 Database Sample Data

### Meditations (3 records)
- Morning Mindfulness (15 min, Beginner, Active, Mindfulness)
- Deep Sleep Meditation (30 min, Intermediate, Active, Sleep)
- Stress Relief Session (20 min, Beginner, Draft, Stress)

### Sounds (3 records)
- Tibetan Singing Bowls (432 Hz, 15 min, Active, Moods: Calm, Healing, Relaxation)
- Ocean Waves & Rain (528 Hz, 20 min, Active, Moods: Peaceful, Natural, Meditative)
- Theta Binaural Beats (639 Hz, 30 min, Active, Moods: Focus, Calm)

---

## 🛠️ Restart Services

### Restart Backend (if needed)
```bash
# Terminal in project root
Ctrl+C  (in backend terminal)
cd backend
node server.js
```

### Restart Frontend
```bash
# Terminal in project root
Ctrl+C  (in frontend terminal)
cd frontend
npm run dev
```

---

## 📂 Key Files

| File | Purpose |
|------|---------|
| backend/server.js | Express API server |
| backend/package.json | Backend dependencies |
| frontend/.env.local | Frontend API config |
| src/lib/contentApi.ts | TypeScript API client |
| src/admin/pages/content/ | Admin CRUD pages |
| src/components/pages/ | Public user pages |

---

## 🔌 API Endpoints Cheat Sheet

### Meditations
```
GET    /api/meditations          - Get all
POST   /api/meditations          - Create
PUT    /api/meditations/{id}     - Update
DELETE /api/meditations/{id}     - Delete
```

### Sounds
```
GET    /api/sounds               - Get all
POST   /api/sounds               - Create
PUT    /api/sounds/{id}          - Update
DELETE /api/sounds/{id}          - Delete
```

### Health
```
GET    /api/health               - Server status
```

---

## ⚡ Quick PowerShell Tests

### Verify Backend Running
```powershell
Invoke-WebRequest -Uri "http://localhost:4000/api/health" -UseBasicParsing
# Returns: {"ok":true}
```

### Get Meditation Count
```powershell
$data = Invoke-WebRequest -Uri "http://localhost:4000/api/meditations" -UseBasicParsing | Select-Object -ExpandProperty Content | ConvertFrom-Json
$data.Count  # Should show: 3
```

### Get Sound Count
```powershell
$data = Invoke-WebRequest -Uri "http://localhost:4000/api/sounds" -UseBasicParsing | Select-Object -ExpandProperty Content | ConvertFrom-Json
$data.Count  # Should show: 3
```

---

## 🚨 Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| "Cannot reach API" | Check if backend is running: http://localhost:4000/api/health |
| "No data showing" | Verify .env.local has correct API URL |
| "Port already in use" | Check what's using the port and kill it |
| "Database not found" | Backend creates it on first run - restart backend |
| "Changes not saving" | Check browser console (F12) for API errors |

---

## 📊 System Architecture

```
Browser (http://localhost:3001)
         ↓
    React Frontend
         ↓
contentApi.ts (TypeScript wrapper)
         ↓
Express API (http://localhost:4000)
         ↓
SQLite Database (./backend/data/nirvaha.db)
```

---

## ✅ Verification Checklist

- [x] Backend running on port 4000
- [x] Frontend running on port 3001
- [x] Database initialized with sample data
- [x] API endpoints responding
- [ ] Test all admin CRUD operations
- [ ] Test public page displays
- [ ] Test player functionality

---

## 📚 Documentation Files

1. **QUICK_START.md** - Step-by-step testing guide
2. **API_DOCUMENTATION.md** - Complete API reference
3. **DEPLOYMENT_COMPLETE.md** - Full deployment guide
4. **DEPLOYMENT_SUMMARY.md** - High-level summary
5. **This file** - Quick reference card

---

## 🎯 Success Criteria

Your deployment is successful when:

✅ Both servers running without errors
✅ Database contains sample data
✅ Admin pages display and save data
✅ Public pages display meditation/sound content
✅ API responds to requests with valid JSON
✅ All CRUD operations work in admin pages

---

**Generated**: February 7, 2026  
**Status**: DEPLOYMENT COMPLETE ✅  
**Ready for Testing**: Yes ✅
