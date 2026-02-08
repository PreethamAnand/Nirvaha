const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const Database = require("better-sqlite3");
const { v4: uuidv4 } = require("uuid");

const PORT = process.env.PORT || 4000;
const DATA_DIR = path.join(__dirname, "data");
const UPLOADS_DIR = path.join(__dirname, "uploads");
const DB_PATH = process.env.DB_PATH || path.join(DATA_DIR, "nirvaha.db");

// Create necessary directories
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOADS_DIR);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + uuidv4();
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
  fileFilter: function (req, file, cb) {
    // Accept audio and image files
    const allowedMimes = [
      "audio/mpeg",
      "audio/mp3",
      "audio/wav",
      "audio/ogg",
      "audio/webm",
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/gif",
    ];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error("Invalid file type. Only audio and image files are allowed."),
      );
    }
  },
});

const db = new Database(DB_PATH);

function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS meditations (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      duration_minutes INTEGER NOT NULL,
      level TEXT,
      category TEXT,
      description TEXT,
      status TEXT,
      thumbnail_url TEXT,
      audio_url TEXT,
      banner_url TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS sounds (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      artist TEXT,
      frequency TEXT,
      duration_minutes INTEGER NOT NULL,
      category TEXT,
      description TEXT,
      status TEXT,
      thumbnail_url TEXT,
      audio_url TEXT,
      banner_url TEXT,
      mood_tags TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);
}

function seedDb() {
  const meditationCount = db
    .prepare("SELECT COUNT(*) as count FROM meditations")
    .get().count;
  if (meditationCount === 0) {
    const now = new Date().toISOString();
    const insertMeditation = db.prepare(`
      INSERT INTO meditations (
        id, title, duration_minutes, level, category, description, status, thumbnail_url, audio_url, banner_url, created_at, updated_at
      ) VALUES (
        @id, @title, @durationMinutes, @level, @category, @description, @status, @thumbnailUrl, @audioUrl, @bannerUrl, @createdAt, @updatedAt
      )
    `);

    const samples = [
      {
        id: uuidv4(),
        title: "Morning Mindfulness",
        durationMinutes: 15,
        level: "Beginner",
        category: "Mindfulness",
        description: "Start your day with clarity and peace.",
        status: "Active",
        thumbnailUrl: "",
        audioUrl: "",
        bannerUrl: "",
      },
      {
        id: uuidv4(),
        title: "Deep Sleep Meditation",
        durationMinutes: 30,
        level: "Intermediate",
        category: "Sleep",
        description: "Relax and prepare for restful sleep.",
        status: "Active",
        thumbnailUrl: "",
        audioUrl: "",
        bannerUrl: "",
      },
      {
        id: uuidv4(),
        title: "Stress Relief Session",
        durationMinutes: 20,
        level: "Beginner",
        category: "Stress",
        description: "Release tension and find inner calm.",
        status: "Draft",
        thumbnailUrl: "",
        audioUrl: "",
        bannerUrl: "",
      },
    ];

    const insertMany = db.transaction((items) => {
      items.forEach((item) => {
        insertMeditation.run({
          ...item,
          createdAt: now,
          updatedAt: now,
        });
      });
    });

    insertMany(samples);
  }

  const soundCount = db
    .prepare("SELECT COUNT(*) as count FROM sounds")
    .get().count;
  if (soundCount === 0) {
    const now = new Date().toISOString();
    const insertSound = db.prepare(`
      INSERT INTO sounds (
        id, title, artist, frequency, duration_minutes, category, description, status, thumbnail_url, audio_url, banner_url, mood_tags, created_at, updated_at
      ) VALUES (
        @id, @title, @artist, @frequency, @durationMinutes, @category, @description, @status, @thumbnailUrl, @audioUrl, @bannerUrl, @moodTags, @createdAt, @updatedAt
      )
    `);

    const samples = [
      {
        id: uuidv4(),
        title: "Tibetan Singing Bowls",
        artist: "Sacred Sounds Collective",
        frequency: "432 Hz",
        durationMinutes: 15,
        category: "Bowl Therapy",
        description: "Ancient healing vibrations from the Himalayas.",
        status: "Active",
        thumbnailUrl: "",
        audioUrl: "",
        bannerUrl: "",
        moodTags: JSON.stringify(["Calm", "Healing", "Relaxation"]),
      },
      {
        id: uuidv4(),
        title: "Ocean Waves & Rain",
        artist: "Nature Symphony",
        frequency: "528 Hz",
        durationMinutes: 20,
        category: "Nature Sounds",
        description: "Soothing symphony of ocean waves and gentle rainfall.",
        status: "Active",
        thumbnailUrl: "",
        audioUrl: "",
        bannerUrl: "",
        moodTags: JSON.stringify(["Peaceful", "Natural", "Meditative"]),
      },
      {
        id: uuidv4(),
        title: "Theta Binaural Beats",
        artist: "NeuroSound Lab",
        frequency: "639 Hz",
        durationMinutes: 30,
        category: "Binaural",
        description: "Frequencies for deep meditation and clarity.",
        status: "Active",
        thumbnailUrl: "",
        audioUrl: "",
        bannerUrl: "",
        moodTags: JSON.stringify(["Focus", "Calm"]),
      },
    ];

    const insertMany = db.transaction((items) => {
      items.forEach((item) => {
        insertSound.run({
          ...item,
          createdAt: now,
          updatedAt: now,
        });
      });
    });

    insertMany(samples);
  }
}

function mapMeditation(row) {
  return {
    id: row.id,
    title: row.title,
    duration: row.duration_minutes,
    level: row.level || "",
    category: row.category || "",
    description: row.description || "",
    status: row.status || "Draft",
    thumbnailUrl: row.thumbnail_url || "",
    bannerUrl: row.banner_url || "",
    audioUrl: row.audio_url || "",
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapSound(row) {
  let mood = [];
  if (row.mood_tags) {
    try {
      mood = JSON.parse(row.mood_tags);
    } catch (error) {
      mood = [];
    }
  }

  return {
    id: row.id,
    title: row.title,
    artist: row.artist || "",
    frequency: row.frequency || "",
    duration: row.duration_minutes,
    category: row.category || "",
    description: row.description || "",
    status: row.status || "Draft",
    thumbnailUrl: row.thumbnail_url || "",
    bannerUrl: row.banner_url || "",
    audioUrl: row.audio_url || "",
    mood,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

initDb();
seedDb();

const app = express();
app.use(cors());
app.use(express.json({ limit: "2mb" }));

// Serve uploaded files statically
app.use("/uploads", express.static(UPLOADS_DIR));

// File upload endpoint
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Return the URL to access the uploaded file
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({
      success: true,
      url: fileUrl,
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res
      .status(500)
      .json({ error: "File upload failed", message: error.message });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.get("/api/meditations", (req, res) => {
  const rows = db
    .prepare("SELECT * FROM meditations ORDER BY created_at DESC")
    .all();
  res.json(rows.map(mapMeditation));
});

app.post("/api/meditations", (req, res) => {
  const {
    title,
    duration,
    level,
    category,
    description,
    status,
    thumbnailUrl,
    audioUrl,
    bannerUrl,
  } = req.body || {};
  if (!title || typeof duration !== "number") {
    return res.status(400).json({ error: "title and duration are required" });
  }

  const now = new Date().toISOString();
  const newMeditation = {
    id: uuidv4(),
    title,
    durationMinutes: duration,
    level: level || "",
    category: category || "",
    description: description || "",
    status: status || "Draft",
    thumbnailUrl: thumbnailUrl || "",
    audioUrl: audioUrl || "",
    bannerUrl: bannerUrl || "",
    createdAt: now,
    updatedAt: now,
  };

  db.prepare(
    `
    INSERT INTO meditations (
      id, title, duration_minutes, level, category, description, status, thumbnail_url, audio_url, banner_url, created_at, updated_at
    ) VALUES (
      @id, @title, @durationMinutes, @level, @category, @description, @status, @thumbnailUrl, @audioUrl, @bannerUrl, @createdAt, @updatedAt
    )
  `,
  ).run(newMeditation);

  res.status(201).json(newMeditation);
});

app.put("/api/meditations/:id", (req, res) => {
  const { id } = req.params;
  const existing = db.prepare("SELECT * FROM meditations WHERE id = ?").get(id);
  if (!existing) {
    return res.status(404).json({ error: "meditation not found" });
  }

  const {
    title,
    duration,
    level,
    category,
    description,
    status,
    thumbnailUrl,
    audioUrl,
    bannerUrl,
  } = req.body || {};
  const updated = {
    id,
    title: title ?? existing.title,
    durationMinutes:
      typeof duration === "number" ? duration : existing.duration_minutes,
    level: level ?? existing.level,
    category: category ?? existing.category,
    description: description ?? existing.description,
    status: status ?? existing.status,
    thumbnailUrl: thumbnailUrl ?? existing.thumbnail_url,
    audioUrl: audioUrl ?? existing.audio_url,
    bannerUrl: bannerUrl ?? existing.banner_url,
    createdAt: existing.created_at,
    updatedAt: new Date().toISOString(),
  };

  db.prepare(
    `
    UPDATE meditations
    SET title = @title,
        duration_minutes = @durationMinutes,
        level = @level,
        category = @category,
        description = @description,
        status = @status,
        thumbnail_url = @thumbnailUrl,
        audio_url = @audioUrl,
        banner_url = @bannerUrl,
        updated_at = @updatedAt
    WHERE id = @id
  `,
  ).run(updated);

  res.json(updated);
});

app.delete("/api/meditations/:id", (req, res) => {
  const { id } = req.params;
  const deleted = db.prepare("DELETE FROM meditations WHERE id = ?").run(id);
  if (deleted.changes === 0) {
    return res.status(404).json({ error: "meditation not found" });
  }
  res.json({ ok: true });
});

app.get("/api/sounds", (req, res) => {
  const rows = db
    .prepare("SELECT * FROM sounds ORDER BY created_at DESC")
    .all();
  res.json(rows.map(mapSound));
});

app.post("/api/sounds", (req, res) => {
  const {
    title,
    artist,
    frequency,
    duration,
    category,
    description,
    status,
    thumbnailUrl,
    audioUrl,
    bannerUrl,
    mood,
  } = req.body || {};

  if (!title || typeof duration !== "number") {
    return res.status(400).json({ error: "title and duration are required" });
  }

  const now = new Date().toISOString();
  const newSound = {
    id: uuidv4(),
    title,
    artist: artist || "",
    frequency: frequency || "",
    durationMinutes: duration,
    category: category || "",
    description: description || "",
    status: status || "Draft",
    thumbnailUrl: thumbnailUrl || "",
    audioUrl: audioUrl || "",
    bannerUrl: bannerUrl || "",
    moodTags: JSON.stringify(Array.isArray(mood) ? mood : []),
    createdAt: now,
    updatedAt: now,
  };

  db.prepare(
    `
    INSERT INTO sounds (
      id, title, artist, frequency, duration_minutes, category, description, status, thumbnail_url, audio_url, banner_url, mood_tags, created_at, updated_at
    ) VALUES (
      @id, @title, @artist, @frequency, @durationMinutes, @category, @description, @status, @thumbnailUrl, @audioUrl, @bannerUrl, @moodTags, @createdAt, @updatedAt
    )
  `,
  ).run(newSound);

  res.status(201).json({
    id: newSound.id,
    title: newSound.title,
    artist: newSound.artist,
    frequency: newSound.frequency,
    duration: newSound.durationMinutes,
    category: newSound.category,
    description: newSound.description,
    status: newSound.status,
    thumbnailUrl: newSound.thumbnailUrl,
    bannerUrl: newSound.bannerUrl,
    audioUrl: newSound.audioUrl,
    mood: JSON.parse(newSound.moodTags),
    createdAt: newSound.createdAt,
    updatedAt: newSound.updatedAt,
  });
});

app.put("/api/sounds/:id", (req, res) => {
  const { id } = req.params;
  const existing = db.prepare("SELECT * FROM sounds WHERE id = ?").get(id);
  if (!existing) {
    return res.status(404).json({ error: "sound not found" });
  }

  const {
    title,
    artist,
    frequency,
    duration,
    category,
    description,
    status,
    thumbnailUrl,
    audioUrl,
    bannerUrl,
    mood,
  } = req.body || {};

  const updated = {
    id,
    title: title ?? existing.title,
    artist: artist ?? existing.artist,
    frequency: frequency ?? existing.frequency,
    durationMinutes:
      typeof duration === "number" ? duration : existing.duration_minutes,
    category: category ?? existing.category,
    description: description ?? existing.description,
    status: status ?? existing.status,
    thumbnailUrl: thumbnailUrl ?? existing.thumbnail_url,
    audioUrl: audioUrl ?? existing.audio_url,
    bannerUrl: bannerUrl ?? existing.banner_url,
    moodTags: JSON.stringify(
      Array.isArray(mood) ? mood : JSON.parse(existing.mood_tags || "[]"),
    ),
    createdAt: existing.created_at,
    updatedAt: new Date().toISOString(),
  };

  db.prepare(
    `
    UPDATE sounds
    SET title = @title,
        artist = @artist,
        frequency = @frequency,
        duration_minutes = @durationMinutes,
        category = @category,
        description = @description,
        status = @status,
        thumbnail_url = @thumbnailUrl,
        audio_url = @audioUrl,
        banner_url = @bannerUrl,
        mood_tags = @moodTags,
        updated_at = @updatedAt
    WHERE id = @id
  `,
  ).run(updated);

  res.json({
    id: updated.id,
    title: updated.title,
    artist: updated.artist,
    frequency: updated.frequency,
    duration: updated.durationMinutes,
    category: updated.category,
    description: updated.description,
    status: updated.status,
    thumbnailUrl: updated.thumbnailUrl,
    bannerUrl: updated.bannerUrl,
    audioUrl: updated.audioUrl,
    mood: JSON.parse(updated.moodTags),
    createdAt: updated.createdAt,
    updatedAt: updated.updatedAt,
  });
});

app.delete("/api/sounds/:id", (req, res) => {
  const { id } = req.params;
  const deleted = db.prepare("DELETE FROM sounds WHERE id = ?").run(id);
  if (deleted.changes === 0) {
    return res.status(404).json({ error: "sound not found" });
  }
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Nirvaha backend running on port ${PORT}`);
});
