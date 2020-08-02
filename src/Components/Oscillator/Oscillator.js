import React, {useState, useEffect} from 'react';
import {Button, Slider, Typography} from "@material-ui/core";
// import {Donut} from 'react-dial-knob';
import {CircularInput} from "react-circular-input";
import Parameter from "../Parameter/Parameter";
import styles from "./Oscillator.module.scss";
import LightButton from "../LightButton/LightButton";


const Oscillator = props => {
    const [muted, setMuted] = useState(false);
    const [volume, setVolume] = useState(0);
    const [frequency, setFrequency] = useState(0.1);

    useEffect(() => {
        props.gain.gain.setValueAtTime(volume, props.audio.currentTime);
    }, [volume]);

    useEffect(() => {
        const v = Math.round(frequency * 1500);
        props.osc.frequency.setTargetAtTime(v, props.audio.currentTime, 0);
    }, [frequency])

    const toggleMute = () => {
        if (muted) {
            console.log("unmuted");
            setMuted(false);
            props.gain.gain.setValueAtTime(volume, props.audio.currentTime);
        }
        else {
            console.log("muted");
            setMuted(true);
            props.gain.gain.setValueAtTime(0, props.audio.currentTime);
        }
    };

    return (
        <div className={styles.Oscillator}>
            <div className={styles.header}>
                <h3 className={styles.title}>Oscillator {props.number + 1}</h3>
                <div className={styles.muteButton}>
                    <LightButton color={"blue"} brightness={!muted ? 1 : 0} onClick={toggleMute}/>
                </div>
            </div>
            <div className={styles.controls}>
                {/*<h4 className={styles.label}>Frequency</h4>*/}
                {/*<Slider*/}
                {/*    onChange={(e, val) => {*/}
                {/*        props.osc.frequency.setTargetAtTime(Math.round(val), props.audio.currentTime, 0);*/}
                {/*    }}*/}
                {/*    min={20}*/}
                {/*    max={1500}*/}
                {/*    defaultValue={440}*/}
                {/*/>*/}
                <Parameter
                    value={frequency}
                    radius={30}
                    stroke={`hsl(${frequency * 360}, 100%, 50%)`}
                    onChange={setFrequency}
                    label={"Freq"}
                />
                <Parameter
                    value={volume}
                    radius={30}
                    stroke={`hsl(${100 - (volume * 100)}, 100%, 50%)`}
                    onChange={setVolume}
                    label={"Gain"}
                />

                {/*<h4 className={styles.label}>Volume</h4>*/}
                {/*<Slider*/}
                {/*    onChange={(e, val) => {*/}
                {/*        val = val / 1000;*/}
                {/*        setVolume(val)*/}
                {/*    }}*/}
                {/*    min={0}*/}
                {/*    max={1000}*/}
                {/*    defaultValue={0}*/}
                {/*/>*/}
                <div className={styles.waveformType}>
                    <h4 className={styles.label}>Type</h4>
                    <Slider
                        onChange={(e, val) => {
                            props.osc.type = val === 0 ? "sine" : val === 1 ? "sawtooth" : val === 2 ? "square" : "triangle";
                        }}
                        min={0}
                        max={3}
                        defaultValue={0}
                    />
                </div>
            </div>
        </div>
    )
}

export default Oscillator;