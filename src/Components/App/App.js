import React, {useEffect, useState} from 'react';
import {Slider, Button} from "@material-ui/core";
import './App.css';
import Oscillator from "../Oscillator/Oscillator";
import Filter from "../Filter/Filter";

function App() {
  const [audio, setAudio] = useState(new AudioContext());
  const [osc1, setOsc1] = useState(audio.createOscillator());
  const [gain1, setGain1] = useState(audio.createGain());
  const [filter, setFilter] = useState(audio.createBiquadFilter());

  const setupFunc = () => {
    osc1.frequency.setTargetAtTime(440, audio.currentTime, 0);
    filter.connect(audio.destination);
    filter.type = "lowpass";
    osc1.connect(gain1);
    gain1.connect(filter);
    osc1.start();
  };

  useEffect(setupFunc, []);

  return (
    <div className="App">
      <Oscillator audio={audio} osc={osc1} gain={gain1} number={0}/>
      <Filter audio={audio} filter={filter}/>
    </div>
  );
}

export default App;
