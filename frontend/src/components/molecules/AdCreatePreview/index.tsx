type AdPreviewProps = {
    data: Record<string, any>;
};

const AdPreview = ({ data }: AdPreviewProps) => {
    const {
        brand,
        model,
        year,
        price,
        description,
        images = [],
    } = data;

    const title =
        brand && model && year
            ? `${brand} ${model} ${year}`
            : "Your ad title";

    return (
        <div className="ad-preview">
            <div className="ad-preview-card">
                <div className="ad-preview-main-image">
                    {images[0] ? (
                        <img
                            src={URL.createObjectURL(images[0])}
                            alt="preview"
                        />
                    ) : (
                        <div className="image-placeholder">
                            No image
                        </div>
                    )}
                </div>

                <div className="ad-preview-thumbs">
                    {images.slice(1, 5).map((img: File, i: number) => (
                        <img
                            key={i}
                            src={URL.createObjectURL(img)}
                            alt="thumb"
                        />
                    ))}
                </div>

                <div className="ad-preview-info">
                    <h3>{title}</h3>
                    {price && (
                        <div className="price">
                            € {price}
                        </div>
                    )}
                    {description && (
                        <p className="description">
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdPreview;
