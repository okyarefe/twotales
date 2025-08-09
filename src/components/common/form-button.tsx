// TODO: Change this to shadcn Button
import { Button } from "../ui/button";

interface FormButtonProps {
  children: React.ReactNode;
  isLoading: boolean;
}

export default function FormButton({ children, isLoading }: FormButtonProps) {
  console.log("Form Button ?");

  return <Button type="submit">{isLoading ? "Generating" : children}</Button>;
}
