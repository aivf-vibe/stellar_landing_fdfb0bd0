'use client';

import { useState } from 'react';
import { Search, Star, TrendingUp, Shield, Zap, BarChart3, Users, ArrowRight, Github, Twitter, Linkedin } from 'lucide-react';

// Mock data for top models
const topModels = [
  {
    id: 1,
    name: "Llama 3.1 70B",
    description: "Meta's flagship model with excellent reasoning capabilities",
    rating: 4.8,
    reviews: 1247,
    usage: "2.3B tokens",
    priceRange: "₹0.8 - ₹1.2",
    providers: ["Provider A", "Provider B", "Provider C"]
  },
  {
    id: 2,
    name: "GPT-4 Turbo",
    description: "OpenAI's most capable model with multimodal support",
    rating: 4.9,
    reviews: 2156,
    usage: "5.1B tokens",
    priceRange: "₹2.0 - ₹3.5",
    providers: ["Provider X", "Provider Y"]
  },
  {
    id: 3,
    name: "Claude 3.5 Sonnet",
    description: "Anthropic's balanced model for complex reasoning",
    rating: 4.7,
    reviews: 892,
    usage: "1.8B tokens",
    priceRange: "₹1.5 - ₹2.8",
    providers: ["Provider A", "Provider Z"]
  },
  {
    id: 4,
    name: "Mistral 7B Instruct",
    description: "Efficient open-source model for general tasks",
    rating: 4.6,
    reviews: 634,
    usage: "1.2B tokens",
    priceRange: "₹0.3 - ₹0.6",
    providers: ["Provider B", "Provider C", "Provider D"]
  },
  {
    id: 5,
    name: "Gemini Pro",
    description: "Google's multimodal AI with strong performance",
    rating: 4.5,
    reviews: 1089,
    usage: "3.4B tokens",
    priceRange: "₹1.0 - ₹1.8",
    providers: ["Provider X", "Provider A"]
  },
  {
    id: 6,
    name: "CodeLlama 34B",
    description: "Specialized model for code generation and analysis",
    rating: 4.7,
    reviews: 567,
    usage: "890M tokens",
    priceRange: "₹0.9 - ₹1.4",
    providers: ["Provider C", "Provider D"]
  }
];

const features = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Single API Access",
    description: "Access diverse models and providers with automatic fallbacks and intelligent load balancing"
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Pay-per-use in Rupees",
    description: "Simple UPI payments with no subscriptions. Pay only for what you use"
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Real-time Monitoring",
    description: "Live uptime tracking, user ratings, and comprehensive model leaderboards"
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Unified Dashboard",
    description: "Seamless management for both users and providers with detailed analytics"
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Structured Outputs",
    description: "Support for images, PDFs, and customizable presets for consistent results"
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Data Policy Controls",
    description: "Transparent data handling with customizable privacy and logging preferences"
  }
];

const stats = [
  { label: "Models Available", value: "150+" },
  { label: "Tokens Processed", value: "50B+" },
  { label: "Active Providers", value: "25+" },
  { label: "Uptime", value: "99.9%" }
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredModels = topModels.filter(model =>
    model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    model.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="text-2xl font-bold text-blue-600">StartFlow</div>
              <div className="hidden md:flex space-x-6">
                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Models</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Pricing</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Docs</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Blog</a>
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

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Unified API for
            <span className="text-blue-600 block">Open-Source LLMs</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Access multiple LLM providers through a single API, with transparent pricing, 
            uptime monitoring, and user ratings. Built for developers who need reliability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center">
              Get Started <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors">
              View Documentation
            </button>
          </div>
          
          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-blue-50 p-6 rounded-xl">
              <Shield className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Automatic Provider Routing</h3>
              <p className="text-gray-600 text-sm">Intelligent fallbacks ensure 99.9% uptime</p>
            </div>
            <div className="bg-green-50 p-6 rounded-xl">
              <Zap className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Low-Latency Edge Inference</h3>
              <p className="text-gray-600 text-sm">Global edge network for fastest responses</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl">
              <BarChart3 className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Data Policy Controls</h3>
              <p className="text-gray-600 text-sm">Full transparency and control over your data</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose StartFlow?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to integrate and scale LLM applications with confidence
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Model Search and Top Models */}
      <section className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Top Models</h2>
            <p className="text-xl text-gray-600 mb-8">
              Discover the most popular and highest-rated LLM models
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search models by name or capability..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Model Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModels.map((model) => (
              <div key={model.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{model.name}</h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium text-gray-700">{model.rating}</span>
                    <span className="ml-1 text-sm text-gray-500">({model.reviews})</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{model.description}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Usage:</span>
                    <span className="font-medium text-gray-900">{model.usage}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Price Range:</span>
                    <span className="font-medium text-gray-900">{model.priceRange}/M tokens</span>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-2">Top Providers:</div>
                  <div className="flex flex-wrap gap-1">
                    {model.providers.slice(0, 3).map((provider, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        {provider}
                      </span>
                    ))}
                    {model.providers.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{model.providers.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  View Details
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors">
              View All Models
            </button>
          </div>
        </div>
      </section>

      {/* Rankings/Leaderboards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Model Leaderboards</h2>
            <p className="text-xl text-gray-600">
              See what's trending in the AI community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                Most Used This Week
              </h3>
              <div className="space-y-3">
                {topModels.slice(0, 5).map((model, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-sm font-medium flex items-center justify-center mr-3">
                        {idx + 1}
                      </span>
                      <span className="font-medium text-gray-900">{model.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">{model.usage}</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-blue-600 hover:text-blue-700 transition-colors">
                View Full Rankings →
              </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Star className="w-5 h-5 text-yellow-500 mr-2" />
                Highest Rated
              </h3>
              <div className="space-y-3">
                {topModels.sort((a, b) => b.rating - a.rating).slice(0, 5).map((model, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="w-6 h-6 bg-yellow-100 text-yellow-600 rounded-full text-sm font-medium flex items-center justify-center mr-3">
                        {idx + 1}
                      </span>
                      <span className="font-medium text-gray-900">{model.name}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium text-gray-700">{model.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-blue-600 hover:text-blue-700 transition-colors">
                View All Ratings →
              </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="w-5 h-5 text-purple-600 mr-2" />
                Community Favorites
              </h3>
              <div className="space-y-3">
                {topModels.sort((a, b) => b.reviews - a.reviews).slice(0, 5).map((model, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full text-sm font-medium flex items-center justify-center mr-3">
                        {idx + 1}
                      </span>
                      <span className="font-medium text-gray-900">{model.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">{model.reviews} reviews</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-blue-600 hover:text-blue-700 transition-colors">
                Join Community →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-blue-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Developers</h2>
          <p className="text-xl text-gray-600 mb-12">Join thousands of developers building with StartFlow</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="bg-white p-6 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">50B+</div>
              <div className="text-gray-600">Tokens Processed</div>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600">Active Developers</div>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime SLA</div>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">150+</div>
              <div className="text-gray-600">Available Models</div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <blockquote className="text-xl text-gray-700 mb-6">
              "StartFlow has revolutionized how we integrate AI into our applications. 
              The unified API and automatic fallbacks have saved us countless hours of development time."
            </blockquote>
            <div className="font-semibold text-gray-900">Sarah Chen</div>
            <div className="text-gray-600">Lead Developer, TechCorp</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold text-blue-400 mb-4">StartFlow</div>
              <p className="text-gray-400 mb-4">
                Unified API for Open-Source LLMs with transparent pricing and reliable infrastructure.
              </p>
              <div className="flex space-x-4">
                <Github className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <Linkedin className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Models</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Rankings</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Status</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 StartFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
