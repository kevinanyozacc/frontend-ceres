import './Loader.css'

const Loader = ({ query }) => {
  return (
    <div className="Loader">
      <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      {query && <p className="Loader__text">{query}</p>}
    </div>
  )
}

export default Loader