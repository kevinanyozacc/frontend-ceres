import { format, parseISO } from "date-fns";
import sedes from "../data/sedes.json";

export const getIconByPlaceType = (type) => {
  const iconsMap = {
    "agricultural-supplies": "mdi:spray",
    "livestock-supplies": "mdi:pill",
    "feed-processing": "mdi:silo",
    slaughterhouse: "mdi:food-steak",
    "pig-farm": "mdi:pig-variant-outline",
    "poultry-farm": "mdi:turkey",
    "primary-processing": "mdi:cogs",
    "agricultural-exporter": "mdi:sprout",
    "livestock-exporter": "mdi:world",
    other: "mdi:home-map-marker",
    cold_meat_stores: "mdi:snowflake",
    poultry_slaughter_center: "mdi:turkey",
    rendering: "mdi:factory",
    "organic-certifier": "mdi:water-check",
    "export-processing-plant": "mdi:package-variant-closed",
    crops: "mdi:farm",
  };
  return iconsMap[type] || "mdi:map-marker";
};

export const getSlaughterhouseType = (searchResult) => {
  const { type } = searchResult;
  if (type === "slaughterhouse") {
    return type;
  }
  return type;
};

export const translatePlaceTypeSlug = (type, sourceLanguage = "en") => {
  const translations = {
    "agricultural-supplies": "insumos-agricolas",
    "feed-processing": "procesamiento-piensos",
    slaughterhouse: "matadero",
    "pig-farm": "granja-porcina",
    "poultry-farm": "granja-avicola",
    "livestock-supplies": "insumos-pecuarios",
    "primary-processing": "procesamiento-primario",
    "livestock-exporter": "exportador-pecuario",
    "agricultural-exporter": "exportador-agricola",
    other: "matadero",
    cold_meat_stores: "matadero",
    poultry_slaughter_center: "matadero",
    rendering: "matadero",
    "organic-certifier": "certificador-organico",
    "export-processing-plant": "planta-exportacion",
    farm: "predio",
    crops: "predio",
  };
  if (sourceLanguage === "en") {
    return translations[type] || "otro";
  } else {
    return (
      Object.keys(translations).find((k) => translations[k] === type) || "other"
    );
  }
};

export const formatPlaceType = (type, sourceLanguage = "en") => {
  const translations = {
    "agricultural-supplies": "Empresa de insumos agrícolas",
    "feed-processing": "Empresa de procesamiento de piensos",
    slaughterhouse: "Matadero",
    "pig-farm": "Granja porcina",
    "poultry-farm": "Granja avícola",
    "livestock-supplies": "Empresa de insumos pecuarios",
    "primary-processing": "Empresa de procesamiento primario de alimentos",
    "livestock-exporter": "Exportador de productos pecuarios",
    "agricultural-exporter": "Exportador de productos agrícolas",
    other: "Tipo no especificado",
    cold_meat_stores: "Frigorífico",
    poultry_slaughter_center: "Centro de faenamiento avícola",
    rendering: "Rendering",
    "organic-certifier": "Certificador orgánico",
    "export-processing-plant": "Planta o Centro de inspección",
    crops: "cultivos",
  };
  if (sourceLanguage === "en") {
    return translations[type] || "Otro";
  } else {
    return (
      Object.keys(translations).find((k) => translations[k] === type) || "other"
    );
  }
};

export const formatHQ = (hq) => {
  return sedes[Number(hq).toString()] || "No especificada";
};

export const formatLine = (line) => {
  const linesMap = {
    AL: "Almacen",
    DI: "Distribuidor",
    EC: "Establecimiento comercial",
    EN: "Envasador",
    EX: "Exportador",
    FA: "Fabricante",
    FE: "Fabricante - Envasador",
    FO: "Formulador",
    FU: "Fumigador",
    IE: "Importador- Exportador",
    IM: "Importador",
    LA: "Laboratorio",
  };
  return linesMap[line] || "No especificado";
};

export const formatLivestockSuppliesLine = (data) => {
  const flagsMap = {
    flag_dist_vet: "Distribuidora",
    flag_enva_vet: "Envasadora",
    flag_expe_vet: "Comercializadora",
    flag_expo_vet: "Exportadora",
    flag_fabr_vet: "Fabricante",
    flag_impo_vet: "Importadora",
  };
  let lines = Object.keys(flagsMap)
    .filter((f) => data[f] === "1")
    .map((f) => flagsMap[f])
    .join(", ");
  const drugsFlagsMap = {
    flag_fabr_ali: "Alimentos, premezclas y aditivos",
    flag_fabr_alimed: "Alimentos medicados",
    flag_fabr_bio: "Biológicos",
    flag_fabr_fab: "??",
  };
  if (Object.keys(drugsFlagsMap).some((f) => data[f] === "1")) {
    lines +=
      ", Fármacos: " +
      Object.keys(drugsFlagsMap)
        .filter((f) => data[f] === "1")
        .map((f) => drugsFlagsMap[f])
        .join(", ");
  }
  return lines;
};

export const formatPoultry = (flags) => {
  const birds = [];
  if (flags[0] === "1") {
    birds.push("Pollos");
  }
  if (flags[1] === "1") {
    birds.push("Gallinas");
  }
  if (flags[2] === "1") {
    birds.push("Pavos");
  }
  if (flags[3] === "1") {
    birds.push("Patos");
  }
  if (flags[4] === "1") {
    birds.push("Gansos");
  }
  if (flags[5] === "1") {
    birds.push("Codornices");
  }
  if (flags[6] === "1") {
    birds.push("Avestruces");
  }
  if (flags[7] === "1") {
    birds.push("Otros");
  }
  return birds.join(", ");
};

export const formatCategory = (category) => {
  if (!category) {
    return null;
  }
  return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
};

export const formatCertifications = (certifications) => {
  return certifications
    .filter((v) => v[1] === "S")
    .map((v) => v[0])
    .join(", ");
};

export const formatDate = (dateISO) => {
  return dateISO ? format(parseISO(dateISO), "dd/MM/yyyy") : "-";
};
