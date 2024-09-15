describe('Тесты приложения', () => {
  const testUrl = 'http://localhost:4000';
  const ingredientSelector = 'li[data-cy="643d69a5c3f7b9001cfa0941"]';

  beforeEach(() => {
    cy.setCookie('accessToken', 'test123key');
    window.localStorage.setItem('refreshToken', 'test123refreshtoken');

    cy.intercept('GET', '/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit(testUrl);
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    window.localStorage.removeItem('refreshToken');
  });

  it('Добавление ингредиента из списка в конструктор', () => {
    const ingredientsContainer = cy
      .get('ul[data-cy="ingredients-container"]')
      .as('ingredientsContainer');

    ingredientsContainer.contains('Выберите начинку');

    cy.get(ingredientSelector).within(() => {
      cy.get('button').click();
    });

    cy.get('@ingredientsContainer').contains(
      'Биокотлета из марсианской Магнолии'
    );
  });

  it('Открытие и закрытие модального окна ингредиента', () => {
    const modalContainer = cy.get('div[id="modals"]').as('modalContainer');
    // поиск элемента по data-cy _id ингредиента "Биокотлета из марсианской Магнолии"
    modalContainer.should('have.prop', 'childElementCount', 0);
    cy.get(ingredientSelector).within(() => {
      cy.get('a').click();
    });
    modalContainer.contains('Детали ингредиента');
    // проверка на отображение в модальном окне именно того ингредиента, по которому был клик
    cy.get('h3[data-cy="ingredient-title"]').contains(
      'Биокотлета из марсианской Магнолии'
    );
    cy.get('button[data-cy="modal-close-button"]').click();
    cy.get('@modalContainer').should('not.include.text', 'Детали ингредиента');
    cy.get('@modalContainer').should('have.prop', 'childElementCount', 0);
  });

  it('Создание заказа', () => {
    cy.intercept('GET', '/api/auth/user', {
      fixture: 'getUser.json'
    }).as('getUser');

    cy.intercept('POST', '/api/orders', {
      fixture: 'newOrder.json'
    }).as('newOrder');

    cy.wait('@getUser');

    cy.get('section[data-cy="constructor-container"]').contains(
      'Выберите булки'
    );
    cy.get('section[data-cy="constructor-container"]').contains(
      'Выберите начинку'
    );

    cy.get('div[id="modals"]').as('modalContainer');

    // сборка бургера
    cy.get('li[data-cy="643d69a5c3f7b9001cfa093c"]').within(() => {
      cy.get('button').click();
    });
    cy.get(ingredientSelector).within(() => {
      cy.get('button').click();
    });

    cy.get('section[data-cy="constructor-container"]').contains(
      'Краторная булка N-200i (верх)'
    );
    cy.get('section[data-cy="constructor-container"]').contains(
      'Биокотлета из марсианской Магнолии'
    );
    cy.get('section[data-cy="constructor-container"]').contains(
      'Краторная булка N-200i (низ)'
    );
    cy.get('@modalContainer').should('have.prop', 'childElementCount', 0);

    cy.get('button').contains('Оформить заказ').click();

    // проверка наличия модального окна и верного номера заказа в нём
    cy.wait('@newOrder');
    cy.get('@modalContainer').should('include.text', '52996');

    // закрытие модального окна с проверкой
    cy.get('button[data-cy="modal-close-button"]').click();
    cy.get('@modalContainer').should('have.prop', 'childElementCount', 0);

    // проверка очистки конструктора бургера
    cy.get('section[data-cy="constructor-container"]').contains(
      'Выберите булки'
    );
    cy.get('section[data-cy="constructor-container"]').contains(
      'Выберите начинку'
    );
  });
});
