
import Hero from "../components/Hero";
import FeaturedSlider from "../components/FeaturedSlider";
import Trending from "../components/Trending";
import Latest from "../components/Latest";
import Featured from "../components/Featured";
import EditorsPick from "../components/EditorsPick";
import Newsletter from "../components/Newsletter";

export default function Home() {
  return (
    <>
      
      <Hero />
      <FeaturedSlider />
      <Trending />
      <Latest />
      <Featured />
      <EditorsPick />
      <Newsletter />
    </>
  );
}