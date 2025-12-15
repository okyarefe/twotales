"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getStoryFeedback } from "@/actions/feedback";
import type { FeedbackResponse } from "@/services/openai/structured-outputs-schema/feedbackSchema";

type DreamJournalFormProps = {
  targetLanguage: string;
  storyCheckReference?: string;
};

export function DreamJournalForm({
  targetLanguage,
  storyCheckReference,
}: DreamJournalFormProps) {
  const [userAnswer, setuserAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!userAnswer.trim() || !storyCheckReference) return;

    setIsSubmitting(true);
    setError(null);
    setFeedback(null);

    try {
      const result = await getStoryFeedback({
        userAnswer,
        storyCheckReference,
        targetLanguage,
      });

      if (result.success && result.feedback) {
        setFeedback(result.feedback);
      } else {
        setError(result.error || "Failed to get feedback");
      }
    } catch (error) {
      console.error("Error submitting story:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="user-story" className="block text-sm font-medium mb-2">
          Write the story in {targetLanguage}:
        </label>
        <Textarea
          id="user-story"
          value={userAnswer}
          onChange={(e) => setuserAnswer(e.target.value)}
          placeholder={`Write your version of the story in ${targetLanguage}...`}
          className="min-h-[300px] resize-y text-sm sm:text-base"
        />
      </div>
      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={!userAnswer.trim() || isSubmitting || !storyCheckReference}
          variant="secondary"
        >
          {isSubmitting ? "Submitting..." : "Submit for Feedback"}
        </Button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
          {error}
        </div>
      )}

      {/* Feedback Display */}
      {feedback && (
        <div className="space-y-4 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <div>
            <p className="text-sm font-medium text-blue-900 mb-2">
              {feedback.brief_feedback}
            </p>
            <p className="text-xs text-blue-700">
              Mistakes found: {feedback.mistakes_count}
            </p>
          </div>

          {feedback.topics_to_review.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-blue-900 mb-2">
                Topics to Review:
              </h3>
              <ul className="list-disc list-inside space-y-1">
                {feedback.topics_to_review.map((topic, index) => (
                  <li key={index} className="text-sm text-blue-800">
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
