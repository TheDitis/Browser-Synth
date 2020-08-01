import React, {useEffect, useState} from 'react';
import {Slider, Button} from "@material-ui/core";
import styles from './App.module.css';
import Oscillator from "../Oscillator/Oscillator";
import Filter from "../Filter/Filter";
import LightButton from "../LightButton/LightButton";
import LFO from "../LFO/LFO";

function App() {
  const [audio, setAudio] = useState(new AudioContext());
  const [osc1, setOsc1] = useState(audio.createOscillator());
  const [osc2, setOsc2] = useState(audio.createOscillator());
  const [lfo1, setLfo1] = useState(audio.createOscillator());
  const [gain1, setGain1] = useState(audio.createGain());
  const [gain2, setGain2] = useState(audio.createGain());
  const [outGain, setOutGain] = useState(audio.createGain());
  const [lfoGain1, setLfoGain1] = useState(audio.createGain());
  const [filter, setFilter] = useState(audio.createBiquadFilter());
  const [analyser, setAnalyser] = useState(audio.createAnalyser());

  // useEffect(() => {
  //   let audioData = new Float32Array(analyser.frequencyBinCount);
  //   console.log(analyser.getFloatTimeDomainData(audioData))
  // })

  const setupFunc = () => {
    osc1.frequency.setTargetAtTime(440, audio.currentTime, 0);
    // analyser.connect(audio.destination);
    outGain.connect(audio.destination);
    filter.connect(outGain);
    filter.type = "lowpass";
    osc1.connect(gain1);
    gain1.connect(filter);
    osc2.connect(gain2);
    gain2.connect(filter);
    lfo1.connect(lfoGain1);
    lfoGain1.connect(outGain.gain);
    osc1.start();
    osc2.start();
    lfo1.start();
  };

  useEffect(setupFunc, []);

  return (
    <div className={styles.App}>
      <div className={styles.oscillatorSection}>
        <Oscillator audio={audio} osc={osc1} gain={gain1} number={0}/>
        <Oscillator audio={audio} osc={osc2} gain={gain2} number={1}/>
      </div>
      <LFO audio={audio} osc={lfo1} gain={lfoGain1} number={0}/>
      <Filter audio={audio} filter={filter} number={0}/>
      {/*<LightButton color={"green"} brightness={}/>*/}
    </div>
  );
}

export default App;
