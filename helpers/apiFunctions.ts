import { toast } from "react-toastify";
import { ProjectData, UserResponse } from "./types";

export const handleEmailSubmit = async (email: string): Promise<void> => {
  try {
    const response = await fetch("/api/send-magic-link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      console.log("Success");
    } else {
      console.error("Error occurred while sending magic link");
    }
  } catch (error) {
    console.error("Error occurred while sending magic link", error);
  }
};

export const handleProjectSubmit = async (
  data: any,
  setShowEditForm: any,
  formValues: any
) => {
  if (!!data) {
    // Edit existing project
    try {
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
          apiKey: formValues.apiKey,
        }),
      });

      if (response.ok) {
        setShowEditForm && setShowEditForm(false);
        console.log("Project updated successfully");
      } else {
        console.error("Project update failed");
      }
    } catch (error) {
      console.error("Error occurred while updating project", error);
    }
  } else {
    // Deploy a new project
    try {
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
          apiKey: formValues.apiKey,
        }),
      });

      if (response.ok) {
        console.log("Project deployed successfully");
      } else {
        console.error("Error deploying project");
      }
    } catch (error) {
      console.error("Error occurred while deploying project", error);
    }
  }
};

export const chatData = async (
  userMessage: string,
  apiKey: string | undefined,
  messages: any[],
  setLoading: Function,
  setOutput: Function
) => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [...messages, { role: "user", content: userMessage }],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error("Chat API request failed");
    }

    const responseData = await response.json();
    if (responseData.choices && responseData.choices.length > 0) {
      const assistantMessage = responseData.choices[0]?.message;
      if (assistantMessage && assistantMessage.content) {
        setOutput(assistantMessage.content);
      }
    } else {
      console.error("Invalid responseData structure:", responseData);
    }
  } catch (error) {
    console.error("Error while fetching chat data:", error);
  } finally {
    setLoading(false);
  }
};

export const isAPIKeyValid = async (
  apiKey: string,
  setApiKeyError: Function
): Promise<boolean> => {
  try {
    setApiKeyError("Verifying..");
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "system", content: "You are a helpful assistant." }],
        temperature: 0.7,
      }),
    });

    const result = await response.json();
    if (result.error) {
      if (result.error.code === "invalid_api_key")
        setApiKeyError("API Key is not valid");
      else if (result.error.code === "insufficient_quota") {
        setApiKeyError(
          "You exceeded your current quota, please check your plan and billing details on OpenAI platform"
        );
      } else {
        setApiKeyError(result.error.message);
      }
    }
    if (!response.ok) {
      throw new Error("Invalid API Key");
    }
    return result.id !== undefined;
  } catch (error) {
    return false;
  }
};

export const checkDomainUniqueness = async (
  domain: string,
  setErrorMessage: Function
): Promise<boolean> => {
  try {
    setErrorMessage("Verifying...");
    const response = await fetch(`/api/check-domain?domain=${domain}`);
    if (response.ok) {
      const data = await response.json();
      if (data.exists) {
        setErrorMessage("Domain Name already taken");
        return false;
      }
      return true;
    } else if (response.status === 404) {
      return true;
    } else {
      throw new Error("Invalid response from server");
    }
  } catch (error) {
    console.error("Error checking domain uniqueness:", error);
    return false;
  }
};

export const fetchUserProjects = async (
  setProjects: Function,
  setLoadingProjects: Function
) => {
  try {
    const response = await fetch("/api/get-projects");
    if (response.ok) {
      const { projects } = await response.json();
      setProjects(projects);
    } else {
      console.error("Error fetching projects");
    }
  } catch (error) {
    console.error("Error fetching projects", error);
  } finally {
    setLoadingProjects(false);
  }
};

export const handleDeleteProject = async (
  projectId: number,
  projects: any[],
  setProjects: Function
) => {
  try {
    const response = await fetch("/api/delete-project", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: projectId }),
    });

    if (response.ok) {
      const updatedProjects = projects.filter((item) => item.id !== projectId);
      setProjects(updatedProjects);
      toast.success(`PromptGPT deleted successfully!`);
    } else {
      toast.error("Error deleting PromptGPT!");
    }
  } catch (error) {
    toast.error("Error deleting Promptgpt!");
  }
};

export const handleEmailVerification = async (
  token: string | null,
  updateUserEmail: Function,
  router: any,
  setHasError: Function
) => {
  const response = await fetch("/api/verify-magic-link", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });

  const data = await response.json();
  if (response.ok) {
    updateUserEmail(data.data.email);
    setHasError(false);
    router.push("/setup");
  } else {
    setHasError(true);
  }
};

export const handleLogout = async (
  setShowSpinner: Function,
  updateUserEmail: Function,
  router: any
) => {
  setShowSpinner(true);
  try {
    setTimeout(async () => {
      const response = await fetch("/api/logout", {
        method: "POST",
      });

      if (response.ok) {
        updateUserEmail("");
        router.push("/");
        setShowSpinner(false);
      } else {
        console.error("Logout failed");
        setShowSpinner(false);
      }
    }, 500);
  } catch (error) {
    console.error("Logout failed", error);
    setShowSpinner(false);
  }
};

export const fetchProjectData = async (
  subdomain: string | undefined
): Promise<ProjectData | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-project?domain=${subdomain}`
    );
    if (response.ok) {
      const { name, description, prompt, domain, apiKey }: ProjectData =
        await response.json();
      return { name, description, prompt, domain, apiKey };
    } else {
      console.error("Error fetching project");
      return null;
    }
  } catch (error) {
    console.error("Error fetching project", error);
    return null;
  }
};

export const fetchUserEmail = async (
  setLoading: Function,
  setEmail: Function
) => {
  setLoading(true);
  try {
    const response = await fetch("/api/get-user");
    if (response.ok) {
      const { email } = (await response.json()) as UserResponse;
      setEmail(email);
    } else {
      console.error("Error fetching user email");
    }
  } catch (error) {
    console.error("Error fetching user email", error);
  } finally {
    setLoading(false);
  }
};
