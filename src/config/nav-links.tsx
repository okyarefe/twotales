import { BookOpen, CreditCard, Home, HelpCircle, Mail } from "lucide-react";

export const publicLinks = [
  {
    href: "/how-it-works",
    label: "How It Works",
    icon: <HelpCircle className="w-5 h-5" />,
  },
  {
    href: "/contact",
    label: "Contact",
    icon: <Mail className="w-5 h-5" />,
  },
];

export const privateLinks = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: <Home className="w-5 h-5" />,
  },
  {
    href: "/stories",
    label: "My Stories",
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    href: "/credits",
    label: "Get Credits",
    icon: <CreditCard className="w-4 h-4" />,
  },
  {
    href: "/flashcards",
    label: "Flashcards",
    icon: <CreditCard className="w-4 h-4" />,
  },
];
