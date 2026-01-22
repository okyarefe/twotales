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
    id: "2",
    slug: "stop-forcing-yourself-to-read-boring-spanish-stories",
    title: "Stop Forcing Yourself to Read Boring Spanish Stories",
    excerpt:
      "Most learning materials force you to read generic stories about the weather or grocery shopping. Discover how to learn Spanish by reading about topics you actually care about.",
    author: "TwoTales Team",
    date: "2026-01-04",
    readTime: 4,
    category: "Language Learning",
    content: `We all have things we love.

Maybe you are into gaming. Maybe you love fantasy novels, or sports, or music.

When you read about these topics in your native language, it doesn't feel like work. It feels fun. You can lose hours reading about a new game release or your favorite team.

But when you try to learn Spanish, that fun disappears.

Most learning materials force you to read generic, "safe" stories. You get stuck reading about:

The weather.

A trip to the grocery store.

Describing a living room.

It is hard to learn when you are bored.

When the story is dull, your brain checks out. You read the words, but you don't absorb them.

## The Secret: Read What You Already Love

The best way to learn Spanish is to connect it to the things you are already obsessed with.

If you love Sci-Fi, reading a story about space travel in Spanish is exciting. You want to know what happens next. You want to look up the word for "spaceship" or "planet."

The vocabulary sticks because it matters to you.

## How TwoTalesAI Changes the Game

We built TwoTalesAI so you don't have to settle for boring texts anymore.

You can create your own reading material that matches your specific personality.

### 1. You Pick the Topic

Forget the textbook topics. Tell TwoTalesAI what you find interesting.

"Write a story about a pro gamer winning a tournament."

"Write a mystery about a stolen diamond."

"Write a guide about soccer tactics."

Suddenly, you aren't just "studying Spanish." You are reading something cool.

### 2. It Matches Your Level

Usually, reading about complex topics (like gaming or sci-fi) is too hard for beginners. TwoTalesAI fixes this. It takes the cool topic you chose and writes it with grammar you can actually understand.

### 3. Translate Instantly

Don't break your focus by opening a dictionary app. We put the translation right next to the text. If you get stuck, check the meaning instantly and keep reading.

## Make Spanish Fun

Learning a language shouldn't feel like a chore. It should feel like exploring.

Stop reading generic stories that put you to sleep. Start reading stories that keep you awake.`,
  },
  {
    id: "1",
    slug: "how-to-learn-a-language-by-reading-what-you-actually-love",
    title: "How to Learn a Language by Reading What You Actually Love",
    excerpt:
      "Stop waiting until you're fluent to read about your passions. Learn the science behind the i+1 method and how TwoTalesAI helps you stay in the Goldilocks zone of language learning.",
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
  return blogs.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
