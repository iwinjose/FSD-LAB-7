import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

const UPLOADS_DIR = path.join(__dirname, "uploads");

app.get('/api/files/list', (req, res) => {
    fs.readdir(UPLOADS_DIR, (err, files) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ files });
    });
});

app.get('/api/files/read', (req, res) => {
    const filePath = path.join(UPLOADS_DIR, req.query.filename);
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ content: data });
    });
});

app.post('/api/files/create', (req, res) => {
    const { filename, content } = req.body;
    const filePath = path.join(UPLOADS_DIR, filename);
    fs.writeFile(filePath, content, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'File created successfully' });
    });
});

app.post('/api/files/append', (req, res) => {
    const { filename, content } = req.body;
    const filePath = path.join(UPLOADS_DIR, filename);
    fs.appendFile(filePath, '\n' + content, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Content appended successfully' });
    });
});

app.put('/api/files/modify', (req, res) => {
    const { filename, content } = req.body;
    const filePath = path.join(UPLOADS_DIR, filename);
    fs.writeFile(filePath, content, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'File modified successfully' });
    });
});

app.delete('/api/files/delete', (req, res) => {
    const filePath = path.join(UPLOADS_DIR, req.body.filename);
    fs.unlink(filePath, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'File deleted successfully' });
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});