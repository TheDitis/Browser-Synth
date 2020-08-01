import {useEffect, useState} from 'react';
import useTime from "./useTime";


const useOscillator = (frequency = 20) => {
    const time = useTime(frequency)

}