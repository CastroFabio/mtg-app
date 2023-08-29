import { compose, applyMiddleware, legacy_createStore } from "redux";
import { logger } from "redux-logger";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { rootReducer } from "./root-reducer";

const persistConfig = { key: "root", storage };

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [logger];

const composedEnhancers = compose(applyMiddleware(...middleWares));

const store = legacy_createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);
const persistor = persistStore(store);

export { store, persistor };
