import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { isNumber } from "lodash";
import { LocationType, getNameOfLocation } from "../../helpers/locations";
import {
  formatCategory,
  formatCertifications,
  formatDate,
  formatHQ,
  formatLine,
  formatLivestockSuppliesLine,
  formatPlaceType,
  formatPoultry,
  getIconByPlaceType,
  translatePlaceTypeSlug,
} from "../../helpers/places";

export const placeApi = createApi({
  reducerPath: "placeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        // headers.set('access-token', token)
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    place: builder.query({
      query: ({ id, spanishType }) =>
        `/${translatePlaceTypeSlug(spanishType, "es")}/${id}`,
      transformResponse: (res) => {
        const data = res.data[0];
        const placeData = {
          name: data.name,
          padron: data.id || "",
          ruc: data.ruc || "",
          address:
            data.address_legal || data.address || data.address_real || "-",
          category: formatCategory(data.category) || "-",
          type: data.type,
          hq: formatHQ(data.hq),
          displayType: formatPlaceType(data.type),
          nameDepartamento: getNameOfLocation(
            data.department,
            LocationType.Departamento
          ),
          nameProvincia: getNameOfLocation(
            [data.province, data.codi_prov_tpr],
            LocationType.Provincia
          ),
          nameDistrito: getNameOfLocation(
            [data.district, data.codi_prov_tpr, data.codi_dist_tdi],
            LocationType.Distrito
          ),
          icon: getIconByPlaceType(data.type),
        };
        switch (data.type) {
          case "agricultural-supplies":
            placeData.extraData = {
              Giro: formatLine(data.line),
              "Año de registro": data.year || "-",
              "Número de expediente":
                data.file_code || data.document_code || "-",
            };
            break;
          case "feed-processing":
            placeData.extraData = {
              "Dirección real": data.address_real || "-",
            };
            placeData.contactData = {
              "RUC responsable": data.ruc_profesional || "-",
            };
            break;
          case "livestock-supplies":
            placeData.extraData = {
              "Giro(s)": formatLivestockSuppliesLine(data),
              "Dirección real": data.address_real,
              "Año de registro": data.year || "-",
              "Número de expediente": data.document_code || "-",
            };
            placeData.contactData = {
              "Documento responsable": data.document_code
                ? `${data.document_code} (${data.document_type})`
                : "-",
            };
            break;
          case "poultry-farm":
            placeData.extraData = {
              Giro: data.giro_granja || "-",
              "Año de registro": data.year || "-",
              "Tipos de ave": formatPoultry(data.tipos_ave) || "-",
              "Código de autorización de construcción":
                data.solicitud_construccion || "-",
              "Código de autorización de funcionamiento":
                data.autorizacion_funcionamiento || "-",
              "Fecha vencimiento autorización":
                data.fecha_vencimiento_autorizacion
                  ? format(
                      parseISO(data.fecha_vencimiento_autorizacion),
                      `dd MMMM yyyy`,
                      { locale: es }
                    )
                  : "-",
              "Código único": data.file_code || "-",
              "Código predio": data.estate_code || "-",
              "Código expediente": data.ccodexp || "-",
              "Capacidad diaria":
                data.capacidad_diaria?.toLocaleString("de-DE") || "-",
              "Capacidad instalada":
                data.capacidad_instalada?.toLocaleString("de-DE") || "-",
              "Número de galpones": data.numero_galpones || "-",
            };
            placeData.contactData = {
              Solicitante:
                `${data.nombres_solicitante} ${data.apellido_paterno_solicitante} ${data.apellido_materno_solicitante}` ||
                "-",
              Documento: `${data.dni} (${data.tipo_documento_interesado})`,
              "Teléfono establecimiento": data.telefono_establecimiento || "-",
              Fax: data.fax_interesado || "-",
              "E-mail establecimiento 1": data.correo_establecimiento || "-",
              "E-mail establecimiento 2": data.email_interesado || "-",
              "Domicilio interesado": data.domicilio_legal_interesado || "-",
              "Persona de contacto": data.contacto || "-",
            };
            break;
          case "slaughterhouse":
          case "cold_meat_stores":
          case "poultry_slaughter_center":
          case "rendering":
            placeData.extraData = {
              Giro: data.line,
              "Año de registro": data.year,
              "Privado o municipal": data.category_2,
              "Ingreso de solicitud": formatDate(data.start_date),
              "Última modificación": formatDate(data.fech_modi),
            };
            placeData.contactData = {
              "Persona de contacto": data.contact_person || "-",
            };
            break;
          case "primary-processing":
            placeData.extraData = {
              "Tipo de alimento": data.food_type,
              Estado: data.state,
              "Identificador establecimiento": data.id_establishment,
              "Identificador archivo": data.id_file,
              "Identificador solicitud": data.request_id,
              "Identificador reporte": data.id_report,
              "Identificador reporte AUI": data.id_report_aui,
            };
            break;
          case "livestock-exporter":
            placeData.extraData = {
              "Año de registro": data.year,
              "Tipo de establecimiento": data.category,
              "Tipo de producción": data.line,
              "Responsable de este establecimiento": data.user_code,
              "Fecha de ingreso de solicitud": formatDate(data.start_date),
              "Fecha aprobación": formatDate(data.end_date),
              "Última modificación": formatDate(data.fech_modi),
            };
            placeData.contactData = {
              "Persona de contacto": data.contact_person || "-",
            };
            break;
          case "agricultural-exporter":
            placeData.extraData = {
              "Año de registro": data.year,
              "Fecha de ingreso de solicitud": formatDate(data.start_date),
              "Última modificación": formatDate(data.fech_modi),
            };
            placeData.contactData = {
              "Persona de contacto": data.contact_person || "-",
            };
            break;
          case "organic-certifier":
            placeData.extraData = {
              "Identificador del certificador": data.certifier_id,
              "Certifica para": formatCertifications([
                ["Producción Animal", data.certify_animal_production],
                ["Apicultura", data.certify_apiculture],
                ["Comercio", data.certify_comerce],
                ["Procesamiento", data.certify_process],
                ["Producción Vegetal", data.certify_vegetal_production],
                ["Silvestre", data.certify_wild],
              ]),
              "Número de registro": data.document_code,
              "Ingreso de solicitud": formatDate(data.start_date),
              "Fecha aprobación": formatDate(data.end_date),
              // 'is_active': data.is_active,
              // 'licence_by': data.licence_by,
              "Cód. responsable SENASA": data.user_code,
              // 'year': data.year,
              "Última modificación": formatDate(data.fech_modi),
            };
            placeData.creditorData = {
              "Organismo acreditador": data.creditor_name,
              "Dirección de acreditador": data.creditor_address,
              "Teléfono de acreditador": data.creditor_phone,
              "E-mail de acreditador": data.creditor_email,
            };
            placeData.contactData = {
              "Persona responsable": data.contact_person,
              DNI: data.contact_person_dni,
              Cargo: data.contact_person_position,
              "E-mail establecimiento": data.email,
              // 'contact_person_position_1': data.contact_person_position_1,
            };
            break;
          case "export-processing-plant":
            placeData.extraData = {
              "Código de solicitud": data.application_id || "-",
              "Código de expediente": data.file_id || "-",
              Estado: data.state || "-",
              "Fecha de ingreso de solicitud": formatDate(data.start_date),
              "Última modificación": formatDate(data.fech_modi),
            };
            placeData.contactData = {
              "Persona de contacto": data.contact_person || "No se informa",
            };
            break;
          default:
            placeData.extraData = {};
        }
        return placeData;
      },
    }),
    authorizations: builder.query({
      query: ({ id, spanishType }) =>
        `/${translatePlaceTypeSlug(spanishType, "es")}/auth/${id}`,
      transformResponse: (res) => {
        const results = res.data;
        results.sort((r1, r2) => (r1.end_date > r2.end_date ? -1 : 1));
        return results.map((result) => {
          const {
            auth_id,
            auth_type,
            line,
            hq,
            address_real,
            contact_person,
            mobile_phone,
            end_date,
          } = result;
          return [
            {
              property: "Fecha",
              value: end_date ? format(parseISO(end_date), "dd-MM-yyyy") : "-",
            },
            {
              property: "Código",
              value:
                auth_id +
                "-MINAGRI-SENASA-" +
                formatHQ(hq).replace("Dirección Ejecutiva ", ""),
            },
            { property: "Tipo", value: auth_type },
            { property: "Tipo est.", value: line },
            // { property: 'Tipo de ave autorizada', value: bird_type },
            { property: "Dirección", value: address_real },
            {
              property: "Contacto",
              value: `${contact_person} ${mobile_phone ?? ""}`,
            },
          ];
        });
      },
    }),
    csti: builder.query({
      query: ({ id, spanishType }) =>
        `/${translatePlaceTypeSlug(spanishType, "es")}/csti/${id}`,
      transformResponse: (res) => {
        const results = res.data;
        results.sort((r1, r2) =>
          r1.valid_start_date > r2.valid_start_date ? -1 : 1
        );
        return results.map((result) => {
          const {
            csti_id,
            file_code,
            type,
            start_date,
            valid_start_date,
            valid_days,
            department_origin,
            province_origin,
            district_origin,
            contact_person_type,
            contact_person_dni,
            farm,
          } = result;
          return {
            properties: [
              {
                property: "Fecha inicio CSTI",
                value: formatDate(valid_start_date),
              },
              { property: "Identificador de CSTI", value: csti_id },
              { property: "Cód. expediente", value: file_code },
              { property: "Tipo de vínculo con est.", value: type },
              {
                property: "Días de validez",
                value: isNumber(valid_days) ? Number(valid_days) : "-",
              },
              {
                property: "Departamento de origen",
                value: getNameOfLocation(
                  department_origin,
                  LocationType.Departamento
                ),
              },
              {
                property: "Provincia de origen",
                value: getNameOfLocation(
                  [department_origin, province_origin],
                  LocationType.Provincia
                ),
              },
              {
                property: "Distrito de origen",
                value: getNameOfLocation(
                  [department_origin, province_origin, district_origin],
                  LocationType.Distrito
                ),
              },
              { property: "DNI responsable", value: contact_person_dni },
              { property: "Tipo responsable", value: contact_person_type },
              {
                property: "Cód. productor",
                value: farm?.CODI_PROD_MOS ? farm.CODI_PROD_MOS : "-",
              },
              {
                property: "Nombre productor",
                value: farm?.NOMB_PROD_MOS ? farm.NOMB_PROD_MOS : "-",
              },
            ],
            link: farm?.FARM_ID,
          };
        });
      },
    }),
    exportCertificate: builder.query({
      query: ({ id, spanishType }) =>
        `/agricultural-exporter/certificates/${translatePlaceTypeSlug(
          spanishType,
          "es"
        )}/${id}`,
      transformResponse: (res) => {
        const results = res.data;
        results.sort((r1, r2) =>
          r1.inspection_date > r2.inspection_date ? -1 : 1
        );
        return results.map((result) => {
          const {
            exporter_id,
            certificate_id,
            certificate_state,
            inspection_place,
            importer,
            destination,
            transportation_mode,
            checkpoint,
            code_plant,
            plant_id,
            inspection_date,
            export_date,
            products,
            files,
          } = result;
          return {
            item: result,
            properties: [
              { property: "Cód. certificado", value: certificate_id },
              { property: "Estado", value: certificate_state },
              {
                property: "Fecha inspección",
                value: formatDate(inspection_date),
              },
              { property: "Planta", value: code_plant ? code_plant : "-" },
              {
                property: "Punto de inspección",
                value: inspection_place ? inspection_place : "-",
              },
              { property: "Fecha exportación", value: formatDate(export_date) },
              { property: "Punto de salida", value: checkpoint },
              { property: "Modo de envío", value: transportation_mode },
              { property: "Cod. país destino", value: destination },
              { property: "Importador", value: importer },
            ],
            link_plant: plant_id,
            link_exporter: exporter_id,
            products,
            files,
          };
        });
      },
    }),
    exportOriginCertificate: builder.query({
      query: ({ id }) => `/agricultural-exporter/origin-certificates/${id}`,
      transformResponse: (res) => {
        const results = res.data;
        results.sort((r1, r2) => (r1.start_date > r2.start_date ? -1 : 1));
        return results.map((result) => {
          const {
            application_id,
            certificate_id,
            camp_exportacion,
            area,
            start_date,
            products,
          } = result;
          return {
            properties: [
              { property: "Cód. certificado", value: certificate_id },
              { property: "Cód. solicitud", value: application_id },
              {
                property: "Campaña",
                value: camp_exportacion ? camp_exportacion : "-",
              },
              { property: "Fecha de cosecha", value: formatDate(start_date) },
              { property: "Area", value: area },
            ],
            products: products,
          };
        });
      },
    }),
  }),
});

export const {
  usePlaceQuery,
  useAuthorizationsQuery,
  useCstiQuery,
  useExportCertificateQuery,
  useExportOriginCertificateQuery,
} = placeApi;
