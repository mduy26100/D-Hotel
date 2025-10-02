import { Bell, Search } from "lucide-react"

export default function Header({ user }) {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {user && (
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <img
              src={user.avatarUrl || "/placeholder.svg?height=40&width=40&query=user+avatar"}
              alt={user.firstName}
              className="w-9 h-9 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-gray-500">{user.roles?.[0] || "Manager"}</p>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
