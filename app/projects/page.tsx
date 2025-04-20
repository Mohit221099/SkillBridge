"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Filter, ArrowUpRight, Bookmark, Eye, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProjectsPage() {
  const [projects] = useState([
    {
      id: 1,
      title: "AI-Powered Task Manager",
      description: "A smart task management application that uses AI to prioritize and categorize tasks automatically.",
      image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg",
      author: "Sarah Chen",
      authorImage: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
      technologies: ["React", "Python", "TensorFlow"],
      likes: 245,
      views: "1.2k",
      category: "AI/ML"
    },
    {
      id: 2,
      title: "Sustainable Energy Dashboard",
      description: "Real-time monitoring dashboard for renewable energy sources with predictive analytics.",
      image: "https://images.pexels.com/photos/159397/solar-panel-array-power-sun-electricity-159397.jpeg",
      author: "Michael Rodriguez",
      authorImage: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      technologies: ["Vue.js", "D3.js", "Node.js"],
      likes: 189,
      views: "856",
      category: "Data Visualization"
    },
    {
      id: 3,
      title: "Blockchain Voting System",
      description: "Secure and transparent voting system built on blockchain technology.",
      image: "https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg",
      author: "Alex Johnson",
      authorImage: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
      technologies: ["Solidity", "Ethereum", "Web3.js"],
      likes: 312,
      views: "1.5k",
      category: "Blockchain"
    }
  ]);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Explore Projects</h1>
            <p className="text-muted-foreground">
              Discover innovative projects from our talented community
            </p>
          </div>
          <Button asChild>
            <Link href="/projects/new">Share Your Project</Link>
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto] gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="latest">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="trending">Trending</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Featured Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            All Projects
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Web Development
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Mobile Apps
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            AI/ML
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Blockchain
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Data Science
          </Badge>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="group hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
                  >
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <img
                    src={project.authorImage}
                    alt={project.author}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium">{project.author}</span>
                </div>
                <CardTitle className="mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </CardTitle>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4" /> {project.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" /> {project.views}
                    </span>
                  </div>
                  <Badge variant="outline">{project.category}</Badge>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                  View Project <ArrowUpRight className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}