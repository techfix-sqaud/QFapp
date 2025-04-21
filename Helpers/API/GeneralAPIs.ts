import quickFixAPI from "../Axios";


export const getCategories = async () => {
    try {
        const response = await quickFixAPI.get('/Categories');
        return response;
    } catch (error) {
       console.log(error);
    }
};