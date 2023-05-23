import React from 'react';
import classes from './loader.module.sass';

const Loader = () => {
    return (
        <div className={classes.ldsRing}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default Loader;