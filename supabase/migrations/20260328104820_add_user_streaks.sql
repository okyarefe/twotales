-- User streaks table for tracking daily engagement
CREATE TABLE IF NOT EXISTS "public"."user_streaks" (
    "user_id" "uuid" NOT NULL,
    "current_streak" integer DEFAULT 0 NOT NULL,
    "longest_streak" integer DEFAULT 0 NOT NULL,
    "last_active_date" date,
    CONSTRAINT "user_streaks_pkey" PRIMARY KEY ("user_id"),
    CONSTRAINT "user_streaks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE
);

ALTER TABLE "public"."user_streaks" OWNER TO "postgres";

-- RLS: users can only read their own streak
ALTER TABLE "public"."user_streaks" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own streak"
    ON "public"."user_streaks" FOR SELECT
    TO "authenticated"
    USING (("auth"."uid"() = "user_id"));

-- Grants (matching your existing pattern)
GRANT ALL ON TABLE "public"."user_streaks" TO "anon";
GRANT ALL ON TABLE "public"."user_streaks" TO "authenticated";
GRANT ALL ON TABLE "public"."user_streaks" TO "service_role";
