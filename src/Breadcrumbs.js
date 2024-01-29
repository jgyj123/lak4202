import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./Breadcrumbs.css";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="breadcrumbs">
      <Link to="/">Home</Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return (
          <React.Fragment key={name}>
            <span className="breadcrumb-separator"> &gt; </span>{" "}
            {/* Separator */}
            {isLast ? (
              <span className="breadcrumb-route">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </span>
            ) : (
              <span>
                <Link to={routeTo}>{name}</Link>
              </span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
