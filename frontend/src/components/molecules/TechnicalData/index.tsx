const TechnicalData = ({ ad }: any) => {
    return (
        <section className="technical">
            <h2>Technical Data</h2>

            <div className="technical__grid">
                <Item label="Transmission" value={ad.transmission} />
                <Item label="Fuel" value={ad.fuel} />
                <Item label="Mileage" value={`${ad.mileage} km`} />
                <Item label="Year" value={ad.year} />
            </div>
        </section>
    );
};

const Item = ({ label, value }: any) => (
    <div className="technical__item">
        <span>{label}</span>
        <strong>{value}</strong>
    </div>
);

export default TechnicalData;
