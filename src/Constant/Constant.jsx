export const Constants = {
    API_URL: "https://backendproject-webanddatabase.onrender.com/api/v1/",
    API_ENDPOINTS: {
        AUTH: {
            REGISTER: "auth/register",
            LOGIN: "auth/login",
        },
        FOOD: {
            LIST: "food/list",
            ADD: "food/add",
            REMOVE: "food/remove",
            ORDER: "food/order",
        },
        ORDER: {
            PLACE: "order/place",
            VERIFY: "order/verify",
            USERORDER: "order/userorders",
            LIST: "order/list",
        },
        CHATROOM: {
            CHAT: "chatroom",
            CHATID: "chatroom",
        },
        CART: {
            ADDITEM: "cart/addOneToItem",
            REMOVEITEM: "cart/removeOneFromItem",
            GETS: "cart/get",
        },
        PROFILE: {
            USER: "user/me",
            DELETEUSER: "user/deleteUser",
        }


    },
    IMG_ROOT: "",
    CLASS_TAG: ["", "", ""],
    PAGE_SIZE: [10, 20, 30],
};
