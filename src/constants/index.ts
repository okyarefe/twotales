export const languages = [
  "Turkish",
  "Finnish",
  "Spanish",
  "French",
  "German",
] as const;

export const grammarTopics = [
  "Prepositions",
  "Phrasal Verbs",
  "Articles (a, an, the)",
  "Adjectives",
  "Adverbs",
  "Comparatives & Superlatives",
  "Conditionals",
  "Modal Verbs",
  "Passive Voice",
  "Relative Clauses",
  "Question Formation",
  "Pronouns",
  "Conjunctions",
  "Word Order",
  "Reported Speech",
] as const;

export const WRITERS = [
  "William Shakespeare",
  "Jane Austen",
  "Mark Twain",
  "J.K. Rowling",
  "Leo Tolstoy",
  "Gabriel Garcia Marquez",
];

export const languageLevels = ["A1", "A2", "B1", "B2", "C1/C2"] as const;

export const languageLevelDescriptions: Record<string, string> = {
  A1: "Beginner - Use only present simple tense. Use short sentences (max 8 words). Use high-frequency vocabulary (top 500 words). No metaphors or idioms.",
  A2: "Elementary - Allow simple past and future tense. Sentences can be joined with 'and' or 'but'. Focus on daily routines and personal information.",
  B1: "Intermediate - Introduce present perfect tense and conditionals (if...). Vocabulary can include opinions, dreams, and standard travel/work situations.",
  B2: "Upper Intermediate - Use complex sentences with relative clauses. Allow abstract topics and technical discussions. Idioms are allowed but should be common.",
  "C1/C2":
    "Advanced - Use nuanced vocabulary, idiomatic expressions, and complex grammatical structures. Focus on implicit meaning, irony, or professional topics.",
};
