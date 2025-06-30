import { fetcher } from "@utils/fetcher";
import React, { useEffect, useState } from "react";
import { Title, Wave } from "ui/components";

interface IInfoProps {
  mbid: string;
  imgUrl: string
}

interface UserInfo {
  id: string | number
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

const Info: React.FC<IInfoProps> = ({ mbid, imgUrl }) => {
  const [info, setInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtistInfo = async () => {
      try {
        const res = await fetcher(
          `api/users/${mbid}`
        );
        if (!res) throw new Error("Không lấy được dữ liệu");
        setInfo(res);
      } catch (err: any) {
        setError(err.message || "Đã có lỗi xảy ra");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtistInfo();
  }, [mbid]);

  if (isLoading)
    return (
      <div className="h-[360px] flex items-center justify-center">
        <Wave />
      </div>
    );

  if (error || !info)
    return (
      <div className="h-[360px] flex items-center justify-center text-red-500">
        {error || "Không có dữ liệu"}
      </div>
    );


  return (
    <div className="flex-1">
      <div className="w-[60px] shrink-0 mx-auto sm:mx-0">
        <img
          className="w-[60px] h-[60px] object-cover object-top rounded-xl"
          src={info.avatar ?? imgUrl}
        />
      </div>
      <Title size="base" className="leading-none mb-3">
        {info.first_name}  {info.last_name}
      </Title>

      <div className="lg:h-[316px] overflow-y-scroll scrollbar-hide">
        <p className="text-lg text-black bg-gradient-to-br from-slate-100 to-slate-500 bg-clip-text tracking-tight text-transparent">
          {info.email}
        </p>
      </div>
    </div>
  );
};

export default Info;
