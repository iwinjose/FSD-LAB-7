import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Admin() {
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState('');
    const [fileContent, setFileContent] = useState('');
    const [filename, setFilename] = useState('');
    const [content, setContent] = useState('');
    const [message, setMessage] = useState('');

    const fetchFiles = () => {
        axios.get('http://localhost:5000/api/files/list')
            .then(res => setFiles(res.data.files))
            .catch(err => console.log(err));
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    const handleReadFile = (f) => {
        axios.get('http://localhost:5000/api/files/read', { params: { filename: f } })
            .then(res => {
                setSelectedFile(f);
                setFileContent(res.data.content);
            })
            .catch(err => console.log(err));
    };

    const handleCreate = () => {
        axios.post('http://localhost:5000/api/files/create', { filename, content })
            .then(res => { setMessage(res.data.message); })
            .catch(err => console.log(err));
        fetchFiles();
    };

    const handleAppend = () => {
        axios.post('http://localhost:5000/api/files/append', { filename: selectedFile, content })
            .then(res => { setMessage(res.data.message); })
            .catch(err => console.log(err));
        handleReadFile(selectedFile);
    };

    const handleModify = () => {
        axios.put('http://localhost:5000/api/files/modify', { filename: selectedFile, content })
            .then(res => { setMessage(res.data.message); })
            .catch(err => console.log(err));
        handleReadFile(selectedFile);
    };

    const handleDelete = () => {
        axios.delete('http://localhost:5000/api/files/delete', { data: { filename: selectedFile } })
            .then(res => { setMessage(res.data.message); fetchFiles(); })
            .catch(err => console.log(err));
        fetchFiles();
    };

    return (
        <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-10">
            <h1 className="text-3xl font-bold text-slate-800 mb-6">File Manager</h1>

            {message && (
                <div className="mb-4 p-3 rounded-xl bg-green-100 text-green-800 border border-green-200">
                    {message}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
                    <h2 className="text-xl font-semibold text-slate-700 mb-4">Files</h2>
                    <ul className="space-y-2">
                        {files.length === 0 && (
                            <li className="text-slate-400 italic">No files yet</li>
                        )}
                        {files.map(f => (
                            <li
                                key={f}
                                onClick={() => handleReadFile(f)}
                                className={`cursor-pointer px-4 py-2 rounded-lg transition-all duration-200 ${selectedFile === f
                                    ? 'bg-primary/10 text-primary font-medium border border-primary/30'
                                    : 'hover:bg-slate-50 text-slate-600'
                                    }`}
                            >
                                {f}
                            </li>
                        ))}
                    </ul>

                    {selectedFile && (
                        <div className="mt-6">
                            <h3 className="text-sm font-medium text-slate-500 mb-2">
                                Content of <span className="text-primary">{selectedFile}</span>
                            </h3>
                            <pre className="bg-slate-50 rounded-xl p-4 text-sm text-slate-700 border border-slate-200 overflow-auto max-h-60 whitespace-pre-wrap">
                                {fileContent}
                            </pre>
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100 space-y-4">
                    <h2 className="text-xl font-semibold text-slate-700 mb-2">Actions</h2>

                    <input
                        placeholder="Filename"
                        value={filename}
                        onChange={e => setFilename(e.target.value)}
                        className="input-field"
                    />
                    <textarea
                        placeholder="Content"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        className="input-field min-h-[120px] resize-y"
                    />

                    <div className="grid grid-cols-2 gap-3 pt-2">
                        <button onClick={handleCreate} className="btn-primary text-sm">
                            Create File
                        </button>
                        <button onClick={handleAppend} className="btn-primary text-sm">
                            Append to {selectedFile || '...'}
                        </button>
                        <button onClick={handleModify} className="btn-primary text-sm">
                            Modify {selectedFile || '...'}
                        </button>
                        <button
                            onClick={handleDelete}
                            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2.5 rounded-xl transition-all duration-300 text-sm hover:-translate-y-0.5 active:translate-y-0"
                        >
                            Delete {selectedFile || '...'}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Admin;
