import { rootReducer } from '../index';

describe('Тест rootReducer', () => {
  const initialReducerState = {
    ingredients: {
      ingredients: [],
      loading: false,
      error: null
    },
    burgerConstructor: {
      constructorItems: {
        bun: null,
        ingredients: []
      }
    },
    feed: {
      data: {
        orders: [],
        total: 0,
        totalToday: 0
      },
      currentOrder: undefined,
      loading: false,
      error: null
    },
    user: {
      data: null,
      loginUserError: null,
      loginUserRequest: false
    },
    order: {
      orderRequest: false,
      orderModalData: null
    },
    userFeed: {
      orders: []
    }
  };

  test('Проверка на вызов с undefined состоянием и неизвестным экшеном', () => {
    const newState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(newState).toEqual(initialReducerState);
  });
});
