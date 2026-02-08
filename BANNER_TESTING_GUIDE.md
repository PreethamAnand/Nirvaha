# Banner Display - Testing & Troubleshooting Guide

## Issue Found & Fixed

**Problem**: Banner images were not visible on `/dashboard/meditation` 

**Root Cause**: 
- BannerShowcase was only added to DashboardPage, but `/dashboard/meditation` renders MeditationPage
- Component returned `null` when no banners existed, with no user feedback

**Solution Implemented**:
1. ✅ Added BannerShowcase to `MeditationPage` component
2. ✅ Added BannerShowcase to `SoundHealingPage` component  
3. ✅ Improved empty state messaging to guide users

## Testing Steps

### Step 1: Start Both Servers

**Backend (Port 4000)**:
```bash
cd c:\Preetham\B.TECH\INTERN\NIRVAHA\AKSHU\Nirvaha-main\backend
npm start
```

Expected output:
```
Nirvaha backend running on port 4000
```

**Frontend (Port 3001)**:
```bash
cd c:\Preetham\B.TECH\INTERN\NIRVAHA\AKSHU\Nirvaha-main\frontend
npm start
```

Allow 30-60 seconds for compilation.

### Step 2: Upload a Banner (Admin Only)

1. Navigate to **`http://localhost:3001/admin/content/meditation`**
2. Click **"Add Meditation"** or edit an existing one
3. Fill in required fields:
   - Title: "Test Meditation"
   - Duration: 10 minutes
   - Level: "Beginner"
   - Category: "Test"
   - Description: "Testing banner display"
   - Status: **"Active"** (⚠️ IMPORTANT - must be Active!)

4. Scroll down to **"Banner Image"** field
5. Click and select a banner image file:
   - Supported formats: PNG, JPEG, WEBP, GIF
   - Max size: 50MB
   - Recommended size: 1200px × 400px

6. Click **"Create"** button
   - You'll see "Uploading..." message
   - File uploads automatically
   - Button shows "Create" again when done

### Step 3: View the Banner

#### On Meditation Page
1. Navigate to **`http://localhost:3001/dashboard/meditation`**
2. You should see:
   - **HeroSection** (top)
   - **BannerShowcase** (carousel with your uploaded banner) ← NEW!
   - Rest of meditation content below

#### On Sound Healing Page
1. Navigate to **`http://localhost:3001/dashboard/sound`**
2. Banner carousel appears at the top

### Step 4: Verify Banner Functionality

✅ **Check these items**:
- [ ] Banner image displays correctly
- [ ] Banner title shows below the image
- [ ] Banner description shows below the title
- [ ] Type badge shows ("🧘 Meditation" or "🎵 Sound Healing")
- [ ] Navigation arrows (left/right) appear
- [ ] Can click arrows to navigate (if multiple banners)
- [ ] Click indicators work to jump to specific banner
- [ ] Banner loads without errors in console (F12 → Console tab)

## Debugging Checklist

### Issue: "No banner images available yet" message shows

**Possible causes**:
1. ❌ You haven't uploaded any banners yet
   - **Fix**: Follow Step 2 above
   
2. ❌ Banner was uploaded but status is "Draft"
   - **Fix**: Edit the item, change status to "Active", save
   
3. ❌ Backend is not running
   - **Fix**: Start backend server: `npm start` in backend folder
   
4. ❌ Database doesn't have banner_url column
   - **Fix**: Delete `backend/data/nirvaha.db` and restart backend (it will recreate)

### Issue: Image doesn't load (shows fallback gradient)

**Debugging steps**:
1. Open browser DevTools: **F12**
2. Go to **Network** tab
3. Reload page (F5)
4. Look for requests to `/uploads/` entries
5. Check if they return **200 OK** or error code

If you see **404 errors**:
- Backend upload endpoint may not be working
- Check backend is running: `curl http://localhost:4000/api/health`
- Should return: `{"ok":true}`

If upload response shows an error:
- Check file format is supported (PNG, JPEG, WEBP, GIF)
- Check file size is under 50MB
- Look at backend console for error messages

### Issue: Upload button stuck on "Uploading..."

**Possible causes**:
1. Backend not responding to /api/upload endpoint
2. Network issue or CORS problem
3. File too large or wrong format

**Fix**: 
- Check browser console (F12) for error messages
- Check backend console for error logs
- Try a smaller file (< 10MB)

### Issue: Backend database errors

**If you see database errors**:

1. Stop backend (Ctrl+C)
2. Delete the old database:
   ```bash
   cd c:\Preetham\B.TECH\INTERN\NIRVAHA\AKSHU\Nirvaha-main\backend
   Remove-Item .\data\nirvaha.db -Force
   ```
3. Restart backend:
   ```bash
   npm start
   ```
   - New database will be created with correct schema

## File Locations

**Admin Pages** (where to upload banners):
- Meditation: `/admin/content/meditation`
- Sound Healing: `/admin/content/sound`

**User Pages** (where banners display):
- Meditation dashboard: `/dashboard/meditation`
- Sound dashboard: `/dashboard/sound`

**Component Files** (implementation):
- BannerShowcase: `src/components/dashboard/BannerShowcase.tsx`
- MeditationPage: `src/components/pages/MeditationPage.tsx`
- SoundHealingPage: `src/components/pages/SoundHealingPage.tsx`

**Backend**:
- Server: `backend/server.js`
- Database: `backend/data/nirvaha.db`
- Uploads: `backend/uploads/` (created automatically)

## API Endpoints Summary

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/health` | Check backend status |
| POST | `/api/upload` | Upload a file (returns URL) |
| GET | `/api/meditations` | Get all meditations |
| POST | `/api/meditations` | Create meditation with banner |
| PUT | `/api/meditations/:id` | Update meditation banner |
| GET | `/api/sounds` | Get all sounds |
| POST | `/api/sounds` | Create sound with banner |
| PUT | `/api/sounds/:id` | Update sound banner |

## Quick Commands

**Check Backend Health**:
```bash
Invoke-WebRequest http://localhost:4000/api/health -UseBasicParsing | Select-Object -ExpandProperty Content
```

**View Database Data** (PowerShell):
```bash
Invoke-WebRequest http://localhost:4000/api/meditations -UseBasicParsing | Select-Object -ExpandProperty Content | ConvertFrom-Json | Format-List
```

**Kill Backend Process**:
```bash
Get-Process node | Where-Object {$_.Handles -gt 0} | Stop-Process -Force
```

## Expected Behavior

### First Visit (No Banners Uploaded):
```
┌─────────────────────────────────────────────┐
│        BannerShowcase Section                │
│                                              │
│  "No banner images available yet"            │
│  "Admin users can upload banners in the      │
│   content management panel"                  │
└─────────────────────────────────────────────┘
```

### After Uploading Banner with Status "Active":
```
┌──────────────────────────────────────────────┐
│  [◀] ████████████████  [▶]                   │
│      (Your Banner Image Here)                │
│      ● ○                                     │
│                                              │
│  🧘 Meditation                               │
│  Your Meditation Title                       │
│  Your meditation description here...         │
└──────────────────────────────────────────────┘
```

## Success Indicators ✅

- [ ] Backend starts without database errors
- [ ] Can upload banner image without errors
- [ ] Banner URL appears in admin form
- [ ] Banner displays on meditation/sound page
- [ ] Navigation controls work
- [ ] No errors in browser console (F12)
- [ ] No errors in backend console

## Still Having Issues?

1. **Check the browser console** (F12) for error messages
2. **Check backend console** for error logs
3. **Verify database file exists**: `backend/data/nirvaha.db`
4. **Restart servers** (stop and start again)
5. **Clear browser cache**: Ctrl+Shift+Delete

---

**Last Updated**: February 2026  
**Version**: 1.1 (Fixed - Banner Display)
