import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

import HomeProvider from "~/contexts/home/provider";
import About from "~/layouts/about";
import Experience from "~/layouts/experience";
import Footer from "~/layouts/footer";
import HeroBanner from "~/layouts/heroBanner";
import Navbar from "~/layouts/navbar";
import Projects from "~/layouts/projects";
import { type Languages } from "~/settings/constants";
import type { ValueOf } from "~/utils/type";

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
