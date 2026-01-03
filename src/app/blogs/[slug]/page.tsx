import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";

const blogContent = {
  "how-to-learn-a-language-by-reading-what-you-actually-love": {
    id: "1",
    slug: "how-to-learn-a-language-by-reading-what-you-actually-love",
    title:
      "How to actually learn a language easily by reading what you actually love",
    excerpt:
      "Stop waiting until you're fluent to read about your passions. Learn the science behind the i+1 method and how TwoTalesAI helps you stay in the Goldilocks zone of language learning.",
    author: "TwoTales Team",
    date: "2026-01-03",
    readTime: 5,
    category: "Language Learning",
    content: `It&apos;s not your fault you quit learning languages (It&apos;s just boring) and they try to teach you with the wrong method.

You promised yourself you would learn a new language this year. You started strong. You did the lessons.

But then, weeks went by, and you stopped.

Now, you probably think the problem is you. You think you don&apos;t have enough discipline. You think you&apos;re &quot;not a language person.&quot; You feel guilty about it.

I have good news for you: You aren&apos;t lazy. You are just bored.

The human brain is an efficiency machine. It is designed to ignore things that are dull, repetitive, or irrelevant to your survival.

When you force yourself to read a generic textbook story about &quot;ordering a train ticket&quot; or &quot;describing your living room,&quot; your brain is fighting you. It wants to go to sleep.

You don&apos;t quit because the language is too hard. You quit because the content isn&apos;t interesting enough to keep you awake.

## The secret ingredient is &quot;Obsession&quot;

Think about how you learned your native language. You didn&apos;t do it by memorizing tables. You did it by consuming stories, cartoons, and conversations that you actually wanted to hear.

Engagement is the fuel of learning.

If you are reading a story that is genuinely exciting, a mystery, a romance, a deep dive into a hobby you love, you stop noticing the grammar. You stop counting the minutes. You want to know what happens next.

When you are interested, the vocabulary sticks automatically because your brain tags it as &quot;important.&quot;

## The problem with traditional learning

If you want to learn Japanese because you love manga, you should be learning Japanese by reading manga, not by reading about a family going to the grocery store.

If you want to learn Spanish because you love football, you should be learning Spanish by reading about your favorite teams, not by reading about a cat sitting on a mat.

But until now, that was impossible. You couldn't find beginner-level books about specific, niche topics.

That is why I built TwoTalesAI.

I wanted to prove that you can learn a language by reading about things you actually care about.

## How to hack your engagement

Here is how you can use your own interests to trick your brain into learning faster:

### 1. Pick a topic you are actually passionate about

Don&apos;t ask &quot;what is easy to read?&quot; Ask &quot;what do I want to read?&quot; With TwoTalesAI, you can generate a story about anything.

Into Formula 1? Generate a race commentary.

Into Knitting? Generate a pattern guide.

Into True Crime? Generate a detective story.

### 2. Get the story at your level

Usually, reading about &quot;Quantum Physics&quot; in a foreign language would be impossible. But TwoTalesAI adjusts the vocabulary to match your exact level (A1-C2). You get the intellectual stimulation of an adult topic, with the simple grammar you need to understand it.

### 3. Forget you are studying

Because the translations are right there side-by-side, you never have to break your focus to look up a word. You just read.

## Stop Making It a Chore

If you dread your study time, you are doing it wrong.

Language learning shouldn&apos;t feel like work. It should feel like reading your favorite blog or magazine.

Stop forcing yourself to be interested in boring textbooks. Start reading stories that actually matter to you.`,
  },
};

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = blogContent[slug as keyof typeof blogContent];

  if (!blog) {
    return {
      title: "Blog Post Not Found | TwoTales",
    };
  }

  return {
    title: `${blog.title} | TwoTales`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: "article",
      publishedTime: blog.date,
      authors: [blog.author],
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(blogContent).map((slug) => ({
    slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const blog = blogContent[slug as keyof typeof blogContent];

  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Link
          href="/blogs"
          className="inline-flex items-center text-purple-600 hover:text-purple-800 font-semibold mb-8 transition-colors"
        >
          ← Back to Blog
        </Link>

        {/* Article Container */}
        <article className="bg-white rounded-xl shadow-2xl overflow-hidden border-t-4 border-t-purple-600">
          <div className="bg-gradient-to-r from-purple-50 to-transparent p-6 sm:p-12 border-b border-gray-100">
            {/* Category Badge */}
            <div className="mb-4">
              <span className="inline-block px-4 py-1.5 text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-purple-700 rounded-full shadow-md">
                {blog.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
              {blog.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 pb-0">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                <span className="font-semibold text-gray-700">
                  {blog.author}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                <time dateTime={blog.date} className="text-gray-600">
                  {new Date(blog.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                <span className="text-gray-600">{blog.readTime} min read</span>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-12">
            {/* Content */}
            <div className="max-w-none text-gray-700 leading-relaxed">
              {blog.content.split("\n").map((paragraph, index) => {
                // Handle headings
                if (paragraph.startsWith("## ")) {
                  return (
                    <div key={index} className="mt-10 mb-6">
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-purple-600 to-purple-400 rounded-full"></span>
                        <span className="pl-5">
                          {paragraph.replace("## ", "")}
                        </span>
                      </h2>
                    </div>
                  );
                }
                if (paragraph.startsWith("### ")) {
                  return (
                    <h3
                      key={index}
                      className="text-lg font-bold text-gray-900 mt-8 mb-4 flex items-center gap-2"
                    >
                      <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                      {paragraph.replace("### ", "")}
                    </h3>
                  );
                }
                // Skip empty paragraphs
                if (!paragraph.trim()) {
                  return <div key={index} className="h-4" />;
                }
                // Check if paragraph looks like a key insight
                const isKeyInsight =
                  paragraph.includes("?") &&
                  (paragraph.length < 150 || paragraph.split(" ").length < 25);

                // Regular paragraphs
                return (
                  <p
                    key={index}
                    className={`mb-5 leading-8 ${
                      isKeyInsight
                        ? "border-l-3 border-l-purple-400 pl-4 text-gray-700 italic"
                        : "text-gray-700"
                    }`}
                  >
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </div>
        </article>

        {/* Related Posts or CTA */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-10 text-center shadow-xl text-white">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to transform your language learning?
            </h3>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Stop waiting until you&apos;re fluent. Start reading about what
              you love today with TwoTales AI.
            </p>
            <Link
              href="/dashboard"
              className="inline-block px-8 py-4 bg-white text-purple-600 font-bold rounded-lg hover:bg-purple-50 transition-all transform hover:scale-105 shadow-lg"
            >
              Get Started Now →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
