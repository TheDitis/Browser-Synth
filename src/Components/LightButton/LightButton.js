import React from 'react';
import styles from "./LightButton.module.scss";
import {motion} from 'framer-motion';
import mixColors from "../../Helper Functions/mixColors";


const LightButton = props => {

    const color = props.color.toLowerCase() || "blue";

    const classes = {
        blue: styles.blue,
        green: styles.green,
        red: styles.red,
        yellow: styles.yellow,
        purple: styles.purple
    };

    const colorMap = {
        on: {
            blue: [
                "#24E0FF",
                "#006",
                "#3F8CFF"
            ],
            green: [
                "#ABFF00",
                "#441313",
                "#89FF00"
            ],
            red: [
                "#F00",
                "#441313",
                "rgba(255, 0, 0, 0.5)"
            ],
            yellow: [
                "#FF0",
                "#594d09",
                "#FF0"
            ],
            purple: [
                "#ed24ff",
                "#3d0066",
                "#d93fff"
            ]
        },
        off: {
            blue: [
                "#132e57",
                "#120c42"
            ],
            green: [
                "#1b5713",
                "#10420c"
            ],
            red: [
                "#780000",
                "#290f0e"
            ],
            yellow: [
                "#4f440b",
                "#262604"
            ],
            purple: [
                "#341357",
                "#310c42"
            ]
        }
    };

    const calculateStyle = () => {
        const onCols = colorMap.on[color];
        const offCols = colorMap.off[color];
        const shadowColor = mixColors(offCols[1], onCols[1], props.brightness);
        const middleColor = colorMap.on[color][2];
        const pxVal = Math.round(props.brightness * 14);
        return {
            backgroundColor: mixColors(offCols[0], onCols[0], props.brightness),
            boxShadow: `rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset ${shadowColor} 0 -1px 9px, ${middleColor} 0 0 ${pxVal}px`
        }
    };

    return (
        <div className={styles.LightButton} onClick={props.onClick}>
            <motion.div
                className={classes[color]}
                animate={calculateStyle()}
            />
        </div>
    )
};


export default LightButton;