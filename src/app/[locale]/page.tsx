import { setRequestLocale } from "next-intl/server";
import { lazy } from "react";

import withSuspense from "~/components/withSuspense";
import HomeProvider from "~/contexts/home/provider";
import HeroBanner from "~/modules/heroBanner";
import Navbar from "~/modules/navbar";

// Content is cached per Firestore collection and refreshed by /api/revalidate
export const revalidate = 86400;

// Lazy load below-the-fold sections
const Projects = lazy(() => import("~/modules/projects"));
const Tools = lazy(() => import("~/modules/tools"));
const Experiences = lazy(() => import("~/modules/experiences"));
const Education = lazy(() => import("~/modules/education"));
const Contact = lazy(() => import("~/modules/contact"));

const LazyProjects = withSuspense(Projects, { skeletonHeight: "500px" });
const LazyTools = withSuspense(Tools, { skeletonHeight: "400px" });
const LazyExperiences = withSuspense(Experiences, { skeletonHeight: "600px" });
const LazyEducation = withSuspense(Education, { skeletonHeight: "200px" });
const LazyContact = withSuspense(Contact, { skeletonHeight: "400px" });

type HomeProps = { params: Promise<{ locale: string }> };

const Home = async (props: HomeProps) => {
  const params = await props.params;
  setRequestLocale(params.locale);
  return (
    <HomeProvider>
      <Navbar />
      <main>
        <HeroBanner />
        <LazyProjects />
        <LazyTools />
        <LazyExperiences />
        <LazyEducation />
        <LazyContact />
      </main>
    </HomeProvider>
  );
};
export default Home;
