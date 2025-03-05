import { useState } from "react";
import images from "../../assets/images/images";
import StoryViewer from "../../components/StoryViewer";
import styles from "./ProductsPage.module.css";
import Products from "../../components/Products/Products";

const NewsCard = ({ title, image, onClick }) => (
    <button className={styles.newsCard} onClick={onClick}>
        <img src={image} alt={title} className={styles.newsImage} loading="lazy" />
        <h2 className={styles.newsTitle}>{title}</h2>
    </button>
);

const CategoriesCard = ({ title, image }) => (
    <div className={styles.categories}>
        <button className={styles.categoriesButton}>
            <img src={image} alt={title} className={styles.categoriesImage} loading="lazy"/>
        </button>
        <h2 className={styles.categoriesTitle}>{title}</h2>
    </div>
);

export default function ProductsPage() {
    const [isStoryOpen, setIsStoryOpen] = useState(false);
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

    const stories = [
        { title: "С чем есть блины?", image: images.BLINI },
        { title: "Рецепты из клубники", image: images.BLINI },
        { title: "Как выбрать муку?", image: images.BLINI },
    ];

    const openStory = (index) => {
        setCurrentStoryIndex(index);
        setIsStoryOpen(true);
    };

    const closeStory = () => setIsStoryOpen(false);

    const prevStory = () => {
        setCurrentStoryIndex((i) => (i === 0 ? stories.length - 1 : i - 1));
    };

    const nextStory = () => {
        setCurrentStoryIndex((i) => (i === stories.length - 1 ? 0 : i + 1));
    };

    return (
        <div className={styles.productsPage}>
            <div className={styles.productsNews}>
                <div className={styles.productNewsContainer}>
                    <NewsCard title="С чем есть блины?" image={images.BLINI} onClick={() => openStory(0)} />
                    <NewsCard title="Рецепты из клубники" image={images.BLINI} onClick={() => openStory(1)} />
                    <NewsCard title="Как выбрать муку?" image={images.BLINI} onClick={() => openStory(2)} />
                </div>
            </div>

            <div className={styles.productsCategories}>
                <h1>Категории</h1>
                <div className={styles.categoriesContainer}>
                    <CategoriesCard title="Все" image={images.BLINI} />
                    <CategoriesCard title="Сладкое" image={images.BLINI} />
                    <CategoriesCard title="Закуски" image={images.BLINI} />
                    <CategoriesCard title="Горячее" image={images.BLINI} />
                    <CategoriesCard title="Напитки" image={images.BLINI} />
                    <CategoriesCard title="Другое" image={images.BLINI} />
                </div>
            </div>

            <div className={styles.ProductsList}>
                <Products />

            </div>

            {isStoryOpen && (
                <StoryViewer
                    stories={stories}
                    currentIndex={currentStoryIndex}
                    onClose={closeStory}
                    onPrev={prevStory}
                    onNext={nextStory}
                />
            )}
        </div>
    );
}
