"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Edit, Bell, PlusCircle, FileSpreadsheet, PieChart, Search, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function HirerDashboard() {
  // Mock data for active challenges
  const [challenges] = useState([
    {
      id: 1,
      title: "Build a Weather Dashboard",
      description: "Create a weather dashboard that displays current weather and 5-day forecast using OpenWeatherMap API.",
      deadline: "2023-10-30T23:59:59",
      participants: 18,
      submissions: 7,
      status: "active",
    },
    {
      id: 2,
      title: "E-commerce Product Page",
      description: "Design and implement a responsive product page with cart functionality.",
      deadline: "2023-11-15T23:59:59",
      participants: 24,
      submissions: 0,
      status: "active",
    },
  ]);

  // Mock data for analytics
  const [analyticsData] = useState([
    { name: 'Aug', applicants: 12, interviews: 5, hires: 2 },
    { name: 'Sep', applicants: 19, interviews: 8, hires: 3 },
    { name: 'Oct', applicants: 27, interviews: 12, hires: 0 },
  ]);

  // Mock data for top candidates
  const [topCandidates] = useState([
    {
      id: 1,
      name: "Alex Johnson",
      title: "Frontend Developer",
      matchScore: 92,
      skills: ["React", "TypeScript", "CSS"],
      status: "reviewed",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 2,
      name: "Maya Rodriguez",
      title: "UI/UX Designer",
      matchScore: 89,
      skills: ["Figma", "User Research", "Prototyping"],
      status: "new",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 3,
      name: "David Kim",
      title: "Full Stack Developer",
      matchScore: 85,
      skills: ["Node.js", "React", "MongoDB"],
      status: "contacted",
      avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ]);

  // Format date to relative time (e.g., "2 days ago")
  const getRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      if (diffInHours === 0) {
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
      }
      return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };
  
  // Calculate days remaining until a deadline
  const getDaysRemaining = (dateString) => {
    const deadline = new Date(dateString);
    const now = new Date();
    const diffInMs = deadline - now;
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    
    return diffInDays;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <section className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, TechCorp!</h1>
            <p className="text-muted-foreground">Here's what's happening with your challenges and candidates.</p>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="outline">
              <Link href="/company/edit">
                <Edit className="mr-2 h-4 w-4" />
                Edit Company Profile
              </Link>
            </Button>
            <Button asChild>
              <Link href="/challenges/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Post New Challenge
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Active Challenges" 
            value="2" 
            change="1 ending soon" 
            icon={<FileSpreadsheet className="h-5 w-5 text-purple-500" />} 
          />
          <StatCard 
            title="Total Applicants" 
            value="42" 
            change="+8 this week" 
            icon={<Users className="h-5 w-5 text-blue-500" />} 
          />
          <StatCard 
            title="Pending Reviews" 
            value="7" 
            change="3 new submissions" 
            icon={<Bell className="h-5 w-5 text-amber-500" />} 
          />
          <StatCard 
            title="Potential Matches" 
            value="12" 
            change="High match rate" 
            icon={<Search className="h-5 w-5 text-green-500" />} 
          />
        </div>
      </section>

      {/* Main Content Tabs */}
      <Tabs defaultValue="challenges" className="space-y-4">
        <TabsList className="grid grid-cols-3 md:w-[400px]">
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="candidates">Top Candidates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Challenges Tab */}
        <TabsContent value="challenges" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Active Challenges</h2>
            <Button asChild variant="outline" size="sm">
              <Link href="/challenges/manage">
                Manage All <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {challenges.map((challenge) => (
              <Card key={challenge.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>{challenge.title}</CardTitle>
                    <ChallengeStatusBadge status={challenge.status} />
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-muted-foreground mb-3">{challenge.description}</p>
                  
                  <div className="flex justify-between text-sm mb-2">
                    <div>
                      <span className="text-muted-foreground">Deadline: </span>
                      <span className="font-medium">{new Date(challenge.deadline).toLocaleDateString()}</span>
                      <span className="text-muted-foreground ml-2">({getDaysRemaining(challenge.deadline)} days left)</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Participants</span>
                        <span className="font-medium">{challenge.participants}</span>
                      </div>
                      <Progress value={(challenge.participants / 30) * 100} className="h-2" />
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Submissions</span>
                        <span className="font-medium">{challenge.submissions} / {challenge.participants}</span>
                      </div>
                      <Progress 
                        value={(challenge.submissions / challenge.participants) * 100} 
                        className="h-2"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-3">
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href={`/challenges/${challenge.id}/submissions`}>
                      View Submissions
                    </Link>
                  </Button>
                  <Button size="sm" className="w-full" asChild>
                    <Link href={`/challenges/${challenge.id}/edit`}>
                      Manage Challenge
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}

            {/* Create Challenge Card */}
            <Card className="border-dashed hover:shadow-md transition-shadow">
              <CardContent className="flex flex-col items-center justify-center h-full p-6">
                <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-4 mb-4">
                  <PlusCircle className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Create New Challenge</h3>
                <p className="text-center text-sm text-muted-foreground mb-4">
                  Post a challenge to find the perfect talent for your projects
                </p>
                <Button asChild>
                  <Link href="/challenges/new">Create Challenge</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Candidates Tab */}
        <TabsContent value="candidates" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Top Candidates</h2>
            <Button asChild variant="outline" size="sm">
              <Link href="/candidates">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <ul className="divide-y divide-border">
                {topCandidates.map((candidate) => (
                  <li key={candidate.id} className="p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start gap-4">
                      <img 
                        src={candidate.avatar} 
                        alt={candidate.name} 
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                          <div>
                            <h4 className="font-semibold">{candidate.name}</h4>
                            <p className="text-sm text-muted-foreground">{candidate.title}</p>
                          </div>
                          <div className="mt-1 sm:mt-0 sm:ml-2 flex items-center">
                            <div className="bg-green-100 dark:bg-green-900/30 rounded-full px-2 py-1 text-xs text-green-700 dark:text-green-300 font-medium">
                              {candidate.matchScore}% Match
                            </div>
                            <CandidateStatusBadge status={candidate.status} className="ml-2" />
                          </div>
                        </div>
                        
                        <div className="mt-2">
                          <div className="flex flex-wrap gap-2">
                            {candidate.skills.map((skill) => (
                              <Badge key={skill} variant="secondary">{skill}</Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mt-3 flex gap-2">
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/candidates/${candidate.id}`}>View Profile</Link>
                          </Button>
                          <Button size="sm" asChild>
                            <Link href={`/messages/new?recipient=${candidate.id}`}>Contact</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Hiring Performance</h2>
            <Button asChild variant="outline" size="sm">
              <Link href="/analytics">
                Detailed Reports <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recruiting Funnel (Last 3 Months)</CardTitle>
              <CardDescription>Track your applicants, interviews, and successful hires</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={analyticsData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="applicants" fill="hsl(var(--chart-1))" name="Applicants" />
                    <Bar dataKey="interviews" fill="hsl(var(--chart-2))" name="Interviews" />
                    <Bar dataKey="hires" fill="hsl(var(--chart-3))" name="Hires" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <AnalyticsStat 
                  label="Applicants" 
                  value="58" 
                  change="+18% vs. previous period" 
                  positive={true} 
                />
                <AnalyticsStat 
                  label="Interview Rate" 
                  value="43%" 
                  change="+7% vs. previous period" 
                  positive={true} 
                />
                <AnalyticsStat 
                  label="Time to Hire" 
                  value="18 days" 
                  change="-3 days vs. previous period" 
                  positive={true} 
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild className="w-full">
                <Link href="/analytics/export">
                  <PieChart className="mr-2 h-4 w-4" />
                  Export Full Report
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatCard({ title, value, change, icon }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <h3 className="text-2xl font-bold mb-1">{value}</h3>
            <p className="text-xs text-muted-foreground">{change}</p>
          </div>
          <div className="bg-primary/10 p-2 rounded-full">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ChallengeStatusBadge({ status }) {
  if (status === "active") {
    return <Badge className="bg-green-600">Active</Badge>;
  } else if (status === "draft") {
    return <Badge variant="outline">Draft</Badge>;
  } else if (status === "completed") {
    return <Badge className="bg-blue-600">Completed</Badge>;
  } else {
    return <Badge variant="outline">Unknown</Badge>;
  }
}

function CandidateStatusBadge({ status, className = "" }) {
  if (status === "new") {
    return <Badge variant="outline" className={className}>New</Badge>;
  } else if (status === "reviewed") {
    return <Badge className={`bg-blue-600 ${className}`}>Reviewed</Badge>;
  } else if (status === "contacted") {
    return <Badge className={`bg-purple-600 ${className}`}>Contacted</Badge>;
  } else if (status === "hired") {
    return <Badge className={`bg-green-600 ${className}`}>Hired</Badge>;
  } else {
    return <Badge variant="outline" className={className}>Unknown</Badge>;
  }
}

function AnalyticsStat({ label, value, change, positive }) {
  return (
    <div className="text-center p-3 bg-muted/50 rounded-lg">
      <p className="text-sm text-muted-foreground mb-1">{label}</p>
      <p className="text-xl font-bold mb-1">{value}</p>
      <p className={`text-xs ${positive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
        {change}
      </p>
    </div>
  );
}