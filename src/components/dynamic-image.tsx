import { Logo } from "./logo";

export default function DynamicImage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="relative w-full h-80 bg-cover bg-center rounded-2xl overflow-hidden cursor-pointer group">
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-50 transition-opacity duration-300" />

      <div className="absolute top-5 right-5">
        <div className="w-12 h-12 transform transition-transform duration-300 group-hover:scale-110">
          <Logo />
        </div>
      </div>

      <div className="absolute bottom-5 left-5 text-white">
        <h2 className="text-3xl font-bold transform transition-transform duration-300 group-hover:scale-105">
          {title}
        </h2>
        <p className="text-lg opacity-80 mt-2 transform transition-transform duration-300 group-hover:scale-103">
          {description}
        </p>
      </div>
    </div>
  );
}
