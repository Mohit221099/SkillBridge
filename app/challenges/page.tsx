"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Filter, Trophy, Clock, Users, ArrowUpRight, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ChallengesPage() {
  const [challenges] = useState([
    {
      id: 1,
      title: "Build a Real-time Chat Application",
      company: "TechCorp Solutions",
      companyLogo: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg",
      description: "Create a scalable real-time chat application using WebSocket technology.",
      prize: "$1,000",
      deadline: "2024-05-15",
      participants: 45,
      maxParticipants: 100,
      difficulty: "Intermediate",
      skills: ["React", "Node.js", "WebSocket"],
      status: "active"
    },
    {
      id: 2,
      title: "Design an Accessible Dashboard",
      company: "DesignHub",
      companyLogo: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg",
      description: "Design and implement an accessible dashboard following WCAG guidelines.",
      prize: "$750",
      deadline: "2024-05-20",
      participants: 32,
      maxParticipants: 50,
      difficulty: "Advanced",
      skills: ["UI/UX", "React", "Accessibility"],
      status: "active"
    },
    {
      id: 3,
      title: "Optimize E-commerce Performance",
      company: "ShopTech Inc",
      companyLogo: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg",
      description: "Improve the performance of an e-commerce website focusing on Core Web Vitals.",
      prize: "$1,500",
      deadline: "2024-05-25",
      participants: 28,
      maxParticipants: 75,
      difficulty: "Expert",
      skills: ["Performance", "Next.js", "Web Vitals"],
      status: "active"
    }
  ]);

  const getDaysRemaining = (deadline: string) => {
    const days = Math.ceil((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Coding Challenges</h1>
            <p className="text-muted-foreground">
              Showcase your skills and win prizes by solving real-world problems
            </p>
          </div>
          <Button asChild>
            <Link href="/challenges/post">Post a Challenge</Link>
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto] gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search challenges..."
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="deadline">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="deadline">Deadline</SelectItem>
                <SelectItem value="prize">Prize</SelectItem>
                <SelectItem value="participants">Participants</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Difficulty Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            All Levels
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Beginner
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Intermediate
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Advanced
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Expert
          </Badge>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {challenges.map((challenge) => (
            <Card key={challenge.id} className="group hover:shadow-lg transition-shadow">
              <CardHeader className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={challenge.companyLogo}
                      alt={challenge.company}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {challenge.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{challenge.company}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-muted-foreground">
                  {challenge.description}
                </p>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Trophy className="h-4 w-4" />
                      Prize
                    </div>
                    <p className="font-semibold">{challenge.prize}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      Deadline
                    </div>
                    <p className="font-semibold">{getDaysRemaining(challenge.deadline)} days left</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      Participants
                    </div>
                    <span>{challenge.participants}/{challenge.maxParticipants}</span>
                  </div>
                  <Progress value={(challenge.participants / challenge.maxParticipants) * 100} />
                </div>

                <div className="flex flex-wrap gap-2">
                  {challenge.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="px-6 pb-6">
                <Button className="w-full">
                  View Challenge <ArrowUpRight className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}