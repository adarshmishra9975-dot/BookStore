import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  FolderTree,
  Terminal,
  Database,
  Layers,
  Server,
  Monitor,
  CheckCircle2,
  Copy,
  ShieldCheck,
  Search,
  ShoppingCart,
  ArrowRight,
  Sparkles,
  Star,
  FileCode,
  Check,
  Send,
  RefreshCw,
  Plus,
  Trash2,
  X,
  Code2,
  Play,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  Filter,
  Eye
} from 'lucide-react';

import { Book, BackendFileCode, ApiEndpoint } from './types';
import { initialBooks, backendFiles, apiEndpointsList } from './data';

export default function App() {
  // Main Top-level View
  const [activeTab, setActiveTab] = useState<'phase2' | 'tester' | 'compass' | 'storefront'>('phase2');

  // Backend File Explorer State
  const [selectedFileIndex, setSelectedFileIndex] = useState<number>(0);
  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  // Books State (In-memory database emulation reflecting MongoDB CRUD)
  const [booksList, setBooksList] = useState<Book[]>(initialBooks);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cartCount, setCartCount] = useState<number>(2);

  // Live REST API Tester State
  const [testMethod, setTestMethod] = useState<'GET' | 'POST' | 'PUT' | 'DELETE'>('GET');
  const [testUrl, setTestUrl] = useState<string>('/api/books');
  const [testQueryParam, setTestQueryParam] = useState<string>('');
  const [testRequestBody, setTestRequestBody] = useState<string>(
    JSON.stringify(
      {
        title: 'Modern Software Engineering',
        author: 'Dave Farley',
        description: 'Disciplined approach to software craftsmanship and delivery.',
        category: 'Programming',
        price: 599,
        originalPrice: 850,
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400',
        stock: 20
      },
      null,
      2
    )
  );
  const [testResponseStatus, setTestResponseStatus] = useState<number>(200);
  const [testResponseBody, setTestResponseBody] = useState<string>('');
  const [isExecutingRequest, setIsExecutingRequest] = useState<boolean>(false);

  // Modal State for Viewing Book Details
  const [inspectedBook, setInspectedBook] = useState<Book | null>(null);

  // Filtered Books for Storefront & API
  const filteredBooks = useMemo(() => {
    return booksList.filter(book => {
      const matchCat = selectedCategory === 'All' || book.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchSearch =
        !searchQuery ||
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [booksList, selectedCategory, searchQuery]);

  // Copy helper
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFile(id);
    setTimeout(() => setCopiedFile(null), 2000);
  };

  // Simulate API Execution against in-memory MongoDB emulator
  const handleExecuteApiTest = () => {
    setIsExecutingRequest(true);
    setTimeout(() => {
      let status = 200;
      let output: any = {};

      if (testMethod === 'GET') {
        if (testUrl.includes('/api/books/') && testUrl !== '/api/books') {
          const id = testUrl.replace('/api/books/', '').trim();
          const found = booksList.find(b => b._id === id);
          if (found) {
            output = { success: true, data: found };
          } else {
            status = 404;
            output = { success: false, message: `Book not found with ID: ${id}` };
          }
        } else {
          // Search or category filtering
          let result = [...booksList];
          if (testQueryParam.includes('category=')) {
            const cat = testQueryParam.split('category=')[1].split('&')[0];
            if (cat && cat !== 'All') {
              result = result.filter(b => b.category.toLowerCase() === cat.toLowerCase());
            }
          }
          if (testQueryParam.includes('search=')) {
            const q = testQueryParam.split('search=')[1].split('&')[0].toLowerCase();
            result = result.filter(
              b =>
                b.title.toLowerCase().includes(q) ||
                b.author.toLowerCase().includes(q) ||
                b.category.toLowerCase().includes(q)
            );
          }
          output = {
            success: true,
            count: result.length,
            data: result
          };
        }
      } else if (testMethod === 'POST') {
        try {
          const parsed = JSON.parse(testRequestBody);
          if (!parsed.title || !parsed.author || !parsed.price) {
            status = 400;
            output = { success: false, message: 'Title, author, and price are required fields' };
          } else {
            const newBook: Book = {
              _id: `65e8a101b7a${Date.now().toString().slice(-13)}`,
              title: parsed.title,
              author: parsed.author,
              description: parsed.description || 'No description provided.',
              category: parsed.category || 'Programming',
              price: Number(parsed.price),
              originalPrice: Number(parsed.originalPrice || parsed.price),
              discount: parsed.originalPrice && parsed.originalPrice > parsed.price
                ? `${Math.round(((parsed.originalPrice - parsed.price) / parsed.originalPrice) * 100)}% OFF`
                : '0% OFF',
              image: parsed.image || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
              rating: 5.0,
              stock: Number(parsed.stock || 10),
              createdAt: new Date().toISOString()
            };
            setBooksList(prev => [newBook, ...prev]);
            status = 201;
            output = { success: true, message: 'Book added to catalog successfully', data: newBook };
          }
        } catch (e: any) {
          status = 400;
          output = { success: false, message: 'Invalid JSON payload in Request Body', error: e.message };
        }
      } else if (testMethod === 'DELETE') {
        const id = testUrl.replace('/api/books/', '').trim();
        const exists = booksList.find(b => b._id === id);
        if (exists) {
          setBooksList(prev => prev.filter(b => b._id !== id));
          output = { success: true, message: 'Book deleted successfully from MongoDB' };
        } else {
          status = 404;
          output = { success: false, message: 'Book not found with specified _id' };
        }
      } else if (testMethod === 'PUT') {
        try {
          const id = testUrl.replace('/api/books/', '').trim();
          const index = booksList.findIndex(b => b._id === id);
          if (index === -1) {
            status = 404;
            output = { success: false, message: 'Book not found with specified _id' };
          } else {
            const updates = JSON.parse(testRequestBody);
            const updated = { ...booksList[index], ...updates };
            setBooksList(prev => prev.map(b => b._id === id ? updated : b));
            output = { success: true, message: 'Book updated successfully', data: updated };
          }
        } catch (e: any) {
          status = 400;
          output = { success: false, message: 'Invalid JSON payload in Request Body' };
        }
      }

      setTestResponseStatus(status);
      setTestResponseBody(JSON.stringify(output, null, 2));
      setIsExecutingRequest(false);
    }, 250);
  };

  const categories = [
    'All',
    'Programming',
    'Finance',
    'Self Help',
    'Fiction',
    'Technology',
    'Biography',
    'Business',
    'History',
    'Science',
    'Education'
  ];

  return (
    <div id="bookstore-app-root" className="min-h-screen bg-white flex flex-col font-sans text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* Top Header Navigation */}
      <nav id="main-nav" className="h-16 border-b border-slate-100 px-4 sm:px-8 flex items-center justify-between shrink-0 bg-white sticky top-0 z-30">
        <div className="flex items-center gap-8">
          <div
            onClick={() => setActiveTab('phase2')}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-xs">
              B
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">BookStore</span>
          </div>

          <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-500">
            <button
              onClick={() => setActiveTab('phase2')}
              className={`h-16 flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'phase2'
                  ? 'text-blue-600 border-b-2 border-blue-600 font-semibold'
                  : 'hover:text-slate-900'
              }`}
            >
              <Server className="w-4 h-4 text-blue-600" />
              Phase 2: Backend & Book API
            </button>
            <button
              onClick={() => {
                setActiveTab('tester');
                if (!testResponseBody) handleExecuteApiTest();
              }}
              className={`h-16 flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'tester'
                  ? 'text-blue-600 border-b-2 border-blue-600 font-semibold'
                  : 'hover:text-slate-900'
              }`}
            >
              <Play className="w-4 h-4 text-emerald-600" />
              Live API Endpoint Tester
            </button>
            <button
              onClick={() => setActiveTab('compass')}
              className={`h-16 flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'compass'
                  ? 'text-blue-600 border-b-2 border-blue-600 font-semibold'
                  : 'hover:text-slate-900'
              }`}
            >
              <Database className="w-4 h-4 text-emerald-600" />
              MongoDB Compass GUI
            </button>
            <button
              onClick={() => setActiveTab('storefront')}
              className={`h-16 flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'storefront'
                  ? 'text-blue-600 border-b-2 border-blue-600 font-semibold'
                  : 'hover:text-slate-900'
              }`}
            >
              <Monitor className="w-4 h-4 text-slate-600" />
              Live Storefront Preview
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            MongoDB: bookstore.books ({booksList.length})
          </div>

          <button
            onClick={() => {
              setActiveTab('tester');
              setTestMethod('GET');
              setTestUrl('/api/books');
              handleExecuteApiTest();
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Test API</span>
          </button>
        </div>
      </nav>

      {/* Mobile Sub-Navigation */}
      <div className="lg:hidden flex overflow-x-auto border-b border-slate-100 bg-slate-50 px-4 py-2 gap-2 text-xs font-medium">
        {[
          { id: 'phase2', label: 'Phase 2 Code' },
          { id: 'tester', label: 'Live API Tester' },
          { id: 'compass', label: 'MongoDB Compass' },
          { id: 'storefront', label: 'Storefront Preview' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white font-semibold'
                : 'text-slate-600 bg-white border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <main id="main-content" className="grow flex flex-col">
        {/* ======================================================== */}
        {/* VIEW 1: PHASE 2 BACKEND + MONGODB + BOOK API CODE HUB    */}
        {/* ======================================================== */}
        {activeTab === 'phase2' && (
          <div className="px-4 sm:px-8 lg:px-12 py-8 max-w-7xl mx-auto w-full space-y-8">
            {/* Phase 2 Header Hero */}
            <div className="bg-gradient-to-r from-slate-50 to-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider bg-blue-100/80 px-2.5 py-1 rounded-md mb-3">
                    BSc IT Practical Implementation • Phase 2
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Backend + Local MongoDB + Book REST API
                  </h1>
                  <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
                    Here are all 7 complete backend files for Node.js, Express.js, and Mongoose. Every file includes complete code, validation, CRUD endpoints, and 15 sample books for your local MongoDB database.
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col gap-2 min-w-[280px] shadow-2xs">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Database Status</div>
                  <div className="text-sm font-medium text-slate-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Database: <strong className="font-mono text-emerald-700">bookstore</strong></span>
                  </div>
                  <div className="text-xs text-slate-500 font-mono">
                    Collection: <strong className="text-slate-800">books</strong> ({booksList.length} documents)
                  </div>
                </div>
              </div>

              {/* 3 Steps to Run Windows Backend */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-200/60">
                <div className="bg-white p-4 rounded-xl border border-slate-200/70 shadow-2xs flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">1</div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Install Dependencies</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 font-mono">npm install</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200/70 shadow-2xs flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">2</div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Seed 15 Books to Compass</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 font-mono">npm run seed</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200/70 shadow-2xs flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-purple-600 text-white font-bold text-xs flex items-center justify-center shrink-0">3</div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Start Express Server</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 font-mono">npm run dev (Port 5000)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive File Inspector */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* File List Navigation Sidebar */}
              <div className="lg:col-span-4 space-y-2">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2 mb-2 flex items-center justify-between">
                  <span>Backend Files (7)</span>
                  <span className="text-[10px] text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded">backend/</span>
                </div>

                {backendFiles.map((file, idx) => {
                  const isSelected = selectedFileIndex === idx;
                  return (
                    <button
                      key={file.fileName}
                      onClick={() => setSelectedFileIndex(idx)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col ${
                        isSelected
                          ? 'bg-blue-50 border-blue-300 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-bold flex items-center gap-2 ${
                          isSelected ? 'text-blue-900' : 'text-slate-800'
                        }`}>
                          <FileCode className={`w-4 h-4 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                          {file.fileName}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                          {file.filePath.split('/')[1] || 'root'}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500 mt-1 line-clamp-1">
                        {file.filePath}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Code Viewer Panel */}
              <div className="lg:col-span-8 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
                {/* Code Window Header */}
                <div className="bg-slate-950 px-5 py-3.5 border-b border-slate-800 flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                      <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
                      <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
                    </div>
                    <span className="text-xs font-mono text-slate-300 font-medium">
                      {backendFiles[selectedFileIndex].filePath}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopy(backendFiles[selectedFileIndex].code, backendFiles[selectedFileIndex].fileName)}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    {copiedFile === backendFiles[selectedFileIndex].fileName ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy File Code</span>
                      </>
                    )}
                  </button>
                </div>

                {/* File Description Banner */}
                <div className="bg-slate-950/60 px-5 py-2.5 border-b border-slate-800/80 text-xs text-slate-400 flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <span className="font-semibold text-blue-400">Purpose: </span>
                    {backendFiles[selectedFileIndex].description}
                  </div>
                  <div className="flex gap-1.5">
                    {backendFiles[selectedFileIndex].tags.map(tag => (
                      <span key={tag} className="bg-slate-800 text-[10px] text-slate-300 px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Code Content */}
                <div className="p-5 overflow-x-auto text-xs font-mono text-slate-100 leading-relaxed max-h-[500px]">
                  <pre>{backendFiles[selectedFileIndex].code}</pre>
                </div>
              </div>
            </div>

            {/* REST Endpoints Reference Table */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Send className="w-5 h-5 text-blue-600" />
                    Book REST API Endpoints Reference
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Standard RESTful endpoints implemented in <code className="text-blue-600 font-mono">backend/routes/bookRoutes.js</code>
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('tester')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Open Live API Tester</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                      <th className="py-3 px-4 font-semibold">HTTP Method</th>
                      <th className="py-3 px-4 font-semibold">Endpoint URL</th>
                      <th className="py-3 px-4 font-semibold">Description</th>
                      <th className="py-3 px-4 font-semibold">Access</th>
                      <th className="py-3 px-4 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700 font-sans">
                    {apiEndpointsList.map((ep, i) => (
                      <tr key={i} className="hover:bg-slate-50/50">
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 font-mono text-xs font-bold rounded ${
                            ep.method === 'GET'
                              ? 'bg-emerald-100 text-emerald-800'
                              : ep.method === 'POST'
                              ? 'bg-blue-100 text-blue-800'
                              : ep.method === 'PUT'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {ep.method}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono text-xs text-blue-700">{ep.endpoint}</td>
                        <td className="py-3 px-4">{ep.description}</td>
                        <td className="py-3 px-4">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            ep.access === 'Public' ? 'bg-slate-100 text-slate-700' : 'bg-purple-100 text-purple-800'
                          }`}>
                            {ep.access}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => {
                              setActiveTab('tester');
                              setTestMethod(ep.method);
                              setTestUrl(ep.endpoint.split('?')[0]);
                              if (ep.endpoint.includes('?')) {
                                setTestQueryParam(ep.endpoint.split('?')[1]);
                              } else {
                                setTestQueryParam('');
                              }
                              if (ep.samplePayload) {
                                setTestRequestBody(ep.samplePayload);
                              }
                              setTimeout(() => handleExecuteApiTest(), 100);
                            }}
                            className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                          >
                            Test in Tester
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 2: LIVE REST API TESTER                            */}
        {/* ======================================================== */}
        {activeTab === 'tester' && (
          <div className="px-4 sm:px-8 lg:px-12 py-8 max-w-7xl mx-auto w-full space-y-6">
            <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider mb-2">
                  Interactive API Console
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  BookStore Live REST API Tester
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Execute live GET, POST, PUT, and DELETE queries against your MongoDB book database.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setBooksList(initialBooks);
                    setTestResponseBody('');
                    handleExecuteApiTest();
                  }}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset 15 Seed Books</span>
                </button>
              </div>
            </div>

            {/* Quick Endpoint Presets */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center gap-2 overflow-x-auto text-xs">
              <span className="font-bold text-slate-500 whitespace-nowrap px-2">Quick Presets:</span>
              <button
                onClick={() => {
                  setTestMethod('GET');
                  setTestUrl('/api/books');
                  setTestQueryParam('');
                  handleExecuteApiTest();
                }}
                className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg hover:bg-blue-50 hover:text-blue-700 whitespace-nowrap font-medium cursor-pointer"
              >
                GET All Books
              </button>
              <button
                onClick={() => {
                  setTestMethod('GET');
                  setTestUrl('/api/books');
                  setTestQueryParam('category=Programming');
                  handleExecuteApiTest();
                }}
                className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg hover:bg-blue-50 hover:text-blue-700 whitespace-nowrap font-medium cursor-pointer"
              >
                GET /api/books?category=Programming
              </button>
              <button
                onClick={() => {
                  setTestMethod('GET');
                  setTestUrl('/api/books');
                  setTestQueryParam('search=Money');
                  handleExecuteApiTest();
                }}
                className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg hover:bg-blue-50 hover:text-blue-700 whitespace-nowrap font-medium cursor-pointer"
              >
                GET /api/books?search=Money
              </button>
              <button
                onClick={() => {
                  setTestMethod('GET');
                  setTestUrl(`/api/books/${booksList[0]?._id || '65e8a101b7a123001a1e0001'}`);
                  setTestQueryParam('');
                  handleExecuteApiTest();
                }}
                className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg hover:bg-blue-50 hover:text-blue-700 whitespace-nowrap font-medium cursor-pointer"
              >
                GET Single Book by _id
              </button>
              <button
                onClick={() => {
                  setTestMethod('POST');
                  setTestUrl('/api/books');
                  setTestQueryParam('');
                }}
                className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg hover:bg-blue-50 hover:text-blue-700 whitespace-nowrap font-medium cursor-pointer"
              >
                POST Create Book
              </button>
            </div>

            {/* Request Bar */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Method Select */}
                <select
                  value={testMethod}
                  onChange={(e) => setTestMethod(e.target.value as any)}
                  className="bg-slate-100 font-mono font-bold text-xs border border-slate-200 rounded-xl px-4 py-2.5 outline-hidden text-slate-800"
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="DELETE">DELETE</option>
                </select>

                {/* URL Input */}
                <div className="grow relative">
                  <span className="absolute left-3.5 top-2.5 text-xs text-slate-400 font-mono">
                    http://localhost:5000
                  </span>
                  <input
                    type="text"
                    value={testUrl}
                    onChange={(e) => setTestUrl(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-40 pr-4 py-2 text-xs font-mono text-slate-900 outline-hidden focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Send Button */}
                <button
                  onClick={handleExecuteApiTest}
                  disabled={isExecutingRequest}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isExecutingRequest ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Send className="w-3.5 h-3.5" />
                  )}
                  <span>Send Request</span>
                </button>
              </div>

              {/* Optional Query Params Input (for GET) */}
              {testMethod === 'GET' && (
                <div className="pt-2 border-t border-slate-100 flex items-center gap-3 text-xs">
                  <span className="font-semibold text-slate-600">Query Parameters:</span>
                  <input
                    type="text"
                    placeholder="e.g. category=Finance or search=clean"
                    value={testQueryParam}
                    onChange={(e) => setTestQueryParam(e.target.value)}
                    className="grow bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-800"
                  />
                </div>
              )}

              {/* Request Body (for POST / PUT) */}
              {(testMethod === 'POST' || testMethod === 'PUT') && (
                <div className="pt-2 border-t border-slate-100 space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-700">JSON Request Body</span>
                    <span className="text-slate-400 text-[11px]">application/json</span>
                  </div>
                  <textarea
                    rows={6}
                    value={testRequestBody}
                    onChange={(e) => setTestRequestBody(e.target.value)}
                    className="w-full bg-slate-900 text-emerald-400 font-mono text-xs p-3 rounded-xl outline-hidden"
                  />
                </div>
              )}
            </div>

            {/* Response Console */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
              <div className="bg-slate-950 px-5 py-3 border-b border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Response Output</span>
                  <span className={`px-2 py-0.5 rounded font-mono font-bold text-[11px] ${
                    testResponseStatus >= 200 && testResponseStatus < 300
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : 'bg-red-950 text-red-400 border border-red-800'
                  }`}>
                    Status: {testResponseStatus} {testResponseStatus === 200 ? 'OK' : testResponseStatus === 201 ? 'Created' : testResponseStatus === 404 ? 'Not Found' : 'Bad Request'}
                  </span>
                </div>

                <button
                  onClick={() => handleCopy(testResponseBody, 'response')}
                  className="text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  {copiedFile === 'response' ? (
                    <span className="text-emerald-400">Copied!</span>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy JSON</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-5 overflow-x-auto text-xs font-mono text-slate-100 leading-relaxed max-h-96">
                <pre>{testResponseBody || '// Click "Send Request" to test endpoint'}</pre>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 3: MONGODB COMPASS GUI GUIDE                       */}
        {/* ======================================================== */}
        {activeTab === 'compass' && (
          <div className="px-4 sm:px-8 lg:px-12 py-8 max-w-7xl mx-auto w-full space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider mb-2">
                  Windows Local MongoDB Setup
                </span>
                <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <Database className="w-6 h-6 text-emerald-600" />
                  Connecting Local MongoDB with MongoDB Compass GUI
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Since you are developing locally on Windows, MongoDB runs as a background service on your PC.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50 space-y-3">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">1</span>
                    Launch MongoDB Compass
                  </h4>
                  <p className="text-xs text-slate-600">
                    Open Compass on your Windows machine and leave the connection string as:
                  </p>
                  <div className="bg-white p-3 rounded-lg border border-slate-200 font-mono text-xs text-slate-800">
                    mongodb://127.0.0.1:27017
                  </div>
                  <p className="text-xs text-slate-500">
                    Click the green <strong>"Connect"</strong> button.
                  </p>
                </div>

                <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50 space-y-3">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">2</span>
                    Create Database
                  </h4>
                  <p className="text-xs text-slate-600">
                    In Compass, click <strong>"+ Create database"</strong>:
                  </p>
                  <ul className="text-xs space-y-1.5 text-slate-700 list-disc list-inside">
                    <li>Database Name: <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 font-bold text-emerald-700">bookstore</code></li>
                    <li>Collection Name: <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 font-bold text-slate-800">books</code></li>
                  </ul>
                </div>

                <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50 space-y-3">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">3</span>
                    Run Seeder Script
                  </h4>
                  <p className="text-xs text-slate-600">
                    In your VS Code terminal, navigate to <code className="font-mono">backend</code> and run:
                  </p>
                  <div className="bg-slate-900 text-emerald-400 p-2.5 rounded-lg font-mono text-xs">
                    npm run seed
                  </div>
                  <p className="text-xs text-slate-500">
                    Hit Refresh in Compass to see all 15 book documents created instantly!
                  </p>
                </div>
              </div>

              {/* Troubleshooting Windows MongoDB Service */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-amber-900 text-xs sm:text-sm space-y-2">
                <h5 className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  Windows Troubleshooting: "Connection refused 127.0.0.1:27017"
                </h5>
                <p>
                  If Compass refuses connection, MongoDB server is simply stopped. To start it, open Command Prompt or PowerShell as <strong>Administrator</strong> and type:
                </p>
                <div className="bg-slate-900 text-emerald-400 font-mono text-xs p-3 rounded-lg">
                  net start MongoDB
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 4: LIVE STOREFRONT PREVIEW (CONNECTED TO BOOK API)  */}
        {/* ======================================================== */}
        {activeTab === 'storefront' && (
          <div>
            {/* Geometric Balance Signature Hero */}
            <section className="bg-gradient-to-r from-slate-50 to-white flex flex-col lg:flex-row items-center px-6 sm:px-12 py-10 lg:py-16 gap-8 lg:gap-12 overflow-hidden border-b border-slate-100 relative">
              <div className="flex-1 max-w-xl z-10">
                <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                  MongoDB Connected • {booksList.length} Books Live
                </span>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight mb-4 tracking-tight">
                  Discover Your Next <br />
                  <span className="text-blue-600">Great Read</span>
                </h1>
                <p className="text-slate-600 text-base sm:text-lg mb-8 max-w-md leading-relaxed">
                  Explore thousands of books, discover new authors, and find stories that inspire your next journey.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => {
                      const el = document.getElementById('catalog-grid-section');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-slate-200 hover:translate-y-[-2px] transition-all cursor-pointer"
                  >
                    Shop Books
                  </button>
                  <button
                    onClick={() => setSelectedCategory('Programming')}
                    className="bg-white border border-slate-200 text-slate-700 px-8 py-3 rounded-xl font-bold hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    Programming Books
                  </button>
                </div>
              </div>

              {/* Geometric Balance Overlapping Cards Hero Visual */}
              <div className="flex-1 flex justify-center items-center relative min-h-[300px] w-full max-w-md">
                <div className="w-56 sm:w-64 h-72 sm:h-80 bg-blue-600 rounded-xl shadow-2xl rotate-6 z-0 absolute translate-x-8 sm:translate-x-12 opacity-25"></div>
                <div className="w-56 sm:w-64 h-72 sm:h-80 bg-slate-900 rounded-xl shadow-2xl -rotate-3 z-10 flex items-center justify-center overflow-hidden border-4 border-white transition-transform hover:rotate-0 duration-300">
                  <div className="text-white text-center p-6">
                    <div className="text-xs uppercase tracking-widest opacity-60 mb-2 font-mono">Bestseller</div>
                    <div className="text-xl sm:text-2xl font-serif font-bold italic mb-4 leading-snug">
                      The Psychology <br />of Money
                    </div>
                    <div className="h-1 w-12 bg-blue-500 mx-auto mb-3"></div>
                    <p className="text-xs text-slate-400 font-sans">Morgan Housel</p>
                    <div className="mt-4 inline-block bg-blue-600/30 text-blue-300 text-xs px-2.5 py-1 rounded-full border border-blue-500/30 font-semibold">
                      ₹399 • 33% OFF
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Catalog Grid Section */}
            <div id="catalog-grid-section" className="px-6 sm:px-12 pt-8 pb-4 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {selectedCategory === 'All' ? 'Curated Catalog' : `${selectedCategory} Books`}
                </h2>
                <p className="text-slate-500 text-sm">
                  Showing {filteredBooks.length} titles from MongoDB database
                </p>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Books Grid */}
            <section className="grow bg-white px-6 sm:px-12 py-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredBooks.map(book => (
                  <div
                    key={book._id}
                    className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs hover:shadow-xl transition-all cursor-pointer group hover:translate-y-[-2px] flex flex-col justify-between"
                  >
                    <div>
                      <div
                        onClick={() => setInspectedBook(book)}
                        className="aspect-[3/4] bg-slate-100 rounded-xl mb-4 overflow-hidden relative cursor-pointer"
                      >
                        <img
                          src={book.image}
                          alt={book.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {book.discount && (
                          <div className="absolute top-2 right-2 rounded-lg px-2 py-1 text-[10px] font-bold shadow-xs bg-white/95 text-emerald-700">
                            {book.discount}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                          {book.category}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-amber-500 font-semibold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{book.rating}</span>
                        </div>
                      </div>

                      <h3
                        onClick={() => setInspectedBook(book)}
                        className="font-bold text-slate-800 line-clamp-1 mb-1 text-base group-hover:text-blue-600 transition-colors"
                      >
                        {book.title}
                      </h3>
                      <p className="text-xs text-slate-500 mb-3">{book.author}</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-lg font-bold text-slate-900">₹{book.price}</span>
                        <span className="text-xs text-slate-400 line-through">₹{book.originalPrice}</span>
                        <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                          {book.discount}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setInspectedBook(book)}
                          className="py-2 text-xs font-bold rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => setCartCount(c => c + 1)}
                          className="py-2 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer flex items-center justify-center gap-1"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Book Details Modal */}
      {inspectedBook && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                {inspectedBook.category} • MongoDB Document Details
              </span>
              <button
                onClick={() => setInspectedBook(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 sm:grid-cols-12 gap-6">
              <div className="sm:col-span-5">
                <img
                  src={inspectedBook.image}
                  alt={inspectedBook.title}
                  className="w-full aspect-[3/4] object-cover rounded-xl border border-slate-100 shadow-xs"
                />
              </div>

              <div className="sm:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-mono text-slate-400 mb-1">
                    _id: {inspectedBook._id}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {inspectedBook.title}
                  </h3>
                  <p className="text-xs text-slate-500 mb-3">By {inspectedBook.author}</p>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {inspectedBook.description}
                  </p>

                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-extrabold text-slate-900">₹{inspectedBook.price}</span>
                    <span className="text-xs text-slate-400 line-through">₹{inspectedBook.originalPrice}</span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      {inspectedBook.discount}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500">
                    Stock: <span className="font-bold text-emerald-600">{inspectedBook.stock} in warehouse</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 mt-4 flex gap-2">
                  <button
                    onClick={() => {
                      setCartCount(c => c + 1);
                      setInspectedBook(null);
                    }}
                    className="grow bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('tester');
                      setTestMethod('GET');
                      setTestUrl(`/api/books/${inspectedBook._id}`);
                      setInspectedBook(null);
                      setTimeout(() => handleExecuteApiTest(), 100);
                    }}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-4 py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
                  >
                    Test ID Endpoint
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer id="main-footer" className="bg-slate-50 border-t border-slate-200 px-6 sm:px-12 py-6 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>&copy; 2026 BookStore — Phase 2: Backend + MongoDB + Book API Complete</div>
        <div className="flex gap-6 font-medium">
          <span className="hover:text-slate-800 cursor-pointer">MongoDB: bookstore</span>
          <span className="hover:text-slate-800 cursor-pointer">Port: 5000</span>
          <span className="hover:text-slate-800 cursor-pointer">Route: /api/books</span>
        </div>
      </footer>
    </div>
  );
}
