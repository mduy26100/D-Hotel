import { Modal, notification } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import LocationCard from "./LocationCard";
import { useDeleteLocation } from "../../../hooks/places/locations/useDeleteLocation";

const { confirm } = Modal;

export default function LocationList({ locations, loading, onEdit, refetch }) {
  const { deleteLocation } = useDeleteLocation();

  const handleDelete = (location) => {
    confirm({
      title: "Are you sure you want to delete this location?",
      icon: <ExclamationCircleFilled />,
      content: `This action will permanently delete "${location.name}".`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      centered: true,
      async onOk() {
        try {
          await deleteLocation(location.id);
          notification.success({
            message: "Location deleted successfully!",
          });
          if (refetch) await refetch();
        } catch (err) {
          notification.error({
            message: "Failed to delete location. Please try again.",
          });
          console.error(err);
        }
      },
    });
  };

  if (loading) {
    return (
      <div className="text-center text-gray-400 py-10 animate-pulse">
        Loading locations...
      </div>
    );
  }

  if (locations.length === 0) {
    return (
      <div className="text-center text-gray-400 py-10">No locations found.</div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {locations.map((loc) => (
        <LocationCard
          key={loc.id}
          location={loc}
          onEdit={onEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
