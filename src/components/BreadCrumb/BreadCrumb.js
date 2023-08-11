import { Icon } from "@iconify/react";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { useAnimalQuery } from "../../redux/services/animal";
import { useFarmQuery } from "../../redux/services/farm";
import { usePlaceQuery } from "../../redux/services/place";
import CenteredContainer from "../CenteredContainer";
import "./BreadCrumb.css";

const PlaceBreadcrumb = ({ match }) => {
  const { id, type } = match.params;
  const { data, isLoading } = usePlaceQuery({ id, spanishType: type });

  if (isLoading) {
    return null;
  }

  return (
    <CenteredContainer className="BreadCrumb__container">
      <div className="BreadCrumb">
        <Link to="/">Inicio</Link>
        <Icon
          icon="mdi:chevron-double-right"
          className="BreadCrumb__separator"
        />
        <Link to="/">Establecimientos</Link>
        <Icon
          icon="mdi:chevron-double-right"
          className="BreadCrumb__separator"
        />
        <span className="BreadCrumb__name">
          {data?.name || "No encontrado"}
        </span>
      </div>
    </CenteredContainer>
  );
};

const AnimalBreadcrumb = ({ match }) => {
  const { id, type } = match.params;
  const { data, isLoading } = useAnimalQuery({ id, spanishType: type });

  if (isLoading || !data) {
    return null;
  }

  return (
    <CenteredContainer className="BreadCrumb__container">
      <div className="BreadCrumb">
        <Link to="/">Inicio</Link>
        <Icon
          icon="mdi:chevron-double-right"
          className="BreadCrumb__separator"
        />
        <Link to="/">Animal</Link>
        <Icon
          icon="mdi:chevron-double-right"
          className="BreadCrumb__separator"
        />
        <span className="BreadCrumb__name">
          {data?.code || "No encontrado"}
        </span>
      </div>
    </CenteredContainer>
  );
};

const FarmBreadcrumb = ({ match }) => {
  const { id, type } = match.params;
  const { data, isLoading } = useFarmQuery({ id, spanishType: type });

  if (isLoading) {
    return null;
  }

  return (
    <CenteredContainer className="BreadCrumb__container">
      <div className="BreadCrumb">
        <Link to="/">Inicio</Link>
        <Icon
          icon="mdi:chevron-double-right"
          className="BreadCrumb__separator"
        />
        <Link to="/">Predio</Link>
        <Icon
          icon="mdi:chevron-double-right"
          className="BreadCrumb__separator"
        />
        <span className="BreadCrumb__name">
          {data?.name || "No encontrado"}
        </span>
      </div>
    </CenteredContainer>
  );
};

const SearchBreadcrumb = ({ match }) => {
  const { searchTerm } = useSelector((state) => state.search);
  const location = useLocation();

  return (
    <CenteredContainer className="BreadCrumb__container">
      <div className="BreadCrumb">
        <Link to="/">Inicio</Link>
        <Icon
          icon="mdi:chevron-double-right"
          className="BreadCrumb__separator"
        />
        <Link to={`${location.pathname}?q=${searchTerm}`}>Búsqueda</Link>
        {match.params.type && (
          <>
            <Icon
              icon="mdi:chevron-double-right"
              className="BreadCrumb__separator"
            />
            Ficha establecimiento
          </>
        )}
      </div>
    </CenteredContainer>
  );
};

export const BreadcrumbSimple = ({ options = [], title }) => {
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
};

const routes = [
  { path: "/busqueda", breadcrumb: SearchBreadcrumb },
  { path: "/establecimiento/:type/:id", breadcrumb: PlaceBreadcrumb },
  { path: "/animal/:id", breadcrumb: AnimalBreadcrumb },
  { path: "/predio/:id", breadcrumb: FarmBreadcrumb },
];

const BreadCrumb = () => {
  const breadcrumbs = useBreadcrumbs(routes, { disableDefaults: true });
  return breadcrumbs.map(({ breadcrumb }) => breadcrumb);
};

export default BreadCrumb;
