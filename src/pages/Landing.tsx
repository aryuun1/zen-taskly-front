import { Link } from 'react-router-dom'
import { CheckCircle2, Calendar, Filter, Zap, ArrowRight, ListTodo } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

const features = [
  {
    icon: ListTodo,
    title: 'Task Management',
    description: 'Create, update, and delete tasks with titles and descriptions. Stay on top of everything.',
  },
  {
    icon: Calendar,
    title: 'Due Dates',
    description: 'Assign due dates to your tasks and never miss a deadline. Visual overdue indicators keep you informed.',
  },
  {
    icon: Filter,
    title: 'Smart Filtering',
    description: 'Filter tasks by status or due date instantly. See exactly what needs your attention right now.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Built with Redis caching for near-instant load times. Your tasks are always one click away.',
  },
]

export function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <CheckCircle2 className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold">Taskly</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link to="/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Get started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-gradient-to-br from-violet-100 via-purple-50 to-transparent opacity-60 blur-3xl" />
        </div>
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-1.5 text-sm text-purple-700 mb-6">
            <Zap className="h-3.5 w-3.5" />
            Simple. Fast. Focused.
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6">
            Get things{' '}
            <span className="bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text text-transparent">
              done
            </span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Taskly helps you organize your work, track progress, and hit deadlines —
            without the complexity of heavy project management tools.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="gap-2 px-8 h-12 text-base" asChild>
              <Link to="/signup">
                Start for free <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 text-base px-8" asChild>
              <Link to="/login">I have an account</Link>
            </Button>
          </div>
        </div>

        {/* Mock dashboard preview */}
        <div className="mx-auto mt-20 max-w-4xl">
          <div className="rounded-2xl border border-gray-200 bg-white shadow-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-yellow-400" />
              <div className="h-3 w-3 rounded-full bg-green-400" />
              <div className="ml-4 flex-1 h-6 rounded-md bg-gray-200/80 max-w-xs" />
            </div>
            <div className="p-6 space-y-3">
              {[
                { title: 'Design landing page mockups', status: 'completed', due: 'Feb 28' },
                { title: 'Set up authentication system', status: 'completed', due: 'Mar 1' },
                { title: 'Write API documentation', status: 'pending', due: 'Mar 5' },
                { title: 'Deploy to production', status: 'pending', due: 'Mar 10' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-lg border p-3 bg-gray-50/50"
                >
                  <div
                    className={`h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      item.status === 'completed'
                        ? 'border-emerald-500 bg-emerald-500'
                        : 'border-gray-300'
                    }`}
                  >
                    {item.status === 'completed' && (
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className={`flex-1 text-sm font-medium ${item.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                    {item.title}
                  </span>
                  <span className="text-xs text-gray-400">{item.due}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${item.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything you need
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              No bloat. No learning curve. Just a clean, fast way to manage your tasks.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-3">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-base">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ready to get organized?
          </h2>
          <p className="text-lg text-gray-500 mb-8">
            Join and start managing your tasks in seconds.
          </p>
          <Button size="lg" className="gap-2 px-10 h-12 text-base" asChild>
            <Link to="/signup">
              Create your account <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-6">
        <div className="mx-auto max-w-6xl flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary">
              <CheckCircle2 className="h-3 w-3 text-white" />
            </div>
            <span className="font-semibold text-gray-900">Taskly</span>
          </div>
          <p>Built with React + TypeScript</p>
        </div>
      </footer>
    </div>
  )
}
