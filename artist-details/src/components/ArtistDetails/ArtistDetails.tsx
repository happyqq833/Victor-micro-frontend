import React from "react";
import Info from "@components/Info";

interface IArtistDetailsProps {
  mbid: string;
  imgUrl: string;
}

const ArtistDetails: React.FC<IArtistDetailsProps> = ({ mbid, imgUrl }) => {
  return (
    <div className="p-6 flex flex-nowrap flex-col lg:!flex-row gap-10">
      <div className="flex-1">
        <Info mbid={mbid} imgUrl={imgUrl} />

      </div>
    </div>
  );
};

export default ArtistDetails;
