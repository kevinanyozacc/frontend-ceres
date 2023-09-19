/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
import { Icon } from "@iconify/react";
import { useEffect } from "react";
import Loader from "../../../components/Loader";
import CardBody from "../../../shared/cards/components/card-body";
import { CardContainer } from "../../../shared/cards/components/card-container";
import CardSimple from "../../../shared/cards/components/card-simple";
import CardTitle from "../../../shared/cards/components/card-title";
import { useLazyFindInfosQuery } from "../features/predio.rtk";
import "../styles/predio-ecas-infos.css";

export default function PredioEcasInfos({ document }) {
  const [fetch, { isLoading, isFetching, data }] = useLazyFindInfosQuery();

  const handle = () => {
    fetch(document)
      .unwrap()
      .then((data) => console.log(data))
      .catch(() => console.log());
  };

  const messageError = () => {
    alert("El archivo no está disponible!!!");
  };

  useEffect(() => {
    if (document) handle();
  }, [document]);

  return (
    <CardContainer>
      <CardSimple>
        <CardTitle title="Ruta QR" />
        {isLoading || isFetching ? (
          <Loader />
        ) : (
          <CardBody>
            {data?.length ? (
              <div className="Predio__Ecas__Infos__List">
                {data?.map((item, index) => (
                  <a
                    href={item?.RUTA_QR}
                    key={`item-ruta-${index}`}
                    target="_blank"
                    className="Item"
                    onClick={item?.RUTA_QR ? undefined : messageError}
                  >
                    <Icon
                      icon={
                        item?.RUTA_QR
                          ? "akar-icons:file"
                          : "tabler:file-x-filled"
                      }
                    />{" "}
                    {item?.FECHA_REGISTRO}
                  </a>
                ))}
              </div>
            ) : (
              "No se encontró información"
            )}
          </CardBody>
        )}
      </CardSimple>
    </CardContainer>
  );
}
