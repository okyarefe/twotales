CREATE INDEX IF NOT EXISTS idx_flashcards_user_id
ON public.flashcards (user_id);

CREATE INDEX IF NOT EXISTS idx_flashcard_sentences_flashcard_id
ON public.flashcard_sentences (flashcard_id);