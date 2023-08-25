import CenteredContainer from "../../../components/CenteredContainer";


function FindVegetalPage() {
  return <CenteredContainer className="PlaceProfile__container">
  <div className="PlaceProfile__header">
    <div className="PlaceProfile__avatar">
      {/* <InlineIcon icon={data.icon} /> */}
    </div>
    {/* <h1 className="PlaceProfile__name">{data.name}</h1> */}
    <div className="PlaceProfile__photos_container">
      {/* <img src={placeImage1} alt="Imagen establecimiento" />
      <img src={placeImage2} alt="Imagen establecimiento" />
      <img src={getMainImage()} alt="Imagen establecimiento" /> */}
    </div>
    {/* <h2 className="PlaceProfile__subtitle">{data.displayType} en <span className='PlaceProfile__location'>{data.nameDepartamento}</span></h2> */}
    {/* <h2 className="PlaceProfile__subtitle">RUC: {data.ruc} • Padrón: {data.padron}</h2> */}
  </div>
  {/* <div className="PlaceProfile__body">
    <div className="PlaceProfile__place_data">
      <div className="PlaceProfile__extra_data">
        <h3 className="PlaceProfile__section_title">Datos del establecimiento</h3>
        <ul className="PlaceProfile__extra_data_list">
          <li>
            <h4>Categoría</h4>
            <p>{data.category}</p>
          </li>
          <li>
            <h4>Dirección</h4>
            <p>{data.address}</p>
          </li>
          <li>
            <h4>Sede de registro</h4>
            <p>{data.hq}</p>
          </li>
          {Object.keys(data.extraData).map((k, i) => (
            <li key={`extra-data-li-${i}`}>
              <h4>{k}</h4>
              <p>{data.extraData[k]}</p>
            </li>
          ))}
        </ul>
      </div>
      {data.creditorData && (
        <div className="PlaceProfile__contact_data">
          <h3 className="PlaceProfile__section_title">Información de acreditador</h3>
          <ul className="PlaceProfile__extra_data_list">
            {Object.keys(data.creditorData).map(k => (
              <li key={`creditor-data-${k}`}>
                <h4>{k}</h4>
                <p>{data.creditorData[k]}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      {data.contactData && (
        <div className="PlaceProfile__contact_data">
          <h3 className="PlaceProfile__section_title">Información de contacto</h3>
          <ul className="PlaceProfile__extra_data_list">
            {Object.keys(data.contactData).map(k => (
              <li key={`contact-data-${k}`}>
                <h4>{k}</h4>
                <p>{data.contactData[k]}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    {['agricultural-exporter'].includes(data.type) && (
      <div className="PlaceProfile__processes">
        <h3 className="PlaceProfile__section_title">Certificados de exportación</h3>
        <PlaceExportCertificate  />
      </div>
      )
    }
    { ['slaughterhouse'].includes(data.type) && (
        <div className="PlaceProfile__processes">
          <h3 className="PlaceProfile__section_title">Autorizaciones</h3>
          <PlaceAuthorizations />
        </div>
      )
    }
    {['slaughterhouse'].includes(data.type) &&  (
      <div className="PlaceProfile__links">
        <h3 className="PlaceProfile__section_title">Relaciones con otros establecimientos</h3>
        <PlaceCSTI />
      </div>
    )}
    {['export-processing-plant'].includes(data.type) && (
        <div className="PlaceProfile__links">
          <h3 className="PlaceProfile__section_title">Certificados de exportación relacionados</h3>
          <PlaceExportCertificate  />
        </div>
       )
      }
  </div> */}
</CenteredContainer>
}

export default FindVegetalPage;