"use client";

import { useState } from "react";
import type { Character, UserProgress, EquipmentItem } from "@/types";

const starterItems: EquipmentItem[] = [
  {
    id: "starter-1",
    name: "Ack's Cap",
    type: "head",
    rarity: "common",
    stats: { intelligence: 1 },
    price: 0,
    icon: "/starter_hat.png",
    description: "A simple magical learning cap",
  },
  // {
  //   id: "starter-2",
  //   name: "Traveler's Boots",
  //   type: "feet",
  //   rarity: "common",
  //   stats: { speed: 1 },
  //   price: 0,
  //   icon: "/swift-boots-fantasy-footwear.jpg",
  //   description: "Comfortable boots for magical journeys",
  // },
  {
    id: "starter-3",
    name: "Starter Wand",
    type: "rightHand",
    rarity: "common",
    stats: { intelligence: 1 },
    price: 0,
    icon: "/starter_wand.png",
    description: "A basic wand for aspiring mages",
  },
];

const initialCharacter: Character = {
  id: "1",
  name: "Linguist",
  level: 1,
  experience: 0,
  experienceToNext: 100,
  equipment: {
    head: starterItems[0],
    feet: starterItems[1],
  },
  stats: {
    intelligence: 11,
    focus: 8,
    memory: 12,
    speed: 7,
  },
  inventory: [...starterItems],
};

const initialProgress: UserProgress = {
  points: 150,
  totalPoints: 150,
  streak: 3,
  lessonsCompleted: 5,
  achievements: [],
  character: undefined,
};

export function useGameState() {
  const [character, setCharacter] = useState<Character>(initialCharacter);
  const [progress, setProgress] = useState<UserProgress>({
    ...initialProgress,
    character: initialCharacter,
  });

  const equipItem = (item: EquipmentItem) => {
    if (progress.points >= item.price) {
      if (item.price > 0) {
        setProgress((prev) => ({
          ...prev,
          points: prev.points - item.price,
        }));
      }

      setCharacter((prev) => {
        const currentEquipped =
          prev.equipment[item.type as keyof typeof prev.equipment];
        const statChanges = {
          intelligence:
            (item.stats.intelligence || 0) -
            (currentEquipped?.stats.intelligence || 0),
          focus: (item.stats.focus || 0) - (currentEquipped?.stats.focus || 0),
          memory:
            (item.stats.memory || 0) - (currentEquipped?.stats.memory || 0),
          speed: (item.stats.speed || 0) - (currentEquipped?.stats.speed || 0),
        };

        const updatedCharacter = {
          ...prev,
          equipment: {
            ...prev.equipment,
            [item.type]: item,
          },
          stats: {
            intelligence: prev.stats.intelligence + statChanges.intelligence,
            focus: prev.stats.focus + statChanges.focus,
            memory: prev.stats.memory + statChanges.memory,
            speed: prev.stats.speed + statChanges.speed,
          },
          inventory:
            item.price > 0 && !prev.inventory.find((i) => i.id === item.id)
              ? [...prev.inventory, item]
              : prev.inventory,
        };

        setProgress((prevProgress) => ({
          ...prevProgress,
          character: updatedCharacter,
        }));

        return true;
      });
    }
    return false;
  };

  const completeLesson = (pointsEarned: number, experienceEarned: number) => {
    setProgress((prev) => ({
      ...prev,
      points: prev.points + pointsEarned,
      totalPoints: prev.totalPoints + pointsEarned,
      lessonsCompleted: prev.lessonsCompleted + 1,
    }));

    setCharacter((prev) => {
      const newExperience = prev.experience + experienceEarned;
      const levelUp = newExperience >= prev.experienceToNext;

      const updatedCharacter = {
        ...prev,
        experience: levelUp
          ? newExperience - prev.experienceToNext
          : newExperience,
        level: levelUp ? prev.level + 1 : prev.level,
        experienceToNext: levelUp
          ? prev.experienceToNext + 50
          : prev.experienceToNext,
      };

      setProgress((prevProgress) => ({
        ...prevProgress,
        character: updatedCharacter,
      }));

      return updatedCharacter;
    });
  };

  const upgradeItem = (newItem: EquipmentItem) => {
    if (!newItem.upgradeFrom || !newItem.upgradeCost) return false;

    const hasBaseItem = character.inventory.some(
      (item) => item.id === newItem.upgradeFrom
    );
    const canAffordUpgrade = progress.points >= newItem.upgradeCost;

    if (hasBaseItem && canAffordUpgrade) {
      setProgress((prev) => ({
        ...prev,
        points: prev.points - newItem.upgradeCost!,
      }));

      setCharacter((prev) => {
        // Remove the base item and add the upgraded item
        const newInventory = prev.inventory.filter(
          (item) => item.id !== newItem.upgradeFrom
        );
        newInventory.push(newItem);

        // If the base item was equipped, equip the new item
        const wasEquipped =
          prev.equipment[newItem.type as keyof typeof prev.equipment]?.id ===
          newItem.upgradeFrom;
        let newEquipment = prev.equipment;
        let newStats = prev.stats;

        if (wasEquipped) {
          const oldItem =
            prev.equipment[newItem.type as keyof typeof prev.equipment];
          newEquipment = {
            ...prev.equipment,
            [newItem.type]: newItem,
          };

          // Update stats
          const statChanges = {
            intelligence:
              (newItem.stats.intelligence || 0) -
              (oldItem?.stats.intelligence || 0),
            focus: (newItem.stats.focus || 0) - (oldItem?.stats.focus || 0),
            memory: (newItem.stats.memory || 0) - (oldItem?.stats.memory || 0),
            speed: (newItem.stats.speed || 0) - (oldItem?.stats.speed || 0),
          };

          newStats = {
            intelligence: prev.stats.intelligence + statChanges.intelligence,
            focus: prev.stats.focus + statChanges.focus,
            memory: prev.stats.memory + statChanges.memory,
            speed: prev.stats.speed + statChanges.speed,
          };
        }

        const updatedCharacter = {
          ...prev,
          inventory: newInventory,
          equipment: newEquipment,
          stats: newStats,
        };

        setProgress((prevProgress) => ({
          ...prevProgress,
          character: updatedCharacter,
        }));

        return updatedCharacter;
      });
      return true;
    }
    return false;
  };

  return {
    character,
    progress,
    equipItem,
    completeLesson,
    upgradeItem,
  };
}
