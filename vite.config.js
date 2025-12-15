import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                contact: resolve(__dirname, 'contact.html'),
                productCinnamon: resolve(__dirname, 'product-cinnamon.html'),
                productCloves: resolve(__dirname, 'product-cloves.html'),
                productHoney: resolve(__dirname, 'product-honey.html'),
                shopHoney: resolve(__dirname, 'shop-honey.html'),
                shopSpices: resolve(__dirname, 'shop-spices.html'),
                shop: resolve(__dirname, 'shop.html'),
                story: resolve(__dirname, 'story.html'),
            },
        },
    },
});
