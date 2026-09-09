import { CheckSquare, Clock, AlertCircle } from 'lucide-react';

export default function Projects() {
  const projects = [
    { id: 1, name: 'Website Redesign', status: 'Active', progress: 65, tasks: 12, completedTasks: 8, dueDate: 'Oct 15, 2026' },
    { id: 2, name: 'Q4 Marketing Campaign', status: 'Planning', progress: 15, tasks: 24, completedTasks: 3, dueDate: 'Nov 01, 2026' },
    { id: 3, name: 'Mobile App V2', status: 'On Hold', progress: 45, tasks: 30, completedTasks: 14, dueDate: 'Dec 10, 2026' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Projects & Tasks</h1>
          <p className="text-gray-400 mt-1">Track deliverables, tasks, and milestones.</p>
        </div>
        <button className="bg-emerald-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-emerald-400 transition-colors">
          New Project
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="glass-panel p-6 flex flex-col group hover:border-emerald-500/50 transition-all">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-gray-100 group-hover:text-emerald-400 transition-colors">{project.name}</h3>
              <span className={`px-2 py-1 rounded text-xs font-medium border ${
                project.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                project.status === 'Planning' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' :
                'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
              }`}>
                {project.status}
              </span>
            </div>
            
            <div className="space-y-4 flex-1">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-gray-200 font-medium">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.6)]" style={{ width: `${project.progress}%` }}></div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckSquare className="h-4 w-4 text-emerald-400" />
                  {project.completedTasks}/{project.tasks} Tasks
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Clock className="h-4 w-4 text-emerald-400" />
                  {project.dueDate}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-800 flex justify-between items-center">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className={`w-8 h-8 rounded-full border-2 border-gray-900 bg-gray-700 flex items-center justify-center text-xs font-bold ${i === 1 ? 'text-emerald-400' : 'text-gray-300'}`}>
                    U{i}
                  </div>
                ))}
              </div>
              <button className="text-sm font-medium text-emerald-400 hover:text-emerald-300">View Details</button>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-panel p-6 mt-6">
        <h2 className="text-lg font-bold text-gray-100 mb-4 flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-emerald-400" />
          My Upcoming Tasks
        </h2>
        <div className="divide-y divide-gray-800">
          {[
            { title: 'Review marketing copy', project: 'Q4 Marketing Campaign', due: 'Tomorrow' },
            { title: 'Client onboarding call', project: 'Website Redesign', due: 'Today, 2:00 PM' },
            { title: 'Update infrastructure docs', project: 'Internal', due: 'Oct 12, 2026' },
          ].map((task, i) => (
            <div key={i} className="py-4 flex items-start gap-4 hover:bg-gray-800/20 px-2 rounded-lg transition-colors group cursor-pointer">
              <div className="mt-1 w-5 h-5 rounded border border-gray-600 flex items-center justify-center group-hover:border-emerald-400 transition-colors"></div>
              <div className="flex-1">
                <p className="text-gray-200 font-medium group-hover:text-emerald-400 transition-colors">{task.title}</p>
                <p className="text-xs text-gray-500 mt-1">{task.project}</p>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded ${task.due.includes('Today') ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'text-gray-400 bg-gray-800'}`}>
                {task.due}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
