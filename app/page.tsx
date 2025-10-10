import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import Logo from "@/assets/logo.png";
import betterAuthLogo from "@/assets/better_auth_logo.png";

interface Hero7Props {
  heading?: string;
  description?: string;
  reviews?: {
    count: number;
    rating?: number;
    avatars: {
      src: string;
      alt: string;
    }[];
  };
}

export default function Hero7({
  heading = "Standard Authentication Flow With Better Auth",
  description = "We built a secure and scalable auth system using Better Auth, Prisma, and PostgreSQL a stack that makes user management simple, efficient, and reliable.",
  reviews = {
    count: 200,
    rating: 5.0,
    avatars: [
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
        alt: "Avatar 1",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
        alt: "Avatar 2",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
        alt: "Avatar 3",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
        alt: "Avatar 4",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
        alt: "Avatar 5",
      },
    ],
  },
}: Hero7Props) {
  return (
    <section className="py-20 sm:py-28 lg:py-32">
      <div className="container px-4 text-center mx-auto">
        {/* Heading + Description */}
        <div className="mx-auto max-w-3xl space-y-4">
          <h1 className="text-2xl font-bold sm:text-4xl lg:text-6xl">
            {heading}
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg lg:text-xl">
            {description}
          </p>
        </div>

        {/* Logos */}
        <div className="mt-10 mb-8 flex items-center gap-4 justify-center mx-auto">
          <Image
            src={Logo}
            alt="Project logo"
            width={70}
            height={70}
            className="border-muted rounded-full border w-16 h-16 sm:w-20 sm:h-20"
          />
          <span className="text-muted-foreground text-2xl font-bold">+</span>
          <Image
            src={betterAuthLogo}
            alt="Better Auth logo"
            width={70}
            height={70}
            className="border-muted rounded-full border w-16 h-16 sm:w-20 sm:h-20"
          />
        </div>

        {/* CTA Buttons */}
        <div className="mx-auto mt-6 flex max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </div>

        {/* Reviews */}
        <div className="mx-auto mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-10">
          <div className="flex -space-x-4">
            {reviews.avatars.map((avatar, index) => (
              <Avatar key={index} className="size-12 sm:size-14 border">
                <AvatarImage src={avatar.src} alt={avatar.alt} />
              </Avatar>
            ))}
          </div>
          <div className="text-center sm:text-left">
            <div className="flex justify-center sm:justify-start items-center gap-1">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className="size-4 sm:size-5 fill-yellow-400 text-yellow-400"
                />
              ))}
              <span className="ml-1 font-semibold text-sm sm:text-base">
                {reviews.rating?.toFixed(1)}
              </span>
            </div>
            <p className="text-muted-foreground font-medium text-sm sm:text-base">
              from {reviews.count}+ reviews
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
