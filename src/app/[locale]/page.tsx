import { setRequestLocale } from "next-intl/server";

import HomeProvider from "~/contexts/home/provider";
import About from "~/modules/about";
import Experiences from "~/modules/experiences";
import Footer from "~/modules/footer";
import HeroBanner from "~/modules/heroBanner";
import Navbar from "~/modules/navbar";
import Projects from "~/modules/projects";

type HomeProps = { params: Promise<{ locale: string }> };

const Home = async (props: HomeProps) => {
  const params = await props.params;
  setRequestLocale(params.locale);
  return (
    <HomeProvider>
      <Navbar />
      <HeroBanner />
      <About />
      <Experiences />
      <Projects />
      <Footer />
    </HomeProvider>
  );
};
export default Home;
