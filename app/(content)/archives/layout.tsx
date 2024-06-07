import React from "react";

type Props = {};

export default function ArchivePage({ archive, latest }: any) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div className="font-extrabold text-4xl text-center">Archive News</div>
      <div className="">{archive}</div>
      <div className="">{latest}</div>
    </div>
  );
}
