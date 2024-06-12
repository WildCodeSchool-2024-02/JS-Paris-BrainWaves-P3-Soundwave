import PropTypes from 'prop-types';
import "./cardcrew.css";

function CardCrew({result}) {
    return (
        <div>
            <img src={result.image} alt="logo du collectif"/>
            <h1>{result.name}</h1>
            <p>{result.description}</p>
        </div>
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