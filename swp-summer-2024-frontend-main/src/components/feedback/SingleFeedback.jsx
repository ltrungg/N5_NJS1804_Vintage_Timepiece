import { Avatar, Rate } from "antd";
import moment from "moment";
import React from "react";
import dateFormat from "../../assistants/date.format";

export default function SingleFeedback({ feedback }) {
  return (
    <div className="w-full flex items-start justify-start gap-4 p-2 border-b font-montserrat">
      <Avatar src={feedback.evaluator.avatar} size={40} alt="" />
      <span>
        <p className="font-semibold flex items-center">
          {feedback.evaluator.username}
          <Rate disabled value={feedback.rating} className="px-4" />
        </p>
        <p className="font-light text-xs">
          {dateFormat(feedback.createdAt, "HH:mm dd mmm yyyy")}
        </p>
        <p className="py-2">{feedback.comment}</p>
      </span>
    </div>
  );
}
