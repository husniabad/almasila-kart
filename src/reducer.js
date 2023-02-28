export const initialState = {
    basket: [],
    user: null,
};

//selector
const ryalPrice = 1;
export const getBasketTotal = (basket) =>
basket?.reduce((amount, item) => item.price*ryalPrice + amount, 0);

const reducer = (state, action) =>{
// console.log(action);
switch(action.type){
    case 'ADD_TO_BASKET':
        return {
            ...state,
            basket: [...state.basket, action.item],
        };

    case 'REMOVE_FROM_BASKET':
        const index = state.basket.findIndex(
            (basketItem) => basketItem.id === action.id
        );
        let newBasket = [...state.basket];

        if(index >= 0 ){
            newBasket.splice(index, 1);

            console.log("this is the total items"+newBasket.length)
        }else{
            console.warn(
                `Can\'t remove product (id: ${action.id}) as it is not in basket!`
                )
        }
        return {
            ...state,
            basket: newBasket
        }

    case "SET_USER":
        return {
            ...state,
            user: action.user
        }

    case "EMPTY_BASKET":
        return {
            ...state,
            basket: []
        }

    default: 
        return state;
}

};

export default reducer;