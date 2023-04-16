type PropsType = {
  title: string,
  children: any
}

const Card = ({title, children}: PropsType) => {
  return (
    <div className='card'>
      <h2 className='f-h4'>{title}</h2>
      {children}
    </div>
  )
}

export default Card
