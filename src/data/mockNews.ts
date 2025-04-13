
export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  featured: boolean;
  trending: boolean;
}

export const categories = [
  "Tech Stocks",
  "AI & Computing",
  "Semiconductor",
  "EV & Mobility",
  "Biotech",
  "Finance",
  "Market Analysis"
];

export const newsArticles: NewsArticle[] = [
  {
    id: "1",
    title: "NVIDIA Breaks $1 Trillion Market Cap as AI Boom Continues",
    excerpt: "The AI chip maker's stock surged to new heights as demand for AI hardware continues to grow exponentially.",
    content: "NVIDIA Corporation has officially joined the elite $1 trillion market capitalization club, becoming only the fifth US company to achieve this milestone. The semiconductor giant's shares surged following remarkable quarterly results that far exceeded analyst expectations, driven by unprecedented demand for its AI-optimized chips. CEO Jensen Huang stated that we are witnessing 'a new computing era' with AI at its core, and NVIDIA's technology remains at the epicenter of this revolution. The company's data center revenue more than doubled year-over-year, reflecting the massive investments being made by tech giants in AI infrastructure. Industry analysts predict this momentum could continue as AI applications expand across sectors.",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3",
    author: "Michael Chen",
    date: "2023-05-30",
    category: "Tech Stocks",
    tags: ["NVIDIA", "AI", "Semiconductor", "Market Cap"],
    featured: true,
    trending: true
  },
  {
    id: "2",
    title: "Apple Unveils New AI Strategy at WWDC 2023",
    excerpt: "The tech giant announced its comprehensive approach to integrating AI across its product ecosystem.",
    content: "At its annual Worldwide Developers Conference (WWDC), Apple revealed its long-awaited AI strategy, introducing a suite of machine learning features branded as 'Apple Intelligence.' The initiative represents Apple's most significant push into AI yet, with CEO Tim Cook describing it as 'the beginning of a new era for Apple products.' Unlike competitors who have rushed to market with generative AI products, Apple emphasized its privacy-first approach, with on-device processing for sensitive data. Wall Street responded positively to the announcement, with Apple shares climbing 3% by market close. The company also announced partnerships with OpenAI and Google to bring ChatGPT and Google Gemini capabilities to iOS devices, while maintaining Apple's privacy standards.",
    image: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?ixlib=rb-4.0.3",
    author: "Sarah Johnson",
    date: "2023-06-05",
    category: "Tech Stocks",
    tags: ["Apple", "AI", "WWDC", "Machine Learning"],
    featured: true,
    trending: false
  },
  {
    id: "3",
    title: "Tesla's Robotaxi Reveal: What Investors Need to Know",
    excerpt: "Elon Musk's ambitious autonomous vehicle plans could reshape Tesla's business model and the transportation industry.",
    content: "Tesla has finally unveiled its long-awaited robotaxi, dubbed 'Cybercab,' during a special event at the company's design studio in California. The futuristic vehicle, which lacks a steering wheel and pedals, represents CEO Elon Musk's vision for an autonomous ride-hailing service that could potentially generate significant recurring revenue for the electric vehicle maker. According to Musk, the Cybercab could be priced under $30,000 when mass production begins, with the company aiming to start limited deployment by late 2024. However, analysts remain divided on the timeline, citing regulatory hurdles and Tesla's history of missed deadlines. The company's stock experienced volatility following the announcement as investors assessed the practical viability of Musk's ambitious roadmap against current autonomous driving technology capabilities.",
    image: "https://images.unsplash.com/photo-1617704548623-0ef2fe8c25d9?ixlib=rb-4.0.3",
    author: "David Rodriguez",
    date: "2023-06-12",
    category: "EV & Mobility",
    tags: ["Tesla", "Autonomous Vehicles", "Robotaxi", "Elon Musk"],
    featured: false,
    trending: true
  },
  {
    id: "4",
    title: "Microsoft's Azure Cloud Revenue Exceeds Expectations, Driven by AI Demand",
    excerpt: "The tech giant's cloud division reports 29% growth as businesses rush to build AI infrastructure.",
    content: "Microsoft reported stronger-than-expected quarterly results, with Azure cloud services revenue growing by 29% year-over-year, surpassing analyst forecasts of 26%. The company attributed this acceleration largely to growing enterprise demand for AI capabilities, with CEO Satya Nadella noting that over 65% of Fortune 500 companies are now using Azure's AI services. The tech giant's strategic partnership with OpenAI continues to pay dividends as organizations increasingly seek to implement generative AI solutions within their operations. Microsoft CFO Amy Hood projected continued strong performance, forecasting Azure growth in the range of 28-30% for the coming quarter. Following the earnings release, Microsoft shares rose 5% in after-hours trading, adding approximately $180 billion to the company's market capitalization.",
    image: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?ixlib=rb-4.0.3",
    author: "Jennifer Liu",
    date: "2023-06-15",
    category: "Tech Stocks",
    tags: ["Microsoft", "Azure", "Cloud Computing", "AI"],
    featured: true,
    trending: true
  },
  {
    id: "5",
    title: "Semiconductor Shortage Eases, But Chip Stocks Remain Volatile",
    excerpt: "Despite improved supply chains, geopolitical tensions continue to impact the semiconductor industry outlook.",
    content: "After nearly two years of severe shortages, the global semiconductor supply chain is showing significant signs of normalization. Major chipmakers like Intel, TSMC, and Samsung have successfully ramped up production capacity, while demand has cooled in certain consumer electronics segments. However, chip stocks have displayed notable volatility as investors weigh improved supply dynamics against concerns about U.S.-China tensions and potential export restrictions. The PHLX Semiconductor Index has fluctuated by over 15% in the past month alone. Industry executives remain cautiously optimistic, with many emphasizing that while consumer chip supply has largely recovered, specialized components for automotive and industrial applications still face constraints. Analysts recommend selective positioning within the sector, favoring companies exposed to AI, data center, and advanced packaging technologies.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3",
    author: "Robert Chang",
    date: "2023-06-18",
    category: "Semiconductor",
    tags: ["Semiconductors", "Supply Chain", "Chips", "Manufacturing"],
    featured: false,
    trending: true
  },
  {
    id: "6",
    title: "Fed Signals Potential Rate Cuts, Tech Stocks Rally",
    excerpt: "Technology shares surge as Federal Reserve hints at possible monetary policy easing later this year.",
    content: "In a significant shift of tone, Federal Reserve Chairman Jerome Powell indicated that the central bank may begin reducing interest rates as early as September, provided inflation continues its downward trend. The announcement sparked a broad market rally, with technology stocks—particularly those of growth-oriented companies—posting substantial gains. The tech-heavy Nasdaq Composite jumped 2.8%, its largest single-day increase in six months. High-growth software companies, which had been disproportionately impacted by the higher interest rate environment, saw even stronger performance with the iShares Expanded Tech-Software ETF advancing 3.5%. Economists noted that declining inflation metrics, a moderating labor market, and signs of slowing consumer spending likely influenced the Fed's more dovish stance. Market participants are now pricing in at least two quarter-point rate cuts before year-end, according to CME Group's FedWatch Tool.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3",
    author: "Amanda Foster",
    date: "2023-06-20",
    category: "Market Analysis",
    tags: ["Federal Reserve", "Interest Rates", "Market Rally", "Tech Stocks"],
    featured: false,
    trending: false
  },
  {
    id: "7",
    title: "Biotech Breakthrough: Moderna's mRNA Cancer Vaccine Shows Promise in Trials",
    excerpt: "Shares of the pharmaceutical company surge as preliminary data from melanoma treatment trial exceeds expectations.",
    content: "Moderna announced promising interim results from its Phase 2 trial evaluating an experimental mRNA cancer vaccine in combination with Merck's immunotherapy drug Keytruda for the treatment of melanoma. The data showed a 44% reduction in the risk of recurrence or death compared to Keytruda alone in patients with stage III/IV melanoma following surgical resection. The results represent a potential breakthrough in cancer treatment using the same mRNA technology that powered Moderna's COVID-19 vaccine. Company CEO Stéphane Bancel called the findings 'transformational' and indicated plans to rapidly advance the treatment into Phase 3 trials across multiple cancer types. Moderna's shares jumped more than 23% following the announcement, adding approximately $15 billion to the company's market value. Analysts at Goldman Sachs upgraded the stock to a 'buy' rating, projecting peak annual sales potential exceeding $5 billion if the treatment receives regulatory approval.",
    image: "https://images.unsplash.com/photo-1579154341098-e4e158cc7f50?ixlib=rb-4.0.3",
    author: "Dr. Marcus Wells",
    date: "2023-06-22",
    category: "Biotech",
    tags: ["Moderna", "mRNA", "Cancer Treatment", "Clinical Trials"],
    featured: true,
    trending: false
  },
  {
    id: "8",
    title: "Crypto Integration Boosts PayPal and Block as Digital Assets Regain Momentum",
    excerpt: "Financial technology companies benefit from renewed interest in cryptocurrencies and blockchain applications.",
    content: "Shares of payment giants PayPal and Block (formerly Square) have risen 15% and 18% respectively over the past two weeks as both companies expand their cryptocurrency offerings amid a broader recovery in digital asset markets. PayPal recently announced the launch of its own stablecoin, PayPal USD (PYUSD), backed by U.S. dollars and U.S. Treasury bonds, marking a significant step into the regulated digital currency space. Meanwhile, Block reported that Bitcoin revenue through its Cash App reached $2.4 billion in the second quarter, up 24% year-over-year. The financial technology sector's embrace of blockchain technology extends beyond just offering crypto trading services, with both companies exploring decentralized finance (DeFi) applications and blockchain-based payment solutions. Industry analysts from Morgan Stanley noted that the integration of cryptocurrencies into mainstream payment platforms could accelerate adoption and potentially transform cross-border payment economics.",
    image: "https://images.unsplash.com/photo-1629728878286-8a7c879e29be?ixlib=rb-4.0.3",
    author: "Thomas Greene",
    date: "2023-06-25",
    category: "Finance",
    tags: ["PayPal", "Block", "Cryptocurrency", "Blockchain"],
    featured: false,
    trending: false
  }
];

// Helper functions to get articles by type
export const getFeaturedArticles = () => newsArticles.filter(article => article.featured);
export const getTrendingArticles = () => newsArticles.filter(article => article.trending);
export const getLatestArticles = () => [...newsArticles].sort((a, b) => 
  new Date(b.date).getTime() - new Date(a.date).getTime()
);
export const getArticlesByCategory = (category: string) => 
  newsArticles.filter(article => article.category === category);
