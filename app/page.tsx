import Link from "next/link";
import { ArrowRight, Code, Briefcase, Users, Trophy, LineChart } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-6 py-24 md:py-32 overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Connect. Build. <span className="text-blue-600 dark:text-blue-400">Grow.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mb-8">
              The platform where talented contributors meet opportunity creators. Showcase your skills, solve challenges, and build your career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/register?role=contributor" 
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                Join as Contributor <ArrowRight className="h-4 w-4" />
              </Link>
              <Link 
                href="/register?role=hirer" 
                className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
              >
                Join as Hirer <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Why join our community?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Code className="h-8 w-8 text-blue-500" />}
              title="Showcase Projects" 
              description="Upload and highlight your best work to attract potential employers." 
            />
            <FeatureCard 
              icon={<Trophy className="h-8 w-8 text-amber-500" />}
              title="Solve Challenges" 
              description="Participate in real-world challenges posted by companies looking for talent." 
            />
            <FeatureCard 
              icon={<Briefcase className="h-8 w-8 text-purple-500" />}
              title="Find Opportunities" 
              description="Connect directly with companies offering jobs and internships." 
            />
            <FeatureCard 
              icon={<Users className="h-8 w-8 text-green-500" />}
              title="Build Relationships" 
              description="Network with peers and industry professionals to grow your career." 
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-secondary/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            How It Works
          </h2>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-16">
            Our platform connects talented individuals with companies looking for fresh ideas and skills.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="bg-background rounded-xl p-8 shadow-lg transform transition-all duration-300 hover:scale-105">
              <h3 className="text-2xl font-bold text-blue-600 mb-4">For Contributors</h3>
              <ul className="space-y-4">
                <ProcessStep number="1" text="Create a profile showcasing your skills and experience" />
                <ProcessStep number="2" text="Upload projects to build your portfolio" />
                <ProcessStep number="3" text="Participate in challenges posted by companies" />
                <ProcessStep number="4" text="Get noticed by potential employers" />
                <ProcessStep number="5" text="Receive job and internship opportunities directly" />
              </ul>
              <div className="mt-8">
                <Link 
                  href="/register?role=contributor" 
                  className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 w-full"
                >
                  Start Contributing <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            
            <div className="bg-background rounded-xl p-8 shadow-lg transform transition-all duration-300 hover:scale-105">
              <h3 className="text-2xl font-bold text-purple-600 mb-4">For Hirers</h3>
              <ul className="space-y-4">
                <ProcessStep number="1" text="Create a company profile" />
                <ProcessStep number="2" text="Post challenges and tasks for contributors" />
                <ProcessStep number="3" text="Review submissions and contributors' portfolios" />
                <ProcessStep number="4" text="Connect with promising talent" />
                <ProcessStep number="5" text="Build relationships that lead to successful hires" />
              </ul>
              <div className="mt-8">
                <Link 
                  href="/register?role=hirer" 
                  className="px-5 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 w-full"
                >
                  Start Hiring <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <StatCard number="10,000+" label="Contributors" icon={<Users className="h-8 w-8" />} />
            <StatCard number="500+" label="Hiring Companies" icon={<Briefcase className="h-8 w-8" />} />
            <StatCard number="2,500+" label="Successful Matches" icon={<LineChart className="h-8 w-8" />} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to join our growing community?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Whether you're looking to showcase your skills or find fresh talent, our platform connects the right people.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/register?role=contributor" 
              className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              Sign Up as Contributor
            </Link>
            <Link 
              href="/register?role=hirer" 
              className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              Sign Up as Hirer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-background p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function ProcessStep({ number, text }) {
  return (
    <li className="flex items-start gap-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
        {number}
      </div>
      <p className="pt-1">{text}</p>
    </li>
  );
}

function StatCard({ number, label, icon }) {
  return (
    <div className="p-8 rounded-xl bg-primary/5 flex flex-col items-center justify-center">
      <div className="mb-3 text-primary">{icon}</div>
      <p className="text-3xl font-bold mb-1">{number}</p>
      <p className="text-muted-foreground">{label}</p>
    </div>
  );
}