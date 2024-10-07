
// // делаем необходиме импорты для приложения
import './scss/styles.scss';

import { ProductAPI } from './components/ProductAPI';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from "./components/base/events";
import { cloneTemplate, ensureElement } from './utils/utils';


import { ProductData } from './components/model/ProductData';
import { BasketData } from './components/model/BasketData';
import { OrderData } from './components/model/OrderData';


import { Card, CardPreview, ICard } from './components/view/Card';
import { Page } from './components/view/Page';
import { Basket } from './components/view/Basket';
import { Modal } from './components/view/Modal';
import { PaymentForm } from './components/view/PaymentForm';
import { ContactForm } from './components/view/ContactForm';
import { Success } from './components/view/Succcess';
import { IOrder, IProduct, TProductInBasket, IOrderForm, TId } from './types';

import { IProductData } from './types';
// import { BasketCard } from './components/view/BasketCard';
// import { BasketCard } from './components/view/BasketCard';


//экземпляры классов EventEmitter и ProductAPI
const events = new EventEmitter();
const api = new ProductAPI(CDN_URL, API_URL);

// шаблоны
const templateCardCatalog = ensureElement<HTMLTemplateElement>('#card-catalog');
const templateCardPreview = ensureElement<HTMLTemplateElement>('#card-preview');
const templateCardBasket = ensureElement<HTMLTemplateElement>('#card-basket');
const templateBasket = ensureElement<HTMLTemplateElement>('#basket');
const templatePayment = ensureElement<HTMLTemplateElement>('#order');
const templateContacts = ensureElement<HTMLTemplateElement>('#contacts');
const templateSuccess = ensureElement<HTMLTemplateElement>('#success');


// экземпляры классов СЛОЙ МОДЕЛИ
const productData = new ProductData(events);
const orderData = new OrderData(events);
const basketData = new BasketData(events);


const containerPage = ensureElement<HTMLElement>('.page');
const containerModal = ensureElement<HTMLDivElement>('#modal-container');


// экземпляры классов СЛОЙ ПРЕДСТАВЛЕНИЯ
const page = new Page(containerPage, events);
const basket = new Basket(cloneTemplate(templateBasket), events);
const modal = new Modal(containerModal, events);
const contactForm = new ContactForm(cloneTemplate(templateContacts), events);
const paymentForm = new PaymentForm(cloneTemplate(templatePayment), events);
// const success = new Success(cloneTemplate(templateSuccess), events);
const cardPreview = new CardPreview(cloneTemplate(templateCardPreview), events);
// const basketCard = new BasketCard(cloneTemplate(templateCardBasket), events);

// Получаем ПРОДУКТЫ С СЕРВЕРА
api
    .getProducts()
    .then((data) => {
        productData.products = data;
        console.log(data)
    })
    .catch((err) => {
        console.error(err);
    });

// ИЗМЕНЕНИЯ В КАТАЛОГЕ
events.on('products:changed', (products: IProduct[]) => {
    const cardsList = products.map((product) => {
        const card = new Card(cloneTemplate(templateCardCatalog), events);

        return card.render(product);
    });
    page.render({ catalog: cardsList });
});


// открытие мод окна
events.on('modal:open', () => {
    page.locked = true;
});

// // закрытие мод окна
events.on('modal:close', () => {
    page.locked = false;
});

// обработка событий
// клик по иконке тележки на глав экране
events.on('modal-basket:open', () => {
    modal.render({ content: basket.render({ total: basketData.getTotalPrice(), emptyCheck: basketData.getTotalProducts() === 0 }) });
    // , items: basket.products(basketData.items)
    modal.open();
});



//обработаем событие, когда покупатель кликнул по какой-нибудь карточке в каталоге на главной странице
events.on('modal-card:open', (data: TId) => {
    const productOpen = productData.getProduct(data.id);
    if (productOpen) {

        modal.render({ content: cardPreview.render(productOpen) });
        modal.open();
    }
});


// клик на кнопку в корзину
//обработаем событие добавления товара в корзину
events.on('purchases:add', (data: TId) => {
    basketData.addProduct(productData.getProduct(data.id));
    modal.close();

});


//обработаем событие удаления товара из корзины
events.on('purchases:delete', (data: TId) => {
    basketData.deleteProduct(data.id)
});



// //обработаем событие на изменения в покупках пользователя и сформируем корзину

// events.on('basket:changed', () => {
//     page.render({ counter: basketData.getTotalProducts() });

// });




















// формы
// //после того, как определились с покупками, записываем данные с корзины, необходмые для заказа и переходим к форме доставки: обработаем данное событие
// events.on('modal-order:open', () => {
//  
// });

// //обработаем взаимодействие пользователя с полями формы доставки
// events.on('order:valid', () => {
// 

// //после заполнения формы доставки и записи для заказа соответствующих данных для заказа, переходи к форме контактных данных: обработаем данное событие
// events.on(`order:submit`, () => {
// });

// //обработаем взаимодействие пользователя с полями формы контактных данных
// events.on('contacts:valid', () => {
// 

// /*
// после успешного заполнения формы контактных данных отправляем сформированный заказ на сервер,
// получаем от сервера данные, записываем их и очищаем корзину и формы: обработаем данное событие
// */
// events.on('contacts:submit', () => {
//  

// //реагируем на получение данных с сервера и записываем в соответсвующий объект класса слоя данных
// events.on('success:changed', () => {
// });

//событие об успешной покупке обрабатываем путем закрытия окна нажатием на кнопку "За новыми покупками"
events.on('success:confirm', () => {
    modal.close();
})