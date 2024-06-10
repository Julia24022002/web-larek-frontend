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
- src/scss/styles.scss — корневой файл стилей
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

- Тип описывающий категории товаров

```typescript
type CategoryType =
	| 'другое'
	| 'софт-скил'
	| 'дополнительное'
	| 'кнопка'
	| 'хард-скил';
```

- Интерфейс `IProduct`, описывает карточку товара в магазине

```typescript
interface IProduct {
	id: string; // уникальный id
	category: CategoryType; // категория товара
	title: string; // название  товара
	image: string; // ссылка на изображение товара
	price: number | null; // цена товара, может быть null
	description: string; // описание товара
}
```

- Тип `TOrderPayment` описывает методы оплаты

```typescript
type TOrderPayment = 'cash' | 'card';
```

- Интерфейс `IOrder` используется для описания заказа

```typescript
interface IOrder {
	items: IProduct[]; // Массив ID купленных товаров
	total: number; // стоимость заказа
	payment: TOrderPayment; // Способ оплаты
	address: string; // Адрес доставки
	email: string; // Электронная почта
	phone: string; // Телефон
}
```

- Интерфейс `IBasket` содержит список товаров и итоговую стоимость

```typescript
interface IBasket {
	items: string[]; // массив товаров
	total: number; // общая стоимость
}
```

- Тип `OrderForm` используется для валидации полей ввода

```typescript
type OrderForm = Omit<IOrder, 'total' | 'items'>;
```

- Идентификатор созданного заказа и количество списанной валюты `IOrderResult`

```typescript
interface IOrderResult {
	id: string;
	total: number;
}
```

### Архитекрута приложения

Код приложения разделен на слои слогласно парадигме `MVP`:

- `Model`слой данных, отвечает за хранение и изменение данных.
- `View` слой представления, отвечает за отображения данных на странице.
- `Presenter` презентер, отвечает за связь представления и данных (src/index.ts)

### Базовый код

#### Класс `Api`

Содержит в себе базовую логику отправки запросов. В конструктор передается базовый адрес сервера и опциональный обьект с заголовками запросов.

Поля:

- `baseUrl` - базовый адрес сервера
- `options` - объект с заголовками запросов

Методы:

- `get` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с обьектом, которым ответил сервер.
- `post`- принимает объект с данными, которые будут переданы в JSON в теле запроса, и
  отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию
  выполняется POST" запрос, но метод запроса может быть переопределен заданием третьего
  параметра при вызове.

#### Класс `EventEmitter`

Брокер событий позволяет отправлять события и подписываться на события, происходящие в
системе. Класс используется в презентере для обработки событий и в слоях приложения для
генерации событий.

Основные методы, реализуемые классом описаны интерфейсом `IEvents`:

- `events` - переменная к которую будут кэшироваться события.
- `on()` - функция установки обработчика на событие.
- `off()` - функция снятия обработчика с события.
- `emit()` - функция инициирования события с данными.
- `onAll` - функция прослушивания всех событий.
- `offAll` - функция сброса всех обработчиков.
- `trigger` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие.

## Model (Модели данных):

#### Класс `AppData`

представляет хранилище данных приложения. Он содержит информацию о продуктах, корзине, предпросмотре товара, заказе и ошибках формы заказа.

Методы:

- `fetchDataFromServer()`- Получение данных с сервера.
- `updateModalData(modalData)` - Обновление данных модальных окон.
- `updateCartData(cartData)` - Обновление данных корзины.
- `updateFormData(formData)` - Обновление данных формы оформления заказа.

## View (Классы представления):

#### Класс `Component`

Абстрактный базовый класс предназначен для создания компонентов пользовательского интерфейса. Класс обеспечивает инструментарий для управления DOM элементами и поведением компонента. Наследуется всеми классами представления(View)

`constructor(container: HTMLElement)`- принимает принимает родительский элемент

### "Общие" классы представлений

#### Класс `Modal`

Отображение модального окна. Предоставляет методы для открытия и закрытия модального окна страницы, а также контролирует собственное содержимое.

#### Класс `Basket`

Представляет компонент корзины с возможностью отображения списка товаров,
общей суммы и управления состоянием кнопки оформления заказа.

#### Класс `Form`

Представляет компонент формы с возможностью управления состоянием валидации и отображения ошибок.

#### Класс `Success`

#### Классы представлений конкретного проекта:

#### Класс `Page`

Представляет компонент страницы с некоторыми элементами и функциональностью для управления ими.

#### Класс `Card`

Представляет компонент карточки товара с возможностью отображения информации о товаре и выполнения действий при нажатии на кнопку или саму карточку.

#### Класс `Order`

Наследует класс `Form<OrderForm>`. Представляет форму заказа с возможностью выбора способа оплаты. Конструктор класса, который принимает контейнер формы заказа container типа HTMLFormElement и объект событий events типа EventEmitter. В конструкторе вызывается конструктор родительского класса Form с переданным контейнером и объектом событий.

Содержит:

- `address` - Устанавливает адрес для доставки заказа.
- `payment` - Устанавливает выбранный метод оплаты и активирует соответствующую кнопку.

#### Класс `Contacts`

Представляет форму для ввода контактной информации (электронной почты и номера телефона) при оформлении заказа.

<!-- ### Описание событий  -->
