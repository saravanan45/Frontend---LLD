import { useMemo, useEffect } from "react";

const AdvancedMasonryLayout = () => {
  const NO_OF_COLUMNS = 4;

  const images = Array.from({ length: 200 }, (_, index) => ({
    id: index + 1,
    height: 200 + (index % 10) * 20,
    src: `https://picsum.photos/300/${200 + (index % 10) * 20}`,
  }));

  const columns = useMemo(() => {
    const cols = Array.from({ length: NO_OF_COLUMNS }, () => []);
    const heights = Array(NO_OF_COLUMNS).fill(0);

    images.forEach((image) => {
      const minHeightIndex = heights.indexOf(Math.min(...heights));
      cols[minHeightIndex].push(image);
      heights[minHeightIndex] += image.height; // Assuming each image has a height of 200px and a gap of 8px
    });
    return cols;
  }, [images]);

  useEffect(() => {
    const elements = document.querySelectorAll(".masonry-item img");

    const options = {
      root: null,
      threshold: 0,
      rootMargin: "100px"
    };
    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    elements.forEach((img) => {
      observer.observe(img);
    });

    return () => observer.disconnect();

  }, []);

  return (
    <div className="masonry-layout" style={{ display: "flex", gap: "8px" }}>
      {columns.map((column, index) => (
        <div
          key={index}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {column.map((image) => (
            <div key={image.id} id={image.id} className="masonry-item" style={{aspectRatio: `300 / ${image.height}`}}>
              <img data-src={image.src} alt={`Image ${image.id}`} src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AdvancedMasonryLayout;
