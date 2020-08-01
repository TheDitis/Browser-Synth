import React, {useState, useEffect} from 'react';
import {Button, Slider, Typography} from "@material-ui/core";
import styles from "./Filter.module.scss";
import LightButton from "../LightButton/LightButton";

const Filter = props => {

    return (
        <div className={styles.Filter}>
            <div className={styles.header}>
                <Typography className={styles.title}>Filter {props.number + 1}</Typography>
                <div className={styles.muteButton}>
                    <LightButton color={"green"} brightness={1}/>
                </div>
            </div>
            <div className={styles.controls}>
                <Typography className={styles.label}>Cutoff</Typography>
                <Slider
                    onChange={(e, val) => {
                        props.filter.frequency.setTargetAtTime(Math.round(val), props.audio.currentTime, 0);
                    }}
                    min={20}
                    max={1500}
                    defaultValue={1000}
                />
                <Typography className={styles.label}>Resonance</Typography>
                <Slider
                    onChange={(e, val) => {
                        val = val / 10;
                        props.filter.Q.setTargetAtTime(Math.round(val), props.audio.currentTime, 0);
                    }}
                    min={0}
                    max={1000}
                    defaultValue={0}
                />
            </div>
        </div>
    )
};


export default Filter;