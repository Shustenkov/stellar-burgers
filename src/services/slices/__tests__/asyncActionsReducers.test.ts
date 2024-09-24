import {
  feedSlice,
  getFeeds,
  getOrderByNumber,
  initialState as initialFeedState
} from '../feed';
import {
  getIngredients,
  ingredientsSlice,
  initialState as initialIngredientState
} from '../ingredients';
import {
  orderBurger,
  orderSlice,
  initialState as initialOrderState
} from '../order';
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  userSlice,
  initialState as initialUserState
} from '../user';
import {
  getUserOrders,
  userFeedSlice,
  initialState as initialUserFeedState
} from '../userFeed';

describe('Тесты редьюсеров асинхронных экшенов', () => {
  const testOrders = [
    {
      _id: '66e2fcd7119d45001b50677a',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093f',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный люминесцентный бессмертный био-марсианский метеоритный бургер',
      createdAt: '2024-09-12T14:38:15.222Z',
      updatedAt: '2024-09-12T14:38:15.734Z',
      number: 52831
    },
    {
      _id: '66e2fc4c119d45001b506767',
      ingredients: [
        '643d69a5c3f7b9001cfa094a',
        '643d69a5c3f7b9001cfa0944',
        '643d69a5c3f7b9001cfa094a',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa094a',
        '643d69a5c3f7b9001cfa0949',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный space астероидный традиционный-галактический экзо-плантаго бургер',
      createdAt: '2024-09-12T14:35:56.058Z',
      updatedAt: '2024-09-12T14:35:56.537Z',
      number: 52830
    }
  ];
  const errorMessage = 'error message';
  describe('Тесты ingredients', () => {
    const testReducer = ingredientsSlice.reducer;
    const expectedPendingState = {
      ingredients: [],
      loading: true,
      error: null
    };
    const expectedFulfilledState = {
      ingredients: [
        {
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
        },
        {
          _id: '643d69a5c3f7b9001cfa0941',
          name: 'Биокотлета из марсианской Магнолии',
          type: 'main',
          proteins: 420,
          fat: 142,
          carbohydrates: 242,
          calories: 4242,
          price: 424,
          image: 'https://code.s3.yandex.net/react/code/meat-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
        }
      ],
      loading: false,
      error: null
    };
    const expectedRejectedState = {
      ingredients: [],
      loading: false,
      error: errorMessage
    };
    test('Тест pending', () => {
      const action = { type: getIngredients.pending.type };
      const state = testReducer(initialIngredientState, action);
      expect(state).toEqual(expectedPendingState);
    });
    test('Тест fulfilled', () => {
      const action = {
        type: getIngredients.fulfilled.type,
        payload: expectedFulfilledState.ingredients
      };
      const state = testReducer(initialIngredientState, action);
      expect(state).toEqual(expectedFulfilledState);
    });
    test('Тест rejected', () => {
      const action = {
        type: getIngredients.rejected.type,
        error: { message: errorMessage }
      };
      const state = testReducer(initialIngredientState, action);
      expect(state).toEqual(expectedRejectedState);
    });
  });

  describe('Тесты feed', () => {
    const testReducer = feedSlice.reducer;
    const expectedGetFeedsPendingState = {
      ...initialFeedState,
      loading: true
    };
    const expectedGetFeedsFulfilledState = {
      ...initialFeedState,
      data: {
        orders: testOrders,
        total: 52457,
        totalToday: 132
      }
    };
    const expectedGetFeedsRejectedState = {
      ...initialFeedState,
      error: errorMessage
    };
    const expectedGetOrderByNumberPendingState = {
      ...initialFeedState
    };
    const expectedGetOrderByNumberFulfilledState = {
      ...initialFeedState,
      currentOrder: testOrders[0]
    };
    const expectedGetOrderByNumberRejectedState = {
      ...initialFeedState,
      error: errorMessage
    };

    test('Тест getFeeds pending', () => {
      const action = { type: getFeeds.pending.type };
      const state = testReducer(initialFeedState, action);
      expect(state).toEqual(expectedGetFeedsPendingState);
    });
    test('Тест getFeeds fulfilled', () => {
      const action = {
        type: getFeeds.fulfilled.type,
        payload: expectedGetFeedsFulfilledState.data
      };
      const state = testReducer(initialFeedState, action);
      expect(state).toEqual(expectedGetFeedsFulfilledState);
    });
    test('Тест getFeeds rejected', () => {
      const action = {
        type: getFeeds.rejected.type,
        error: { message: errorMessage }
      };
      const state = testReducer(initialFeedState, action);
      expect(state).toEqual(expectedGetFeedsRejectedState);
    });

    test('Тест getOrderByNumber pending', () => {
      const action = { type: getOrderByNumber.pending.type };
      const state = testReducer(initialFeedState, action);
      expect(state).toEqual(expectedGetOrderByNumberPendingState);
    });
    test('Тест getOrderByNumber fulfilled', () => {
      const action = {
        type: getOrderByNumber.fulfilled.type,
        payload: {
          orders: [testOrders[0]]
        }
      };
      const state = testReducer(initialFeedState, action);
      expect(state).toEqual(expectedGetOrderByNumberFulfilledState);
    });
    test('Тест getOrderByNumber rejected', () => {
      const action = {
        type: getOrderByNumber.rejected.type,
        error: { message: errorMessage }
      };
      const state = testReducer(initialFeedState, action);
      expect(state).toEqual(expectedGetOrderByNumberRejectedState);
    });
  });

  describe('Тесты order', () => {
    const testReducer = orderSlice.reducer;
    const expectedPendingState = {
      ...initialOrderState,
      orderRequest: true
    };
    const expectedFulfilledState = {
      ...initialOrderState,
      orderModalData: testOrders[0]
    };
    const expectedRejectedState = {
      ...initialOrderState
    };
    test('Тест pending', () => {
      const action = { type: orderBurger.pending.type };
      const state = testReducer(initialOrderState, action);
      expect(state).toEqual(expectedPendingState);
    });
    test('Тест fulfilled', () => {
      const action = {
        type: orderBurger.fulfilled.type,
        payload: { order: expectedFulfilledState.orderModalData }
      };
      const state = testReducer(initialOrderState, action);
      expect(state).toEqual(expectedFulfilledState);
    });
    test('Тест rejected', () => {
      const action = { type: orderBurger.rejected.type };
      const state = testReducer(initialOrderState, action);
      expect(state).toEqual(expectedRejectedState);
    });
  });
  describe('Тесты user', () => {
    const testReducer = userSlice.reducer;
    const testUserData = {
      email: 'examplemail@example.com',
      name: 'User'
    };

    const expectedRegisterUserPendingState = {
      ...initialUserState,
      loginUserRequest: true
    };
    const expectedRegisterUserFulfilledState = {
      ...initialUserState,
      data: testUserData
    };
    const expectedRegisterUserRejectedState = {
      ...initialUserState,
      loginUserError: errorMessage
    };

    const expectedLoginUserPendingState = {
      ...initialUserState,
      loginUserRequest: true
    };
    const expectedLoginUserFulfilledState = {
      ...initialUserState,
      data: testUserData
    };
    const expectedLoginUserRejectedState = {
      ...initialUserState,
      loginUserError: errorMessage
    };

    const expectedGetUserPendingState = {
      ...initialUserState,
      loginUserRequest: true
    };
    const expectedGetUserFulfilledState = {
      ...initialUserState,
      data: testUserData
    };
    const expectedGetUserRejectedState = {
      ...initialUserState
    };

    const expectedUpdateUserPendingState = {
      ...initialUserState,
      loginUserRequest: true
    };
    const expectedUpdateUserFulfilledState = {
      ...initialUserState,
      data: testUserData
    };
    const expectedUpdateUserRejectedState = {
      ...initialUserState
    };

    const expectedLogoutUserPendingState = {
      ...initialUserState,
      loginUserRequest: true
    };
    const expectedLogoutUserFulfilledState = {
      ...initialUserState
    };
    const expectedLogoutUserRejectedState = {
      ...initialUserState
    };

    test('Тест registerUser pending', () => {
      const action = { type: registerUser.pending.type };
      const state = testReducer(initialUserState, action);
      expect(state).toEqual(expectedRegisterUserPendingState);
    });
    test('Тест registerUser fulfilled', () => {
      const action = {
        type: registerUser.fulfilled.type,
        payload: expectedRegisterUserFulfilledState.data
      };
      const state = testReducer(initialUserState, action);
      expect(state).toEqual(expectedRegisterUserFulfilledState);
    });
    test('Тест registerUser rejected', () => {
      const action = {
        type: registerUser.rejected.type,
        error: { message: errorMessage }
      };
      const state = testReducer(initialUserState, action);
      expect(state).toEqual(expectedRegisterUserRejectedState);
    });

    test('Тест loginUser pending', () => {
      const action = { type: loginUser.pending.type };
      const state = testReducer(initialUserState, action);
      expect(state).toEqual(expectedLoginUserPendingState);
    });
    test('Тест loginUser fulfilled', () => {
      const action = {
        type: loginUser.fulfilled.type,
        payload: expectedLoginUserFulfilledState.data
      };
      const state = testReducer(initialUserState, action);
      expect(state).toEqual(expectedLoginUserFulfilledState);
    });
    test('Тест loginUser rejected', () => {
      const action = {
        type: loginUser.rejected.type,
        error: { message: errorMessage }
      };
      const state = testReducer(initialUserState, action);
      expect(state).toEqual(expectedLoginUserRejectedState);
    });

    test('Тест getUser pending', () => {
      const action = { type: getUser.pending.type };
      const state = testReducer(initialUserState, action);
      expect(state).toEqual(expectedGetUserPendingState);
    });
    test('Тест getUser fulfilled', () => {
      const action = {
        type: getUser.fulfilled.type,
        payload: { user: expectedGetUserFulfilledState.data }
      };
      const state = testReducer(initialUserState, action);
      expect(state).toEqual(expectedGetUserFulfilledState);
    });
    test('Тест getUser rejected', () => {
      const action = { type: getUser.rejected.type };
      const state = testReducer(initialUserState, action);
      expect(state).toEqual(expectedGetUserRejectedState);
    });

    test('Тест updateUser pending', () => {
      const action = { type: updateUser.pending.type };
      const state = testReducer(initialUserState, action);
      expect(state).toEqual(expectedUpdateUserPendingState);
    });
    test('Тест updateUser fulfilled', () => {
      const action = {
        type: updateUser.fulfilled.type,
        payload: { user: expectedUpdateUserFulfilledState.data }
      };
      const state = testReducer(initialUserState, action);
      expect(state).toEqual(expectedUpdateUserFulfilledState);
    });
    test('Тест updateUser rejected', () => {
      const action = { type: updateUser.rejected.type };
      const state = testReducer(initialUserState, action);
      expect(state).toEqual(expectedUpdateUserRejectedState);
    });

    test('Тест logoutUser pending', () => {
      const action = { type: logoutUser.pending.type };
      const state = testReducer(initialUserState, action);
      expect(state).toEqual(expectedLogoutUserPendingState);
    });
    test('Тест logoutUser fulfilled', () => {
      const action = { type: logoutUser.fulfilled.type };
      const state = testReducer(initialUserState, action);
      expect(state).toEqual(expectedLogoutUserFulfilledState);
    });
    test('Тест logoutUser rejected', () => {
      const action = { type: logoutUser.rejected.type };
      const state = testReducer(initialUserState, action);
      expect(state).toEqual(expectedLogoutUserRejectedState);
    });
  });
  describe('Тесты userFeed', () => {
    const testReducer = userFeedSlice.reducer;

    const expectedPendingState = initialUserFeedState;

    const expectedFulfilledState = {
      orders: testOrders
    };
    const expectedRejectedState = initialUserFeedState;
    test('Тест pending', () => {
      const action = { type: getUserOrders.pending.type };
      const state = testReducer(initialUserFeedState, action);
      expect(state).toEqual(expectedPendingState);
    });
    test('Тест fulfilled', () => {
      const action = {
        type: getUserOrders.fulfilled.type,
        payload: expectedFulfilledState.orders
      };
      const state = testReducer(initialUserFeedState, action);
      expect(state).toEqual(expectedFulfilledState);
    });
    test('Тест rejected', () => {
      const action = { type: getUserOrders.rejected.type };
      const state = testReducer(initialUserFeedState, action);
      expect(state).toEqual(expectedRejectedState);
    });
  });
});
