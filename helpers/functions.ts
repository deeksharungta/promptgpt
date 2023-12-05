export const handleCopy = (output: string, setCopySuccess: Function) => {
  const textToCopy = output;
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    })
    .catch((err) => {
      console.error("Error copying text: ", err);
    });
};

export const handleEditProject = async (
  projectId: number,
  projects: any[],
  setShowEditForm: Function,
  setEditProjectData: Function
) => {
  setShowEditForm(true);
  try {
    const projectToEdit = projects.find((project) => project.id === projectId);

    setEditProjectData(projectToEdit);
  } catch (error) {
    console.error("Project update failed", error);
    setShowEditForm(false);
  }
};
