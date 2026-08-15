"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Image from "next/image";
import Link from "next/link";

type Post = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  banner: string;
};

export default function FeaturedSliderClient({
  posts,
}: {
  posts: any[];
}) {
  return (
    <section className="featured-slider container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500 }}
        loop
      >
        {posts.map((post) => (
          <SwiperSlide key={post.id}>
            <Link href={`/blog/${post.slug}`}>
              <div className="slide">
                <Image
  src={
    post.banner && post.banner.trim() !== ""
      ? post.banner
      : "/images/placeholder.jpg"
  }
  alt={post.title}
  width={1200}
  height={600}
  className="slider-image"
  priority
  unoptimized
/>

                <div className="overlay">
                  <span>{post.category}</span>

                  <h2>{post.title}</h2>

                  <p>{post.description}</p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}