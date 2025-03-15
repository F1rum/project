//применый вариант написанный чатом гпт

import { useEffect } from "react";
import styles from "./StoryViewer.module.css";

export default function StoryViewer({ stories, currentIndex, onClose, onPrev, onNext }) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowRight") onNext();
            if (e.key === "ArrowLeft") onPrev();
            if (e.key === "Escape") onClose();
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onClose, onPrev, onNext]);

    return (
        <div className={styles.overlay} onClick={onClose}>
            <button className={styles.closeButton} onClick={(e) => { e.stopPropagation(); onClose(); }}>✕</button>

            <div className={styles.storyContainer} onClick={(e) => e.stopPropagation()}>
                <button className={styles.sideButton} onClick={(e) => { e.stopPropagation(); onPrev(); }} />
                <div className={styles.storyContent}>
                    <h2 className={styles.storyTitle}>{stories[currentIndex].title}</h2>
                    <img src={stories[currentIndex].image} alt={stories[currentIndex].title} className={styles.storyImage} />
                </div>
                <button className={styles.sideButton} onClick={(e) => { e.stopPropagation(); onNext(); }} />
            </div>
        </div>
    );
}
