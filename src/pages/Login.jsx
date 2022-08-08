import Navbar from '../components/NavBar';

function Login() {
  return (
    <>
      <header>
        <Navbar />
        <div className="container">
          <h1 className="title">Login</h1>
        </div>
      </header>
      <section>
        <div className="container">
          <div className="form-layout">
            {/* <div></div> */}
            <form className="form">
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    required
                  />
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="user-password" className="form-label">
                  Password
                  <input
                    type="password"
                    name="user-password"
                    id="user-password"
                    className="form-control"
                    required
                  />
                </label>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
