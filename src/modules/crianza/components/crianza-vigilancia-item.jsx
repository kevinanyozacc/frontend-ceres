import { Icon } from "@iconify/react";
import { DateTime } from "luxon";
import { Fragment, useState } from "react";
import { TableSimpleCell } from "../../../shared/table/components/table-simple-cell";
import { TableSimpleRow } from "../../../shared/table/components/table-simple-row";

export function CrianzaVigilanciaItem({ item }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Fragment>
      <TableSimpleRow
        className="cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <TableSimpleCell noWrap>{item.CODI_PRED_PRE}</TableSimpleCell>
        <TableSimpleCell noWrap>{item.N_SOLICITUD_LAB}</TableSimpleCell>
        <TableSimpleCell noWrap>
          {item.F_GENERACION
            ? DateTime.fromISO(item.F_GENERACION).toFormat("dd/MM/yyyy")
            : ""}
        </TableSimpleCell>
        <TableSimpleCell noWrap>
          {item.F_RECEP_SOL
            ? DateTime.fromISO(item.F_RECEP_SOL).toFormat("dd/MM/yyyy")
            : ""}
        </TableSimpleCell>
        <TableSimpleCell noWrap>{item.FICHA_VIGILANCIA}</TableSimpleCell>
        <TableSimpleCell noWrap>{item.NOMB_PRED_PRE}</TableSimpleCell>
        <TableSimpleCell noWrap>{item.FICHA_VIGILANCIA_1}</TableSimpleCell>
        <TableSimpleCell noWrap>{item.POBL_AVES_SIT}</TableSimpleCell>
        <TableSimpleCell noWrap>{item.POBL_BOVI_SIT}</TableSimpleCell>
        <TableSimpleCell noWrap>{item.POBL_CAME_SIT}</TableSimpleCell>
        <TableSimpleCell noWrap>{item.POBL_ALP_SIT}</TableSimpleCell>
        <TableSimpleCell noWrap>{item.POBL_LLA_SIT}</TableSimpleCell>
        <TableSimpleCell noWrap>{item.POBL_CAPR_SIT}</TableSimpleCell>
        <TableSimpleCell noWrap>{item.POBL_EQUI_SIT}</TableSimpleCell>
        <TableSimpleCell noWrap>{item.POBL_OTRO_SIT}</TableSimpleCell>
        <TableSimpleCell noWrap>{item.POBL_OVIN_SIT}</TableSimpleCell>
        <TableSimpleCell noWrap>{item.POBL_PORC_SIT}</TableSimpleCell>
      </TableSimpleRow>
      {/* body */}
      {isOpen
        ? item?.body?.map((animal, index) => (
            <TableSimpleRow
              key={`item-animal-${animal.NUME_REGI_SOL}-${index}`}
            >
              <TableSimpleCell></TableSimpleCell>
              <TableSimpleCell colSpan={2}>
                <Icon icon="ph:eyedropper-sample-thin" /> {animal.ESPE_ANIM_ANI}
              </TableSimpleCell>
              <TableSimpleCell colSpan={2}>
                <Icon icon="jam:id-card" /> {animal.CODI_MUES_MUE}
              </TableSimpleCell>
              <TableSimpleCell>
                <Icon icon="ph:gender-intersex-duotone" /> {animal.SEXO}
              </TableSimpleCell>
              <TableSimpleCell>
                <Icon icon="iconoir:birthday-cake" /> {animal.EDAD_MUES_MUE}{" "}
                {animal.UNIDAD}
              </TableSimpleCell>
            </TableSimpleRow>
          ))
        : null}
    </Fragment>
  );
}
