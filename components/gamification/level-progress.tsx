"use client";

import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import type { Level } from "@/lib/types";

interface LevelProgressProps {
  level: Level;
}

export function LevelProgress({ level }: LevelProgressProps) {
  const progress = (level.experience / level.nextLevelExperience) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Badge variant="secondary" className="bg-blue-500 text-white">
          Level {level.current}
        </Badge>
        <span className="text-sm text-muted-foreground">
          {level.experience} / {level.nextLevelExperience} XP
        </span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
}