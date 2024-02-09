import About from "~/layouts/about";
import Experience from "~/layouts/experience";
import Footer from "~/layouts/footer";
import HeroBanner from "~/layouts/heroBanner";
import Navbar from "~/layouts/navbar";
import Projects from "~/layouts/projects";

import HomeProvider from "~/contexts/home/provider";

const Home = () => {
  return (
    <HomeProvider>
      <Navbar />
      <HeroBanner />
      <About />
      <Experience />
      <Projects />
      <Footer />
    </HomeProvider>
  );
};
export default Home;
