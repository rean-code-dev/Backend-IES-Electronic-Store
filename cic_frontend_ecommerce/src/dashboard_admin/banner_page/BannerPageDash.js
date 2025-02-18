import React from "react";
import { Button } from "react-bootstrap";

function BannerPageDash() {
  return (
    <div style={{ padding: 10 }}>
      <div style={{ padding: 10, display: "flex", justifyContent: "space-between" }}>
        <div>
          <h3>Banner</h3>
        </div>
        <div>
          <Button variant="primary">Create New</Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-6">
        {[
          { name: "Banner 1", bannerImage: "https://tannatechbiz.com/media/magefan_blog/Arduino-Uno-banner.jpg"},
          { name: "Banner 2", bannerImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtmM_h6TT5bEnehRIg44qu_2bpxisbIS6BnK8SWFOt_lQrYlrUVp7j9TBi5Hdz2bICO7E&usqp=CAU" },
          { name: "Banner 3", bannerImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOd0ZPH1cFbI4TOeGtpcohHilowfLz0KVpeEBmguQTnTJ3qgtDfof6hRMUFnIVXQdMLMs&usqp=CAU"} ,
          { name: "Banner 4", bannerImage: "https://via.placeholder.com/300x150"},
        ].map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4 text-center">
            {/* Banner Image */}
            <img src={item.bannerImage} alt={item.name} className="w-full h-40 object-cover rounded-lg" />

            {/* Banner Name */}
            <h2 className="text-lg font-semibold mt-2">{item.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BannerPageDash;
