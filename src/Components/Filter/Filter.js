import React, {useState, useEffect} from 'react';
import {Button, Slider, Typography} from "@material-ui/core";
import styles from "./Filter.module.scss";

const Filter = props => {
    return (
        <div className={styles.Filter}>
            <Typography>Cutoff</Typography>
            <Slider
                onChange={(e, val) => {
                    props.filter.frequency.setTargetAtTime(Math.round(val), props.audio.currentTime, 0);
                }}
                min={20}
                max={1500}
                defaultValue={1000}
            />
            <Typography>Resonance</Typography>
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
    )
};


export default Filter;