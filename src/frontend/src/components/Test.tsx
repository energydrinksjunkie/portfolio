import React from 'react';

const Test: React.FC = () => {
  return (
    <div id="html-content" style={{ width: '640px', height: '480px', backgroundColor: 'white', color: 'black', display: 'flex', flexDirection: 'column', alignItems: 'center', alignContent: 'space-around'}}>
      <h1>Kiti Krvc</h1>
      <p>meow meow meow meow meow</p>
      <form>
        <input type="text" placeholder="Name" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Test;