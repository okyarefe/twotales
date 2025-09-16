import { languages } from "./constants";

export interface Story {
  id: string;
  created_at: string;
  english_version: string;
  translated_version: string;
  level: languageLevel;
  length: storyLength;
  total_tokens: number;
  user_id: string;
  translate_to: string;
  title: string;
}

export interface UserData {
  id: string;
  email: string;
  role: string;
  membershipType: string;
  storyCredit: number;
  ttsCredit: number;
  storiesCreated: number;
}

type StoryInsert = Omit<Story, "id" | "created_at">;

export const languages = [
  "Turkish",
  "Finnish",
  "Spanish",
  "French",
  "German",
] as const;

type Language = (typeof languages)[number];

export type language = "Turkish" | "Finnish" | "Spanish" | "French" | "German";

export type languageLevel =
  | "daily"
  | "academic"
  | "formal"
  | "casual"
  | "technical";

export type storyLength = "short" | "medium" | "long";

export interface Character {
  id: string;
  name: string;
  level: number;
  experience: number;
  experienceToNext: number;
  equipment: Equipment;
  stats: CharacterStats;
  inventory: EquipmentItem[]; // added inventory to store unequipped items
}

export interface Equipment {
  head?: EquipmentItem;
  top?: EquipmentItem;
  pants?: EquipmentItem;
  feet?: EquipmentItem;
  leftHand?: EquipmentItem;
  rightHand?: EquipmentItem;
}

export interface EquipmentItem extends Item {
  type: "head" | "top" | "pants" | "feet" | "leftHand" | "rightHand";
  stats: Partial<CharacterStats>;
  price: number;
  upgradeFrom?: string;
  upgradeCost?: number;
}

export interface Item {
  id: string;
  name: string;
  type: "equipment" | "consumable" | "material"; // extend as needed
  rarity: "common" | "rare" | "epic" | "legendary";
  icon: string;
  description: string;
}

export interface UserProgress {
  points: number;
  totalPoints: number;
  streak: number;
  lessonsCompleted: number;
  achievements: Achievement[];
  character?: Character;
}
