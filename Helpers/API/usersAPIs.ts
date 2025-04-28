import { UserProfile } from "../../interfaces/users";
import quickFixAPI from "../Axios";


export const getUserData = async (): Promise<UserProfile | undefined> => {
    try {
      const response = await quickFixAPI.get<UserProfile>('Users/profile');
      return response.data;
    } catch (error) {
      console.error("Error fetching user data", error);
      return undefined;
    }
  };
  