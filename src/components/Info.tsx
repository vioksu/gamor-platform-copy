import { Link } from "react-router-dom"

export const Info = () => {
  return (
    <div className='info'>
      <h1>Start <span>Streaming</span> Games differently </h1>
      <p className="space-outer-5">Gamor now has <span>stream party</span> platform</p>
      <div className="info__cta space-outer-5">
        <Link to='create-account' className="cta light">Create Account</Link>
        <Link to='login' className="info__cta--sign-in">Sign in</Link>
      </div>
    </div>
  )
}
