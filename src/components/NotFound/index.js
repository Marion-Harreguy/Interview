import ReactDOM from 'react-dom';
import React, { useRef, useState } from 'react';
import Doodle from './doodle';


const PageNotFound = () => (
  // <css-doodle>

  <Doodle
    rule={`
    :doodle {
    @grid:15 / 100%;
    width:100vw;
    height:100vh;
  }
  :container {
    transform-style:flat;
  }
  :after {
    content:@p('4','0','4');
  }
  @random(.13) {
     :after {
      content:@p('4','0','4');
      }
  }
  font-size:@p(20px, 30px, 10px);
  animation: snow @r(12s,30s) infinite linear;
  font-size:@p(2em,2vmin,4vmin,6vmin,3em);
  will-change:transform;
  @keyframes snow {
    0% {
      transform: perspective(@r(300px)) translateZ(@r(-500px,-200px)) translateY(-400vh) translateX(@r(-20px, 20px));
    }
    100% {
      transform:translateY(100vh) translateX(calc(.12*@index()*@p(-2vmin,2vmin))) rotate(@r(-720deg, 720deg)); 
    }
  }
  `}
  />


);

export default PageNotFound;
