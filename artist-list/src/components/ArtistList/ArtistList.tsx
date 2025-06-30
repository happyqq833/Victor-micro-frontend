import React, { useEffect, useState } from "react";
import ArtistDetails from "artistDetails/ArtistDetails";
import { fetcher } from "@utils/fetcher";

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

const ArtistList: React.FC = () => {
  const [selectedArtistMbid, setSelectedArtistMbid] = useState<string | null>(null);
  const [selectedArtistImgUrl, setSelectedArtistImgUrl] = useState<string | null>(null);
  const [data, setData] = useState<User[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const close = () => setSelectedArtistMbid(null);

  useEffect(() => {
    const closeOnEscapePressed = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    };
    window.addEventListener("keydown", closeOnEscapePressed);
    return () => window.removeEventListener("keydown", closeOnEscapePressed);
  }, []);

  const onArtistPress = (mbid: string, imgUrl: string) => {
    setSelectedArtistMbid(mbid);
    setSelectedArtistImgUrl(imgUrl);
  };

  useEffect(() => {
    const fetchTopArtists = async () => {
      try {
        const res = await fetcher(`api/users?page=2`);
        setData(res);
      } catch (err) {
        console.error("Error fetching artists", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopArtists();
  }, []);

  if (isLoading) return <div>Đang tải...</div>;
  if (!data) return <div>Không có dữ liệu.</div>;

  return (
    <>
      <h1 className="text-2xl font-bold text-center my-4">Danh sách</h1>
      <div className="overflow-x-auto px-10 w-full">
        <table className="w-full max-w-screen-lg mx-auto bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden text-left">
          <thead className="bg-gray-100 text-gray-700 text-base">
            <tr>
              <th className="py-3 px-5 border-b">Ảnh đại diện</th>
              <th className="py-3 px-5 border-b">Họ</th>
              <th className="py-3 px-5 border-b">Tên</th>
              <th className="py-3 px-5 border-b">Email</th>
              <th className="py-3 px-5 border-b">Hành động</th>
            </tr>
          </thead>
          <tbody className="text-black text-[15px]">
            {data
              .filter((a) => a.avatar)
              .map((a) => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="py-3 px-5 border-b">
                    <img
                      src={a.avatar}
                      alt={a.first_name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="py-3 px-5 border-b">{a.last_name}</td>
                  <td className="py-3 px-5 border-b">{a.first_name}</td>
                  <td className="py-3 px-5 border-b">{a.email}</td>
                  <td className="py-3 px-5 border-b">
                    <button
                      onClick={() => onArtistPress(a.id, a.avatar)}
                      className="text-blue-600 underline"
                    >
                      Xem chi tiết
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {selectedArtistMbid && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={close}
          ></div>

          <div className="fixed z-50 top-1/2 left-1/2 w-[90vw] max-w-4xl max-h-[90vh] overflow-y-auto transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-lg">
            <ArtistDetails mbid={selectedArtistMbid} imgUrl={selectedArtistImgUrl} />
            <button
              onClick={close}
              className="absolute top-4 right-6 text-black text-xl"
            >
              &#x2715;
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default ArtistList;
