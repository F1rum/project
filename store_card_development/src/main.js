const { createApp } = Vue;

createApp({
    data() {
        return {
            cards: [],
            stores: [],
            selectedStore: "",
            isModalOpen: false,
            searchQuery: ""
        };
    },
    computed: {
        availableStores() {
            return this.stores.filter(store =>
                !this.cards.some(card => card.image === store.image) &&
                store.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        }
    },
    methods: {
        async loadStores() {
            const response = await fetch("/cards_of_stores.json");
            this.stores = await response.json();
        },
        openModal() {
            this.isModalOpen = true;
            this.searchQuery = "";
        },
        closeModal() {
            this.isModalOpen = false;
        },
        selectStore(storeName) {
            this.selectedStore = storeName;
        },
        addCard() {
            const store = this.stores.find(s => s.name === this.selectedStore);
            if (store) {
                this.cards.push({ id: Date.now(), image: store.image });
                this.selectedStore = "";
                this.closeModal();
            }
        }
    },
    mounted() {
        this.loadStores();
    }
}).mount("#app");
