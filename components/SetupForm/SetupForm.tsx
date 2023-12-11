import styles from "./SetupForm.module.scss";
import {
  Description,
  Domain,
  FormEvent,
  Image,
  OpenAPIKey,
  ProjectName,
  Prompt,
  SetupContext,
  SetupFormProps,
  Spinner,
  handleProjectSubmit,
  useContext,
  useEffect,
  useRouter,
  useState,
} from "@/helpers/imports";

const SetupForm: React.FC<SetupFormProps> = ({ data, setShowEditForm }) => {
  const { updateSetupDetails } = useContext(SetupContext);
  const router = useRouter();
  const [isDeploying, setIsDeploying] = useState<boolean>(false);
  const [formValues, setFormValues] = useState({
    projectName: "",
    description: "",
    domain: "",
    apiKey: "",
    prompt: "",
  });

  const [formValidity, setFormValidity] = useState({
    projectName: false,
    description: false,
    domain: false,
    apiKey: false,
    prompt: false,
  });

  useEffect(() => {
    if (!!data) {
      setFormValidity({
        projectName: true,
        description: true,
        domain: true,
        apiKey: true,
        prompt: true,
      });
    }
  }, []);

  const setupFormSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setIsDeploying(true);
    if (
      !!data ||
      (formValidity.projectName &&
        formValidity.description &&
        formValidity.domain &&
        formValidity.apiKey &&
        formValidity.prompt)
    ) {
      updateSetupDetails(
        formValues.projectName,
        formValues.description,
        formValues.prompt,
        formValues.domain,
        formValues.apiKey
      );
      await handleProjectSubmit(data, setShowEditForm, formValues);
      setTimeout(() => {
        {
          data
            ? router.push(`/dashboard`)
            : router.push(`https://${formValues.domain}.promptgpt.tools`);
        }
        setIsDeploying(false);
      }, 1000);
    } else {
      console.log("Form is not valid");
      setIsDeploying(false);
    }
  };

  const handleInputChange = (fieldName: string, value: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  const handleValidityChange = (fieldName: string, isValid: boolean) => {
    setFormValidity((prevValidity) => ({
      ...prevValidity,
      [fieldName]: isValid,
    }));
  };

  return (
    <form className={styles["setup-form"]} onSubmit={setupFormSubmitHandler}>
      <div className={styles["outer-container"]}>
        <div className={styles.stretch}>
          <ProjectName
            onNameChange={(value) => handleInputChange("projectName", value)}
            onValidityChange={(isValid) =>
              handleValidityChange("projectName", isValid)
            }
            initialName={data?.name || ""}
          />
          <Description
            onDescriptionChange={(value) =>
              handleInputChange("description", value)
            }
            onValidityChange={(isValid) =>
              handleValidityChange("description", isValid)
            }
            initialDescription={data?.description || ""}
          />
        </div>
        <Prompt
          onPromptChange={(value) => handleInputChange("prompt", value)}
          onValidityChange={(isValid) =>
            handleValidityChange("prompt", isValid)
          }
          initialPrompt={data?.prompt || ""}
        />
        <div className={styles.stretch}>
          <Domain
            onDomainChange={(value) => handleInputChange("domain", value)}
            onValidityChange={(isValid) =>
              handleValidityChange("domain", isValid)
            }
            initialDomain={data?.domain || ""}
          />
          <OpenAPIKey
            onKeyChange={(value) => handleInputChange("apiKey", value)}
            onValidityChange={(isValid) =>
              handleValidityChange("apiKey", isValid)
            }
            initialKey={data?.apiKey || ""}
          />
        </div>
        <div className={styles.divider}>
          <Image
            src="/images/divider.svg"
            width={888}
            height={16}
            alt="divider"
          />
        </div>
      </div>
      <button
        type="submit"
        className={styles["deploy-btn"]}
        disabled={
          isDeploying ||
          (!!data &&
            (!formValidity.projectName ||
              !formValidity.description ||
              !formValidity.domain ||
              !formValidity.apiKey ||
              !formValidity.prompt))
        }
      >
        {data
          ? isDeploying
            ? "Updating..."
            : "Update Prompt GPT"
          : isDeploying
          ? "Deploying..."
          : "Deploy my Prompt GPT"}
        {isDeploying ? (
          <Spinner color="#000" height="24px" />
        ) : (
          <Image
            src="/images/arrow.svg"
            width={24}
            height={24}
            alt="arrow-right"
          />
        )}
      </button>
    </form>
  );
};

export default SetupForm;
