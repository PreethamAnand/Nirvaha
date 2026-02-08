# 📤 File Upload Quick Start Guide

## How to Upload Files in Admin Panel

### For Meditation Content

1. **Navigate to Meditation Admin Page**
   - URL: http://localhost:3001/dashboard/meditation
   - Click "Add Meditation" button

2. **Fill in Meditation Details**
   - Title: Required
   - Duration: Required (in minutes)
   - Level: Beginner, Intermediate, or Advanced
   - Category: Free text (e.g., "Mindfulness", "Sleep")
   - Description: Optional
   - Status: Active or Draft

3. **Upload Thumbnail Image**
   - Click "Thumbnail Image" file input
   - Choose an image file (JPG, PNG, WEBP, GIF)
   - Max size: 50MB
   - You'll see "New file: [filename]" below the input

4. **Upload Audio File**
   - Click "Audio File" file input
   - Choose an audio file (MP3, WAV, OGG, WEBM)
   - Max size: 50MB
   - You'll see "New file: [filename]" below the input

5. **Save Your Content**
   - Click "Create" button
   - Button changes to "Uploading..." during upload
   - Files are uploaded automatically
   - New meditation appears in the table once complete

### For Sound Healing Content

**Same process**, but with additional fields:
- Artist: Optional
- Frequency: Optional (e.g., "432 Hz")
- Mood Tags: Add multiple by typing and pressing Enter

---

## Editing Existing Content

### To Replace Files

1. Click the **edit icon** (pencil) on any record
2. You'll see current file names displayed (if any)
3. To replace a file:
   - Select a NEW file using the file input
   - Old file URL is preserved until you save
4. To keep existing files:
   - Don't select any new files
   - Files remain unchanged
5. Click "Update" to save changes

### Partial Updates

You can:
- ✅ Replace only thumbnail (keep audio)
- ✅ Replace only audio (keep thumbnail)
- ✅ Replace both files
- ✅ Update text fields without touching files

---

## File Requirements

### Supported File Types

**Images (Thumbnails)**:
- JPEG (.jpg, .jpeg)
- PNG (.png)
- WEBP (.webp)
- GIF (.gif)

**Audio Files**:
- MP3 (.mp3)
- WAV (.wav)
- OGG (.ogg)
- WEBM (.webm)

### File Size Limits
- **Maximum per file**: 50MB
- Larger files will be rejected

### File Naming
- Your original filename is preserved in the system
- Files are stored with unique names to prevent conflicts
- Format: `{timestamp}-{uuid}.{extension}`
- Example: `1707300000000-abc123-def456.mp3`

---

## Where Are Files Stored?

### Server Location
- **Directory**: `backend/uploads/`
- **Access URL**: `http://localhost:4000/uploads/{filename}`

### In Database
- File URLs are saved in meditation/sound records
- Example: `"audioUrl": "http://localhost:4000/uploads/123456-abc.mp3"`

### On Public Pages
- Audio players use these URLs to stream content
- Thumbnails display on meditation/sound cards

---

## Common Scenarios

### Scenario 1: Creating Content with Files
```
1. Click "Add Meditation"
2. Fill Title: "Morning Peace"
3. Fill Duration: 15
4. Select Level: "Beginner"
5. Click thumbnail file input → choose "sunrise.jpg"
6. Click audio file input → choose "morning-meditation.mp3"
7. Click "Create"
8. Wait for "Uploading..." → "Create" (done)
9. New meditation appears with uploaded files
```

### Scenario 2: Updating Just the Audio
```
1. Click edit icon on "Morning Peace"
2. Modal opens showing current data
3. Shows: "Current: morning-meditation.mp3"
4. Click audio file input → choose "new-morning.mp3"
5. Don't touch thumbnail input
6. Click "Update"
7. Wait for upload
8. Audio updated, thumbnail unchanged
```

### Scenario 3: Updating Text Without Files
```
1. Click edit icon on any record
2. Change title or description
3. Don't select any new files
4. Click "Update"
5. Instant update (no upload needed)
6. Files remain exactly as before
```

---

## Troubleshooting

### "File upload failed" Error

**Possible Causes**:
1. File too large (>50MB)
   - **Solution**: Compress your file or split into smaller segments

2. Wrong file type
   - **Solution**: Convert to supported format (MP3, JPG, etc.)

3. Backend server not running
   - **Solution**: Check backend terminal, restart if needed

4. Network issue
   - **Solution**: Check your internet connection

### File Not Appearing After Upload

**Checks**:
1. Look for errors in browser console (F12)
2. Verify backend is running: http://localhost:4000/api/health
3. Check if record was created (refresh page)
4. Verify file exists in `backend/uploads/` directory

### "Uploading..." Stuck Forever

**Solution**:
1. Check backend terminal for errors
2. Refresh the page
3. Try uploading a smaller file
4. Check browser console for network errors

### Can't Access Uploaded Files

**Verify**:
1. Backend server is running
2. File exists in uploads directory:
   ```powershell
   Get-ChildItem c:\Preetham\B.TECH\INTERN\NIRVAHA\AKSHU\Nirvaha-main\backend\uploads
   ```
3. URL format is correct: `http://localhost:4000/uploads/{filename}`
4. No firewall blocking port 4000

---

## Tips & Best Practices

### File Preparation

**For Audio**:
- ✅ Use MP3 format for best compatibility
- ✅ Recommended bitrate: 128-320 kbps
- ✅ Mono or stereo both work
- ✅ Keep files under 20MB for faster uploads

**For Thumbnails**:
- ✅ Use JPG or PNG format
- ✅ Recommended size: 1200x800 pixels
- ✅ Aspect ratio: 3:2 or 16:9
- ✅ Keep files under 2MB

### Upload Tips

1. **Test with small files first** - Verify system works before large uploads
2. **Save your work** - Don't close browser during upload
3. **One file at a time** - Don't upload multiple records simultaneously
4. **Check uploads directory** - Periodically verify files are stored correctly

### File Management

**Keep Track**:
- Files accumulate in uploads folder
- Deleting a record does NOT delete its files
- Old files remain until manually removed
- Consider periodic cleanup of unused files

**Future Cleanup** (Manual):
1. List all files in uploads:
   ```powershell
   Get-ChildItem backend\uploads
   ```
2. Check database for which files are in use
3. Delete unused files manually

---

## Delete Functionality

### How to Delete Content

**For ANY meditation or sound**:

1. **Locate the record** in the table
2. **Click the three-dot menu** (⋮) on the right side
3. **Select "Delete"** (red option with trash icon)
4. **Confirmation modal** appears:
   - Shows record title
   - Warns "This action cannot be undone"
5. **Click "Delete"** to confirm, or "Cancel" to abort
6. **Record is removed** from table and database

### What Happens to Files?

**Important**: Uploaded files are NOT automatically deleted!

- ✅ Record removed from database
- ✅ UI updated immediately
- ⚠️ Files remain in `backend/uploads/` directory
- ⚠️ Files remain accessible via URL

**Why?** This prevents accidental file deletion if:
- Multiple records use the same file
- You want to restore deleted content
- You need to verify data before permanent deletion

**Manual Cleanup** (if needed):
```powershell
# List all files
Get-ChildItem backend\uploads

# Delete specific file
Remove-Item backend\uploads\{filename}

# Delete all unused files (advanced)
# This requires checking database first
```

---

## Quick Reference

### File Upload Flow
```
Select File → Shows filename → Click Save → "Uploading..." → Upload complete → Record created/updated
```

### File Access Flow
```
File Selected → Uploaded to /api/upload → Stored in /uploads/ → URL saved in DB → Accessible at http://localhost:4000/uploads/{filename}
```

### File Limits
| Type | Format | Max Size |
|------|--------|----------|
| Audio | MP3, WAV, OGG, WEBM | 50 MB |
| Image | JPG, PNG, WEBP, GIF | 50 MB |

### URLs
| Purpose | URL |
|---------|-----|
| Meditation Admin | http://localhost:3001/dashboard/meditation |
| Sound Admin | http://localhost:3001/dashboard/sound |
| Backend API | http://localhost:4000 |
| Uploaded Files | http://localhost:4000/uploads/{filename} |

---

## Need Help?

### Check These First
1. ✅ Backend server running (`node server.js` in backend folder)
2. ✅ Frontend server running (`npm run dev` in frontend folder)
3. ✅ Browser console (F12) for error messages
4. ✅ Backend terminal for server errors

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| File won't upload | Check file size & type |
| "Uploading..." forever | Refresh page, check backend |
| File not accessible | Verify backend is running |
| Delete doesn't work | Check confirmation modal appears |

---

**🚀 You're ready to upload files!**

Start by testing with a small MP3 and JPG to verify everything works, then upload your actual meditation and sound healing content.
