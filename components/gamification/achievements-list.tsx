"use client";

import { Trophy } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type { Achievement } from "@/lib/types";

interface AchievementsListProps {
  achievements: Achievement[];
}

export function AchievementsList({ achievements }: AchievementsListProps) {
  return (
    <div className="space-y-4">
      {achievements.map((achievement) => (
        <div
          key={achievement.id}
          className={`p-4 rounded-lg border ${
            achievement.completed
              ? "bg-green-500/10 border-green-500/20"
              : "bg-background border-border"
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="text-2xl">{achievement.icon}</div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{achievement.name}</h4>
                <span className="text-sm text-muted-foreground">
                  {achievement.points} XP
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                {achievement.description}
              </p>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>
                    {achievement.progress} / {achievement.maxProgress}
                  </span>
                </div>
                <Progress
                  value={(achievement.progress / achievement.maxProgress) * 100}
                  className="h-2"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}