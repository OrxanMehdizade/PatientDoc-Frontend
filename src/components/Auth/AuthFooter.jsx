import "../../assets/styles/Auth/AuthFooter.css";

let AuthFooter = () => {
  let year = new Date().getFullYear();
  return (
    <div className="auth-footer-container">
      <p>
        &copy;{year} DocPoint . Design & Develop by {" "}
        <a target="_blank" href="https://brains.az" rel="noreferrer">
          Brains Agency
        </a>
      </p>
    </div>
  );
};

export default AuthFooter;
