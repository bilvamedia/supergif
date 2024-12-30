import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Cake, PartyPopper, Gift } from "lucide-react";

interface CategorySelectorProps {
  onSelect: (category: string) => void;
  selected: string;
}

const categories = [
  { id: "party", name: "Party & Celebration", icon: PartyPopper },
  { id: "food", name: "Food & Drinks", icon: Cake },
  { id: "fun", name: "Fun & Games", icon: Gift },
];

export const CategorySelector = ({ onSelect, selected }: CategorySelectorProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <Card
            key={category.id}
            className={`p-6 cursor-pointer transition-all hover:scale-105 ${
              selected === category.id
                ? "border-primary border-2"
                : "hover:border-primary"
            }`}
            onClick={() => onSelect(category.id)}
          >
            <div className="flex flex-col items-center space-y-4">
              <Icon className="w-12 h-12 text-primary animate-float" />
              <h3 className="text-lg font-semibold">{category.name}</h3>
            </div>
          </Card>
        );
      })}
    </div>
  );
};