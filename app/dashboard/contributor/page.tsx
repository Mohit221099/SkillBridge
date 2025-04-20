"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Edit, Bookmark, Send, PlusCircle, Trophy, CalendarClock, Eye } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Define interfaces for mock data
interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  lastUpdated: string;
  likes: number;
  views: number;
  image: string;
  featured?: boolean;
}

interface Challenge {
  id: number;
  title: string;
  company: string;
  status: "in-progress" | "submitted" | "completed";
  dueDate?: string;
  submittedDate?: string;
  progress?: number;
  difficulty: string;
  prize: string;
}

interface SavedJob {
  id: number;
  title: string;
  company: string;
  location: string;
  postedDate: string;
  salary: string;
  skills: string[];
}

interface Message {
  id: number;
  from: string;
  company: string;
  preview: string;
  date: string;
  unread: boolean;
  avatar: string;
}

// StatCard props
interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}

// ChallengeStatusBadge props
interface ChallengeStatusBadgeProps {
  status: "in-progress" | "submitted" | "completed" | string;
}

export default function ContributorDashboard() {
  // Mock data with typed interfaces
  const [projects] = useState<Project[]>([
    {
      id: 1,
      title: "Personal Portfolio Website",
      description: "A responsive portfolio website built with Next.js and Tailwind CSS.",
      technologies: ["React", "Next.js", "Tailwind CSS"],
      lastUpdated: "2023-09-15T12:00:00",
      likes: 24,
      views: 156,
      image: "https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      featured: true,
    },
    {
      id: 2,
      title: "E-commerce Product Page",
      description: "A fully responsive product page with cart functionality.",
      technologies: ["HTML", "CSS", "JavaScript"],
      lastUpdated: "2023-08-22T10:30:00",
      likes: 18,
      views: 103,
      image: "https://images.pexels.com/photos/18505/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ]);

  const [challenges] = useState<Challenge[]>([
    {
      id: 1,
      title: "Build a Weather Dashboard",
      company: "WeatherTech Inc.",
      status: "in-progress",
      dueDate: "2023-10-30T23:59:59",
      progress: 65,
      difficulty: "intermediate",
      prize: "$250",
    },
    {
      id: 2,
      title: "Create a Responsive Landing Page",
      company: "StartupX",
      status: "submitted",
      submittedDate: "2023-09-25T14:22:00",
      difficulty: "beginner",
      prize: "$100",
    },
  ]);

  const [savedJobs] = useState<SavedJob[]>([
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechCorp",
      location: "Remote",
      postedDate: "2023-09-28T09:15:00",
      salary: "$80,000 - $100,000",
      skills: ["JavaScript", "React", "CSS"],
    },
    {
      id: 2,
      title: "UI/UX Designer",
      company: "DesignStudio",
      location: "New York, NY",
      postedDate: "2023-09-26T11:45:00",
      salary: "$70,000 - $90,000",
      skills: ["Figma", "UI Design", "User Research"],
    },
  ]);

  const [messages] = useState<Message[]>([
    {
      id: 1,
      from: "Sarah Johnson",
      company: "TechCorp",
      preview: "Hi! I saw your portfolio and was impressed with your React projects...",
      date: "2023-09-29T13:22:00",
      unread: true,
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 2,
      from: "Michael Rodriguez",
      company: "StartupX",
      preview: "Thanks for your submission to our challenge. We'd like to discuss...",
      date: "2023-09-28T09:45:00",
      unread: false,
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ]);

  // Format date to relative time
  const getRelativeTime = (dateString: string | undefined): string => {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid date";
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      if (diffInHours === 0) {
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        return `${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"} ago`;
      }
      return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
    } else if (diffInDays === 1) {
      return "Yesterday";
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <section className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, John!</h1>
            <p className="text-muted-foreground">Here's what's happening with your projects and challenges.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Link href="/profile/edit" className="flex items-center">
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Link>
            </Button>
            <Button>
              <Link href="/projects/new" className="flex items-center">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Project
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Project Views"
            value="259"
            change="+12% from last week"
            icon={<Eye className="h-5 w-5 text-blue-500" />}
          />
          <StatCard
            title="Completed Challenges"
            value="7"
            change="+2 this month"
            icon={<Trophy className="h-5 w-5 text-amber-500" />}
          />
          <StatCard
            title="Active Applications"
            value="3"
            change="1 new response"
            icon={<Send className="h-5 w-5 text-green-500" />}
          />
          <StatCard
            title="Upcoming Deadlines"
            value="2"
            change="Nearest: 3 days"
            icon={<CalendarClock className="h-5 w-5 text-red-500" />}
          />
        </div>
      </section>

      {/* Main Content Tabs */}
      <Tabs defaultValue="projects" className="space-y-4">
        <TabsList className="grid grid-cols-4 md:w-[400px]">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="jobs">Saved Jobs</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Your Projects</h2>
            <Button variant="outline" size="sm">
              <Link href="/projects" className="flex items-center">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="overflow-hidden group hover:shadow-md transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={1260}
                    height={750}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {project.featured && (
                    <Badge className="absolute top-2 right-2 bg-blue-600">Featured</Badge>
                  )}
                </div>
                <CardHeader className="pb-2">
                  <CardTitle>{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Updated {getRelativeTime(project.lastUpdated)}</span>
                    <div className="flex items-center gap-3">
                      <span>{project.views} views</span>
                      <span>{project.likes} likes</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    <Link href={`/projects/${project.id}`}>View Project</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}

            {/* Add New Project Card */}
            <Card className="border-dashed hover:shadow-md transition-shadow">
              <CardContent className="flex flex-col items-center justify-center h-full p-6">
                <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-4 mb-4">
                  <PlusCircle className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Add a New Project</h3>
                <p className="text-center text-sm text-muted-foreground mb-4">
                  Showcase your work to potential employers
                </p>
                <Button>
                  <Link href="/projects/new">Create Project</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Challenges Tab */}
        <TabsContent value="challenges" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Active Challenges</h2>
            <Button variant="outline" size="sm">
              <Link href="/challenges" className="flex items-center">
                Browse Challenges <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {challenges.map((challenge) => (
              <Card key={challenge.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{challenge.title}</CardTitle>
                      <CardDescription>By {challenge.company}</CardDescription>
                    </div>
                    <ChallengeStatusBadge status={challenge.status} />
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex gap-2">
                      <Badge variant="outline">{challenge.difficulty}</Badge>
                      <Badge variant="secondary">{challenge.prize}</Badge>
                    </div>
                    {challenge.status === "in-progress" && challenge.dueDate && (
                      <span className="text-sm text-muted-foreground">
                        Due: {new Date(challenge.dueDate).toLocaleDateString()}
                      </span>
                    )}
                    {challenge.status === "submitted" && (
                      <span className="text-sm text-muted-foreground">
                        Submitted: {getRelativeTime(challenge.submittedDate)}
                      </span>
                    )}
                  </div>

                  {challenge.status === "in-progress" && challenge.progress && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{challenge.progress}%</span>
                      </div>
                      <Progress value={challenge.progress} className="h-2" />
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    <Link href={`/challenges/${challenge.id}`}>
                      {challenge.status === "in-progress" ? "Continue Challenge" : "View Submission"}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}

            {/* Discover Challenges Card */}
            <Card className="border-dashed hover:shadow-md transition-shadow">
              <CardContent className="flex flex-col items-center justify-center h-full p-6">
                <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-4 mb-4">
                  <Trophy className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Discover Challenges</h3>
                <p className="text-center text-sm text-muted-foreground mb-4">
                  Participate in challenges to showcase your skills and win prizes
                </p>
                <Button variant="secondary">
                  <Link href="/challenges">Browse Challenges</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Saved Jobs Tab */}
        <TabsContent value="jobs" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Saved Jobs</h2>
            <Button variant="outline" size="sm">
              <Link href="/jobs" className="flex items-center">
                Browse Jobs <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {savedJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div>
                      <CardTitle>{job.title}</CardTitle>
                      <CardDescription>{job.company} • {job.location}</CardDescription>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Bookmark className="h-5 w-5" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="font-semibold text-sm mb-2">{job.salary}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {job.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Posted {getRelativeTime(job.postedDate)}
                  </p>
                </CardContent>
                <CardFooter className="flex gap-3">
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                  <Button size="sm" className="w-full">
                    Apply Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Messages Tab */}
        <TabsContent value="messages" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Recent Messages</h2>
            <Button variant="outline" size="sm">
              <Link href="/messages" className="flex items-center">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <ul className="divide-y divide-border">
                {messages.map((message) => (
                  <li key={message.id} className="p-4 hover:bg-muted/50 transition-colors">
                    <Link href={`/messages/${message.id}`} className="flex gap-4">
                      <div className="relative flex-shrink-0">
                        <Image
                          src={message.avatar}
                          alt={message.from}
                          width={48}
                          height={48}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        {message.unread && (
                          <span className="absolute top-0 right-0 w-3 h-3 bg-blue-600 rounded-full border-2 border-background"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <h4
                            className={`font-semibold truncate ${
                              message.unread ? "text-foreground" : "text-muted-foreground"
                            }`}
                          >
                            {message.from}
                          </h4>
                          <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                            {getRelativeTime(message.date)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{message.company}</p>
                        <p
                          className={`text-sm truncate ${
                            message.unread ? "text-foreground font-medium" : "text-muted-foreground"
                          }`}
                        >
                          {message.preview}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatCard({ title, value, change, icon }: StatCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <h3 className="text-2xl font-bold mb-1">{value}</h3>
            <p className="text-xs text-muted-foreground">{change}</p>
          </div>
          <div className="bg-primary/10 p-2 rounded-full">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function ChallengeStatusBadge({ status }: ChallengeStatusBadgeProps) {
  if (status === "in-progress") {
    return <Badge className="bg-amber-500">In Progress</Badge>;
  } else if (status === "submitted") {
    return <Badge className="bg-green-600">Submitted</Badge>;
  } else if (status === "completed") {
    return <Badge className="bg-blue-600">Completed</Badge>;
  } else {
    return <Badge variant="outline">Unknown</Badge>;
  }
}