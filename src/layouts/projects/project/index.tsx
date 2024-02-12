import { type StaticImageData } from "next/image";

import Image from "~/components/image";

import styles from "./styles.module.scss";
export type ProjectProps = {
  photo: string | StaticImageData;
  name: string;
  description: string;
  techStack: Array<string>;
  url: string;
  repository: string;
  index: number;
};

const Project = (props: ProjectProps) => {
  const { photo, name, description, techStack, url, repository, index } = props;
  const order = index < 9 ? `0${index + 1}` : index + 1;
  return (
    <div className={styles.project}>
      <Image src={photo} alt={`Overview of ${name}`} width={300} height={250} />
      <div className={styles.detail}>
        <h3 className={styles.name}>
          <span>{order}</span>
          {name}
        </h3>
        <p className={styles.description}>{description}</p>
        <div>ss</div>
      </div>
    </div>
  );
};
export default Project;
