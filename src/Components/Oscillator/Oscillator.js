import React, {useState, useEffect} from 'react';
import {Button, Slider, Typography} from "@material-ui/core";
import styles from "./Oscillator.module.scss";
import LightButton from "../LightButton/LightButton";


const Oscillator = props => {
    const [muted, setMuted] = useState(false);
    const [volume, setVolume] = useState(0);

    useEffect(() => {
        props.gain.gain.setValueAtTime(volume, props.audio.currentTime);
    }, [volume]);

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
                <Typography className={styles.title}>Oscillator {props.number + 1}</Typography>
                <div className={styles.muteButton}>
                    <LightButton color={"blue"} brightness={!muted ? 1 : 0} onClick={toggleMute}/>
                </div>
            </div>
            <div className={styles.controls}>
                <Typography className={styles.label}>Frequency</Typography>
                <Slider
                    onChange={(e, val) => {
                        console.log(val);
                        props.osc.frequency.setTargetAtTime(Math.round(val), props.audio.currentTime, 0);
                    }}
                    min={20}
                    max={1500}
                    defaultValue={440}
                />
                <Typography className={styles.label}>Volume</Typography>
                <Slider
                    onChange={(e, val) => {
                        val = val / 1000;
                        console.log(val);
                        setVolume(val)
                    }}
                    min={0}
                    max={1000}
                    defaultValue={0}
                />
                <div className={styles.waveformType}>
                    <Typography className={styles.label}>Type</Typography>
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