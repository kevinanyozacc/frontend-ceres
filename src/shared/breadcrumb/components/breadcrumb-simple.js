import { Icon } from "@iconify/react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

export default function BreadcrumbSimple({ options = [], title }) {
  return (
    <div className="BreadCrumb" style={{ padding: "1em" }}>
      <Link to="/">Inicio</Link>
      <Icon icon="mdi:chevron-double-right" className="BreadCrumb__separator" />
      {options?.map((opt, index) => (
        <Fragment key={`item-breadcrumb-${index}`}>
          <Link to={opt.url}>{opt.name}</Link>
          <Icon
            icon="mdi:chevron-double-right"
            className="BreadCrumb__separator"
          />
        </Fragment>
      ))}
      <span className="BreadCrumb__name">{title}</span>
    </div>
  );
}
