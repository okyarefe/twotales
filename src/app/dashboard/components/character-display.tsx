"use client";

import { useState } from "react";
import type { Character, EquipmentItem } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/utils/utils";
import Image from "next/image";
//import { Progress } from "@/components/ui/progress";
import { Crown, Shirt, Zap, Footprints, Hand, Wand2 } from "lucide-react";

interface CharacterDisplayProps {
  character: Character;
  onEquipItem?: (item: EquipmentItem, slotType: string) => void;
}

export function CharacterDisplay({
  character,
  onEquipItem,
}: CharacterDisplayProps) {
  const [selectedItem, setSelectedItem] = useState<EquipmentItem | null>(null);

  const getEquipmentIcon = (type: string) => {
    switch (type) {
      case "head":
        return <Crown className="h-6 w-6" />;
      case "top":
        return <Shirt className="h-6 w-6" />;
      case "pants":
        return <Zap className="h-6 w-6" />;
      case "feet":
        return <Footprints className="h-6 w-6" />;
      case "leftHand":
        return <Hand className="h-6 w-6" />;
      case "rightHand":
        return <Wand2 className="h-6 w-6" />;
      default:
        return null;
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "border-gray-400 bg-gray-50";
      case "rare":
        return "border-blue-400 bg-blue-50";
      case "epic":
        return "border-purple-400 bg-purple-50";
      case "legendary":
        return "border-orange-400 bg-orange-50";
      default:
        return "border-gray-300 bg-gray-50";
    }
  };

  const EquipmentSlot = ({
    slotType,
    item,
  }: {
    slotType: string;
    item?: EquipmentItem;
  }) => {
    const canEquip = selectedItem && selectedItem.type === slotType;

    const handleSlotClick = () => {
      if (selectedItem && selectedItem.type === slotType && onEquipItem) {
        onEquipItem(selectedItem, slotType);
        setSelectedItem(null);
      }
    };

    return (
      <div
        className={cn(
          "w-20 h-20 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer",
          item ? getRarityColor(item.rarity) : "border-gray-300 bg-gray-50",
          canEquip && "border-green-500 bg-green-100 animate-pulse",
          "transition-all hover:scale-105"
        )}
        onClick={handleSlotClick}
      >
        {item ? (
          <>
            <Image
              src={item.icon || "/placeholder.svg"}
              alt={item.name}
              width={64}
              height={64}
              className="w-full h-full"
              loading="lazy"
            />
          </>
        ) : (
          <>
            {getEquipmentIcon(slotType)}
            <span className="text-xs text-muted-foreground mt-1 capitalize">
              {slotType}
            </span>
          </>
        )}
      </div>
    );
  };

  const handleInventoryItemClick = (item: EquipmentItem) => {
    setSelectedItem(selectedItem?.id === item.id ? null : item);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Character Equipment Layout */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center text-balance">
            {character.name} - Level {character.level}
          </CardTitle>
          {selectedItem && (
            <p className="text-sm text-center text-muted-foreground">
              Click on a {selectedItem.type} slot to equip {selectedItem.name}
            </p>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Experience Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Experience</span>
              <span>
                {character.experience}/{character.experienceToNext}
              </span>
            </div>
            {/* <Progress value={experiencePercentage} className="h-3" /> */}
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-center">Equipment Slots</h4>
            <div className="flex justify-between items-center">
              {/* Left side equipment slots */}
              <div className="flex flex-col gap-3">
                <EquipmentSlot
                  slotType="head"
                  item={character.equipment.head}
                />
                <EquipmentSlot slotType="top" item={character.equipment.top} />
                <EquipmentSlot
                  slotType="leftHand"
                  item={character.equipment.leftHand}
                />
              </div>

              {/* Right side equipment slots */}
              <div className="flex flex-col gap-3">
                <EquipmentSlot
                  slotType="rightHand"
                  item={character.equipment.rightHand}
                />
                <EquipmentSlot
                  slotType="pants"
                  item={character.equipment.pants}
                />
                <EquipmentSlot
                  slotType="feet"
                  item={character.equipment.feet}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Combined Character Stats and Inventory */}
      <div className="space-y-4">
        {/* Character Stats - More Compact */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex justify-between items-center p-2 bg-muted rounded">
                <span className="text-sm font-medium">Intelligence</span>
                <span className="text-lg font-bold text-foreground">
                  {character.stats.intelligence}
                </span>
              </div>
              <div className="flex justify-between items-center p-2 bg-muted rounded">
                <span className="text-sm font-medium">Focus</span>
                <span className="text-lg font-bold text-foreground">
                  {character.stats.focus}
                </span>
              </div>
              <div className="flex justify-between items-center p-2 bg-muted rounded">
                <span className="text-sm font-medium">Memory</span>
                <span className="text-lg font-bold text-foreground">
                  {character.stats.memory}
                </span>
              </div>
              <div className="flex justify-between items-center p-2 bg-muted rounded">
                <span className="text-sm font-medium">Speed</span>
                <span className="text-lg font-bold text-foreground">
                  {character.stats.speed}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Inventory */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              {/* <Package className="h-5 w-5" /> */}
              <span>Inventory</span>
              <span className="text-foreground">
                ({character.inventory.length})
              </span>
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Click items to select, then click equipment slots to equip
            </p>
          </CardHeader>
          <CardContent>
            {character.inventory.length > 0 ? (
              <div className="grid grid-cols-3 gap-2">
                {character.inventory.map((item, index) => (
                  <div
                    key={index}
                    className={cn(
                      "w-full h-16 border-2 rounded-lg flex flex-col items-center justify-center p-1 cursor-pointer",
                      getRarityColor(item.rarity),
                      selectedItem?.id === item.id &&
                        "ring-2 ring-blue-500 bg-blue-100",
                      "transition-all hover:scale-105"
                    )}
                    onClick={() => handleInventoryItemClick(item)}
                  >
                    <Image
                      src={item.icon || "/placeholder.svg"}
                      alt={item.name}
                      width={24}
                      height={24}
                      className="w-6 h-6 rounded"
                      loading="lazy"
                    />
                    <span className="text-xs font-medium text-center leading-tight">
                      {item.name.split(" ")[0]}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-4">
                {/* <Package className="h-8 w-8 mx-auto mb-2 opacity-50" /> */}
                <p className="text-sm">No items in inventory</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
