import React, {useState, useEffect} from 'react';
import {Button, Slider, Typography} from "@material-ui/core";
import styles from "./Filter.module.scss";
import LightButton from "../LightButton/LightButton";
import Parameter from "../Parameter/Parameter";

const Filter = props => {

    const [cutoff, setCutoff] = useState(1);
    const [q, setQ] = useState(0);

    useEffect(() => {
        const v = Math.round(cutoff * 10000);
        props.filter.frequency.setValueAtTime(v, 0);
    }, [cutoff]);

    useEffect(() => {
        const v = Math.round(q * 50);
        props.filter.Q.setValueAtTime(v, 0);
    }, [q]);

    return (
        <div className={styles.Filter}>
            <div className={styles.header}>
                <h3 className={styles.title}>Filter {props.number + 1}</h3>
                <div className={styles.muteButton}>
                    <LightButton color={"green"} brightness={1}/>
                </div>
            </div>
            <div className={styles.controls}>
                {/*<h4 className={styles.label}>Cutoff</h4>*/}
                {/*<Slider*/}
                {/*    onChange={(e, val) => {*/}
                {/*        props.filter.frequency.setTargetAtTime(Math.round(val), props.audio.currentTime, 0);*/}
                {/*    }}*/}
                {/*    min={20}*/}
                {/*    max={1500}*/}
                {/*    defaultValue={1000}*/}
                {/*/>*/}
                <Parameter
                    value={cutoff}
                    radius={30}
                    stroke={`hsl(${cutoff * 360}, 100%, 50%)`}
                    onChange={setCutoff}
                    label={"Freq"}
                />
                <Parameter
                    value={q}
                    radius={30}
                    stroke={`hsl(${q * 360}, 100%, 50%)`}
                    onChange={setQ}
                    label={"Q"}
                />
                {/*<h4 className={styles.label}>Resonance</h4>*/}
                {/*<Slider*/}
                {/*    onChange={(e, val) => {*/}
                {/*        val = val / 10;*/}
                {/*        props.filter.Q.setTargetAtTime(Math.round(val), props.audio.currentTime, 0);*/}
                {/*    }}*/}
                {/*    min={0}*/}
                {/*    max={1000}*/}
                {/*    defaultValue={0}*/}
                {/*/>*/}
            </div>
        </div>
    )
};


export default Filter;