import React from "react";
import styles from "./RaisedProgressBar.module.scss";

interface ProgressBarProps {
    currentAmount: number;
    targetAmount: number;
    segments: number;
    title: string
    color?: string;
}

const RaisedProgressBar: React.FC<ProgressBarProps> = ({
    currentAmount,
    targetAmount,
    segments,
    color,
    title
}) => {
    const percentage = Math.min((currentAmount / targetAmount) * 100, 100);
    const filledSegments = Math.round((percentage / 100) * segments);
    const regex = /\B(?=(\d{3})+(?!\d))/g;

    return (
        <div className={styles.progressBarContainer}>
            <div>
                <span className={styles.title}>{title}</span>{" "}
                {targetAmount === 0 ? <span>Calculating</span> : (
                    <p className={styles.amounts}>
                        {currentAmount.toString().replace(regex, ',')} / {' '}
                        <span>{targetAmount.toString().replace(regex, ',')}</span>
                    </p>
                )}
            </div>
            <div className={styles.progressBarSegments}>
                {Array.from({ length: segments }).map((_, index) => (
                    <div
                        key={index}
                        className={`${styles.segment} ${
                            index < filledSegments ? styles.filled : ""
                        }`}
                        style={color ? {borderColor: color, background: index < filledSegments ? color : ''} : {}}
                    />
                ))}
            </div>
        </div>
    );
};

export default RaisedProgressBar;
