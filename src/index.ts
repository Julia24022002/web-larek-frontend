// делаем необходиме импорты для приложения
import './scss/styles.scss';
import { ProductAPI } from './components/ProductAPI';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from "./components/base/events";
import { cloneTemplate, ensureElement } from './utils/utils';

import { ProductData } from './components/model/ProductData';
import { BasketData } from './components/model/BasketData';
import { OrderData } from './components/model/OrderData';

import { Card } from './components/view/Card';
import { Page } from './components/view/Page';
import { Basket } from './components/view/Basket';
import { Modal } from './components/view/Modal';
import { PaymentForm } from './components/view/PaymentForm';
import { ContactForm } from './components/view/ContactForm';
import { Success } from './components/view/Succcess';
import { IProduct, IOrderForm, IContactForm, IPaymentForm } from './types';

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
const containerPage = ensureElement<HTMLElement>('.page');
const containerModal = ensureElement<HTMLDivElement>('#modal-container');

// экземпляры классов СЛОЙ МОДЕЛИ
const productData = new ProductData(events);
const orderData = new OrderData(events);
const basketData = new BasketData(events);

// экземпляры классов СЛОЙ ПРЕДСТАВЛЕНИЯ
const page = new Page(containerPage, events);
const basket = new Basket(cloneTemplate(templateBasket), events);
const modal = new Modal(containerModal, events);
const contactForm = new ContactForm(cloneTemplate(templateContacts), events);
const paymentForm = new PaymentForm(cloneTemplate(templatePayment), events);
const success = new Success(cloneTemplate(templateSuccess), {
    onClick: () => {
        modal.close();
        events.emit('order:ready');
    },
});

// Получаем ПРОДУКТЫ С СЕРВЕРА
api
    .getProducts()
    .then((data) => {
        productData.products = data;
        // console.log(data)
    })
    .catch((err) => {
        console.error(err);
    });

// ИЗМЕНЕНИЯ В КАТАЛОГЕ (КАТАЛОГ)
events.on('products:changed', (product: IProduct[]) => {
    // console.log('Products:', productData.products);
    page.catalog = productData.products.map((product) => {
        const card = new Card(cloneTemplate(templateCardCatalog), {
            onClick: () => {
                events.emit('card:selected', product);
            },
        });
        return card.render(product);
    });
});

// открытие мод окна
events.on('modal:open', () => {
    page.locked = true;
});

// закрытие мод окна
events.on('modal:close', () => {
    page.locked = false;
});

// клик по иконке тележки на глав экране
events.on('modal-basket:open', () => {
 	modal.render({
		content: basket.render(),
	});
    modal.open();
});

// Отображение предварительного просмотра карточки товара.
events.on('card:selected', (item: IProduct) => {
    const card = new Card(cloneTemplate(templateCardPreview), {
        onClick: () => {
            if (basketData.checkProduct(item.id)) {
                card.setButtonText('В корзину');
                events.emit('purchases:delete', item);
                modal.close();
            } else {
                card.setButtonText('Удалить из корзины');
                events.emit('purchases:add', item);
            }
        },
    });
    card.setButtonText(basketData.checkProduct(item.id) ? 'Удалить из корзины' : 'В корзину');
    modal.render({ content: card.render(item) });
    modal.open();
});

//  клик на кнопку в корзину
// обработаем событие добавления товара в корзину
events.on('purchases:add', (item: IProduct) => {
    basketData.addProduct(item);
    modal.close();
});

/// обработаем событие удаления товара из корзины
events.on('purchases:delete', (event: { id: string }) => {
    basketData.deleteProduct(event.id);
});

// //обработаем событие на изменения в покупках пользователя и сформируем корзину
events.on('basket:changed', () => {
    page.render({ counter: basketData.getTotalProducts() });

    basket.total = basketData.getTotalPrice();
    basket.products = basketData.items.map((product) => {
        const card = new Card(cloneTemplate(templateCardBasket), {
            onClick: () => {
                events.emit('purchases:delete', { id: product.id }); //(иконка урны)
            },
        });

        return card.render({
            title: product.title,
            price: product.price,
        });
    });
});

// ФОРМЫ
// ОПЛАТА И АДРЕС
events.on('order:open', () => {
    orderData.clearOrder();
    modal.render({
        content: paymentForm.render({
            address: '',
            payment: '',
            valid: false,
            errors: [],
        }),
    });
});

events.on(
    /^order\..*:change$/,
    (data: { field: keyof IPaymentForm; value: string }) => {
        orderData.setOrderField(data.field, data.value);
        events.emit('formErrorsPayment:change', orderData.formErrors);
    }
);

events.on('formErrorsPayment:change', (err: Partial<IPaymentForm>) => {
    const { payment, address } = err;
    paymentForm.valid = !payment && !address;
    paymentForm.errors = Object.values({ payment, address })
        .filter((i) => !!i)
        .join('; ');
});

// ФОРМА ТЕЛЕФОН И ПОЧТА 
events.on(`order:submit`, () => {
    modal.render({
        content: contactForm.render({
            phone: '',
            email: '',
            valid: false,
            errors: [],
        }),
    });
});

// Изменилось одно из полей контакта
events.on(
    /^contacts\..*:change/,
    (data: { field: keyof IContactForm; value: string }) => {
        orderData.setOrderField(data.field, data.value);
        events.emit('formErrorsContact:change', orderData.formErrors);
    }
);

events.on('formErrorsContact:change', (err: Partial<IContactForm>) => {
    const { email, phone } = err;
    contactForm.valid = !email && !phone;
    contactForm.errors = Object.values({ phone, email })
        .filter((i) => !!i)
        .join('; ');
});

events.on('contacts:submit', () => {
    const order = Object.assign({}, orderData.order, {
        total: basketData.getTotalPrice(),
        items: basketData.items.map(item => item.id),
    });

    api.orderProduct(order)
        .then((result) => {
            basketData.clearBasket();
            orderData.clearOrder();
            modal.render({ content: success.render({ total: result.total }) });
        })
        .catch((error) => {
            console.error(`Ошибка выполнения заказа: ${error}`);
        });
});


