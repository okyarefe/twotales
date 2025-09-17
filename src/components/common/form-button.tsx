import { Button } from "../ui/button";

interface FormButtonProps {
  children: React.ReactNode;
  isLoading: boolean;
  loadingText?: string;
  onClick?: () => void;
}

export default function FormButton({
  children,
  isLoading,
  loadingText = "Generating...",
  onClick,
}: FormButtonProps) {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      variant="createStory"
      onClick={onClick}
    >
      {isLoading ? (
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "white",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 50 50"
            style={{ animation: "spin 1s linear infinite" }}
          >
            <circle
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke="#888"
              strokeWidth="5"
              strokeDasharray="90"
              strokeDashoffset="60"
            />
            <style>
              {`
                @keyframes spin {
                  100% { transform: rotate(360deg); }
                }
              `}
            </style>
          </svg>
          {loadingText}
        </span>
      ) : (
        children
      )}
    </Button>
  );
}
