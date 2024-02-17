import { unstable_setRequestLocale } from "next-intl/server";

import HomeProvider from "~/contexts/home/provider";
import type { Languages } from "~/settings/i18n";
import type { ValueOf } from "~/types/common";

import About from "~/modules/about";
import Experience from "~/modules/experience";
import Footer from "~/modules/footer";
import HeroBanner from "~/modules/heroBanner";
import Navbar from "~/modules/navbar";
import Projects from "~/modules/projects";

type HomeProps = {
  params: { locale: ValueOf<typeof Languages> };
};

const Home = ({ params }: HomeProps) => {
  unstable_setRequestLocale(params.locale);
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
