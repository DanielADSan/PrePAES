

const CardLevel = ({ level, category, isCorrect }) => {
  


    return (
        <>
         <div className="card__level-container">
            <h3 style={{fontWeight:'500'}}>Pregunta {level}</h3>
           
          </div>
          <div className="card__content">
         
            <div className="card__info">
              <p className="text--medium"> <i className={isCorrect } ></i></p>
              <p className="card__price text--medium">{category}</p>
            </div>
          </div>
        </>

        
    );
};

export default CardLevel;