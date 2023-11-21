import React from "react";
import {FeedbackForm} from "./FeedbackForm";

export const FeedbackPage = (props) => {
  return (
    <div>
      <FeedbackForm {...props} />
    </div>
  );
};