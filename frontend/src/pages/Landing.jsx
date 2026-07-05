import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import BackgroundEffects from "../components/BackgroundEffects";
import CursorGlow from "../components/CursorGlow";

export default function Landing() {
  return (
    <>
      <BackgroundEffects />
      <CursorGlow />

      <Navbar />
      <Hero />
    </>
  );
}