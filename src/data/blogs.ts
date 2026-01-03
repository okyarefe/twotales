export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: number;
  category: string;
}

export const blogs: BlogPost[] = [
  {
    id: "1",
    slug: "how-to-learn-a-language-by-reading-what-you-actually-love",
    title: "How to Learn a Language by Reading What You Actually Love",
    excerpt: "Stop waiting until you're fluent to read about your passions. Learn the science behind the i+1 method and how TwoTalesAI helps you stay in the Goldilocks zone of language learning.",
    author: "TwoTales Team",
    date: "2026-01-03",
    readTime: 5,
    category: "Language Learning",
    content: `Let's be real for a second.

You finish your daily streak. You memorize the flashcards. You feel pretty good about your progress. Then you try to open a real book or read a news article in your target language, and you get crushed.

It's too fast. It's too hard. You spend more time looking up words in the dictionary than actually reading.

So, usually, you look for "Graded Readers." These are simplified books written for learners, and they can be incredibly helpful.

But here is the problem: Standard textbooks can't cover everything.

Maybe you love gardening. Maybe you are obsessed with sci-fi, or marketing, or 18th-century history. Finding a beginner-level textbook about those specific topics is almost impossible.

You end up in a difficult spot: The material you can read doesn't match your interests, and the material you want to read is too difficult.

This is why so many of us quit at the intermediate level. It's not a lack of discipline; it's a lack of relevant material.

## The "Goldilocks" Zone (i+1)

There's a concept in language learning called i+1.

It basically means you learn fastest when the content is just slightly harder than what you already know.

If it's too easy, you don't grow.

If it's too hard, you get frustrated.

The Sweet Spot: You understand 80% of the sentence, and you figure out the other 20% from context.

The goal is to find that sweet spot within the topics you are actually passionate about.

## How to fix it

I built TwoTalesAI to solve this exact problem. I wanted to practice reading, but I wanted to make sure the stories matched my personal interests.

The idea is simple: You shouldn't have to wait until you're fluent to read about the things you love.

Here is how you can use it to build your own library:

### 1. Read what interests YOU

Your brain retains information better when you are interested. If you love travel, generate a story about a road trip through Italy. If you love fantasy, generate a story about dragons. If you love coding, generate a text about Python.

You don't have to rely on a generic curriculum anymore. You get to choose the topic.

### 2. Control the difficulty

TwoTalesAI lets you set the difficulty to your exact level (A1 to C2). You get the specific topic you asked for, but written with grammar and vocabulary you can actually handle. It keeps you in that "Goldilocks" zone where learning happens naturally.

### 3. Ditch the dictionary

Constantly switching tabs to Google Translate breaks your flow. We put the translation right next to the text. If you get stuck, just glance over, get the meaning, and keep moving.

## Just Start Reading

You don't need more grammar drills. You need to get lost in a story that matters to you.

Language learning shouldn't feel like a chore. It should feel like reading. Whether you want to read about astrophysics or a cat who lost his hat—you should be able to do it at your own pace.`,
  },
];

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogs.find((blog) => blog.slug === slug);
}

export function getAllBlogs(): BlogPost[] {
  return blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
