import React, {useEffect, useState} from 'react';
import {Layer, Line, Stage} from 'react-konva';
import Konva from "konva";
import useTime from "../../hooks/useTime";
import styles from './Scope.module.scss';
import {Slider, Typography} from "@material-ui/core";

const Scope = props => {
    const [refreshRate, setRefreshRate] = useState(100);
    // const [amplitude, setAmplitude] = useState(1.0);
    const time = useTime(refreshRate);
    const [points, setPoints] = useState([]);

    const height = 400;
    const width = window.innerWidth * 0.9;

    useEffect(() => {

        const bufferLength = props.analyzer.frequencyBinCount;
        const data = new Uint8Array(bufferLength);
        props.analyzer.getByteTimeDomainData(data);
        let pts = [];
        // console.log(data);
        const sliceWidth = width / bufferLength;
        let x = 0;
        for (let i = 0; i < bufferLength; i++) {
            const v = data[i] / 128.0 ;
            // console.log(v)
            const y = v * height / 2;
            pts.push(x);
            pts.push(y);
            x += sliceWidth;
        }
        setPoints(pts);
        // console.log(points);
    }, [time]);

    return (
        <div className={styles.Scope}>
            <div className={styles.screen}>
                <Stage width={width} height={height}>
                    <Layer>
                        <Line filters={[Konva.Filters.Blur]} blurRadius={10} x={0} y={0} stroke={"#24E0FF"}
                              strokeWidth={8} points={points}/>
                    </Layer>
                </Stage>
            </div>
            <div className={styles.controls}>
                <Slider
                    orientation={"vertical"}
                    defaultValue={100}
                    min={10}
                    max={500}
                    onChange={(e, val) => {
                        setRefreshRate(val);
                    }}
                />
                {/*<Slider*/}
                {/*    orientation={"vertical"}*/}
                {/*    defaultValue={100}*/}
                {/*    min={0}*/}
                {/*    max={200}*/}
                {/*    onChange={(e, val) => {*/}
                {/*        val = val / 100;*/}
                {/*        setAmplitude(val);*/}
                {/*    }}*/}
                {/*/>*/}
            </div>
        </div>
    )
};


export default Scope;