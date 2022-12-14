import classNames from 'classnames'
import './CenteredContainer.css'

const CenteredContainer = ({ children, className }) => {
  return (
    <div className={classNames({
      'CenteredContainer': true,
      [className]: true
    })}>
      <div className="CenteredContainer__content">
        {children}
      </div>
    </div>
  )
}

export default CenteredContainer