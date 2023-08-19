import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import _ from "lodash";
import {
  LocationType,
  getNameOfLocation,
  getPositionOfLocation,
} from "../../helpers/locations";
import {
  formatHQ,
  getSlaughterhouseType,
  translatePlaceTypeSlug,
} from "../../helpers/places";

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_BASE_URL}/search`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        // headers.set('access-token', token)
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    searchForProvider: builder.query({
      query: ({ search, type }) => {
        const querySearch = new URLSearchParams();
        if (search) querySearch.set("q", search);
        if (type) querySearch.set("type", type);
        return `/company?${querySearch.toString()}`;
      },
      transformResponse: (res) => {
        const data = res.data.map((item) => {
          const [codDepartamento, codProvincia, codDistrito] =
            item.ubigeo?.match(/.{2}/g) || ["100", "100", "100"];
          return {
            name: item.name || "",
            ruc: item.ruc || "",
            padron: item.id || "",
            codDepartamento,
            codProvincia,
            codDistrito,
            year: item.year || "NA",
            hq: formatHQ(item.hq) || "NA",
            nameDepartamento: getNameOfLocation(
              codDepartamento,
              LocationType.Departamento
            ),
            nameProvincia: getNameOfLocation(
              [codDepartamento, codProvincia],
              LocationType.Provincia
            ),
            nameDistrito: getNameOfLocation(
              [codDepartamento, codProvincia, codDistrito],
              LocationType.Distrito
            ),
            type: getSlaughterhouseType(item),
            spanishType: translatePlaceTypeSlug(item.type),
          };
        });
        const departamentosCounts = _.countBy(data, "codDepartamento");
        const departamentos = Object.keys(departamentosCounts).map((key) => ({
          name: getNameOfLocation(key, LocationType.Departamento),
          position: getPositionOfLocation(key, LocationType.Departamento),
          count: departamentosCounts[key],
        }));
        departamentos.sort((a, b) => b.count - a.count);
        const typesCounts = _.countBy(data, "type");
        const types = Object.keys(typesCounts).map((name) => ({
          name,
          count: typesCounts[name],
        }));
        const yearsCounts = _.countBy(data, "year");
        const years = Object.keys(yearsCounts).map((name) => ({
          name,
          count: yearsCounts[name],
        }));
        years.sort((a, b) => b.name - a.name);
        const hqsCounts = _.countBy(data, "hq");
        const hqs = Object.keys(hqsCounts).map((name) => ({
          name,
          count: hqsCounts[name],
        }));
        hqs.sort((a, b) => b.count - a.count);
        return {
          count: data.length,
          data,
          departamentos,
          types,
          years,
          hqs,
        };
      },
    }),
    searchForAnimal: builder.query({
      query: (q) => `/animal?q=${q || ""}`,
      transformResponse: (res) => {
        const transformedesponse = res.data.map((result) => ({
          id: result.id,
          code: result.cod_arete,
          species: result.animal_specie,
          gender: result.gender,
          modifiedISO: result.fech_modi,
          modifiedDate: result.fech_modi
            ? format(parseISO(result.fech_modi), `dd MMMM yyyy`, { locale: es })
            : "-",
          company: result.nomb_prod_pro,
          sucursal: result.nomb_pred_pre,
          originCode: result.codi_pred_pre,
          highLow:
            result.high_low === "A"
              ? "Alta"
              : result.high_low === "B"
              ? "Baja"
              : result.high_low,
          nameDepartamento: getNameOfLocation(
            result.codi_depa_pro,
            LocationType.Departamento
          ),
          nameProvincia: getNameOfLocation(
            [result.codi_depa_pro, result.codi_prov_pro],
            LocationType.Provincia
          ),
          nameDistrito: getNameOfLocation(
            [result.codi_depa_pro, result.codi_prov_pro, result.codi_dist_pro],
            LocationType.Distrito
          ),
        }));
        return transformedesponse;
      },
    }),
    searchForFarm: builder.query({
      query: (q) => `/farm?q=${q || ""}`,
      transformResponse: (res) => {
        const farms = res.data.map((result) => {
          const {
            id,
            name,
            hq,
            department,
            district,
            province,
            state,
            geo_lat,
            geo_long,
            start_date,
            fech_modi,
            year,
            farmer_name,
            farmer_dni,
            farmer_ruc,
          } = result;
          return {
            id,
            name: name ?? "Predio sin nombre",
            hq: formatHQ(hq),
            codDepartamento: department,
            nameDepartamento: getNameOfLocation(
              department,
              LocationType.Departamento
            ),
            nameProvincia: getNameOfLocation(
              [department, province],
              LocationType.Provincia
            ),
            nameDistrito: getNameOfLocation(
              [department, province, district],
              LocationType.Distrito
            ),
            lat: geo_lat / 1000,
            lng: geo_long / 1000,
            ruc: farmer_ruc,
            farmerName: farmer_name,
            farmerDNI: farmer_dni,
          };
        });
        const departamentosCounts = _.countBy(farms, "codDepartamento");
        const departamentos = Object.keys(departamentosCounts).map((key) => ({
          name: getNameOfLocation(key, LocationType.Departamento),
          position: getPositionOfLocation(key, LocationType.Departamento),
          count: departamentosCounts[key],
        }));
        departamentos.sort((a, b) => b.count - a.count);
        const hqsCounts = _.countBy(farms, "hq");
        const hqs = Object.keys(hqsCounts).map((name) => ({
          name,
          count: hqsCounts[name],
        }));
        hqs.sort((a, b) => b.count - a.count);
        return {
          farms,
          departamentos,
          hqs,
        };
      },
    }),
  }),
});

export const {
  useSearchForProviderQuery,
  useSearchForAnimalQuery,
  useSearchForFarmQuery,
} = searchApi;
