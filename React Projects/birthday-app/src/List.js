const List = ({ people }) => {
  return (
    <>
      {people.map((person) => {
        return (
          <article id={person.id} className="person">
            <img className="img" src={person.image} alt="pfp" />
            <div className="name-age">
              <h3>{person.name}</h3>
              <h4>{person.age} years</h4>
            </div>
          </article>
        );
      })}
    </>
  );
};

export default List;
