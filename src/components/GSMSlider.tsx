import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Review } from "@/libs/interfaces";
import { StarIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";

interface GSMSliderProps {
  reviews: Review[];
}

const GSMSlider = ({ reviews }: GSMSliderProps) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  return (
    <Slider {...settings}>
      {reviews.map((review, index) => (
        <div key={index} className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="relative overflow-hidden bg-gray-900 px-6 py-20 shadow-xl sm:rounded-3xl sm:px-10 sm:py-24 md:px-12 lg:px-20">
              <Image
                priority={false}
                width={200}
                height={200}
                alt="GSM AC Background"
                src="/home.avif"
                className="absolute inset-0 size-full object-cover brightness-150 saturate-0 sepia-100"
              />
              <div className="absolute inset-0 bg-gray-900/10 mix-blend-multiply" />
              <div className="absolute -top-56 -left-80 transform-gpu blur-3xl">
                <div
                  style={{
                    clipPath:
                      "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                  }}
                  className="aspect-1097/845 w-[68.5625rem] bg-linear-to-r from-[#ff4694] to-[#776fff] opacity-[0.45]"
                />
              </div>
              <div className="hidden md:absolute md:bottom-16 md:left-[50rem] md:block md:transform-gpu md:blur-3xl">
                <div
                  style={{
                    clipPath:
                      "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                  }}
                  className="aspect-1097/845 w-[68.5625rem] bg-linear-to-r from-[#ff4694] to-[#776fff] opacity-25"
                />
              </div>
              <div className="relative mx-auto max-w-2xl lg:mx-0">
                <div className="font-semibold text-white flex gap-4 items-center">
                  {review.author_name}

                  <div className="flex">
                    {Array.from({ length: review.rating }).map((_, index) => (
                      <StarIcon
                        key={index}
                        className={`h-5 w-5 ${
                          index < review.rating ? "gold" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <figure>
                  <blockquote className="mt-6 text-lg font-semibold text-white sm:text-xl/8">
                    <p>
                      {review.text.length > 30
                        ? `${review.text.split(" ").slice(0, 30).join(" ")}...`
                        : review.text}
                    </p>
                  </blockquote>
                  <figcaption className="mt-6 text-base text-white">
                    <Link
                      href="https://www.google.com/search?sca_esv=cf65d87ff3121f3e&hl=en-US&gl=us&sxsrf=AHTn8zr-1io7-Dj8PXAk5Cp_a7FTegiGPA:1745952694879&si=APYL9bs7Hg2KMLB-4tSoTdxuOx8BdRvHbByC_AuVpNyh0x2KzYwEZZXOeOVLLgundtC9z8hW84qr-SbHuzDJ1-eBJMpHFqmbFgRRPWEW7hWL6-rNCXzg6YlqEhHQYDdNGdNevSrV2VoRQIdtVASnGJ6mp4f4pRJvgWZRDmHgtIXh5qcym16gG40%3D&q=G+S+M+A/C+%26+General+Contractor+INC.+Reviews&sa=X&ved=2ahUKEwja5rDR9P2MAxV7M9AFHakvOfUQ0bkNegQIQBAE&cshid=1745952772703797&biw=1920&bih=958&dpr=1"
                      target="blank"
                      className="mt-1 hover:text-indigo-300 text-indigo-400 transition-colors font-semibold"
                    >
                      See More...
                    </Link>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default GSMSlider;
