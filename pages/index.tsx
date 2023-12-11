import {
  Home,
  GetServerSideProps,
  HomePageProps,
  Subdomain,
  fetchProjectData,
  Link,
} from "@/helpers/imports";
import styles from "@/styles/Home.module.scss";

const HomePage: React.FC<HomePageProps> = (props) => {
  if (props.subdomain === "home") {
    return <Home />;
  } else if (props.subdomain === "notFound") {
    return (
      <div className={styles["not-found"]}>
        <h3>No PromptGPT found!</h3>
        <Link href="https://www.promptgpt.tools/setup">Deploy Now</Link>
      </div>
    );
  } else {
    return (
      <Subdomain
        name={props.name}
        description={props.description}
        prompt={props.prompt}
        apiKey={props.apiKey}
      />
    );
  }
};

export default HomePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  let wildcard = context?.req?.headers?.host?.split(".")[0];
  let subdomain = wildcard?.toLowerCase();
  subdomain =
    subdomain != "www"
      ? subdomain != "[::1]:50369"
        ? subdomain
        : "notFound"
      : "home";
  if (subdomain === "home") {
    return {
      props: {
        subdomain,
      },
    };
  } else {
    const projectData = await fetchProjectData(subdomain);
    if (projectData) {
      return {
        props: {
          ...projectData,
        },
      };
    } else {
      subdomain = "notFound";
      return {
        props: {
          subdomain,
        },
      };
    }
  }
};
