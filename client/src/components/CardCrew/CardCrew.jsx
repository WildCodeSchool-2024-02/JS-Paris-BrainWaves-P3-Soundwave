import PropTypes from 'prop-types';
import "./cardcrew.css";

function CardCrew({result}) {
    return (
        <section className="specific-crew-card">
            <div className="crew-card-presentation">
            <img src={result.image} alt="logo du collectif"/>
            <h2>{result.name}</h2>
            </div>
            <p>{result.description}</p>
        </section>
    )
};

CardCrew.propTypes = {
    result: PropTypes.shape({
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }).isRequired
};

export default CardCrew;