import React from "react";

const Card = ({ img, title, description, children }) => {
  return (
    <div className="card">
      <img src={img} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="card-actions">{children}</div>
    </div>
  );
};

export default Card;