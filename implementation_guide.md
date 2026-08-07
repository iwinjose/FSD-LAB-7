# Node.js File System Admin — Step-by-Step Guide

## What You're Building

A **File Manager** in your Admin page that demonstrates 4 Node.js `fs` operations: **Create, Append, Delete, and Modify** — all wired through an Express API.

```
React Admin Page  →  axios  →  Express API  →  Node.js fs module  →  server/uploads/
```

---

## Step 1: Create the `uploads` folder

Create an empty folder at `server/uploads/`. This is where all managed files will live.

---

## Step 2: Create `server/index.js`

This is your Express server. Set it up with `cors` and `express` (already installed).

```js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// All files go into this folder
const UPLOADS_DIR = path.join(__dirname, 'uploads');
```

Now add these **6 routes** one by one:

---

### Route 1 — List all files (`GET /api/files/list`)

Use `fs.readdir()` to get all filenames in the uploads folder.

```js
app.get('/api/files/list', (req, res) => {
    fs.readdir(UPLOADS_DIR, (err, files) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ files });
    });
});
```

---

### Route 2 — Read a file (`GET /api/files/read`)

Take the filename from `req.query.filename`, build the full path with `path.join()`, then use `fs.readFile()`.

```js
app.get('/api/files/read', (req, res) => {
    const filePath = path.join(UPLOADS_DIR, req.query.filename);
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ content: data });
    });
});
```

---

### Route 3 — Create a file (`POST /api/files/create`)

Take `filename` and `content` from `req.body`, use `fs.writeFile()`.

```js
app.post('/api/files/create', (req, res) => {
    const { filename, content } = req.body;
    const filePath = path.join(UPLOADS_DIR, filename);
    fs.writeFile(filePath, content, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'File created successfully' });
    });
});
```

---

### Route 4 — Append to a file (`POST /api/files/append`)

Same as create, but use `fs.appendFile()` instead.

```js
app.post('/api/files/append', (req, res) => {
    const { filename, content } = req.body;
    const filePath = path.join(UPLOADS_DIR, filename);
    fs.appendFile(filePath, '\n' + content, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Content appended successfully' });
    });
});
```

---

### Route 5 — Modify (overwrite) a file (`PUT /api/files/modify`)

Same as create — `fs.writeFile()` overwrites by default.

```js
app.put('/api/files/modify', (req, res) => {
    const { filename, content } = req.body;
    const filePath = path.join(UPLOADS_DIR, filename);
    fs.writeFile(filePath, content, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'File modified successfully' });
    });
});
```

---

### Route 6 — Delete a file (`DELETE /api/files/delete`)

Use `fs.unlink()` to delete.

```js
app.delete('/api/files/delete', (req, res) => {
    const filePath = path.join(UPLOADS_DIR, req.body.filename);
    fs.unlink(filePath, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'File deleted successfully' });
    });
});
```

---

### Finally — Start the server

```js
app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
```

---

## Step 3: Rewrite `Admin.jsx`

Replace the entire bookings UI with a File Manager. Here's the approach:

### State variables you need

```js
const [files, setFiles] = useState([]);           // list of filenames
const [selectedFile, setSelectedFile] = useState(''); // currently selected file
const [fileContent, setFileContent] = useState('');   // content of selected file
const [filename, setFilename] = useState('');         // input: new filename
const [content, setContent] = useState('');           // input: content text
const [message, setMessage] = useState('');           // success/error feedback
```

### Helper function — refresh file list

```js
const fetchFiles = () => {
    axios.get('http://localhost:5000/api/files/list')
        .then(res => setFiles(res.data.files))
        .catch(err => console.log(err));
};
```

Call this in a `useEffect` on mount, and also after every create/append/modify/delete.

### 4 handler functions

Each one calls the corresponding API with `axios`, shows the response message, then calls `fetchFiles()` to refresh:

| Handler | axios call |
|---|---|
| `handleCreate` | `axios.post('/api/files/create', { filename, content })` |
| `handleAppend` | `axios.post('/api/files/append', { filename: selectedFile, content })` |
| `handleModify` | `axios.put('/api/files/modify', { filename: selectedFile, content })` |
| `handleDelete` | `axios.delete('/api/files/delete', { data: { filename: selectedFile } })` |

> [!IMPORTANT]
> For `axios.delete`, the body goes inside `{ data: { ... } }` — that's an axios quirk.

### Read file content

When the user clicks a file from the list:

```js
const handleReadFile = (name) => {
    setSelectedFile(name);
    axios.get(`http://localhost:5000/api/files/read?filename=${name}`)
        .then(res => setFileContent(res.data.content))
        .catch(err => console.log(err));
};
```

### UI Layout (JSX)

Structure your return like this:

```
<main>
  <h1>File Manager - Node.js fs Demo</h1>
  
  {message && <div className="...">{message}</div>}    ← feedback banner
  
  <div className="grid grid-cols-2">
    
    <!-- LEFT SIDE: File List -->
    <div>
      <h2>Files</h2>
      <ul>
        {files.map(f => <li onClick={() => handleReadFile(f)}>{f}</li>)}
      </ul>
      {selectedFile && <pre>{fileContent}</pre>}        ← show selected file content
    </div>
    
    <!-- RIGHT SIDE: Actions -->
    <div>
      <!-- Create Section -->
      <input placeholder="Filename" value={filename} onChange={...} />
      <textarea placeholder="Content" value={content} onChange={...} />
      <button onClick={handleCreate}>Create File</button>
      
      <!-- Append Section -->
      <button onClick={handleAppend}>Append to {selectedFile}</button>
      
      <!-- Modify Section -->
      <button onClick={handleModify}>Modify {selectedFile}</button>
      
      <!-- Delete Section -->
      <button onClick={handleDelete}>Delete {selectedFile}</button>
    </div>
  </div>
</main>
```

> [!TIP]
> The Append, Modify, and Delete buttons should be **disabled** when no file is selected (`!selectedFile`).

---

## Step 4: Run it

Open **two terminals**:

| Terminal | Command | Where |
|---|---|---|
| 1 | `node index.js` | `server/` folder |
| 2 | `npm run dev` | `client/` folder |

---

## Quick Reference — What maps to what

| Button in UI | axios method | Express route | `fs` function |
|---|---|---|---|
| Create File | `POST` | `/api/files/create` | `fs.writeFile()` |
| Append to File | `POST` | `/api/files/append` | `fs.appendFile()` |
| Modify File | `PUT` | `/api/files/modify` | `fs.writeFile()` |
| Delete File | `DELETE` | `/api/files/delete` | `fs.unlink()` |
| Click file name | `GET` | `/api/files/read` | `fs.readFile()` |
| Page load | `GET` | `/api/files/list` | `fs.readdir()` |

---

That's it. 6 routes on the backend, 4 buttons + a file list on the frontend. Go build it! 🚀
