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

### Описание данных
Для описания всех возможных категорий товара используется тип CategoryType:
```
type CategoryType = 
    'софт-скил'
    'другое'
    'дополнительное'
    'кнопка'
    'хард-скил';
```
Для описания возможных способов оплаты заказа используется тип TOrderPayment:
```
  type TOrderPayment  = 'cash' | 'card';
```

Содержит поля приходящие с сервера.
```
interface IProduct {
    id: string; // уникальный id
    category: CategoryType; // категория товара
    title: string; // название  товара
    image: string; // ссылка на изображение товара
    price: number | null; // цена товара, может быть null
    description: string;  // описание товара 
  }
```

Для описания заказа используется интерфейс IOrder:
```
 interface IOrder {
    items: string[]; // Массив ID купленных товаров
    total: number; // Сумма заказа
    payment: TOrderPayment; // Способ оплаты
    address: string; // Адрес доставки
    email: string; // Электронная почта
    phone: string; // Телефон
  }
```

интерфейс содержит идентификатор созданного заказа и количество списанной валюты.
```
interface IOrderResult {
      id: string;
      total: number;
  }
```
###  Модели данных

#### Класс Component
предназначен для тутутут
#### Класс Api
fhfhhfhfhf



### Описание событий