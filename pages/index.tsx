import { GetServerSideProps } from "next";
import Home from "@/components/HomePage/Home";
import Subdomain from "@/components/Subdomain/Subdomain";

type ProjectData = {
  name: string;
  description: string;
  prompt: string;
  domain: string;
  key: string;
};

type HomePageProps = {
  name?: string;
  description?: string;
  prompt?: string;
  domain?: string;
  key?: string;
  subdomain?: string;
};

const HomePage: React.FC<HomePageProps> = (props) => {
  if (props.subdomain === "home") {
    return <Home />;
  } else {
    return (
      <Subdomain
        name={props.name}
        description={props.description}
        prompt={props.prompt}
        key={props.key}
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
      ? subdomain != "localhost:3000"
        ? subdomain
        : "abc"
      : "home";
  if (subdomain === "home") {
    return {
      props: {
        subdomain,
      },
    };
  } else {
    try {
      const response = await fetch(`/api/get-project?domain=${subdomain}`);
      if (response.ok) {
        const { name, description, prompt, domain, key }: ProjectData =
          await response.json();

        return {
          props: {
            name,
            description,
            prompt,
            domain,
            key,
          },
        };
      } else {
        console.error("Error fetching project");
        return {
          notFound: true,
        };
      }
    } catch (error) {
      console.error("Error fetching project", error);
      return {
        notFound: true,
      };
    }
  }
};
