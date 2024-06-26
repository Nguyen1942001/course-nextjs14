// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit';

// ** Reducers
import user from 'src/stores/apps/user';
import auth from 'src/stores/apps/auth';

export const store = configureStore({
    reducer: {
        user,
        auth,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type AppDispatch = typeof store.dispatch;

/**
 * RootState: type của reducer ở trên
 * store.getState: Lấy ra state hiện tại của reducer
 */
export type RootState = ReturnType<typeof store.getState>;
