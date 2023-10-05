/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
import { Icon } from "@iconify/react";
import { Collection } from "collect.js";
import { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import CardBody from "../../../shared/cards/components/card-body";
import { CardContainer } from "../../../shared/cards/components/card-container";
import CardSimple from "../../../shared/cards/components/card-simple";
import CardTitle from "../../../shared/cards/components/card-title";
import { useLazyFindInfosQuery } from "../features/predio.rtk";
import "../styles/predio-ecas-infos.css";

export default function PredioEcasInfos({ document }) {
  const [fetch, { isLoading, isFetching }] = useLazyFindInfosQuery();
  const [data, setData] = useState([]);

  const handle = () => {
    fetch(document)
      .unwrap()
      .then((data) => {
        const collections = new Collection(data);

        const tmpData = [];

        collections
          .groupBy("ANNO_REGISTRO")
          .keys()
          .each((title) => {
            const body = collections.where("ANNO_REGISTRO", title).toArray();
            tmpData.push({ title, body });
          });

        setData(tmpData);
      })
      .catch(() => setData([]));
  };

  useEffect(() => {
    if (document) handle();
  }, [document]);

  return (
    <CardContainer>
      <CardSimple>
        <CardTitle title="ECAS - Certificado de Buenas Practicas agricolas" />
        {isLoading || isFetching ? (
          <Loader />
        ) : (
          <CardBody>
            {data?.length ? (
              <div className="Predio__Ecas__Infos__List">
                {data?.map((item, index) => (
                  <div key={`item-ruta-${index}`} className="Container">
                    <h5 className="Container__Title">
                      <Icon icon="iwwa:year" /> Certificados del{" "}
                      {item?.title || ""}
                    </h5>
                    <div className="Container__Body">
                      {item.body?.map((b) => (
                        <a
                          key={`item-body-${b?.RUTA_QR}`}
                          href={b?.RUTA_QR}
                          target="_blank"
                          className="Item"
                        >
                          <Icon icon="fa-regular:file-pdf" className="Icon" />{" "}
                          {b?.FECHA_REGISTRO}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="Predio__Ecas__Error">
                Este productor no cuentra con buenas practicas agricolas
              </div>
            )}
          </CardBody>
        )}
      </CardSimple>
    </CardContainer>
  );
}
