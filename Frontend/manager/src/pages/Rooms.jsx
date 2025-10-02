import { Bed, Plus } from "lucide-react"

const rooms = [
  {
    id: 1,
    number: "101",
    type: "Standard",
    capacity: 2,
    price: "$150",
    status: "Available",
    image: "/standard-hotel-room.png",
  },
  {
    id: 2,
    number: "205",
    type: "Deluxe",
    capacity: 3,
    price: "$250",
    status: "Occupied",
    image: "/deluxe-hotel-room.png",
  },
  {
    id: 3,
    number: "310",
    type: "Suite",
    capacity: 4,
    price: "$400",
    status: "Available",
    image: "/hotel-room-suite.jpg",
  },
  {
    id: 4,
    number: "412",
    type: "Presidential",
    capacity: 6,
    price: "$800",
    status: "Available",
    image: "/hotel-room-presidential.jpg",
  },
  {
    id: 5,
    number: "508",
    type: "Standard",
    capacity: 2,
    price: "$150",
    status: "Maintenance",
    image: "/standard-hotel-room.png",
  },
  {
    id: 6,
    number: "615",
    type: "Deluxe",
    capacity: 3,
    price: "$250",
    status: "Available",
    image: "/deluxe-hotel-room.png",
  },
]

export default function Rooms() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Room Management</h1>
          <p className="text-gray-600">Manage hotel rooms and availability</p>
        </div>
        <button className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Room
        </button>
      </div>

      {/* Room Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <p className="text-sm text-gray-600 mb-1">Total Rooms</p>
          <p className="text-2xl font-bold text-gray-900">50</p>
        </div>
        <div className="bg-green-50 rounded-lg border border-green-200 p-4">
          <p className="text-sm text-green-700 mb-1">Available</p>
          <p className="text-2xl font-bold text-green-900">32</p>
        </div>
        <div className="bg-red-50 rounded-lg border border-red-200 p-4">
          <p className="text-sm text-red-700 mb-1">Occupied</p>
          <p className="text-2xl font-bold text-red-900">15</p>
        </div>
        <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-4">
          <p className="text-sm text-yellow-700 mb-1">Maintenance</p>
          <p className="text-2xl font-bold text-yellow-900">3</p>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
          >
            <img
              src={room.image || "/placeholder.svg"}
              alt={`Room ${room.number}`}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Bed className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-bold text-gray-900">Room {room.number}</h3>
                </div>
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    room.status === "Available"
                      ? "bg-green-100 text-green-800"
                      : room.status === "Occupied"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {room.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium text-gray-900">{room.type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Capacity:</span>
                  <span className="font-medium text-gray-900">{room.capacity} guests</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Price/night:</span>
                  <span className="font-bold text-primary">{room.price}</span>
                </div>
              </div>

              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 rounded-lg font-medium transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
