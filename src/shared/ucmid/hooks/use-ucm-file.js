export function useUcmFile() {
  const URL_API = process.env.REACT_APP_API_BASE_URL || "";

  const linkFile = (ucmId) => {
    const urlFile = `${URL_API}/files/${ucmId}/binary`;
    const a = document.createElement("a");
    a.href = urlFile;
    a.target = "_blank";
    a.click();
  };

  return { linkFile };
}
