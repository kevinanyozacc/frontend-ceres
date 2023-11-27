/* eslint-disable react-hooks/exhaustive-deps */
import { Icon } from "@iconify/react";
import "../styles/cultivo-resultado-modal.css";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { cultivoActions } from "../features/cultivo.slice";
import { useCultivoMonitoreoResultado } from "../hooks/use-cultivo-monitoreo-resultado";
import { CultivoMonitoreoResultadoAnimal } from "./cultivo-monitoreo-resultado-animal";
import { CultivoMonitoreoResultadoVegetal } from "./cultivo-monitoreo-resultado-vegetal";

export function CultivoMonitoreoResultadoModal() {
  const dispatch = useDispatch();
  const { monitoreoSelected } = useSelector((state) => state.establecimiento);
  const resultado = useCultivoMonitoreoResultado();

  const isOpen = useMemo(() => {
    return monitoreoSelected ? true : false;
  }, [monitoreoSelected]);

  const close = () => {
    dispatch(cultivoActions.setMonitoreoSelected(undefined));
  };

  const validate = () => {
    if (resultado.codeId) {
      return;
    } else {
      alert("No hay resultados");
      close();
    }
  };

  useEffect(() => {
    if (monitoreoSelected && resultado.type) validate();
  }, [monitoreoSelected, resultado.type, resultado.codeId]);

  return (
    <div className={`modal-back ${isOpen ? "active" : ""}`}>
      <div className="modal-content">
        <div className="modal-box">
          <div className="box-title">
            RESULTADO {resultado.type?.toUpperCase()}: {resultado.codeId || ""}
          </div>
          <div className="box-close" onClick={close}>
            <Icon icon="ant-design:close-outlined" />
          </div>
          <div className="modal-body">
            {resultado.type ? (
              resultado.isPending ? (
                <Loader />
              ) : resultado.type === "animal" ? (
                <CultivoMonitoreoResultadoAnimal data={resultado.data} />
              ) : (
                <CultivoMonitoreoResultadoVegetal data={resultado.data} />
              )
            ) : (
              "Resultado no soportado"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
