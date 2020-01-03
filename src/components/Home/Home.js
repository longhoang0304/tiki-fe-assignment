import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <Link to="/beginner">
      <div>
        Beginner
      </div>
    </Link>
    <Link to="/advantage">
      <div>
        Advantage
      </div>
    </Link>
  </div>
);

export default Home;
