import React from 'react';
import { Link } from 'react-router-dom';
import './home.less';
const Home: React.FC = () => {
  return (
    <div className="home-container">
      <div className="hero">
        <div className="deco"></div>
        <div className="hero-contents">
          <div className="left">
            <div>
              <Link
                to="/sign-in"
                className="sign-in ant-btn ant-btn-primary ant-btn-lg"
              >
                ログイン
              </Link>
              <Link
                to="/sign-up"
                className="sign-up ant-btn ant-btn-link ant-btn-lg"
              >
                登録
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
