import About from "~/layouts/about";
import Experience from "~/layouts/experience";
import Footer from "~/layouts/footer";
import HeroBanner from "~/layouts/heroBanner";
import Navbar from "~/layouts/navbar";
import Projects from "~/layouts/projects";

const Home = () => {
  return (
    <>
      <Navbar />
      <HeroBanner />
      <About />
      <Experience />
      <Projects />
      <Footer />
    </>
  );
};
export default Home;
