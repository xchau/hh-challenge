import React from 'react';

const NoMatch = (props) => {
  console.log(props);
  return (
    <div className="display-nomatch-container">
      <span>
        Sorry there's nothing here!
        <br />
        ( * ಥ ⌂ ಥ * )
      </span>
    </div>
  );
};

export { NoMatch };
