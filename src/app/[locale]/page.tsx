import { setRequestLocale } from "next-intl/server";
import { lazy } from "react";

import withSuspense from "~/components/withSuspense";
import HomeProvider from "~/contexts/home/provider";
import HeroBanner from "~/modules/heroBanner";
import Navbar from "~/modules/navbar";

// Force static generation - Firebase will only run at build time
export const dynamic = "force-static";
export const revalidate = 86400; // 1 day in seconds

// Lazy load below-the-fold components
const About = lazy(() => import("~/modules/about"));
const Experiences = lazy(() => import("~/modules/experiences"));
const Projects = lazy(() => import("~/modules/projects"));
const Footer = lazy(() => import("~/modules/footer"));

// Wrap lazy components with suspense and appropriate skeleton configurations
const LazyAbout = withSuspense(About, { skeletonHeight: "300px", skeletonCount: 1 });
const LazyExperiences = withSuspense(Experiences, { skeletonHeight: "150px", skeletonCount: 3 });
const LazyProjects = withSuspense(Projects, { skeletonHeight: "200px", skeletonCount: 2 });
const LazyFooter = withSuspense(Footer, { skeletonHeight: "80px", skeletonCount: 1 });

type HomeProps = { params: Promise<{ locale: string }> };

const Home = async (props: HomeProps) => {
  const params = await props.params;
  setRequestLocale(params.locale);
  return (
    <HomeProvider>
      <Navbar />
      <HeroBanner />
      <LazyAbout />
      <LazyExperiences />
      <LazyProjects />
      <LazyFooter />
    </HomeProvider>
  );
};
export default Home;
