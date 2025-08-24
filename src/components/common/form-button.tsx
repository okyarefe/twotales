import { Button } from "../ui/button";

interface FormButtonProps {
  children: React.ReactNode;
  isLoading: boolean;
}

export default function FormButton({ children, isLoading }: FormButtonProps) {
  return (
    <Button type="submit" disabled={isLoading}>
      {isLoading ? (
        <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
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
          Generating...
        </span>
      ) : (
        children
      )}
    </Button>
  );
}
