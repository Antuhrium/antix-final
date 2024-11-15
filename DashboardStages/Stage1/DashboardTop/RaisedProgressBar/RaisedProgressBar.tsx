import React from "react";
import styles from "./RaisedProgressBar.module.scss";

interface ProgressBarProps {
    currentAmount: number;
    targetAmount: number;
    segments: number;
}

const RaisedProgressBar: React.FC<ProgressBarProps> = ({
    currentAmount,
    targetAmount,
    segments,
}) => {
    const percentage = Math.min((currentAmount / targetAmount) * 100, 100);
    const filledSegments = Math.round((percentage / 100) * segments);
    const regex = /\B(?=(\d{3})+(?!\d))/g;

    return (
        <div className={styles.progressBarContainer}>
            <p>
                USDT Raised:{" "}
                <span>
                    ${currentAmount.toString().replace(regex, ',')} / $
                    {targetAmount.toString().replace(regex, ',')}
                </span>
            </p>
            <div className={styles.progressBarSegments}>
                {Array.from({ length: segments }).map((_, index) => (
                    <div
                        key={index}
                        className={`${styles.segment} ${
                            index < filledSegments ? styles.filled : ""
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default RaisedProgressBar;