import Image from "next/image";
import styles from "./SetupForm.module.scss";
import Theme from "./Theme/Theme";
import WebAppPosition from "./WebAppPosition/WebAppPosition";
import ProjectName from "./ProjectName/ProjectName";
import Description from "./Description/Description";
import Prompt from "./Prompt/Prompt";
import Domain from "./Domain/Domain";
import OpenAPIKey from "./OpenAPIKey/OpenAPIKey";
import { FormEvent, useContext, useState } from "react";
import { SetupContext } from "@/store/setup-context";
import { useRouter } from "next/router";

const SetupForm = () => {
  const { updateSetupDetails } = useContext(SetupContext);
  const router = useRouter();
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
    if (
      formValidity.projectName &&
      formValidity.description &&
      formValidity.domain &&
      formValidity.key &&
      formValidity.prompt
    ) {
      updateSetupDetails(
        formValues.projectName,
        formValues.description,
        formValues.prompt,
        formValues.domain,
        formValues.key
      );
      handleSubmit();
      router.push(`/${formValues.domain}`);
    } else {
      console.log("Form is not valid");
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
      console.log("Error hogya");
    }
  };
  // const handleSubmit = async () => {
  //   const response = await fetch("/api/deploy", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       name: "Paraphraser",
  //       description: "Paraphrase your text now",
  //       prompt:
  //         "Generate a paraphrased version of the given text. Provide a clear and coherent rephrasing while preserving the original meaning.",
  //       domain: "paraphrase",
  //       key: "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",
  //     }),
  //   });
  //   if (response.ok) {
  //     console.log("Success");
  //   } else {
  //     console.log("Error hogya");
  //   }
  // };

  return (
    <form className={styles["setup-form"]} onSubmit={setupFormSubmitHandler}>
      <div>
        <div className={styles.stretch}>
          <ProjectName
            onNameChange={(value) => handleInputChange("projectName", value)}
            onValidityChange={(isValid) =>
              handleValidityChange("projectName", isValid)
            }
          />
          <Description
            onDescriptionChange={(value) =>
              handleInputChange("description", value)
            }
            onValidityChange={(isValid) =>
              handleValidityChange("description", isValid)
            }
          />
        </div>
        <Prompt
          onPromptChange={(value) => handleInputChange("prompt", value)}
          onValidityChange={(isValid) =>
            handleValidityChange("prompt", isValid)
          }
        />
        <div className={styles.stretch}>
          <Domain
            onDomainChange={(value) => handleInputChange("domain", value)}
            onValidityChange={(isValid) =>
              handleValidityChange("domain", isValid)
            }
          />
          <OpenAPIKey
            onKeyChange={(value) => handleInputChange("key", value)}
            onValidityChange={(isValid) => handleValidityChange("key", isValid)}
          />
        </div>
        <Image
          src="images/divider.svg"
          width={888}
          height={16}
          alt="divider"
          style={{ marginTop: "3.2rem" }}
        />
        {/* <div className={styles.stretch}>
          <WebAppPosition />
          <Theme />
        </div> */}
      </div>
      <button type="submit" className={styles["deploy-btn"]}>
        Deploy my Prompt GPT
        <Image
          src="images/arrow.svg"
          width={24}
          height={24}
          alt="arrow-right"
        />
      </button>
    </form>
  );
};

export default SetupForm;
