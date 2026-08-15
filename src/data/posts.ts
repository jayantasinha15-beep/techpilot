export interface Post {
  slug: string;
  title: string;
  description: string;
  content: string;

  category: string;   
  image: string;      // Thumbnail
  banner: string;     // Hero Banner 

  author: string;

  publishedAt: string;
  updatedAt?: string;

  readingTime: string;

  featured: boolean;

  tags: string[];
}

export const posts: Post[] = [
  {
    slug: "ai-tools",

    title: "Best AI Tools 2026",

    description:
      "Explore the best AI tools for productivity and creativity in 2026.",

    content: `
Artificial Intelligence is changing the way we work.

ChatGPT helps with writing, coding and research.

AI image generators create amazing artwork.

AI coding assistants improve developer productivity.
`,

    category: "AI",

    image: "/images/ai.jpg",
    banner: "/images/ai-banner.png",

    author: "Jayanta Singha",

    publishedAt: "2026-07-25",

    updatedAt: "2026-07-26",

    readingTime: "5 min read",

    featured: true,

    tags: ["AI", "Productivity", "ChatGPT"],
  },

  {
    slug: "gaming-pc",

    title: "Top Gaming PC Builds 2026",

    description:
      "Complete gaming PC buying guide for beginners.",

    content: `
A balanced gaming PC gives excellent performance.

Recommended Components

Ryzen 5 5600GT

16GB RAM

NVMe SSD

RTX / Radeon Graphics Card
`,

    category: "Gaming",

    image: "/images/pc.jpg",
banner: "/images/gaming-banner.png",

    author: "Jayanta Singha",

    publishedAt: "2026-07-25",

    updatedAt: "2026-07-26",

    readingTime: "6 min read",

    featured: true,

    tags: ["Gaming", "PC", "Ryzen"],
  },

  {
    slug: "smartphone-reviews",

    title: "Latest Smartphone Reviews",

    description:
      "Latest smartphone reviews and buying guide.",

    content: `
Modern smartphones include powerful AI features.

Always check

Processor

Camera

Battery

Display
`,

    category: "Smartphone",

    image: "/images/phone.jpg",
banner: "/images/smartphone-banner.png",

    author: "Jayanta Singha",

    publishedAt: "2026-07-25",

    updatedAt: "2026-07-26",

    readingTime: "4 min read",

    featured: true,

    tags: ["Android", "Smartphone", "Review"],
  },
  {
  slug: "chatgpt-guide",

  title: "Complete ChatGPT Guide for Beginners",

  description:
    "Learn how to use ChatGPT effectively for work, study and coding.",

  content: `
ChatGPT is one of the most powerful AI assistants.

You can use it for writing.

Coding.

Learning.

Research.

Business.

Content creation.
`,

  category: "AI",

  image: "/images/chatgpt.png",
  banner: "/images/ai-banner.png",

  author: "Jayanta Singha",

  publishedAt: "2026-07-26",

  readingTime: "7 min read",

  featured: true,

  tags: ["ChatGPT", "AI"],
},
{
  slug: "google-gemini",

  title: "Google Gemini vs ChatGPT",

  description:
    "Compare Google Gemini and ChatGPT features, speed and accuracy.",

  content: `
Google Gemini is Google's latest AI model.

It competes directly with ChatGPT.

Both have different strengths.
`,

  category: "AI",

  image: "/images/gemvschat.jpg",
  banner: "/images/ai-banner.png",

  author: "Jayanta Singha",

  publishedAt: "2026-07-26",

  readingTime: "6 min read",

  featured: true,

  tags: ["Gemini", "Google", "AI"],
},
{
  slug: "rtx-5060-build",

  title: "Best RTX 5060 Gaming PC Build",

  description:
    "Affordable RTX gaming PC for 1080p and 1440p gaming.",

  content: `
RTX 5060 delivers excellent gaming performance.

Perfect for esports.

AAA games.

Streaming.
`,

  category: "Gaming",

  image: "/images/rtx.jpg",
  banner: "/images/gaming-banner.png",

  author: "Jayanta Singha",

  publishedAt: "2026-07-26",

  readingTime: "8 min read",

  featured: true,

  tags: ["RTX", "Gaming"],
},
{
  slug: "windows-11-tips",

  title: "Best Windows 11 Tips and Tricks",

  description:
    "Improve Windows 11 performance using these simple tips.",

  content: `
Disable startup apps.

Keep Windows updated.

Use SSD.

Clean temporary files.
`,

  category: "Guides",

  image: "/images/windows11.jpg",
  banner: "/images/windows-banner.png",

  author: "Jayanta Singha",

  publishedAt: "2026-07-26",

  readingTime: "5 min read",

  featured: false,

  tags: ["Windows 11"],
},
{
  slug: "best-android-phone",

  title: "Best Android Phones to Buy",

  description:
    "Top Android smartphones for every budget.",

  content: `
Choose a good processor.

AMOLED display.

Large battery.

Software updates.
`,

  category: "Guides",

  image: "/images/android.webp",
  banner: "/images/smartphone-banner.png",

  author: "Jayanta Singha",

  publishedAt: "2026-07-26",

  readingTime: "6 min read",

  featured: true,

  tags: ["Android"],
},
{
  slug: "laptop-buying-guide",

  title: "Laptop Buying Guide 2026",

  description:
    "How to choose the right laptop for work, study and gaming.",

  content: `
Always check

Processor

RAM

SSD

Battery

Display
`,

  category: "Guides",

  image: "/images/laptop.jpg",
  banner: "/images/windows-banner.png",

  author: "Jayanta Singha",

  publishedAt: "2026-07-26",

  readingTime: "8 min read",

  featured: true,

  tags: ["Laptop"],
},
];