import React from "react";

export default function PhotoPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <div className="fullscreen-image">
      <img
        src={`https://fastly.picsum.photos/id/134/200/300.jpg?hmac=KN18cCDft4FPM0XJpr7EhZLtUP6Z4cZqtF8KThtTvsI`}
        alt={"test"}
      />
    </div>
  );
}
