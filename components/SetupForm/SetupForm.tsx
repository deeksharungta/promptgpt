import Image from "next/image";
import styles from "./SetupForm.module.scss";
import ProjectName from "./ProjectName/ProjectName";
import Description from "./Description/Description";
import Prompt from "./Prompt/Prompt";
import Domain from "./Domain/Domain";
import OpenAPIKey from "./OpenAPIKey/OpenAPIKey";
import { FormEvent, useContext, useState } from "react";
import { SetupContext } from "@/store/setup-context";
import { useRouter } from "next/router";
import Spinner from "../Spinner/Spinner";

type Project = {
  data?: {
    id: number;
    name: string;
    description: string;
    apiKey: string;
    domain: string;
    prompt: string;
    userId: number;
  };
  setShowEditForm?: (show: boolean) => void;
};

const SetupForm: React.FC<Project> = ({ data, setShowEditForm }) => {
  const { updateSetupDetails } = useContext(SetupContext);
  const router = useRouter();
  const [isDeploying, setIsDeploying] = useState<boolean>(false);
  const [formValues, setFormValues] = useState({
    projectName: "",
    description: "",
    domain: "",
    key: "",
    prompt: "",
  });

  const [formValidity, setFormValidity] = useState({
    projectName: false,
    description: false,
    domain: false,
    key: false,
    prompt: false,
  });

  const setupFormSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    setIsDeploying(true);
    if (
      !!data ||
      (formValidity.projectName &&
        formValidity.description &&
        formValidity.domain &&
        formValidity.key &&
        formValidity.prompt)
    ) {
      updateSetupDetails(
        formValues.projectName,
        formValues.description,
        formValues.prompt,
        formValues.domain,
        formValues.key
      );
      handleSubmit();
      setTimeout(() => {
        setIsDeploying(false);
        {
          data
            ? router.push(`/dashboard`)
            : router.push(`https://${formValues.domain}.promptgpt.tools`);
        }
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

  const handleSubmit = async () => {
    if (!!data) {
      const response = await fetch("/api/edit-project/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: data.id,
          name: formValues.projectName,
          description: formValues.description,
          prompt: formValues.prompt,
          domain: formValues.domain,
          key: formValues.key,
        }),
      });

      if (response.ok) {
        setShowEditForm && setShowEditForm(false);
        console.log("Project updated successfully");
      } else {
        console.error("Project update failed");
      }
    } else {
      const response = await fetch("/api/deploy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formValues.projectName,
          description: formValues.description,
          prompt: formValues.prompt,
          domain: formValues.domain,
          key: formValues.key,
        }),
      });
      if (response.ok) {
        console.log("Success");
      } else {
        console.log("Error deploying project");
      }
    }
  };

  return (
    <form className={styles["setup-form"]} onSubmit={setupFormSubmitHandler}>
      <div>
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
            onKeyChange={(value) => handleInputChange("key", value)}
            onValidityChange={(isValid) => handleValidityChange("key", isValid)}
            initialKey={data?.apiKey || ""}
          />
        </div>
        <Image
          src="images/divider.svg"
          width={888}
          height={16}
          alt="divider"
          style={{ marginTop: "3.2rem" }}
        />
      </div>
      <button
        type="submit"
        className={styles["deploy-btn"]}
        disabled={
          isDeploying ||
          !(
            formValidity.projectName &&
            formValidity.description &&
            formValidity.domain &&
            formValidity.key &&
            formValidity.prompt
          )
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
            src="images/arrow.svg"
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
