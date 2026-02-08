# Nirvaha Backend API - Complete Documentation

## Server Information

- **Host**: localhost
- **Port**: 4000 (configurable via `PORT` env var)
- **Base URL**: `http://localhost:4000`
- **Protocol**: HTTP (REST)
- **Response Format**: JSON
- **CORS**: Enabled (accepts requests from any origin)

---

## Meditation Endpoints

### GET /api/meditations
Retrieve all meditations from the database.

**Request:**
```
GET http://localhost:4000/api/meditations
```

**Response (200 OK):**
```json
[
  {
    "id": "5a736e27-59ee-4523-aef1-d23611b42ef9",
    "title": "Morning Mindfulness",
    "duration": 15,
    "level": "Beginner",
    "category": "Mindfulness",
    "description": "Start your day with clarity and peace.",
    "status": "Active",
    "thumbnailUrl": "",
    "audioUrl": "",
    "createdAt": "2026-02-07T13:32:37.592Z",
    "updatedAt": "2026-02-07T13:32:37.592Z"
  }
]
```

**Parameters**: None

**Status Codes**:
- `200` - Success, returns array of meditations
- `500` - Server error

---

### POST /api/meditations
Create a new meditation record.

**Request:**
```
POST http://localhost:4000/api/meditations
Content-Type: application/json

{
  "title": "Evening Relaxation",
  "duration": 20,
  "level": "Beginner",
  "category": "Relaxation",
  "description": "Wind down at the end of your day",
  "status": "Active",
  "thumbnailUrl": "https://example.com/image.jpg",
  "audioUrl": "https://example.com/audio.mp3"
}
```

**Required Fields**:
- `title` (string) - Name of the meditation
- `duration` (number) - Length in minutes
- `status` (string) - "Active", "Draft", or "Archived"

**Optional Fields**:
- `level` (string) - "Beginner", "Intermediate", "Advanced"
- `category` (string) - Free text category
- `description` (string) - Full description
- `thumbnailUrl` (string) - URL to cover image
- `audioUrl` (string) - URL to audio file

**Response (200 OK):**
```json
{
  "id": "new-uuid-generated",
  "title": "Evening Relaxation",
  "duration": 20,
  "level": "Beginner",
  "category": "Relaxation",
  "description": "Wind down at the end of your day",
  "status": "Active",
  "thumbnailUrl": "https://example.com/image.jpg",
  "audioUrl": "https://example.com/audio.mp3",
  "createdAt": "2026-02-07T14:00:00.000Z",
  "updatedAt": "2026-02-07T14:00:00.000Z"
}
```

**Status Codes**:
- `200` - Success, returns created record with ID
- `400` - Bad request (missing required fields)
- `500` - Server error

---

### PUT /api/meditations/:id
Update an existing meditation record.

**Request:**
```
PUT http://localhost:4000/api/meditations/5a736e27-59ee-4523-aef1-d23611b42ef9
Content-Type: application/json

{
  "title": "Updated Title",
  "duration": 25,
  "level": "Intermediate"
}
```

**Parameters**:
- `id` (path parameter) - UUID of the meditation to update

**Body**: Any fields to update (optional to include all fields)

**Response (200 OK):**
```json
{
  "id": "5a736e27-59ee-4523-aef1-d23611b42ef9",
  "title": "Updated Title",
  "duration": 25,
  "level": "Intermediate",
  ...
  "updatedAt": "2026-02-07T14:05:00.000Z"
}
```

**Status Codes**:
- `200` - Success, returns updated record
- `400` - Bad request
- `404` - Meditation not found
- `500` - Server error

---

### DELETE /api/meditations/:id
Delete a meditation record.

**Request:**
```
DELETE http://localhost:4000/api/meditations/5a736e27-59ee-4523-aef1-d23611b42ef9
```

**Parameters**:
- `id` (path parameter) - UUID of the meditation to delete

**Response (200 OK):**
```json
{
  "ok": true
}
```

**Status Codes**:
- `200` - Success, record deleted
- `404` - Meditation not found
- `500` - Server error

---

## Sound Healing Endpoints

### GET /api/sounds
Retrieve all sound healing records.

**Request:**
```
GET http://localhost:4000/api/sounds
```

**Response (200 OK):**
```json
[
  {
    "id": "16d78d72-5451-4e3a-bb5f-c16a7b7b7bce",
    "title": "Tibetan Singing Bowls",
    "artist": "Sacred Sounds Collective",
    "frequency": "432 Hz",
    "duration": 15,
    "category": "Bowl Therapy",
    "description": "Ancient healing vibrations from the Himalayas.",
    "status": "Active",
    "thumbnailUrl": "",
    "audioUrl": "",
    "mood": ["Calm", "Healing", "Relaxation"],
    "createdAt": "2026-02-07T13:32:37.602Z",
    "updatedAt": "2026-02-07T13:32:37.602Z"
  }
]
```

**Parameters**: None

**Status Codes**:
- `200` - Success, returns array of sounds
- `500` - Server error

---

### POST /api/sounds
Create a new sound healing record.

**Request:**
```
POST http://localhost:4000/api/sounds
Content-Type: application/json

{
  "title": "Crystal Frequencies",
  "artist": "Healing Resonance",
  "frequency": "741 Hz",
  "duration": 25,
  "category": "Crystal Therapy",
  "description": "Powerful crystal healing frequencies",
  "status": "Active",
  "thumbnailUrl": "https://example.com/crystal.jpg",
  "audioUrl": "https://example.com/crystal-sound.mp3",
  "mood": ["Focus", "Clarity", "Energy"]
}
```

**Required Fields**:
- `title` (string) - Name of the sound
- `duration` (number) - Length in minutes
- `status` (string) - "Active", "Draft", or "Archived"

**Optional Fields**:
- `artist` (string) - Artist or creator name
- `frequency` (string) - Frequency notation (e.g., "432 Hz", "528 Hz")
- `category` (string) - Free text category
- `description` (string) - Full description
- `thumbnailUrl` (string) - URL to cover image
- `audioUrl` (string) - URL to audio file
- `mood` (array of strings) - Mood tags/vibes

**Response (200 OK):**
```json
{
  "id": "new-uuid-generated",
  "title": "Crystal Frequencies",
  "artist": "Healing Resonance",
  "frequency": "741 Hz",
  "duration": 25,
  "category": "Crystal Therapy",
  "description": "Powerful crystal healing frequencies",
  "status": "Active",
  "thumbnailUrl": "https://example.com/crystal.jpg",
  "audioUrl": "https://example.com/crystal-sound.mp3",
  "mood": ["Focus", "Clarity", "Energy"],
  "createdAt": "2026-02-07T14:00:00.000Z",
  "updatedAt": "2026-02-07T14:00:00.000Z"
}
```

**Status Codes**:
- `200` - Success, returns created record with ID
- `400` - Bad request
- `500` - Server error

---

### PUT /api/sounds/:id
Update an existing sound record.

**Request:**
```
PUT http://localhost:4000/api/sounds/16d78d72-5451-4e3a-bb5f-c16a7b7b7bce
Content-Type: application/json

{
  "title": "Updated Sound Title",
  "mood": ["Calm", "Peace", "Meditative"]
}
```

**Parameters**:
- `id` (path parameter) - UUID of the sound to update

**Body**: Any fields to update

**Response (200 OK):**
```json
{
  "id": "16d78d72-5451-4e3a-bb5f-c16a7b7b7bce",
  "title": "Updated Sound Title",
  "mood": ["Calm", "Peace", "Meditative"],
  ...
  "updatedAt": "2026-02-07T14:05:00.000Z"
}
```

**Status Codes**:
- `200` - Success, returns updated record
- `400` - Bad request
- `404` - Sound not found
- `500` - Server error

---

### DELETE /api/sounds/:id
Delete a sound healing record.

**Request:**
```
DELETE http://localhost:4000/api/sounds/16d78d72-5451-4e3a-bb5f-c16a7b7b7bce
```

**Parameters**:
- `id` (path parameter) - UUID of the sound to delete

**Response (200 OK):**
```json
{
  "ok": true
}
```

**Status Codes**:
- `200` - Success, record deleted
- `404` - Sound not found
- `500` - Server error

---

## Health Check Endpoint

### GET /api/health
Check if the server is running and responsive.

**Request:**
```
GET http://localhost:4000/api/health
```

**Response (200 OK):**
```json
{
  "ok": true
}
```

**Status Codes**:
- `200` - Server is healthy and running

---

## Data Type Definitions

### MeditationItem
```typescript
interface MeditationItem {
  id: string;                    // UUID v4
  title: string;                 // Required
  duration: number;              // Minutes, required
  level?: string;                // "Beginner" | "Intermediate" | "Advanced"
  category?: string;             // Free text category
  description?: string;          // Full description text
  status: string;                // "Active" | "Draft" | "Archived", required
  thumbnailUrl?: string;         // URL to cover image
  audioUrl?: string;             // URL to audio file
  createdAt: string;             // ISO 8601 timestamp
  updatedAt: string;             // ISO 8601 timestamp
}
```

### SoundItem
```typescript
interface SoundItem {
  id: string;                    // UUID v4
  title: string;                 // Required
  artist?: string;               // Artist/creator name
  frequency?: string;            // e.g., "432 Hz", "528 Hz"
  duration: number;              // Minutes, required
  category?: string;             // Free text category
  description?: string;          // Full description text
  status: string;                // "Active" | "Draft" | "Archived", required
  thumbnailUrl?: string;         // URL to cover image
  audioUrl?: string;             // URL to audio file
  mood?: string[];               // Array of mood tags
  createdAt: string;             // ISO 8601 timestamp
  updatedAt: string;             // ISO 8601 timestamp
}
```

---

## Error Responses

All errors return JSON with this format:

```json
{
  "error": "Error description",
  "message": "More details about what went wrong"
}
```

**Common Error Scenarios**:

### 400 Bad Request
```json
{
  "error": "Bad Request",
  "message": "Missing required field: title"
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "Meditation with id xyz not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "Database operation failed"
}
```

---

## Request/Response Examples

### Complete Meditation Creation Flow

**1. Create Meditation**
```bash
curl -X POST http://localhost:4000/api/meditations \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Full Body Scan",
    "duration": 30,
    "level": "Advanced",
    "category": "Body Awareness",
    "description": "Deep relaxation through body awareness",
    "status": "Active",
    "thumbnailUrl": "https://example.com/fullbody.jpg",
    "audioUrl": "https://example.com/fullbody.mp3"
  }'
```

**Response**:
```json
{
  "id": "abc123...def",
  "title": "Full Body Scan",
  "duration": 30,
  "level": "Advanced",
  "category": "Body Awareness",
  "description": "Deep relaxation through body awareness",
  "status": "Active",
  "thumbnailUrl": "https://example.com/fullbody.jpg",
  "audioUrl": "https://example.com/fullbody.mp3",
  "createdAt": "2026-02-07T14:10:00.000Z",
  "updatedAt": "2026-02-07T14:10:00.000Z"
}
```

**2. Update Meditation**
```bash
curl -X PUT http://localhost:4000/api/meditations/abc123...def \
  -H "Content-Type: application/json" \
  -d '{
    "duration": 35,
    "level": "Intermediate"
  }'
```

**3. Get All Meditations**
```bash
curl http://localhost:4000/api/meditations
```

**4. Delete Meditation**
```bash
curl -X DELETE http://localhost:4000/api/meditations/abc123...def
```

**Response**: `{ "ok": true }`

---

## Database Storage

All records are persisted in SQLite file: `backend/data/nirvaha.db`

**Schemas**:

### meditations table
- Primary Key: `id` (TEXT, VARCHAR(36))
- Index: Automatically created on `id`
- Constraints: `title` and `duration_minutes` NOT NULL

### sounds table
- Primary Key: `id` (TEXT, VARCHAR(36))
- Index: Automatically created on `id`
- Constraints: `title` and `duration_minutes` NOT NULL
- Special: `mood_tags` stored as JSON string (parsed in responses)

---

## Frontend Integration

The `contentApi.ts` library provides TypeScript-safe wrappers:

```typescript
import {
  getMeditations,
  createMeditation,
  updateMeditation,
  deleteMeditation,
  getSounds,
  createSound,
  updateSound,
  deleteSound,
  MeditationItem,
  SoundItem
} from '@/lib/contentApi';

// Usage examples
const meditations = await getMeditations();
const newMed = await createMeditation({ title: "...", duration: 20, status: "Active" });
await updateMeditation(id, { title: "Updated" });
await deleteMeditation(id);
```

---

## Configuration

### Environment Variables

**Backend** (optional, set in terminal or `.env` file):
```
PORT=4000                          # Default API port
DB_PATH=./data/nirvaha.db          # Database file location
NODE_ENV=development               # Node environment
```

**Frontend** (set in `.env.local`):
```
VITE_API_BASE_URL=http://localhost:4000  # Backend API URL
```

---

## CORS Configuration

The backend has CORS enabled, allowing requests from:
- Any origin (`*`)
- All HTTP methods (GET, POST, PUT, DELETE, OPTIONS, etc.)
- Common headers (Content-Type, Accept, etc.)

---

**API Documentation Generated**: February 7, 2026  
**API Version**: 1.0  
**Status**: Production Ready (MVP)
