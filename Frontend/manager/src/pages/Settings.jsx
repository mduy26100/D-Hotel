import { SettingsIcon, User, Bell, Lock, Globe } from "lucide-react"
import Button from "../components/Button"
import Input from "../components/Input"
import { useOutletContext } from "react-router-dom";

export default function Settings() {
  const { user } = useOutletContext();

  if (!user) return <p>Loading...</p>;
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account and application settings</p>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <nav className="space-y-1">
              {[
                { icon: User, label: "Profile", active: true },
                { icon: Bell, label: "Notifications", active: false },
                { icon: Lock, label: "Security", active: false },
                { icon: Globe, label: "Preferences", active: false },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.label}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      item.active ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={user.avatarUrl || "/placeholder.svg"}
                  alt={user.firstName}
                  className="w-20 h-20 rounded-full object-cover border-4 border-gray-100"
                />
                <div>
                  <Button variant="outline" className="mb-2 bg-transparent">
                    Change Photo
                  </Button>
                  <p className="text-xs text-gray-500">JPG, PNG or GIF. Max size 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="First Name" defaultValue={user.firstName} />
                <Input label="Last Name" defaultValue={user.lastName} />
              </div>

              <Input label="Email" type="email" defaultValue={user.email} />
              <Input label="Phone" type="tel" defaultValue="12345678" />

              <div className="pt-4">
                <Button>Save Changes</Button>
              </div>
            </div>
          </div>

          {/* Hotel Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <SettingsIcon className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold text-gray-900">Hotel Settings</h2>
            </div>

            <div className="space-y-4">
              <Input label="Hotel Name" defaultValue="Grand Hotel" />
              <Input label="Address" defaultValue="123 Main Street, City" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Check-in Time" type="time" defaultValue="14:00" />
                <Input label="Check-out Time" type="time" defaultValue="11:00" />
              </div>

              <div className="pt-4">
                <Button>Update Settings</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
