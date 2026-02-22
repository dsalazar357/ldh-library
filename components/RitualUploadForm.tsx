"use client";

import { useState, useRef, DragEvent, ChangeEvent } from "react";

const DEGREES = Array.from({ length: 33 }, (_, i) => i + 1);

const COUNTRIES = [
  "Argentina", "Australia", "Brazil", "Canada", "Chile", "Colombia",
  "France", "Germany", "India", "Italy", "Japan", "Mexico", "Netherlands",
  "Portugal", "South Africa", "Spain", "Sweden", "United Kingdom",
  "United States", "Uruguay",
].sort();

interface FormState {
  title: string;
  degree: string;
  country: string;
}

interface UploadResult {
  success: boolean;
  ritual?: { id: number; title: string };
  error?: string;
}

export default function RitualUploadForm() {
  const [form, setForm] = useState<FormState>({ title: "", degree: "", country: "" });
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<UploadResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const acceptFile = (f: File) => {
    const allowed = ["application/pdf", "video/mp4", "video/quicktime",
      "video/x-msvideo", "video/x-matroska", "video/webm"];
    if (!allowed.includes(f.type)) {
      setResult({ success: false, error: "Only PDF and video files are accepted." });
      return;
    }
    setFile(f);
    setResult(null);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) acceptFile(f);
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) acceptFile(f);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setResult({ success: false, error: "Please select a file to upload." });
      return;
    }

    setLoading(true);
    setProgress(0);
    setResult(null);

    const progressInterval = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 15, 90));
    }, 400);

    try {
      const fd = new FormData();
      fd.append("file", file);
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));

      const res = await fetch("/api/rituals", { method: "POST", body: fd });
      const data: UploadResult = await res.json();

      clearInterval(progressInterval);
      setProgress(100);
      setTimeout(() => {
        setResult(data);
        setLoading(false);
        if (data.success) {
          setFile(null);
          setForm({ title: "", degree: "", country: "" });
          setProgress(0);
        }
      }, 500);
    } catch {
      clearInterval(progressInterval);
      setResult({ success: false, error: "Network error. Please try again." });
      setLoading(false);
      setProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-xl border border-gray-200 shadow-sm p-8">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900">Upload Ritual</h1>
          <p className="text-sm text-gray-500 mt-1">Add a new ritual document or recording to the archive.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              placeholder="Ritual title"
              value={form.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Degree + Country */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="degree">
                Degree
              </label>
              <select
                id="degree"
                name="degree"
                required
                value={form.degree}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="">Select</option>
                {DEGREES.map((d) => (
                  <option key={d} value={d}>{d}°</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="country">
                Country
              </label>
              <select
                id="country"
                name="country"
                required
                value={form.country}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="">Select</option>
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* File drop zone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              File
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              className={`border-2 border-dashed rounded-lg px-4 py-8 text-center cursor-pointer transition-colors ${
                dragging
                  ? "border-blue-400 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
              }`}
            >
              <p className="text-sm text-gray-500">
                Drop a file here or{" "}
                <span className="text-blue-600 font-medium">browse</span>
              </p>
              <p className="text-xs text-gray-400 mt-1">PDF</p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={onFileChange}
              />
            </div>

            {/* Selected file pill */}
            {file && (
              <div className="mt-2 flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
                <span className="text-sm text-gray-700 flex-1 truncate">{file.name}</span>
                <span className="text-xs text-gray-400 shrink-0">
                  {(file.size / 1024 / 1024).toFixed(1)} MB
                </span>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="text-gray-400 hover:text-red-500 transition-colors text-xs shrink-0"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* Progress bar */}
          {loading && (
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div
                className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
        className="w-full mt-2 rounded-lg bg-primary px-4 py-3 text-primary-foreground font-semibold hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? `Uploading… ${Math.round(progress)}%` : "Upload Ritual"}
          </button>
        </form>

        {/* Result */}
        {result && (
          <div className={`mt-4 rounded-lg px-4 py-3 text-sm ${
            result.success
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}>
            {result.success
              ? `Ritual #${result.ritual?.id} "${result.ritual?.title}" uploaded successfully.`
              : result.error}
          </div>
        )}
      </div>
    </div>
  );
}