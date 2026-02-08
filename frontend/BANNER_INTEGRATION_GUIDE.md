# Banner Photo Integration Guide

## Overview
Banner photos have been successfully integrated for both meditation and sound healing content. Users can now upload banner images via the admin panel, and these banners are displayed in an interactive showcase section on the user dashboard.

## What Was Implemented

### 1. Database Schema Updates
Both `meditations` and `sounds` tables now include a `banner_url` field:

```sql
-- Added to both tables:
banner_url TEXT
```

### 2. Backend API Updates
All API endpoints have been updated to handle the `bannerUrl` field:

- **POST /api/meditations** - Create meditation with banner
- **PUT /api/meditations/:id** - Update meditation with banner
- **POST /api/sounds** - Create sound with banner
- **PUT /api/sounds/:id** - Update sound with banner

### 3. Frontend Type Definitions
Updated TypeScript types in [contentApi.ts](src/lib/contentApi.ts):

```typescript
export type MeditationItem = {
  // ... other fields
  bannerUrl?: string;
};

export type SoundItem = {
  // ... other fields
  bannerUrl?: string;
};
```

### 4. Admin Panel Enhancements

#### Meditation Admin ([MeditationContent.tsx](src/admin/pages/content/MeditationContent.tsx))
- Added **Banner Image** file input field
- Banner file upload integrated with existing file upload handler
- Current banner file display with option to replace
- New file indicator shows when a new banner is selected

#### Sound Healing Admin ([SoundHealingContent.tsx](src/admin/pages/content/SoundHealingContent.tsx))
- Added **Banner Image** file input field (identical to meditation)
- Full file upload support
- Current and new file tracking

### 5. Dashboard Banner Showcase
New component: [BannerShowcase.tsx](src/components/dashboard/BannerShowcase.tsx)

Features:
- **Carousel display** of all active meditation and sound banners
- **Navigation controls** - Previous/Next buttons
- **Indicator dots** - Click to jump to specific banner
- **Responsive design** - Adapts to mobile, tablet, and desktop
- **Content overlay** - Title, description, and type badge
- **Auto-loading** - Fetches all active content with banners

Integration:
- Integrated into [DashboardPage.tsx](src/components/pages/DashboardPage.tsx)
- Displays below the welcome section
- Automatically filters for content with banners and "Active" status

## Usage Guide

### For Admins: Adding Banner Photos

#### Meditation Content
1. Navigate to `/admin/content/meditation`
2. Click "Add Meditation" or edit existing meditation
3. Scroll to "Banner Image" field
4. Click to select your banner image file (PNG, JPEG, WEBP, GIF supported)
5. File automatically uploads when you save
6. Maximum file size: 50MB

#### Sound Healing Content
1. Navigate to `/admin/content/sound`
2. Click "Add Sound" or edit existing sound
3. Scroll to "Banner Image" field
4. Select your banner image file
5. File uploads when you save

### For Users: Viewing Banners

1. Visit `/dashboard` (Your Wellness Dashboard)
2. Scroll down to see the "Banner Showcase" section
3. Navigate through banners using:
   - **Arrow buttons** (left/right)
   - **Indicator dots** (click to jump)
4. Each banner displays:
   - **Type badge** (Meditation 🧘 or Sound Healing 🎵)
   - **Content title**
   - **Description**

## File Structure

```
frontend/src
├── components/
│   ├── dashboard/
│   │   └── BannerShowcase.tsx (NEW)
│   └── pages/
│       └── DashboardPage.tsx (UPDATED)
├── admin/pages/content/
│   ├── MeditationContent.tsx (UPDATED)
│   └── SoundHealingContent.tsx (UPDATED)
└── lib/
    └── contentApi.ts (UPDATED)

backend/
└── server.js (UPDATED)
```

## Database Changes

### Migration Notes
When you first run the backend after this update:
1. The database will be **automatically recreated** with the new schema
2. All existing meditation and sound entries will have empty `banner_url` fields
3. You can then upload banners through the admin panel

## API Response Examples

### Create Meditation with Banner
```json
POST /api/meditations
{
  "title": "Morning Mindfulness",
  "duration": 15,
  "level": "Beginner",
  "category": "Mindfulness",
  "description": "Start your day with clarity",
  "status": "Active",
  "thumbnailUrl": "http://localhost:4000/uploads/...",
  "bannerUrl": "http://localhost:4000/uploads/...",
  "audioUrl": "http://localhost:4000/uploads/..."
}

Response:
{
  "id": "uuid",
  "title": "Morning Mindfulness",
  "duration": 15,
  "bannerUrl": "http://localhost:4000/uploads/banner-filename.jpg",
  ...
}
```

## Supported File Types

**Banner Images**:
- JPEG (.jpg, .jpeg)
- PNG (.png)
- WebP (.webp)
- GIF (.gif)

**File Size Limit**: 50MB per file

## Troubleshooting

### Banner Not Uploading
- Check that the file is a valid image format
- Ensure file size is under 50MB
- Verify backend is running on port 4000
- Check browser console for error messages

### Banner Not Displaying in Dashboard
- Confirm the meditation/sound has status "Active"
- Verify `bannerUrl` is populated in the database
- Check that the backend `/uploads` endpoint is accessible
- Ensure static file serving is enabled in backend

### Getting File Upload Errors
- Clear browser cache (Ctrl+Shift+Delete)
- Restart backend server
- Check that `/uploads` directory exists in backend folder

## Next Steps / Enhancements

Consider implementing these features in future updates:

1. **Drag-and-Drop Upload**
   - Allow users to drag images directly onto the upload area

2. **Image Preview**
   - Show a preview of the selected image before upload

3. **Upload Progress**
   - Display percentage progress for large files

4. **Image Cropping**
   - Allow cropping/resizing before upload

5. **Bulk Banner Updates**
   - Upload banners for multiple items at once

6. **Banner Analytics**
   - Track which banners get the most views

7. **Image Optimization**
   - Automatic compression for faster loading

8. **CDN Integration**
   - Move uploaded files to cloud storage (S3, Azure Blob)

## Testing Checklist

- [ ] Can create meditation with banner
- [ ] Can create sound healing with banner
- [ ] Can update meditation banner
- [ ] Can update sound healing banner
- [ ] Carousel displays banners correctly
- [ ] Navigation controls work properly
- [ ] Banners display on dashboard
- [ ] File upload shows loading state
- [ ] Current file indicator shows correctly
- [ ] New file indicator shows correctly

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review console errors in browser DevTools
3. Verify backend logs for upload errors
4. Check database has `banner_url` column

---

**Last Updated**: February 2026
**Version**: 1.0
