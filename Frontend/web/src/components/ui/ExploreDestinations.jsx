import { useEffect, useRef } from "react";

const destinations = [
  { id: 1, name: "Hà Nội", image: "https://images.unsplash.com/photo-1552634971-9f30eecd01e8" },
  { id: 2, name: "Đà Nẵng", image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e" },
  { id: 3, name: "Đà Lạt", image: "https://images.unsplash.com/photo-1600210491894-4c5d30c101d7" },
  { id: 4, name: "Phú Quốc", image: "https://images.unsplash.com/photo-1589308078050-106c9e5b6c84" },
  { id: 5, name: "Nha Trang", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" },
  { id: 6, name: "Hội An", image: "https://images.unsplash.com/photo-1590362891991-f776e747a2b9" },
  { id: 7, name: "Sapa", image: "https://images.unsplash.com/photo-1518684079-3c830dcef090" },
  { id: 8, name: "TP. Hồ Chí Minh", image: "https://images.unsplash.com/photo-1583394838336-acd977736f90" },
];

export default function ExploreDestinations() {
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const isUserInteracting = useRef(false);

  // Tự động cuộn khi không tương tác
  useEffect(() => {
    const container = scrollRef.current;
    let frame;

    const speed = 0.5;
    const autoScroll = () => {
      if (!isUserInteracting.current && container) {
        container.scrollLeft += speed;
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      frame = requestAnimationFrame(autoScroll);
    };

    frame = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Xử lý kéo chuột để cuộn
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleMouseDown = (e) => {
      isDragging.current = true;
      startX.current = e.pageX - container.offsetLeft;
      scrollLeft.current = container.scrollLeft;
      isUserInteracting.current = true;
    };

    const handleMouseLeave = () => {
      isDragging.current = false;
      isUserInteracting.current = false;
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      // sau 2s không tương tác thì tự động cuộn lại
      setTimeout(() => (isUserInteracting.current = false), 2000);
    };

    const handleMouseMove = (e) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX.current) * 1.5;
      container.scrollLeft = scrollLeft.current - walk;
    };

    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mousemove", handleMouseMove);

    // hỗ trợ mobile
    container.addEventListener("touchstart", () => (isUserInteracting.current = true));
    container.addEventListener("touchend", () => {
      setTimeout(() => (isUserInteracting.current = false), 2000);
    });

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const infiniteList = [...destinations, ...destinations];

  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[#233E8F] mb-8 text-center">
          🧭 Điểm đến nổi bật
        </h2>

        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-scroll scrollbar-hide select-none cursor-grab active:cursor-grabbing"
        >
          {infiniteList.map((dest, idx) => (
            <div
              key={`${dest.id}-${idx}`}
              className="relative min-w-[220px] md:min-w-[280px] h-48 md:h-64 rounded-2xl overflow-hidden flex-shrink-0 group"
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 flex items-end p-4">
                <span className="text-white text-lg font-semibold group-hover:text-yellow-300 transition-colors">
                  {dest.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
