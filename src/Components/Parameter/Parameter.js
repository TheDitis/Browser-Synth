import React from 'react';
import {CircularInput, CircularTrack, CircularProgress, CircularThumb} from "react-circular-input";
import styles from './Parameter.module.scss';


const Parameter = props => {
    return (
        <div className={styles.Parameter}>
            <CircularInput value={props.value} onChange={props.onChange} {...props}>
                <CircularTrack strokeWidth={8}/>
                <CircularProgress stroke={props.stroke} strokeWidth={10}/>
                {/*<CircularThumb/>*/}
            </CircularInput>

            <h3 className={styles.label}>{props.label}</h3>
        </div>
    )
};


export default Parameter;