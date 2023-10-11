export function useFileBlob() {
  const URL_API = process.env.REACT_APP_API_BASE_URL || "";

  const linkFile = (blobId) => {
    const urlFile = `${URL_API}/files/${blobId}/blob`;
    const a = document.createElement("a");
    a.href = urlFile;
    a.target = "_blank";
    a.click();
  };

  return { linkFile };
}
