import { useState } from 'react'
import { Menu, Search, User } from 'lucide-react'

const newsData = {
  mainStory: {
    id: 1,
    title: 'Global Leaders Convene for Historic Climate Summit in Geneva',
    description:
      'World leaders gathered today for an unprecedented climate conference aimed at addressing the accelerating environmental crisis. The three-day summit brings together representatives from over 150 nations to negotiate new emissions targets and climate financing agreements.',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=500&fit=crop',
    category: 'World',
    author: 'Sarah Johnson and Michael Chen',
    date: '2026-01-14'
  },

  featuredNews: [
    {
      id: 2,
      title: 'Tech Giants Face New Regulations as AI Concerns Grow',
      description:
        'Lawmakers propose comprehensive framework to govern artificial intelligence development and deployment.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop',
      category: 'Technology',
      author: 'James Wilson'
    },
    {
      id: 3,
      title: 'Markets Rally on Strong Economic Data',
      description:
        'Stock markets reached new highs following better-than-expected employment figures and consumer spending reports.',
      category: 'Business',
      author: 'Emma Rodriguez'
    }
  ],

  videoStories: [
    {
      id: 4,
      title: 'Inside the Space Program',
      description: 'A look at the latest mission preparations',
      thumbnail:
        'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=250&fit=crop',
      videoUrl:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      isVideo: true
    },
    {
      id: 5,
      title: 'On the Ground: City Transformation',
      description: 'Urban renewal projects reshape downtown',
      thumbnail:
        'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=400&h=250&fit=crop',
      isVideo: false
    },
    {
      id: 6,
      title: 'Medical Breakthrough',
      description: 'New treatment shows promising results',
      thumbnail:
        'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=400&h=250&fit=crop',
      isVideo: false
    }
  ],

  columnNews: [
    {
      id: 7,
      title: 'Senate Debates Infrastructure Bill Amendments',
      description:
        'Bipartisan negotiations continue as lawmakers seek compromise on transportation and broadband funding provisions.',
      image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&h=250&fit=crop',
      category: 'Politics'
    },
    {
      id: 8,
      title: 'Museum Unveils Rare Renaissance Collection',
      description: 'Previously unseen works go on display in major exhibition.',
      category: 'Culture'
    },
    {
      id: 9,
      title: 'Researchers Discover New Deep-Sea Species',
      description:
        'Marine biologists document previously unknown organisms in Pacific Ocean exploration mission.',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=250&fit=crop',
      category: 'Science'
    },
    {
      id: 10,
      title: 'Championship Series Heads to Decisive Game',
      description: 'Teams tied 3-3 as season reaches thrilling conclusion.',
      category: 'Sports'
    },
    {
      id: 11,
      title: 'The Future of Remote Work',
      description:
        'How flexible arrangements are reshaping corporate culture and urban landscapes.',
      category: 'Opinion',
      author: 'David Patterson'
    }
  ],

  opinionArticles: [
    {
      id: 12,
      title: 'Education Reform: What Students Really Need',
      description:
        "The current system fails to prepare young people for a rapidly changing world. Here's what needs to change.",
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=300&fit=crop',
      author: 'Dr. Amanda Foster'
    },
    {
      id: 13,
      title: 'Climate Action Cannot Wait',
      description:
        'Every year of delay makes the challenge more difficult and costly. We must act now with bold, comprehensive solutions.',
      author: 'Prof. Robert Greene'
    },
    {
      id: 14,
      title: 'The Case for Urban Green Spaces',
      description:
        "Parks and gardens aren't luxuries—they're essential infrastructure for healthy cities.",
      author: 'Lisa Yamamoto'
    }
  ],

  trendingArticles: [
    { id: 15, title: 'How AI is Changing Education', views: 15420 },
    { id: 16, title: 'The Best Books of 2026', views: 12890 },
    { id: 17, title: 'Travel Guide: Hidden Gems', views: 11234 },
    { id: 18, title: 'Cooking at Home: Simple Recipes', views: 9876 },
    { id: 19, title: 'Investment Strategies for 2026', views: 8765 }
  ],

  categories: [
    'U.S.',
    'World',
    'Business',
    'Politics',
    'Technology',
    'Science',
    'Health',
    'Sports',
    'Arts',
    'Opinion'
  ],

  footerLinks: {
    news: ['Home Page', 'World', 'U.S.', 'Politics', 'Business'],
    opinion: ["Today's Opinion", 'Columnists', 'Editorials', 'Letters'],
    arts: ['Art & Design', 'Books', 'Movies', 'Music', 'Television'],
    living: ['Health', 'Food', 'Travel', 'Style', 'Real Estate'],
    more: ['Reader Center', 'Corrections', 'Contact Us', 'Accessibility']
  }
}

const HomeNews = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className=" bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
      {/* Main Header */}
      <div className="border-b border-black">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center">
          <h1 className="font-serif text-6xl font-bold tracking-tight">The News Times</h1>
          <p className="text-sm text-gray-200 mt-2">{currentDate}</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="border-b text-center border-gray-300 sticky top-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-6 py-2 overflow-x-auto text-sm">
            {newsData.categories.map((category, index) => (
              <a key={index} href="#" className="whitespace-nowrap hover:underline font-semibold">
                {category}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Top Story Section */}
        <div className="grid grid-cols-12 gap-6 mb-8 pb-8 border-b border-gray-300">
          {/* Main Featured Story */}
          <div className="col-span-8 border-r border-gray-300 pr-6">
            <img
              src={newsData.mainStory.image}
              alt={newsData.mainStory.title}
              className="w-full h-96 object-cover mb-4"
            />
            <h2 className="font-serif text-4xl font-bold mb-3 leading-tight">
              {newsData.mainStory.title}
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-3">
              {newsData.mainStory.description}
            </p>
            <p className="text-sm text-gray-400">By {newsData.mainStory.author}</p>
          </div>

          {/* Secondary Stories */}
          <div className="col-span-4 space-y-6">
            {newsData.featuredNews.map((article, index) => (
              <div key={article.id} className={index === 0 ? 'pb-6 border-b border-gray-300' : ''}>
                {article.image && (
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover mb-3"
                  />
                )}
                <h3 className="font-serif text-xl font-bold mb-2">{article.title}</h3>
                <p className="text-sm text-gray-300 mb-2">{article.description}</p>
                {article.author && <p className="text-xs text-gray-400">By {article.author}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Video Section */}
        <div className="mb-8 pb-8 border-b border-gray-300">
          <h2 className="font-serif text-2xl font-bold mb-4">Featured Video</h2>
          <div className="grid grid-cols-3 gap-6">
            {newsData.videoStories.map((story) => (
              <div key={story.id}>
                <div className="relative bg-black aspect-video mb-2">
                  {story.isVideo ? (
                    <video className="w-full h-full object-cover" poster={story.thumbnail} controls>
                      <source src={story.videoUrl} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={story.thumbnail}
                      alt={story.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <h4 className="font-serif font-bold mb-1">{story.title}</h4>
                <p className="text-sm text-gray-400">{story.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Multi-column News Grid */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {[0, 1, 2].map((colIndex) => (
            <div key={colIndex} className="space-y-6">
              {newsData.columnNews
                .filter((_, index) => index % 3 === colIndex)
                .map((article, index) => (
                  <div key={article.id} className="pb-6 border-b border-gray-300">
                    <span className="text-xs font-bold uppercase tracking-wide">
                      {article.category}
                    </span>
                    <h3 className="font-serif text-xl font-bold my-2">{article.title}</h3>
                    {article.image && (
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-48 object-cover my-3"
                      />
                    )}
                    <p className="text-sm text-gray-300">{article.description}</p>
                    {article.author && (
                      <p className="text-xs text-gray-500 mt-2">By {article.author}</p>
                    )}
                  </div>
                ))}

              {colIndex === 2 && (
                <div className="bg-gray-100 p-4">
                  <h4 className="font-bold mb-2 text-sm">Most Popular</h4>
                  <ol className="space-y-2 text-sm">
                    {newsData.trendingArticles.map((article, index) => (
                      <li
                        key={article.id}
                        className={
                          index < newsData.trendingArticles.length - 1
                            ? 'pb-2 border-b border-gray-300'
                            : ''
                        }
                      >
                        {index + 1}. {article.title}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Opinion Section */}
        <div className="border-t border-black pt-6 mb-8">
          <h2 className="font-serif text-3xl font-bold mb-6">Opinion</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              {newsData.opinionArticles[0].image && (
                <img
                  src={newsData.opinionArticles[0].image}
                  alt={newsData.opinionArticles[0].title}
                  className="w-full h-64 object-cover mb-3"
                />
              )}
              <h3 className="font-serif text-2xl font-bold mb-2">
                {newsData.opinionArticles[0].title}
              </h3>
              <p className="text-gray-300 mb-2">{newsData.opinionArticles[0].description}</p>
              <p className="text-sm text-gray-300">By {newsData.opinionArticles[0].author}</p>
            </div>

            <div>
              {newsData.opinionArticles.slice(1).map((article, index) => (
                <div
                  key={article.id}
                  className={index > 0 ? 'pt-4 border-t border-gray-300 mt-4' : ''}
                >
                  <h3 className="font-serif text-2xl font-bold mb-2">{article.title}</h3>
                  <p className="text-gray-300 mb-2">{article.description}</p>
                  <p className="text-sm text-gray-400">By {article.author}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeNews
