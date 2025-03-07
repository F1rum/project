const { createApp } = Vue;

createApp({
    data() {
        return {
            cards: [],
            stores: [],
            selectedStore: "",
            isModalOpen: false,
            maxCards: 5,
            isTouched: false, 
        };
    },
    computed: {
        availableStores() {
            return this.stores.filter(store => !this.cards.some(card => card.image === store.image));
        }
    },
    methods: {
        async loadStores() {
            try {
                const response = await fetch("/cards_of_stores.json");
                if (!response.ok) throw new Error("Ошибка загрузки JSON");
                this.stores = await response.json();
            } catch (error) {
                console.error("Ошибка загрузки JSON:", error);
            }
        },
        openModal() {
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
        },
        addCard() {
            if (this.cards.length >= this.maxCards) {
                alert("Максимум 5 карт!");
                return;
            }
            const store = this.stores.find(s => s.name === this.selectedStore);
            if (store) {
                this.cards.push({
                    id: Date.now(),
                    image: store.image
                });
                this.selectedStore = "";
                this.closeModal();
            } else {
                alert("Выберите магазин!");
            }
        },
        handleTouchStart() {
            this.isTouched = true;
        },
        handleTouchEnd() {
            setTimeout(() => {
                this.isTouched = false;
            }, 200);
        }
    },
    mounted() {
        this.loadStores();
    }
}).mount("#app");
