/* eslint-disable react-hooks/exhaustive-deps */
import { Icon } from "@iconify/react";
import "../styles/establecimiento-resultado-modal.css";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { establecimientoActions } from "../features/establecimiento.slice";
import { EstablecimientoResultadoAnimal } from "./establecimiento-resultado-animal";
import { useEstablecimientoResultado } from "../hooks/use-establecimiento-resultado";
import { EstablecimientoResultadoVegetal } from "./establecimiento-resultado-vegetal";
import Loader from "../../../components/Loader";

export function EstablecimientoResultadoModal() {
  const dispatch = useDispatch();
  const { monitoreoSelected } = useSelector((state) => state.establecimiento);
  const resultado = useEstablecimientoResultado();

  const isOpen = useMemo(() => {
    return monitoreoSelected ? true : false;
  }, [monitoreoSelected]);

  const close = () => {
    dispatch(establecimientoActions.setMonitoreoSelected(undefined));
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
                <EstablecimientoResultadoAnimal data={resultado.data} />
              ) : (
                <EstablecimientoResultadoVegetal data={resultado.data} />
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
