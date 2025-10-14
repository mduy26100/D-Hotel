const Card = ({ children, className = "", hover = false }) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-200 ${
        hover ? "hover:shadow-md transition-shadow duration-200" : ""
      } ${className}`}
    >
      {children}
    </div>
  )
}

const CardHeader = ({ children, className = "" }) => {
  return <div className={`p-6 border-b border-gray-200 ${className}`}>{children}</div>
}

const CardBody = ({ children, className = "" }) => {
  return <div className={`p-6 ${className}`}>{children}</div>
}

const CardFooter = ({ children, className = "" }) => {
  return <div className={`p-6 border-t border-gray-200 ${className}`}>{children}</div>
}

Card.Header = CardHeader
Card.Body = CardBody
Card.Footer = CardFooter

export default Card
