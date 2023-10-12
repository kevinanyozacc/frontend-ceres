export function useFileBlob() {
  const URL_API = process.env.REACT_APP_API_BASE_URL || "";

  const linkFile = (blobId, { type = "fisico" }) => {
    const urlFile = `${URL_API}/files/${blobId}/blob?type=${type}`;
    const a = document.createElement("a");
    a.href = urlFile;
    a.target = "_blank";
    a.click();
  };

  return { linkFile };
}
