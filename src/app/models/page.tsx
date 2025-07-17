'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, ArrowUpDown, Star, ExternalLink, Copy, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';

// Mock data for all available models
const allModels = [
  {
    id: 1,
    name: "Llama 3.1 70B",
    slug: "llama-3-1-70b",
    description: "Meta's flagship model with excellent reasoning capabilities and strong performance across diverse tasks",
    category: "general",
    modality: "text",
    contextLength: "128k",
    minInputPrice: 0.8,
    maxInputPrice: 1.2,
    minOutputPrice: 1.0,
    maxOutputPrice: 1.5,
    usage: "2.3B",
    rating: 4.8,
    reviews: 1247,
    providers: [
      { name: "Provider A", uptime: 99.2, rating: 4.7 },
      { name: "Provider B", uptime: 98.8, rating: 4.6 },
      { name: "Provider C", uptime: 99.5, rating: 4.9 }
    ]
  },
  {
    id: 2,
    name: "GPT-4 Turbo",
    slug: "gpt-4-turbo",
    description: "OpenAI's most capable model with multimodal support for text and vision tasks",
    category: "general",
    modality: "vision",
    contextLength: "128k",
    minInputPrice: 2.0,
    maxInputPrice: 3.5,
    minOutputPrice: 2.5,
    maxOutputPrice: 4.0,
    usage: "5.1B",
    rating: 4.9,
    reviews: 2156,
    providers: [
      { name: "Provider X", uptime: 99.8, rating: 4.9 },
      { name: "Provider Y", uptime: 99.1, rating: 4.8 }
    ]
  },
  {
    id: 3,
    name: "Claude 3.5 Sonnet",
    slug: "claude-3-5-sonnet",
    description: "Anthropic's balanced model for complex reasoning with strong safety features",
    category: "general",
    modality: "text",
    contextLength: "200k",
    minInputPrice: 1.5,
    maxInputPrice: 2.8,
    minOutputPrice: 1.8,
    maxOutputPrice: 3.2,
    usage: "1.8B",
    rating: 4.7,
    reviews: 892,
    providers: [
      { name: "Provider A", uptime: 99.3, rating: 4.8 },
      { name: "Provider Z", uptime: 98.9, rating: 4.6 }
    ]
  },
  {
    id: 4,
    name: "Mistral 7B Instruct",
    slug: "mistral-7b-instruct",
    description: "Efficient open-source model optimized for instruction following and general tasks",
    category: "general",
    modality: "text",
    contextLength: "32k",
    minInputPrice: 0.3,
    maxInputPrice: 0.6,
    minOutputPrice: 0.4,
    maxOutputPrice: 0.8,
    usage: "1.2B",
    rating: 4.6,
    reviews: 634,
    providers: [
      { name: "Provider B", uptime: 99.0, rating: 4.5 },
      { name: "Provider C", uptime: 99.4, rating: 4.7 },
      { name: "Provider D", uptime: 98.7, rating: 4.4 }
    ]
  },
  {
    id: 5,
    name: "CodeLlama 34B",
    slug: "codellama-34b",
    description: "Specialized model for code generation, debugging, and programming assistance",
    category: "programming",
    modality: "text",
    contextLength: "16k",
    minInputPrice: 0.9,
    maxInputPrice: 1.4,
    minOutputPrice: 1.1,
    maxOutputPrice: 1.8,
    usage: "890M",
    rating: 4.7,
    reviews: 567,
    providers: [
      { name: "Provider C", uptime: 99.1, rating: 4.6 },
      { name: "Provider D", uptime: 99.6, rating: 4.8 }
    ]
  },
  {
    id: 6,
    name: "Gemini Pro",
    slug: "gemini-pro",
    description: "Google's multimodal AI with strong performance across text and vision tasks",
    category: "general",
    modality: "vision",
    contextLength: "32k",
    minInputPrice: 1.0,
    maxInputPrice: 1.8,
    minOutputPrice: 1.2,
    maxOutputPrice: 2.2,
    usage: "3.4B",
    rating: 4.5,
    reviews: 1089,
    providers: [
      { name: "Provider X", uptime: 99.4, rating: 4.6 },
      { name: "Provider A", uptime: 99.0, rating: 4.4 }
    ]
  },
  {
    id: 7,
    name: "DALL-E 3",
    slug: "dall-e-3",
    description: "Advanced image generation model with high-quality, detailed outputs",
    category: "image",
    modality: "vision",
    contextLength: "4k",
    minInputPrice: 5.0,
    maxInputPrice: 8.0,
    minOutputPrice: 6.0,
    maxOutputPrice: 10.0,
    usage: "450M",
    rating: 4.8,
    reviews: 723,
    providers: [
      { name: "Provider X", uptime: 99.2, rating: 4.7 },
      { name: "Provider Y", uptime: 98.8, rating: 4.9 }
    ]
  },
  {
    id: 8,
    name: "Whisper Large v3",
    slug: "whisper-large-v3",
    description: "State-of-the-art speech recognition and transcription model",
    category: "general",
    modality: "text",
    contextLength: "30s",
    minInputPrice: 0.2,
    maxInputPrice: 0.4,
    minOutputPrice: 0.3,
    maxOutputPrice: 0.5,
    usage: "680M",
    rating: 4.6,
    reviews: 445,
    providers: [
      { name: "Provider B", uptime: 99.5, rating: 4.7 },
      { name: "Provider D", uptime: 99.1, rating: 4.5 }
    ]
  }
];

type SortOption = 'name' | 'popularity' | 'rating' | 'usage' | 'price' | 'context';
type FilterCategory = 'all' | 'general' | 'programming' | 'image';
type FilterModality = 'all' | 'text' | 'vision';

export default function ModelsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterCategory, setFilterCategory] = useState<FilterCategory>('all');
  const [filterModality, setFilterModality] = useState<FilterModality>('all');
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const filteredAndSortedModels = useMemo(() => {
    let filtered = allModels.filter(model => {
      const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           model.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filterCategory === 'all' || model.category === filterCategory;
      const matchesModality = filterModality === 'all' || model.modality === filterModality;
      
      return matchesSearch && matchesCategory && matchesModality;
    });

    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'popularity':
          aValue = parseFloat(a.usage);
          bValue = parseFloat(b.usage);
          break;
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        case 'usage':
          aValue = parseFloat(a.usage);
          bValue = parseFloat(b.usage);
          break;
        case 'price':
          aValue = a.minInputPrice;
          bValue = b.minInputPrice;
          break;
        case 'context':
          aValue = parseInt(a.contextLength);
          bValue = parseInt(b.contextLength);
          break;
        default:
          return 0;
      }

      if (typeof aValue === 'string') {
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });

    return filtered;
  }, [searchQuery, sortBy, sortOrder, filterCategory, filterModality]);

  const toggleRowExpansion = (modelId: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(modelId)) {
      newExpanded.delete(modelId);
    } else {
      newExpanded.add(modelId);
    }
    setExpandedRows(newExpanded);
  };

  const getUptimeColor = (uptime: number) => {
    if (uptime >= 99) return 'text-green-600 bg-green-100';
    if (uptime >= 95) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-2xl font-bold text-blue-600">StartFlow</Link>
              <div className="hidden md:flex space-x-6">
                <Link href="/models" className="text-blue-600 font-medium">Models</Link>
                <Link href="/pricing" className="text-gray-700 hover:text-blue-600 transition-colors">Pricing</Link>
                <Link href="/docs" className="text-gray-700 hover:text-blue-600 transition-colors">Docs</Link>
                <Link href="/blog" className="text-gray-700 hover:text-blue-600 transition-colors">Blog</Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-blue-600 transition-colors">Sign In</button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Our LLM Models</h1>
          <p className="text-xl text-gray-600">
            Browse and compare all available models with transparent pricing and performance metrics
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search models..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value as FilterCategory)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="general">General</option>
                <option value="programming">Programming</option>
                <option value="image">Image</option>
              </select>

              <select
                value={filterModality}
                onChange={(e) => setFilterModality(e.target.value as FilterModality)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Modalities</option>
                <option value="text">Text</option>
                <option value="vision">Vision</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="popularity">Sort by Popularity</option>
                <option value="name">Sort by Name</option>
                <option value="rating">Sort by Rating</option>
                <option value="usage">Sort by Usage</option>
                <option value="price">Sort by Price</option>
                <option value="context">Sort by Context Length</option>
              </select>

              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
              >
                <ArrowUpDown className="w-4 h-4" />
                <span className="ml-1">{sortOrder === 'asc' ? 'Asc' : 'Desc'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Models Table */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Model</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Context</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Pricing (₹/M tokens)</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Usage</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Rating</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Providers</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAndSortedModels.map((model) => (
                  <>
                    <tr key={model.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <Link 
                            href={`/models/${model.slug}`}
                            className="text-lg font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            {model.name}
                          </Link>
                          <p className="text-sm text-gray-600 mt-1 max-w-md">{model.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full capitalize">
                              {model.category}
                            </span>
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full capitalize">
                              {model.modality}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-gray-900">{model.contextLength}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div>Input: ₹{model.minInputPrice} - ₹{model.maxInputPrice}</div>
                          <div>Output: ₹{model.minOutputPrice} - ₹{model.maxOutputPrice}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-gray-900">{model.usage} tokens</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="ml-1 font-medium text-gray-900">{model.rating}</span>
                          <span className="ml-1 text-sm text-gray-500">({model.reviews})</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          {model.providers.slice(0, 3).map((provider, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              {provider.name}
                            </span>
                          ))}
                          {model.providers.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                              +{model.providers.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleRowExpansion(model.id)}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          {expandedRows.has(model.id) ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </button>
                      </td>
                    </tr>
                    
                    {/* Expanded Row */}
                    {expandedRows.has(model.id) && (
                      <tr className="bg-gray-50">
                        <td colSpan={7} className="px-6 py-4">
                          <div className="space-y-4">
                            <h4 className="font-semibold text-gray-900">Provider Details</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {model.providers.map((provider, idx) => (
                                <div key={idx} className="bg-white p-4 rounded-lg border border-gray-200">
                                  <div className="flex items-center justify-between mb-2">
                                    <h5 className="font-medium text-gray-900">{provider.name}</h5>
                                    <button className="text-gray-400 hover:text-gray-600">
                                      <Copy className="w-4 h-4" />
                                    </button>
                                  </div>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Uptime:</span>
                                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUptimeColor(provider.uptime)}`}>
                                        {provider.uptime}%
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Rating:</span>
                                      <div className="flex items-center">
                                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                        <span className="ml-1 font-medium">{provider.rating}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <Link
                                    href={`/models/${model.slug}?provider=${provider.name}`}
                                    className="mt-3 w-full bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors flex items-center justify-center"
                                  >
                                    Create API Key
                                    <ExternalLink className="w-3 h-3 ml-1" />
                                  </Link>
                                </div>
                              ))}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Results Info */}
        <div className="mt-6 text-center text-gray-600">
          Showing {filteredAndSortedModels.length} of {allModels.length} models
        </div>

        {/* Export Options */}
        <div className="mt-8 bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Options</h3>
          <div className="flex flex-wrap gap-4">
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              Export as JSON
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              RSS Feed
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              API Documentation
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            Access standardized metadata for all models via our Models API
          </p>
        </div>
      </div>
    </div>
  );
}