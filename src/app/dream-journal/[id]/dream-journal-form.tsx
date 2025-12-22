"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getStoryFeedback } from "@/actions/feedback";
import type { FeedbackResponse } from "@/services/openai/structured-outputs-schema/feedbackSchema";

type DreamJournalFormProps = {
  storyId: string;
  targetLanguage: string;
  storyCheckReference?: string;
  feedbackGenerated: boolean;
  existingFeedback?: any;
};

export function DreamJournalForm({
  storyId,
  targetLanguage,
  storyCheckReference,
  feedbackGenerated,
  existingFeedback,
}: DreamJournalFormProps) {
  const [userAnswer, setuserAnswer] = useState(existingFeedback?.user_answer || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackResponse | null>(
    existingFeedback?.feedback_data || null
  );
  
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!userAnswer.trim() || !storyCheckReference) return;

    setIsSubmitting(true);
    setError(null);
    setFeedback(null);

    try {
      const result = await getStoryFeedback({
        storyId,
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
          disabled={feedbackGenerated}
        />
      </div>
      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={!userAnswer.trim() || isSubmitting || !storyCheckReference || feedbackGenerated}
          variant="secondary"
        >
          {feedbackGenerated ? "Feedback Already Generated" : isSubmitting ? "Submitting..." : "Submit for Feedback"}
        </Button>
      </div>

      {feedbackGenerated && !feedback && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 text-sm">
          Loading your previous feedback...
        </div>
      )}

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
                  <li key={index} className="text-sm text-blue-800 space-y-1">
                    <div className="font-medium">{topic.topic}</div>
                    <div className="text-xs text-blue-700">
                      {topic.short_explanation}
                    </div>
                    <div className="mt-1 text-xs">
                      <div className="text-red-700">
                        Incorrect: {topic.example.incorrect || "—"}
                      </div>
                      <div className="text-green-700">
                        Correct: {topic.example.corrected || "—"}
                      </div>
                      <div className="text-muted text-xs">
                        {topic.example.explanation}
                      </div>
                    </div>
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
