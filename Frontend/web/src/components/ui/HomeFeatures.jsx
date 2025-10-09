import { Award, Shield, Clock, Heart } from "lucide-react"

const features = [
  {
    icon: Award,
    title: "Exquisite Vietnamese Hospitality",
    description:
      "Experience world-class service blended with the warmth of traditional Vietnamese charm, right in the heart of Hanoi.",
  },
  {
    icon: Shield,
    title: "Trusted Safety Standards",
    description:
      "Enjoy peace of mind with international-level security systems and transparent, guest-friendly policies.",
  },
  {
    icon: Clock,
    title: "Round-the-Clock Assistance",
    description:
      "Our dedicated team is available 24/7 to ensure every request is met with professionalism and care.",
  },
  {
    icon: Heart,
    title: "Cultural Elegance in Every Detail",
    description:
      "From historic streets to luxurious stays, each moment is curated to reflect the rich heritage of Hanoi.",
  },
]

export default function HomeFeatures() {
  return (
    <section className="w-full bg-gray-50 py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#233E8F] mb-4">
          Why Choose D-Hotel?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We are committed to delivering a royal-class stay experience with
          excellence in every detail.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group flex flex-col items-center text-center p-6 rounded-2xl bg-white shadow-md border border-gray-100 transition duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="mb-4 flex items-center justify-center w-14 h-14 rounded-full bg-[#233E8F]/10 text-[#233E8F] group-hover:bg-[#233E8F] group-hover:text-white transition duration-300">
              <feature.icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-[#233E8F] mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
