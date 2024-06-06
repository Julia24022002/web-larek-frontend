# Проектная работа "Веб-ларек"

## Описание
Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Документация

### Данные и типы данных, используемые в приложении

*Интерфейс IProduct, описывает карточку товара в магазине 
```typescript
export interface IProduct {
	id: string; // уникальный id
	category: string; // категория товара
	title: string; // название  товара
	image: string; // ссылка на изображение товара
	price: number | null; // цена товара, может быть null
	description: string; // описание товара
}
```

*Тип TOrderPayment описывает методы оплаты 
```typescript
export type TOrderPayment = 'cash' | 'card';
```

*Интерфейс IOrder используется для описания заказа
```typescript
export interface IOrder {
	items: IProduct[]; // Массив ID купленных товаров
	total: number; // стоимость заказа
	payment: TOrderPayment; // Способ оплаты
	address: string; // Адрес доставки
	email: string; // Электронная почта
	phone: string; // Телефон
}
```

*Интерфейс IBasket содержит список товаров и итоговую стоимость 
```typescript
export interface IBasket {
	items: string[];
	total: number;
}
```

*Тип OrderForm используется для валидации полей ввода
```typescript
export type OrderForm = Omit<IOrder, 'total' | 'items'>;
```

*Идентификатор созданного заказа и количество списанной валюты IOrderResult
```typescript
export interface IOrderResult {
	id: string;
	total: number;
}
```

###  Модели данных
 (Это Классы, которые будут отвечать за хранение данных)

Класс WebLarekAPI
Класс Component
Класс View


Компоненты представления
Basket
Form
Modal
Page
Card
Order
Contacts
Success
AppData






### Описание событий