const { createApp } = Vue;

createApp({
    data() {
        return {
            cards: [],
            stores: [],
            selectedStore: "",
            isModalOpen: false,
            searchQuery: "",
            previewImage: "", // фото задней стороны карты
            userId: "test-user-123" // временно позже возьмем из Telegram
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
            this.previewImage = "";
        },
        closeModal() {
            this.isModalOpen = false;
        },
        selectStore(storeName) {
            this.selectedStore = storeName;
        },
            triggerFileInput() {
        this.$refs.fileInput.click();
    },
        handleImageUpload(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.previewImage = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        },
        openCamera() {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.capture = "environment";
            input.onchange = this.handleImageUpload;
            input.click();
        },
        async addCard() {
            const store = this.stores.find(s => s.name === this.selectedStore);
            if (store && this.previewImage) {
                const newCard = {
                    userId: this.userId,
                    storeName: store.name,
                    frontImage: store.image,
                    backImage: this.previewImage
                };

                this.cards.push({ id: Date.now(), image: store.image });
                this.selectedStore = "";
                this.previewImage = "";
                this.closeModal();

                // сохранение в json
                await this.saveToJSON(newCard);
            }
        },
        async saveToJSON(cardData) {
            await fetch("/save_card", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cardData)
            });
        }
    },
    mounted() {
        this.loadStores();
    }
}).mount("#app");
