import { useEffect, useRef } from "react";

const destinations = [
  {
    id: 1,
    name: "Hoan Kiem Lake",
    image:
      "https://images.pexels.com/photos/12635055/pexels-photo-12635055.jpeg",
  },
  {
    id: 2,
    name: "Old Quarter",
    image:
      "https://media.istockphoto.com/id/520741570/vi/anh/g%C3%B3c-ph%E1%BB%91-s%E1%BA%A7m-u%E1%BA%A5t-trong-ph%E1%BB%91-c%E1%BB%95-h%C3%A0-n%E1%BB%99i-vi%E1%BB%87t-nam.jpg?b=1&s=612x612&w=0&k=20&c=EoCbNB4zSKCJJNcB_hSAeWuZCYqBMeTyVe84UsmqXJo=",
  },
  {
    id: 3,
    name: "West Lake",
    image:
      "https://images.pexels.com/photos/34405373/pexels-photo-34405373.jpeg",
  },
  {
    id: 4,
    name: "Temple of Literature",
    image:
      "https://media.istockphoto.com/id/160179168/vi/anh/c%E1%BA%A3nh-quan-th%C3%A0nh-ph%E1%BB%91-h%C3%A0-n%E1%BB%99i.jpg?b=1&s=612x612&w=0&k=20&c=fLJ5CRj_3RrxcjmrMF3EHCqDzBySf0o_DZ8yKQ6GWeE=",
  },
];

export default function ExploreDestinations() {
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const isUserInteracting = useRef(false);

  // Auto scroll when not interacting
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

  // Handle dragging
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

    // Mobile touch support
    container.addEventListener(
      "touchstart",
      () => (isUserInteracting.current = true)
    );
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
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[#233E8F] mb-8 text-center">
          🧭 Explore Hanoi
        </h2>

        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-scroll scrollbar-hide select-none cursor-grab active:cursor-grabbing"
        >
          {infiniteList.map((dest, idx) => (
            <div
              key={`${dest.id}-${idx}`}
              className="relative w-[220px] h-[320px] md:w-[260px] md:h-[360px] rounded-2xl overflow-hidden flex-shrink-0 group"
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
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
