

const MasonryLayout = () => {
    const NO_OF_COLUMNS = 4;

    const images = Array.from({ length: 50}, (_, index) => ({
        id: index + 1,
        src: `https://picsum.photos/300/${200 + (index % 10) * 20}`,
    })
)

    return (
        <div className="masonry-layout" style={{ columnCount: NO_OF_COLUMNS, columnGap: '8px'  }}>
            {images.map((image) => (
                <div key={image.id} className="masonry-item">
                    <img src={image.src} alt={`Image ${image.id}`} />
                </div>
            ))}
        </div>
    )
}

export default MasonryLayout;