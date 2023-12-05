import {
  Home,
  GetServerSideProps,
  HomePageProps,
  Subdomain,
  fetchProjectData,
} from "@/helpers/imports";

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
    const projectData = await fetchProjectData(subdomain);
    if (projectData) {
      return {
        props: {
          ...projectData,
        },
      };
    } else {
      return {
        notFound: true,
      };
    }
  }
};
