"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Filter, MapPin, Briefcase, Star, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ContributorsPage() {
  const [contributors] = useState([
    {
      id: 1,
      name: "Sarah Chen",
      title: "Full Stack Developer",
      location: "San Francisco, CA",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
      bio: "Passionate about building scalable web applications and mentoring junior developers.",
      experience: "5 years",
      rating: 4.9,
      reviews: 28,
      skills: ["React", "Node.js", "Python", "AWS"],
      availability: "Open to opportunities",
      featured: true
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      title: "Frontend Developer",
      location: "Remote",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      bio: "Specializing in creating beautiful and accessible user interfaces.",
      experience: "3 years",
      rating: 4.7,
      reviews: 15,
      skills: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
      availability: "Available for freelance",
      featured: false
    },
    {
      id: 3,
      name: "Emily Johnson",
      title: "UI/UX Designer",
      location: "London, UK",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
      bio: "Creating user-centered designs with a focus on accessibility and inclusivity.",
      experience: "4 years",
      rating: 4.8,
      reviews: 22,
      skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
      availability: "Open to full-time",
      featured: true
    }
  ]);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Find Contributors</h1>
            <p className="text-muted-foreground">
              Connect with talented developers and designers for your projects
            </p>
          </div>
          <Button asChild>
            <Link href="/contributors/become">Become a Contributor</Link>
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto] gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, skills, or location..."
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="rating">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Top Rated</SelectItem>
                <SelectItem value="experience">Experience</SelectItem>
                <SelectItem value="reviews">Most Reviews</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Skill Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            All Skills
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Frontend
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Backend
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Full Stack
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            UI/UX
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Mobile
          </Badge>
        </div>

        {/* Contributors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {contributors.map((contributor) => (
            <Card key={contributor.id} className="group hover:shadow-lg transition-shadow">
              <CardHeader className="p-6">
                <div className="flex gap-4">
                  <img
                    src={contributor.avatar}
                    alt={contributor.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                          {contributor.name}
                        </h3>
                        <p className="text-muted-foreground">{contributor.title}</p>
                      </div>
                      {contributor.featured && (
                        <Badge className="bg-blue-600">Featured</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" /> {contributor.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" /> {contributor.experience}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" /> {contributor.rating} ({contributor.reviews})
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <p className="text-muted-foreground mb-4">
                  {contributor.bio}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {contributor.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                    {contributor.availability}
                  </Badge>
                  <Button variant="outline" size="sm">
                    View Profile <ArrowUpRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}