"use client";

import { useGameState } from "@/hooks/use-game-state";
import { CharacterDisplay } from "@/app/dashboard/components/character-display";
//import { EquipmentShop } from "@/components/equipment-shop";

//import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { User, ShoppingBag } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProfileCharacterTabs() {
  const { character, progress, equipItem, upgradeItem } = useGameState();

  const handleEquipItem = (item: any, slotType: string) => {
    equipItem(item);
  };

  return (
    <div className="bg-background">
      <div className="container mx-auto p-4 space-y-6">
        {/* Header */}

        {/* Progress Dashboard */}
        {/* <ProgressDashboard progress={progress} /> */}

        {/* Main Content Tabs */}
        <Tabs defaultValue="character" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="character" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Character
            </TabsTrigger>
            <TabsTrigger value="shop" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              Shop
            </TabsTrigger>
          </TabsList>

          <TabsContent value="character" className="space-y-4">
            <CharacterDisplay
              character={character}
              onEquipItem={handleEquipItem}
            />
          </TabsContent>

          <TabsContent value="shop" className="space-y-4">
            {/* <EquipmentShop
              progress={progress}
              onPurchase={equipItem}
              onUpgrade={upgradeItem}
            /> */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
