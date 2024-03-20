import { createContext, useContext, useReducer } from "react";


const cartStateContext = createContext();
const cartDispatchContext = createContext();

const reducer = (state, action) => {
    switch(action.type){
        case 'ADD':
            return [...state, action.payload];
        case 'REMOVE':
            return state.filter((_, index)=> action.payload.index!==index);
        case 'UPDATE':
            state.find((cur, ind)=>{
                if(cur.id === action.payload.id) state[ind] = {...cur, qty: action.payload.qty, price: action.payload.price};
            });
            return state;
        case 'DROP':
            return [];
        default:
            console.log("No Action Specified.")
    }
};
const CartProvider = ({children})=>{
     const [state, dispatch] = useReducer(reducer, []);
     return (
        <cartDispatchContext.Provider  value={dispatch}>
            <cartStateContext.Provider value={state}>
                {children}
            </cartStateContext.Provider>
        </cartDispatchContext.Provider>
     )
}

export default CartProvider;
export const useCartState = () => useContext(cartStateContext);
export const useCartDispatch = () => useContext(cartDispatchContext);