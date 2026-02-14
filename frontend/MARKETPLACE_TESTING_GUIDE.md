# 🧪 Complete Testing Guide: Marketplace Requests

## ✅ Step 1: Open Browser Console
1. Press `F12` on your keyboard
2. Go to **Console** tab
3. **KEEP IT OPEN** throughout testing - you'll see detailed logs from both user and admin sides

## ✅ Step 2: Submit a Marketplace Request

1. Go to: **http://localhost:3000/dashboard/marketplace**
2. Click the **"Add"** button (green button with + icon)
3. Select **"Retreat"** from the options
4. Fill in the form with test data:
   - Event Title: "Test Retreat 001"
   - Description: "Testing the data sync"
   - Facilitator: "Test User"
   - Location: "Test Location"
   - Start Date: (pick any date)
   - End Date: (pick a later date)
   - Accommodation: "Test Accommodation"
   - Capacity: "20"
   - Is Paid: Yes
   - Price: "999"
5. Click **Submit** button

### What you should see in Console:
```
🚀 [USER] handleRequestSubmit called
📝 [USER] Type: retreat
📝 [USER] FormData keys: [title, description, facilitator, location, ...]
✅ [USER] Request created, ID: [some-uuid]
📤 [USER] Total requests to save: 1
💾 [USER] saveRequests called with 1 requests
📦 [USER] JSON string size: [xxx] bytes
📝 [USER] Key: nirvaha_marketplace_requests
✅ [USER] Successfully saved to localStorage
✔️ [USER] Verification - data in storage: [xxx] chars
📢 [USER] Dispatching marketplace-updated event
📡 [USER] BroadcastChannel message sent
```

⚠️ **If you see any ERROR instead, please report it!**

## ✅ Step 3: Check localStorage Directly

In the browser console, paste this and press Enter:
```javascript
localStorage.getItem('nirvaha_marketplace_requests')
```

You should see your request data as a JSON string. If it shows `null`, localStorage is NOT saving!

## ✅ Step 4: Navigate to Admin Panel

1. Go to: **http://localhost:3000/admin/marketplace**
2. **Keep Console Open**
3. You should see login screen first - login with:
   - Email: `admin1@gmail.com`
   - Password: `admin123`

### What you should see in Console when Admin panel loads:
```
📥 [ADMIN] Loading requests from localStorage...
📦 [ADMIN] Raw value size: [xxx] chars
✅ [ADMIN] Parsed: 1 items
📊 [ADMIN] Normalized: 1 requests
📋 [ADMIN] Data: [your request data in JSON]
```

## ✅ Step 5: Verify the UI

After logging in as admin, you should see:
- A table with your retreat request
- Title: "Test Retreat 001"
- Status: "pending" (in orange badge)
- Two buttons: "Accept" and "Delete"

## ✅ Step 6: Manual Refresh Button

If the request doesn't appear:
1. Click the **"Refresh"** button (with spinning icon) in top right
2. This manually triggers a data reload
3. Check console logs to see if data loads

## 🔴 Troubleshooting

### Problem: "No localStorage data found" in console
- **Cause**: The form submission is not being triggered
- **Fix**: Check if you actually clicked the Submit button in the form
- **Test**: Open DevTools before clicking Submit and watch for logs

### Problem: "Data in storage: [xxx] chars" but admin page shows nothing
- **Cause**: Admin panel is not reading the data correctly
- **Fix**: Click the "Refresh" button in admin panel
- **Test**: Check if console shows "Parsed: 1 items"

### Problem: No console logs at all
- **Cause**: DevTools might not be attached properly
- **Fix**: Press F12 again, make sure Console tab is active
- **Test**: Try typing `console.log("test")` in console - should print "test"

## 📸 What to Report Back

If requests don't show up, please tell me:

1. **Console logs during submission** - Copy the entire log output
2. **localStorage verification** - Show what you see when you run:
   ```javascript
   localStorage.getItem('nirvaha_marketplace_requests')
   ```
3. **Admin console when page loads** - Copy the logs
4. **Did clicking Refresh button help?** - Yes/No
5. **Any error messages?** - Red text in console

This will help me identify exactly where the issue is! 🔧
