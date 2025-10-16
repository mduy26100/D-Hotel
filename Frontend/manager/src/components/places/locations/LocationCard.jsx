import { MapPin, Trash2, Pencil } from "lucide-react";

export default function LocationCard({ location, onEdit, onDelete }) {
  return (
    <div className="bg-white text-gray-800 rounded-2xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Ảnh */}
      <div className="relative">
        <img
          src={location.imgUrl}
          alt={location.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2 text-sm text-gray-800 font-medium shadow-sm">
          <MapPin className="w-4 h-4 text-blue-500" />
          <span>{location.name}</span>
        </div>
      </div>

      {/* Nội dung */}
      <div className="p-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold truncate">{location.name}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(location)}
            className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(location)}
            className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
