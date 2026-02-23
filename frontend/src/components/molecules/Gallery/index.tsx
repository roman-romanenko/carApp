import { useState } from "react";
import {BiChevronLeft, BiChevronRight} from "react-icons/bi";
import Button from "../../atoms/Button";

const Gallery = ({ images }: { images?: string[] }) => {
    const [active, setActive] = useState(0);

    if (!images?.length) return null;

    const prev = () =>
        setActive((prev) => (prev === 0 ? images.length - 1 : prev - 1));

    const next = () =>
        setActive((prev) => (prev === images.length - 1 ? 0 : prev + 1));

    return (
        <div className="gallery">
            <div className="gallery__main">
                <img
                    key={active}
                    src={images[active]}
                    className="fade"
                />

                <Button
                    className="gallery__arrow left"
                    onClick={prev}
                    icon={<BiChevronLeft size={22} />}
                />

                <Button
                    className="gallery__arrow right"
                    onClick={next}
                    icon={<BiChevronRight size={22} />}
                />
            </div>

            <div className="gallery__thumbs">
                {images.map((img, i) => (
                    <img
                        key={i}
                        src={img}
                        onClick={() => setActive(i)}
                        className={i === active ? "active" : ""}
                    />
                ))}
            </div>
        </div>
    );
};

export default Gallery;
